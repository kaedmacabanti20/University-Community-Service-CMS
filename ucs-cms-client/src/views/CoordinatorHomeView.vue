<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue"; 
import Modal from "../components/Modal.vue";  
import QRScanner from "../components/QRScanner.vue";  
import Loading from "../components/Loading.vue";  

export default {
  components: { TopNav, Modal, QRScanner,Loading },
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app', 
      isRequestInProgress: false,
      activityCode: this.$route.params.activityCode,
      studentRecords: null,
      activityDetails: null,
      scannedResult: null,
      isModalVisible: false,
      studentNumber: '', // Added for storing scanned student number
      loading: false,
      loadingText: true
    };
  },
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    }
  },
  mounted() { 
    this.getActivityRecords();
 
  },
  methods: { 
    async getStudentRecords(studentNumber) {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getStudentRecords?student_number=${studentNumber}`);
        this.studentRecords = response.data.result;
        console.log(this.studentRecords);
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
    async getActivityRecords() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getActivityRecords?activity_code=${this.activityCode}`);
        this.activityDetails = response.data.result;
        console.log(this.activityDetails);
      } catch (error) {
        console.error("Error fetching", error);
      }
    },

    async putCommunityServiceAndParticipants() {
      if (this.isRequestInProgress) return; this.isRequestInProgress = true; this.loading = true; this.loadingText = false
      const url = `${this.baseUrl}/api/put/putCommunityServiceAndParticipants`;
      console.log("Attempting PUT request to:", url);
      try {
        const params = {
          student_number: this.scannedResult,
          activity_code: this.activityDetails.activity_code,
          activity: this.activityDetails.activity,
          venue: this.activityDetails.venue,  
          time_in: this.activityDetails.time_in,
          time_out: this.activityDetails.time_out, 
          time_render: this.activityDetails.time_render,
          semester: this.activityDetails.semester,
          coordinators: this.activityDetails.coordinators
        };
        await axios.put(url, params);
        this.getStudentRecords(this.studentNumber); this.hideModal();
        this.isRequestInProgress = false;  this.loading = false; this.loadingText = true
      } catch (error) {
        this.isRequestInProgress = false;  this.loading = false; this.loadingText = true
        console.error('Error on putCommunityServiceAndParticipants:', error);
      }  
    },
    handleScanResult(result) { // handles qr code scanning in camera
      this.scannedResult = result;
      this.studentNumber = result; 
      this.getStudentRecords(result);
    },
    showModal() {
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden';  // Disable scroll
    },
    hideModal() {
      this.isModalVisible = false;
      document.body.style.overflow = '';  // Enable scroll
    },
  }
};
</script>

<template>
  <TopNav />
  <div class="main" v-if="activityDetails">
    <div class="white-box">
      <span class="header">
        <h1>{{activityDetails.activity}}</h1>
      </span>
    </div>
    <QRScanner @result="handleScanResult" :qrbox="250" :fps="10" class="scanner"/>

    <div class="white-box" v-if="studentRecords">
      <span class="header">
        <h1>Student community service records</h1>
        <h2>{{ studentRecords.student_number }}</h2>
      </span>
      <ul class="table">
        <li class="table-header">
          <div class="table-header-item">Activity</div>
          <div class="table-header-item">Status</div>
        </li>
        <li v-for="(service, index) in studentRecords.community_service" :key="index" class="table-row">
          <div class="col-one">{{ service.activity }}</div>
          <div class="status"> {{ service.status }}</div>
          <i class="material-icons ellipsis">more_vert</i>
        </li>
        <li class="table-row">
          <div class="col-one">Hours rendered: {{ studentRecords.rendered_hours }}</div>
        </li>
      </ul>
      <button class="modal-button" @click="showModal">Verify</button>
    </div>

    <div v-else class="white-box">
      <span class="header">
        <p v-if="scannedResult">{{ scannedResult }}</p>
        <h2 v-else>Scan student ID.</h2>
      </span>
    </div>

    <Modal v-if="isModalVisible"   @button-click="putCommunityServiceAndParticipants"  :showCopyIcon="false">
      <template #title>
        {{ activityDetails.activity }}
      </template>
        <li>Time in: {{ activityDetails.time_in }} - Time out: {{ activityDetails.time_out }}</li>
        <li>Time render: {{ activityDetails.time_render }}</li>
        <li>Semester: {{ activityDetails.semester }}</li>
        <li>Student: {{ scannedResult }}</li>
      <template #button>
        <span v-if="loadingText">Confirm</span>    <Loading v-if="loading" height="14px" width="14px" borderColor="#ffffff" borderWidth="2px" />
      </template>
    </Modal>
  </div>
</template>

<style scoped>
@media (min-width: 1px) { 
  /* Styles for the QR scanner */
  .scanner {
    height: 30rem;
    width: 100%;
    border: solid 1px gray;
    border: solid 1px gray;
    height: 100%;
  }
}
</style>

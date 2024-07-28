<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue"; 
import Modal from "../components/Modal.vue";  
import QRScanner from "../components/QRScanner.vue";  

export default {
  components: {
    TopNav, 
    Modal, 
    QRScanner,
  },
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app',  
      activityDetails: null,
      isModalVisible: false,
      isStudentDetailsModalVisible: false,
      activity: '',  // Added activity property
      selectedParticipant: null,  // Add selectedParticipant to hold the details of the selected participant
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
    async getActivityRecords() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getActivityRecords?activity_code=${this.$route.params.activityCode}`);
        this.activityDetails = response.data.result; // Ensure the correct property is assigned
        console.log(this.activityDetails);
        this.activity = response.data.result.activity; // Assign the activity property
      } catch (error) { 
        console.error("Error fetching", error);
      }
    },
    hideModal() {
      this.isModalVisible = false;
      document.body.style.overflow = '';//Enable scroll
    },
    showModal() {
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden';//Disable scroll
    },
    hideStudentDetailsModal() {
      this.isStudentDetailsModalVisible = false;
      document.body.style.overflow = '';//Enable scroll
    },
    showStudentDetailsModal(participant) {
      this.selectedParticipant = participant;
      this.isStudentDetailsModalVisible = true;
      document.body.style.overflow = 'hidden';//Disable scroll
    }
  }
};
</script>

<template>
  <TopNav :showMenu="true"/>
  <div class="main" v-if="activityDetails">
    <div class="white-box">
      <div class="event-details">
        <span class="event-details-title">{{ activityDetails.activity }}</span>
        <ul class="event-details-ul">
          <li>Venue: {{ activityDetails.venue }}</li>
          <li>Time in: {{ new Date(activityDetails.time_in).toLocaleTimeString() }} | Time out: {{ new Date(activityDetails.time_out).toLocaleTimeString() }}</li>
          <li>Time render: {{ activityDetails.time_render }} | Date: {{ new Date(activityDetails.activity_date).toLocaleDateString() }}</li>
          <li>Semester: {{ activityDetails.semester }}</li>
          <li>Coordinator: {{ activityDetails.coordinators }}</li>
        </ul>
      </div>
      <ul class="table">
        <li class="table-header">
          <div class="table-header-item">Student number</div>
          <div class="table-header-item">Status</div>
        </li>
        <li v-for="(participant, index) in activityDetails.participants" :key="index" class="table-row" @click="showStudentDetailsModal(participant)">
          <div class="col-one">{{ participant.student_number }}</div>
          <div class="status">{{ participant.status }}</div>
          <i class="material-icons ellipsis">more_vert</i>
        </li>
        <button class="modal-button" @click="showModal">
          Activity code
        </button>
      </ul>
    </div>
    <Modal v-if="isModalVisible" @button-click="hideModal" :showCopyIcon="true">
      <template #title>
        Community Service Created
      </template>
      <li>{{activityDetails.activity}}</li> <!-- Correct usage of activity property -->
      <li>{{activityDetails.venue}}</li> <!-- Correct usage of activity property -->
      <li>Coordinator link: https://uacs.vercel.app/#/coordinator-home/{{activityDetails.activity_code}}</li>
      <template #button>
        Close
      </template>
    </Modal>

    <Modal v-if="isStudentDetailsModalVisible" @button-click="hideStudentDetailsModal" :showCopyIcon="false">
      <template #title>
        {{ activityDetails.activity }}
      </template>
        <li>Student number: {{ selectedParticipant.student_number }}</li>
        <li>Status: {{ selectedParticipant.status }}</li>
        <li>Time in: {{ selectedParticipant.time_in }}</li>
        <li>Time out: {{ selectedParticipant.time_out }}</li>
        <li>Time render: {{ selectedParticipant.time_render }}</li>
        <li>Coordinators: {{ selectedParticipant.coordinators.join(", ") }}</li>
        <li>Date: {{ selectedParticipant.date }}</li>
        <li>Time: {{ selectedParticipant.time }}</li>
      <template #button>
        <span v-if="loadingText">Close</span>
        <Loading v-if="loading" height="14px" width="14px" borderColor="#ffffff" borderWidth="2px" />
      </template>
    </Modal>
  </div>
</template>

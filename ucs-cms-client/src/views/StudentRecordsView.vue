<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue";
import Modal from "../components/Modal.vue"; 
import Loading from "../components/Loading.vue"; 

export default {
  components: { TopNav, Modal, Loading},
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app',
      studentRecords: null,
      isFocused: false,
      studentNumber: this.$route.params.studentNumber, 
      showCopyIcon: false,
      isModalVisible: false,
      selectedService: null, // Add this to hold the selected service
    };
  },
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    };
  },
  mounted() { 
    this.getStudentRecords(); 
  },
  methods: {
    async getStudentRecords() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getStudentRecords?student_number=${this.studentNumber}`);
        this.studentRecords = response.data.result;
        console.log(this.studentRecords);
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
    hideModal() {
      this.isModalVisible = false;
      document.body.style.overflow = '';//Enable scroll
    },
    showModal(service) {
      this.selectedService = service;
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden';//Disable scroll
    }
  },
};
</script>

<template>
  <div>
    <TopNav />
    <div class="main" v-if="studentRecords">
      <div class="white-box"  >
        <span class="header">
          <h1>Community service records</h1>
          <h2>{{ studentRecords.student_number }}</h2>
        </span>
        <ul class="table">
          <li class="table-header">
            <div class="table-header-item">Activity</div>
            <div class="table-header-item">Status</div>
          </li>
          <li 
            v-for="(service, index) in studentRecords.community_service" 
            :key="index" 
            class="table-row"
            @click="showModal(service)"
          >
            <div class="col-one">{{ service.activity }}</div>
            <div class="status">{{ service.status }}</div>
            <i class="material-icons ellipsis">more_vert</i>
          </li>
          <li class="table-row">
            <div class="col-one">Hours rendered: {{ studentRecords.rendered_hours }}</div>
          </li>
        </ul>
        <router-link :to="`/student-search`">
          <button class="modal-button" >
            Search student number
          </button>
        </router-link>
      </div>
      
     
      <!-- Modal component -->
      <Modal v-if="isModalVisible" @button-click="hideModal" :showCopyIcon="showCopyIcon">
        <template #title>
          {{ selectedService.activity }} - {{ selectedService.venue }}
        </template>
        <li>Time in: {{ selectedService.time_in }} - Time out: {{ selectedService.time_out }}</li>
        <li>Time render: {{ selectedService.time_render }}</li>
        <li>Semester: {{ selectedService.semester }}</li>
        <li>Coordinators: {{ selectedService.coordinators.join(', ') }}</li>
        <li>Date: {{ selectedService.date }}</li> 
        <template>
          Verify
        </template>
      </Modal>


    </div>
    <div v-else class="loading-overlay">
      <Loading height="35px" width="35px" borderColor="#087CEC" borderWidth="4px" />
    </div>
  </div>
 
</template>


 
<style scoped>
.loading-overlay {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>


<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue";
import Modal from "../components/Modal.vue";
import QRScanner from "../components/QRScanner.vue";
import Loading from "../components/Loading.vue";

export default {
  components: { TopNav, Modal, QRScanner, Loading },
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app/api/post/postCommunityService',
      isRequestInProgress: false,
      activity: '',
      venue: '',
      timeRender: '',
      timeIn: '',
      timeOut: '',
      semester: '',
      coordinators: '',
      selectedDate: '',
      isFocused: null,
 
      activity:'',
      activityCode: '',
      isModalVisible: false,
      loading: false,
      loadingText: true,
    };
  },
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user
    };
  },
  methods: {
    async createCommunityService() {
      if (this.isRequestInProgress) return; this.isRequestInProgress = true;
      this.loading = true; this.loadingText = false
      try {
        const postData = {
          activity: this.activity,
          venue: this.venue,
          time_in: this.selectedDate + 'T' + this.timeIn,
          time_out: this.selectedDate + 'T' + this.timeOut,
          time_render: this.timeRender,
          semester: this.semester,
          activity_date: this.selectedDate,
          coordinators: this.coordinators.split(',').map(coord => coord.trim())
        };
        const response = await axios.post(this.baseUrl, postData);
        this.isRequestInProgress = false; 
        this.loading = false; this.loadingText = true
        this.activity = response.data.activity;
        this.activityCode = response.data.activity_code;
        this.showModal() 
      } catch (error) {
        this.isRequestInProgress = false; 
        this.loading = false; this.loadingText = true
        console.error("Error creating community service:", error);
      }
    },
    setFocus(inputName) {
      this.isFocused = this.isFocused === inputName ? null : inputName;
    },
    handleScanResult(result) {
      this.scannedResult = result;
    },
    hideModal() {
      this.isModalVisible = false;
      document.body.style.overflow = '';//Enable scroll
    },
    showModal() {
      this.isModalVisible = true;
      document.body.style.overflow = 'hidden';//Disable scroll
    }
  }
};
</script>

<template>
  <div>
    <TopNav :showMenu="true"/>
    <div class="main">
      <div class="white-box">
        <span class="header">
          <h1>Create community service</h1>
        </span>
        <div class="input-container" :class="{ focused: isFocused === 'activity' || activity }" @click="setFocus('activity')">
          <label for="activity">Activity</label>
          <input type="text" id="activity" placeholder=" " v-model="activity" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'venue' || venue }" @click="setFocus('venue')">
          <label for="venue">Venue</label>
          <input type="text" id="venue" placeholder=" " v-model="venue" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'timeRender' || timeRender }" @click="setFocus('timeRender')">
          <label for="timeRender">Time Render</label>
          <input type="number" id="timeRender" placeholder=" " v-model="timeRender" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'timeIn' || timeIn }" @click="setFocus('timeIn')">
          <label for="timeIn">Time in</label>
          <input type="time" id="timeIn" placeholder=" " v-model="timeIn" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'timeOut' || timeOut }" @click="setFocus('timeOut')">
          <label for="timeOut">Time out</label>
          <input type="time" id="timeOut" placeholder=" " v-model="timeOut" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'semester' || semester }" @click="setFocus('semester')">
          <label for="semester">Semester</label>
          <input type="text" id="semester" placeholder=" " v-model="semester" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'coordinators' || coordinators }" @click="setFocus('coordinators')">
          <label for="coordinators">Coordinator/s</label>
          <input type="text" id="coordinators" placeholder=" " v-model="coordinators" />
        </div>
        <div class="input-container" :class="{ focused: isFocused === 'date' || selectedDate }" @click="setFocus('date')">
          <label for="date">Date</label>
          <input type="date" id="date" placeholder=" " v-model="selectedDate" />
        </div>
        <button class="modal-button" @click="createCommunityService">
          <span v-if="loadingText">Create community service</span> <Loading v-if="loading" height="14px" width="14px" borderColor="#ffffff" borderWidth="2px" />
        </button>
      </div>
      <Modal v-if="isModalVisible"  @button-click="hideModal" :showCopyIcon="true">
        <template #title>
          Community Service Created     
        </template>
          <li>{{ activity }}</li>
          <li>Coordinator link: https://uacs.vercel.app/#/coordinator-home/{{activityCode}}</li>
          <li>Activity code: {{activityCode}}</li>
        <template #button>
          Close
        </template>
      </Modal>
    </div>
  </div>
</template>
 
<style scoped>
 
.input-container.focused label {
  font-weight: bold;
}
.modal-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>

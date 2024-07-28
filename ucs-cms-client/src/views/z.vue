<!-- uacs.vercel.app  -->
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue"; 
import Modal from "../components/Modal.vue";  
import  QRScanner from "../components/QRScanner.vue";  
export default {
  components: {TopNav, Modal,     QRScanner,}, 
  data() {
    return {
      baseUrl: 'https://quirk-beta.vercel.app',  
      customerFrequency: [],
      isFocused: false,
      studentNumber: '',
      scannedResult: null,
    };
  },
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    }
  },
  mounted() { 
    this.getAllCreatedCustomerFrequency();
  },
  methods: {
    async getAllCreatedCustomerFrequency() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getAllCustomerFrequency?business_id=${this.$route.params.key}`);
        this.customerFrequency = response.data.customers; // Ensure the correct property is assigned
        console.log(this.customerFrequency);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching", error);
      }
    },
    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      this.isFocused = false;
    },
    handleScanResult(result) {
      this.scannedResult = result;
    },
  }
};

</script>
<template>
  <TopNav/>
 
  <div class="main"><!--main-->
  <div class="white-box"> <!--white-box-->
 

  <Modal>
    <template #title>
      12th Blood Donation Drive - UA Auditorium
    </template>
    <li>Coordinator link: https://uacs.vercel.app/#/</li>
    <li>Activity code: ZXC2234</li>
    <template #button>
      Confirm
    </template>
  </Modal>
 

    <span class="header"><!--CEO create community service form-->
      <h1>Create community service</h1>
    </span> 
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Activity</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Venue</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Time Render</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Time in</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Time out</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Semester</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Coordinator/s</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <input type="date" id="date" placeholder=" " v-model="selectedDate">
    </div>
    <button class="modal-button">Create</button><!--CEO create community service form-->

    <br>

    <span class="header"><!--Student search form-->
      <h1>Community service records</h1>
    </span> 
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Student number</label>
      <input type="text" id="student-number" placeholder=" " v-model="studentNumber">
    </div>
    <button class="modal-button">Search</button><!--Student search form-->

    <br>
 
    <span class="header"><!--Student community service records-->
      <h1>Community service records</h1>
      <h2>2020000069</h2>
    </span>
    <ul class="table" >
      <li div class="table-header" >
        <div class="table-header-item">Activity</div>
        <div class="table-header-item ">Status</div> 
      </li>
      <li div class="table-row" >
        <div class="col-one">12th Blood donation...</div>
        <div class="status">Verified</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </li>
      <li div class="table-row" >
        <div class="col-one">12th Blood donation...</div>
        <div class="status">Verified</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </li>
      <li div class="table-row" >
        <div class="col-one">Hours rendered: 24</div>
      </li>
    </ul><!--Student community service records-->
    
    <br>

    <span class="header"><!--CEO community service list-->
      <h1>Community service list</h1>
    </span> 
    <div class="community-service-item">
      <div class="wrapper">
        <div>12th Blood donation drive - UA Auditorium</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </div>
    </div>
    <div class="community-service-item">
      <div class="wrapper">
        <div>12th Blood donation drive - UA Auditorium</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </div>
    </div><!--CEO community service list-->

    <br>

    <div class="event-details"><!--CEO community service details-->
      <span class="event-details-title">12th Blood donation drive - UA Auditorium</span>
      <ul class="event-details-ul">
        <li>Time in: 3:00am | Time out: 7:00am</li>
        <li>Time render: 8 | Date: 06/20/2023</li>
        <li>Semester: 1st sem 2023-24</li>
        <li>Coordinator: Arcea D. Valdez</li> 
      </ul>
    </div> 

    <ul class="table" >
      <li div class="table-header" >
        <div class="table-header-item">Student number</div>
        <div class="table-header-item">Status</div> 
      </li>
      <li div class="table-row" >
        <div class="col-one">2020000062</div>
        <div class="status">Verified</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </li>
      <li div class="table-row" >
        <div class="col-one">2020012362</div>
        <div class="status">Verified</div>
        <i class="material-icons ellipsis">more_vert</i>   
      </li>
      <li div class="table-row" > 
      </li>
    </ul><!--CEO community service details-->

      
    </div><!--white-box-->
  </div><!--main-->
</template>

<style>
  
</style>
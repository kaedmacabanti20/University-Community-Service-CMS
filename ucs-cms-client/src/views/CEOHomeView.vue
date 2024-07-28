<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue"; 
import Modal from "../components/Modal.vue";  
import QRScanner from "../components/QRScanner.vue";  

export default {
  components: { TopNav, Modal, QRScanner },
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app',  
      allActivity: null,
    };
  },
  setup() {
    const auth0 = useAuth0();
    return {
      user: auth0.user,
    };
  },
  mounted() { 
    this.getAllActivity();
  },
  methods: {
    async getAllActivity() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getAllActivity`);
        this.allActivity = response.data.result; 
        console.log(this.allActivity);
      } catch (error) {
        console.error("Error fetching", error);
      }
    },
  }
};
</script>

<template>
  <div>
    <TopNav :showMenu="true"/>
    <div class="main">
      <!-- main -->
      <div class="white-box">
        <!-- white-box -->
        <span class="header">
          <!-- CEO community service list -->
          <h1>Community service list</h1>
        </span>

        <router-link 
          v-for="(activity, index) in allActivity" 
          :key="index" 
          :to="`/ceo-activity/${activity.activity_code}`" 
          class="community-service-item">
          <div class="wrapper">
            <div class="text-color">{{ activity.activity }} - {{ activity.venue }}</div>
            <i class="material-icons ellipsis">more_vert</i>
          </div>
        </router-link>

        <router-link :to="`/ceo-create`" class="add-activity-button">
          <i class="material-icons add">add</i>  
        </router-link>

      </div>
      <!-- /white-box -->
    </div>
    <!-- /main -->
  </div>
</template>

<style scoped>
.add {
  color: #087CEC;
}
.text-color {
  color: gray;
  display: flex;
  align-items: center;
}
.add-activity-button {
  color: gray;
  display: flex;
  justify-content: end;
}
.add-activity-button i {
  border-radius: 50%;
  height: 42.5px;
  width: 42.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(41, 41, 41, 0.2);
  font-weight: 500;
}
</style>

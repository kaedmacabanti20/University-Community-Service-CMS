<!-- uacs.vercel.app  -->
<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue"; 
import Modal from "../components/Modal.vue";   
export default {
  components: {TopNav, Modal}, 
  data() {
    return {
      baseUrl: 'https://quirk-beta.vercel.app',  
      customerFrequency: [],
      isFocused: false,
      activityCode: '',
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
        this.customerFrequency = response.data.result; // Ensure the correct property is assigned
        console.log(this.customerFrequency);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching", error);
      }
    },
 
  }
};

</script>
<template>
<TopNav/>
<div class="main login-wrapper"><!--main-->
  <div class="white-box  "> <!--white-box-->
    <span class="header"> <!--Coordinator login form-->
      <h1>Welcome Coordinator</h1>
    </span> 
    <div class="input-container" :class="{ focused: isFocused }" @focusin="handleFocus" @focusout="handleBlur">
      <label for="student-number">Coordinator name</label>
      <input type="text" id="student-number" placeholder=" " v-model="activityCode">
    </div>
    <router-link :to="`/coordinator-home/${activityCode}`">
      <button class="modal-button" >
        Login
      </button>
    </router-link><!--Coordinator login form-->
     
  </div><!--white-box-->
</div><!--main-->
</template>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);  
}

.white-box {
  transform: translateY(-55%);
}


</style>
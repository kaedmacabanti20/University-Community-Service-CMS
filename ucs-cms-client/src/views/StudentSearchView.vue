<script>
import { useAuth0 } from '@auth0/auth0-vue';
import axios from 'axios';
import TopNav from "../components/TopNav.vue";
import Loading from "../components/Loading.vue";  

export default {
  components: {TopNav, Loading},
  data() {
    return {
      baseUrl: 'https://uacs-server.vercel.app',
      isFocused: false,
      studentNumber: '',
      scannedResult: null,
      studentRecords: null,
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
  methods: {
    async getStudentRecords() {
      this.loadingText = false; this.loading = true
      try {
        const response = await axios.get(`${this.baseUrl}/api/get/getStudentRecords?student_number=${this.studentNumber}`);
        this.studentRecords = response.data.result;
        this.loading = false; this.loadingText = true
        this.$router.push(`/student-records/${this.studentNumber}`);
      } catch (error) {
        this.loading = false; this.loadingText = true
        console.error("Error fetching", error); 
      }
    },
    handleFocus() {
      this.isFocused = true;
    },
    handleBlur() {
      if (!this.studentNumber) {
        this.isFocused = false;
      }
    },
    handleInputChange() {
      this.isFocused = !!this.studentNumber;
    },
    handleScanResult(result) {
      this.scannedResult = result;
    },
  },
};
</script>

<template>
  <div>
    <TopNav />
    <div class="main student-search-wrapper">
      <div class="white-box">
        <span class="header">
          <h1>Community service records</h1>
        </span>
        <div class="input-container" :class="{ focused: isFocused }">
          <label for="student-number">Student number</label>
          <input type="text" id="student-number" placeholder=" " v-model="studentNumber"
                 @focus="handleFocus" @blur="handleBlur" @input="handleInputChange">
        </div>
        <button class="modal-button" @click="getStudentRecords">
          <span v-if="loadingText">Search</span>   <Loading v-if="loading" height="14px" width="14px" borderColor="#ffffff" borderWidth="2px" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.student-search-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem); 
}

.white-box {
  transform: translateY(-55%);
}

.input-container.focused label {
  font-weight: bold;
}
</style>

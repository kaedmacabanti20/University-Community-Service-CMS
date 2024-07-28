<script >
import { useAuth0 } from '@auth0/auth0-vue';

export default {  data() {
  return {
      isMenuVisible: false,
    };
  },
  name: "NavBar",  
  methods: {  
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    }
  },
  setup() {
    const auth0 = useAuth0();
    
    return {
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      user: auth0.user,
      login() {
        auth0.loginWithRedirect();
      },
      logout() {
        auth0.logout({
          logoutParams: {
            returnTo: window.location.origin
          }
        });
      }
    }
  }
};
</script>
 
<template>
  <nav class="bottom-nav">
    <div>
      <ul class="ul-1">
        <li>
          <router-link class="link" to="/scanner">
            <i class="material-icons bottom-nav-icon">qr_code</i>  
            <span class="bottom-nav-text">Scanner</span>
          </router-link>
        </li>

        <li>
          <router-link class="link" to="/create">
            <i class="material-icons bottom-nav-icon">person_add</i>   
            <span class="bottom-nav-text row">
              <p>Create</p>
              <p>QR</p>
            </span>
          </router-link>
        </li>

        <li>
          <router-link class="link" to="/records">
            <i class="material-icons bottom-nav-icon">list_alt</i>  
            <span class="bottom-nav-text">Records</span>
          </router-link>
        </li>

        <li>
          <router-link class="link" to="/analytics">
            <i class="material-icons bottom-nav-icon">bar_chart</i>   
            <span class="bottom-nav-text">Analytics</span>
          </router-link>
        </li>
      </ul>
    
    </div>
  </nav>
</template>


<style scoped>
 
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgb(255, 255, 255);
  width: 100%;
  max-height: 3.5rem;
  padding: 10px;
  list-style: none;
}

.ul-1{
  display: flex;
  justify-content: center;
  gap: 2rem;
}
 
.link{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.link .row{
  display: flex;
}

.link{
  display: flex;
  flex-direction: column;
  gap: .15rem;
}

.bottom-nav-text, .bottom-nav-text p{
  color: gray ;
  font-size: 14px;
}

.bottom-nav-icon{
  color: gray;
  font-size: 25px;
}


 
/* responsive tablet configurations */
@media only screen and (min-width: 700px) {
 

.bottom-nav {
    background-color:#1f273ef3;
    position: fixed;
    left: 0px; top: 0;     
    transform: none;
    width: 3rem;
    height: 100%;
    max-height: calc(100vh - 3.5rem);
    padding: 10px;
    margin-top: 3rem;
}

.bottom-nav div{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.bottom-nav div .ul-1{
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.bottom-nav div .ul-1 li{
    margin: 20px 0;
}

.bottom-nav div ul li span{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%; 
}


.link{
  display: flex;
  flex-direction: column;
  gap: .2rem;
}
 






.bottom-nav-text , .bottom-nav-text p{
  color: white;
  font-size: 12px;
}

.bottom-nav-icon{
  color: #d3d3d3;;
  font-size: 22px;
  cursor: pointer;
}

.active {
  color: rgb(39, 39, 74);  
}

} 

</style>
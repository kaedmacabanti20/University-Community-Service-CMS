<script lang="ts">
export default {
  name: "TopNav",
  props: {
    showMenu: {
      type: Boolean,
      default: false
    }
  },
};
</script>

<template>
  <nav class="topnav">
    <ul>
      <li><img class="nav-logo" src="../assets/UA-Logo.png" alt=""></li>
      <li class="nav-title">Community Extension</li>
    </ul>
    <i v-if="showMenu" class="material-icons menu">sort</i>  
  </nav>
</template>

<style>
 .topnav{
  height: 4rem; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: solid 1px #a5a5a5;
}
.topnav ul{
  display: flex;
  align-items: center;
  gap: 1rem;
}
 .nav-logo{
  height: 50px;
 }
 .nav-title{
  color: #232A40;
  font-weight: 700;
 }
 .menu {
    transform: scaleX(-1);
  }
</style>

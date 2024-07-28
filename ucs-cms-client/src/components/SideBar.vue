<script lang="ts">
export default {
  name: "SideBar"
};
</script>

<template>
<section class="sidenav">
  <span>Quirk Admin</span>
  <ul>
    <router-link class="menu-item" :to="`/`">
      <i class="material-icons">grid_view</i>   
      <label>Dashboard</label>
    </router-link>

    <router-link class="menu-item" :to="`/directory`">
      <i class="material-icons">folder</i>   
      <label>Directory</label>
    </router-link>

    <router-link class="menu-item" :to="`/`">
      <i class="material-icons">logout</i>   
      <label>Logout</label>
    </router-link>
  </ul>
</section>
</template>

<style>
.sidenav {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  top: 0;
  left: 0;
  background-color: #262626;
  height: 100vh;
  width: 15rem;
  color: white;
  padding: 1rem;
}
.sidenav span {
  display: flex;
  align-items: center; 
  gap: 1.2rem;
  padding: .5rem .5rem;
  border-radius: 5px;
}
.menu-item {
  cursor: pointer;
  display: flex;
  align-items: center; 
  gap: 1.2rem;
  padding: .5rem .5rem;
  border-radius: 5px;
  color: inherit; /* Ensure the text color inherits from the parent */
  text-decoration: none; /* Remove underline */
}
.menu-item:hover {
  background-color: #706d6d;
}
.menu-item i,
.menu-item label {
  color: white; /* Reset the color of icons and labels */
}
</style>

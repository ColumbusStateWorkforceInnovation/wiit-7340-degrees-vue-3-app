<template>
  <div class="container">
    <div id="app">
      <NavBar/>
      <router-view/>
      <Footer/>
    </div>
  </div>
</template>

<style>
</style>

<script>
import Footer from './components/Footer.vue';
import NavBar from './views/NavBar.vue';

export default {
  components: { NavBar, Footer },
};
</script>

<template>
  <v-app>

    <v-main>
      <router-view />

      <consent/>
<!--
-->

    </v-main>

  </v-app>
</template>

<script>
import Consent from '@/components/Consent'

export default {
   name: "App",

  components: { Consent },

  mounted(){
    window.setTimeout(()=>{
      this.$store.commit('SET_LOADING', false);
    }, 500);
  }
};
</script>


<style>
  @import './assets/main.css';
</style>


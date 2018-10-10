<template>
  <div id="app">
    <app-header></app-header>
    <app-general></app-general>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from './components/Header.vue';
import appGeneral from './components/General.vue';
import appFooter from './components/Footer.vue';
import dieRoller from './mixins/dieroller.js';

export default {
  mixins: [dieRoller],
  components: {
    appHeader,
    appGeneral,
    appFooter,
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    testRoll() {
      console.log(this.dieRoller().dfour);
    }
  } 
}
</script>

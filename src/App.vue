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

export default {
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
  methods: {
    dieroll(min,max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    diceRoller() {
      return {
        dfour: this.dieroll(1,4),
        dsix: this.dieroll(1,6),
        deight: this.dieroll(1,8),
        dten: this.dieroll(1,10),
        dtwelve: this.dieroll(1,12),
        dtwenty: this.dieroll(1,20),
        dhundred: this.dieroll(1,100),
      }
    }
  },
  computed: {
    testRoll() {
      console.log(this.dieRoller().dfour);
    }
  } 
}
</script>

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
  computed: {
    testRoll() {
      console.log(this.dieRoller().dfour);
    }
  } 
}
</script>
<style lang="scss">
html {
  color: #fff;
  background-color: #000;
  font-family: 'MedievalSharp';
  button {
    padding: 5px 10px;
    border-radius: 4px;
    border: 2px solid #c1c1c1;
    background-color: #f2ddae;
    font-family: 'MedievalSharp';
    font-weight: 700;
    cursor: pointer;
  }
  input, select {
    padding: 5px 10px;
    border-radius: 4px;
    border: 2px solid #c1c1c1;
  }
}
</style>

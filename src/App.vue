<template>
  <div id="app">
    <app-header></app-header>
    <app-map></app-map>
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from './components/Header.vue';
import appFooter from './components/Footer.vue';
import appMenu from './components/Menu.vue';
import appGroup from './components/Group.vue';
import appMap from './components/Map.vue';

export default {
  components: {
    appHeader,
    appFooter,
    appMenu,
    appGroup,
    appMap
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

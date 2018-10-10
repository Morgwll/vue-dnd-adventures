<template>
  <div>
    <div class="main-menu">
      <ul>
        <li v-for="(item, index) in menuItems" :key="index"><button @click.prevent="selection = item.link">{{ item.title }}</button></li>
      </ul>
    </div>
    <component :is="selection"></component>
  </div>
</template>
<script>
  import appMap from './Map.vue';
  import appGroup from './Group.vue';
  import appCharacterCreation from './CC.vue';
  import appCombatSimulator from './Combat.vue';
  import appPlotCreation from './Plot.vue';

  export default {
    components: {
      appMap,
      appGroup,
      appPlotCreation,
      appCombatSimulator,
      appCharacterCreation,
    },
    data() {
      return {
        selection: appPlotCreation,
        menuItems: {
          home: {
            title: 'Home',
            link: '#'
          },
          characterGenerator: {
            title: 'Character Generator',
            link: appCharacterCreation
          },
          characters: {
            title: 'Characters',
            link: appGroup
          },
          worldGenerator: {
            title: 'World Generator',
            link: appMap
          },
          pantheonGenerator: {
            title: 'Pantheon Generator',
            link: '#'
          },
          plotGenerator: {
            title: 'Plot Generator',
            link: appPlotCreation
          },
          combatSimulator: {
            title: 'Combat Simulator',
            link: appCombatSimulator
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  .main-menu {
    ul{
      list-style-type: none;
      display: flex;
      padding-left: 0;
      li {
        padding: 10px;
      }
    }
  }
</style>
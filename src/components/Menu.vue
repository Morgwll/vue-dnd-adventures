<template>
  <div>
    <ul class="main-menu">
      <li v-for="(item, index) in menuItems" :key="index"><button @click.prevent="$emit('selectItem', $event.item)">{{ item.title }}</button></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuItems: {
          home: {
            title: 'Home',
            link: '#'
          },
          characters: {
            title: 'Characters',
            link: '#'
          },
          combatSimulator: {
            title: 'Combat Simulator',
            link: '#'
          },
          characterGenerator: {
            title: 'Character Generator',
            link: '#'
          },
          worldGenerator: {
            title: 'World Generator',
            link: '#'
          },
          pantheonGenerator: {
            title: 'Pantheon Generator',
            link: '#'
          },
          plotGenerator: {
            title: 'Plot Generator',
            link: '#'
          },
        }
      }
    }
  }
</script>
<style lang="scss">
  .main-menu {
    list-style-type: none;
    padding: 20px;
    li {
      padding: 10px;
      float: left;
    }
  }
</style>
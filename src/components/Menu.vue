<template>
  <div>
    <ul>
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
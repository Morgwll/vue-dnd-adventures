<template>
  <div>
    <ul>
      <li v-for="(item, index) in menuItems" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuItems: {
          home: 'Home',
          characters: 'Characters',
          adventures: 'Adventures'
        }
      }
    }
  }
</script>
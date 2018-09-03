<template>
  <div>
    <app-character-creation></app-character-creation>
    <app-map></app-map>
    <app-group></app-group>
  </div>
</template>
<script>
  import appMap from './Map.vue';
  import appGroup from './Group.vue';
  import appCharacterCreation from './CC.vue';

  export default {
    components: {
      appMap,
      appGroup,
      appCharacterCreation,
    },
    data() {
      return {
        selection: {
          map: true,
          group: false,
          ccreation: false
        }
      }
    }
  }
</script>
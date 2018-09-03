<template>
  <div>
    <app-character-creation v-if="selection.ccreation == true"></app-character-creation>
    <app-map v-if="selection.map == true"></app-map>
    <app-group v-if="selection.group == true"></app-group>
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
          map: false,
          group: false,
          ccreation: true
        }
      }
    }
  }
</script>
<template>
  <div>
    <app-character-creation v-if="selection.ccreation == true"></app-character-creation>
    <app-map v-if="selection.map == true"></app-map>
    <app-plot-creation v-if="selection.plotCreation == true"></app-plot-creation>
    <app-group v-if="selection.group == true"></app-group>
  </div>
</template>
<script>
  import appMap from './Map.vue';
  import appGroup from './Group.vue';
  import appCharacterCreation from './CC.vue';
  import appPlotCreation from './Plot.vue';

  export default {
    components: {
      appMap,
      appGroup,
      appPlotCreation,
      appCharacterCreation,
    },
    data() {
      return {
        selection: {
          map: false,
          group: false,
          ccreation: false,
          plotCreation: true
        }
      }
    }
  }
</script>
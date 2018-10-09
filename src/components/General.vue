<template>
  <div>
    <app-character-creation v-if="selection.ccreation == true"></app-character-creation>
    <app-map v-if="selection.map == true"></app-map>
    <app-combat-simulator v-if="selection.combatSimulator"></app-combat-simulator>
    <app-plot-creation v-if="selection.plotCreation == true"></app-plot-creation>
    <app-group v-if="selection.group == true"></app-group>
  </div>
</template>
<script>
  import appMap from './Map.vue';
  import appGroup from './Group.vue';
  import appCharacterCreation from './CC.vue';
  import appCombatSimulator from './Combat.vue';
  import appPlotCreation from './Plot.vue';

  export default {
    props: ['chosenItem'],
    components: {
      appMap,
      appGroup,
      appPlotCreation,
      appCombatSimulator,
      appCharacterCreation,
    },
    data() {
      return {
        selection: {
          map: false,
          group: false,
          ccreation: true,
          combatSimulator: false,
          plotCreation: false
        }
      }
    }
  }
</script>
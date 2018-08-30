<template>
  <div>
    <div>name: {{ character.cromgiven.name }}</div><br>
    <div>Age: {{ character.cromgiven.age }}</div><br>
    <div>Race: {{ character.cromgiven.race }}</div><br>
    <div>Class: {{ character.chclass }}</div><br>
    <div>Weapons: <span v-for="(weapon, index) in character.weapons" :key="index">{{ weapon.name }} </span></div><br>
    <div>Equiped: {{ character.weapons[0].name }}</div>
    <div v-if="character.spells.length !== 0">Spells: <span v-for="(spell, index) in character.spells" :key="index">{{ spell.name }} </span></div><br>
    <div>Level:{{ character.level }}</div><br>
    <div>CR: {{ character.cr }}</div><br>
    <div>Hit Points: {{ character.hitpoints }}</div><br>
    <div>Inventory: <span v-for="(item, index) in character.inventory" :key="index">{{ item.name }} </span></div><br>
    <div>Cash: {{ character.money }}</div><br>
  </div>
</template>
<script>
  import characters from '../beings.json';

  export default {
    data() {
      return {
        character: characters[0].pc
      }
    }
  }
</script>
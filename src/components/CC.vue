<template>
  <div>
    <input placeholder="Character's Name" id="name" v-model="character.name">
    <input placeholder="Character's Age" id="name" v-model="character.age">
    <select v-model="character.race">
      <option disabled value="">-- Select Race -- </option>
      <option v-for="(race, index) in character.races" :key="index">{{ race }}</option>
    </select>
    <select v-model="character.alignments">
      <option disabled value="">-- Select Alignment -- </option>
      <option v-for="(alignment, index) in character.alignments" :key="index">{{ alignment }}</option>
    </select>
    <div class="">
      <div>Strength: {{ character.stats.strength }}</div>
      <div>Constitution: {{ character.stats.constitution }}</div>
      <div>Dexterity: {{ character.stats.dexterity }}</div>
      <div>Intelligence: {{ character.stats.intelligence }}</div>
      <div>Wisdom: {{ character.stats.wisdom }}</div>
      <div>Charisma: {{ character.stats.charisma }}</div>
    </div>
    <button @click.prevent="statRoller">Generate Stats</button>
    <div v-if="character.classes.length > 0">
      <select v-model="character.classes">
      <option disabled value="">-- Select Class -- </option>
      <option v-for="(characterClass, index) in character.classes" :key="index">{{ characterClass }}</option>
    </select>
    </div>
  </div>
</template>
<script>
    export default {
      data() {
       return {
          character: {
            name: '',
            age: '',
            races: ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Orc'],
            alignments: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'],
            stats: {
              strength: 0,
              dexterity: 0,
              constitution: 0,
              intelligence: 0,
              wisdom: 0,
              charisma: 0,
            },
            ac: 0,
            proficiency: 2,
            classes: [],
            weapons: [],
            spells: [],
            inventory: [],
            money: 0
          }
        }
      },
      methods: {
        dieroll(min,max) {
          return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        statRoller() {
          this.character.stats.strength = this.dieroll(6,18);
          this.character.stats.dexterity = this.dieroll(6,18);
          this.character.stats.constitution = this.dieroll(6,18);
          this.character.stats.intelligence = this.dieroll(6,18);
          this.character.stats.wisdom = this.dieroll(6,18);
          this.character.stats.charisma = this.dieroll(6,18);
          if(this.character.stats.wisdom >= 13) {
            this.character.classes.push('Cleric', 'Druid');
          }
          if(this.character.stats.strength >= 13) {
            this.character.classes.push('Fighter', 'Barbarian');
          }
          if(this.character.stats.dexterity >= 13) {
            this.character.classes.push('Rogue');
          }
          if(this.character.stats.intelligence >= 13) {
            this.character.classes.push('Wizard');
          }
          if(this.character.stats.charisma >= 13) {
            this.character.classes.push('Sorcerer', 'Warlock');
          }
          if((this.character.stats.dexterity >= 13) && (this.character.stats.wisdom >= 13)) {
            this.character.classes.push('Monk', 'Ranger');
          }
        }
      }
    }
</script>
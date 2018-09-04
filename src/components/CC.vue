<template>
  <div>
    <input placeholder="Character's Name" id="name" v-model="name" type="text">
    <input placeholder="Character's Age" id="age" v-model="age" type="number">
    <div>
      <input type="radio" id="male" value="Male" v-model="gender">
      <label for="Male">Male</label>
      <input type="radio" id="female" value="Female" v-model="gender">
      <label for="Female">Female</label>
      <input type="radio" id="other" value="Other" v-model="gender">
      <label for="Other">Other(It's complicated)</label>
    </div>
    <select v-model="alignment">
      <option disabled value="">-- Select Alignment -- </option>
      <option v-for="(alignment, index) in alignments" :key="index">{{ alignment }}</option>
    </select>
    <div class="">
      <div>Strength: {{ stats.strength.abilityStat }}
        <br>Ability Bonus Score: {{ stats.strength.abilityBonus }}</div>
      <div>Constitution: {{ stats.constitution.abilityStat }}
        <br>Ability Bonus Score: {{ stats.constitution.abilityBonus }}</div>
      <div>Dexterity: {{ stats.dexterity.abilityStat }}
        <br>Ability Bonus Score: {{ stats.dexterity.abilityBonus }}</div>
      <div>Intelligence: {{ stats.intelligence.abilityStat }}
        <br>Ability Bonus Score: {{ stats.intelligence.abilityBonus }}</div>
      <div>Wisdom: {{ stats.wisdom.abilityStat }}
        <br>Ability Bonus Score: {{ stats.wisdom.abilityBonus }}</div>
      <div>Charisma: {{ stats.charisma.abilityStat }}
        <br>Ability Bonus Score: {{ stats.charisma.abilityBonus }}</div>
    </div>
    <button @click.prevent="statRoller" v-if="!classAvailable">Generate Stats</button>
    <button @click.prevent="classAvailable = false, reRoll = false" v-if="reRoll">Reroll?</button>
    <div v-if="classAvailable">
      <span>Character Race: </span>
      <select v-model="race">
        <option disabled value="">-- Select Race -- </option>
        <option v-for="(race, index) in races" :key="index">{{ race }}</option>
      </select>
    </div>
    <button v-if="(race != '') && !racialBonusApplied" @click.prevent="racialBonus()">Apply Racial Bonus</button>
    <button @click.prevent="populateClasses(), classAvailable = true" v-if="!classChosen && classAvailable">Choose Class</button>
    <div v-if="classes.length > 0">
      <span>Character class: </span>
      <select v-model="characterClass">
        <option disabled value="">-- Select Class -- </option>
        <option v-for="(classes, index) in classes" :key="index">{{ classes }}</option>
      </select>
    </div>
    <div v-if="classAvailable">
      <span>Character Level: </span>
      <select v-model="level">
        <option v-for="(level, index) in 20" :key="index">{{ level }}</option>
      </select>
    </div>
    <button v-if="(characterClass != '') && !classBonusApplied" @click.prevent="classCalc()">Calculate Class Bonuses</button>
    <div class="character-sheet">
      <p>Name: {{ name }}</p>
      <p>Age: {{ age }}</p>
      <p>Gender: {{ gender }}</p>
      <p>Alignment: {{ alignment }}</p>
      <p>Class: {{ characterClass }}</p>
      <p>Level: {{ level }}</p>
      <p>XP: {{ xp }}</p>
      <p>HP: {{ hp }}</p>
      <p>Race: {{ race }}</p>
      <p>Armor: <span v-for="(item, index) in armor" :key="index">{{ item }}, </span></p>
      <p>AC: {{ ac }}</p>
      <p>proficiency: +{{ proficiency }}</p>
      <p v-if="spells.length > 0">Spells: <span v-for="(item, index) in spells" :key="index">{{ item }},</span></p>
      <p>Inventory: <span v-for="(item, index) in inventory" :key="index">{{ item }},</span></p>
    </div>
  </div>
</template>
<script>
    export default {
      data() {
       return {
            name: '',
            age: '',
            gender: '',
            races: ['Human', 'Elf', 'Dwarf', 'Halfling', 'Gnome', 'Half-Elf', 'Half-Orc'],
            race: '',
            alignments: ['Lawful Good', 'Lawful Neutral', 'Lawful Evil', 'Neutral Good', 'True Neutral', 'Neutral Evil', 'Chaotic Good', 'Chaotic Neutral', 'Chaotic Evil'],
            alignment: '',
            stats: {
              strength: {
                abilityStat: 0,
                abilityBonus: 0
              },
              dexterity:{
                abilityStat: 0,
                abilityBonus: 0
              },
              constitution: {
                abilityStat: 0,
                abilityBonus: 0
              },
              intelligence: {
                abilityStat: 0,
                abilityBonus: 0
              },
              wisdom: {
                abilityStat: 0,
                abilityBonus: 0
              },
              charisma: {
                abilityStat: 0,
                abilityBonus: 0
              }
            },
            ac: 10,
            armor: [],
            proficiency: 2,
            hp: 0,
            classes: [],
            characterClass: '',
            level: 1,
            xp: 0,
            weapons: [],
            spells: [],
            inventory: [],
            money: 0,
            classAvailable: false,
            classChosen: false,
            racialBonusApplied: false,
            classBonusApplied: false,
            reRoll: false
          }
      },
      methods: {
        dieroll(min,max) {
          return Math.floor(Math.random() * (max - min + 1) ) + min;
        },
        bonusCalc(stat) {
          return Math.floor(stat / 2 - 5);
        },
        statRoller() {
          let stats = this.stats;
          stats.strength.abilityStat = this.dieroll(6,18);
          stats.strength.abilityBonus = this.bonusCalc(stats.strength.abilityStat);
          stats.dexterity.abilityStat = this.dieroll(6,18);
          stats.dexterity.abilityBonus = this.bonusCalc(stats.dexterity.abilityStat);       
          stats.constitution.abilityStat = this.dieroll(6,18);
          stats.constitution.abilityBonus = this.bonusCalc(stats.constitution.abilityStat);          
          stats.intelligence.abilityStat = this.dieroll(6,18);
          stats.intelligence.abilityBonus = this.bonusCalc(stats.intelligence.abilityStat);
          stats.wisdom.abilityStat = this.dieroll(6,18);
          stats.wisdom.abilityBonus = this.bonusCalc(stats.wisdom.abilityStat);
          stats.charisma.abilityStat = this.dieroll(6,18);
          stats.charisma.abilityBonus = this.bonusCalc(stats.charisma.abilityStat);
          this.classAvailable = true;
          this.reRoll = true;
        },
        populateClasses() {
          if(this.stats.wisdom.abilityStat >= 13) {
            this.classes.push('Cleric', 'Druid');
          }
          if(this.stats.strength.abilityStat >= 13) {
            this.classes.push('Fighter', 'Barbarian');
          }
          if(this.stats.dexterity.abilityStat >= 13) {
            this.classes.push('Rogue');
          }
          if(this.stats.intelligence.abilityStat >= 13) {
            this.classes.push('Wizard');
          }
          if(this.stats.charisma.abilityStat >= 13) {
            this.classes.push('Sorcerer', 'Warlock');
          }
          if((this.stats.dexterity.abilityStat >= 13) && (this.stats.wisdom >= 13)) {
            this.classes.push('Monk', 'Ranger');
          }
          this.reRoll = false;
        },
        leveling() {
          if( this.characterClass == 'Rogue') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Wizard') {
            this.hp = (4 * (this.level - 1) + 6 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Fighter') {
            this.hp = (6 * (this.level - 1) + 10 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Barbarian') {
            this.hp = (7 * (this.level - 1) + 12 + (this.level * this.stats.constitution.abilityBonus));
          } else if(this.characterClass == 'Druid') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if(this.characterClass == 'Sorcerer') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if(this.characterClass == 'Warlock') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Monk') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Ranger') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Cleric') {
            this.hp = (6 * (this.level - 1) + 10 + (this.level * this.stats.constitution.abilityBonus));
          }
          if (this.level >= 4 && this.level <= 7) {
            this.proficiency = 3;
          } else if (this.level >= 8 && this.level <= 11) {
            this.proficiency = 4;
          } else if (this.level >= 12 && this.level <= 15) {
            this.proficiency = 5;
          } else if (this.level >= 16 && this.level <= 20) {
            this.proficiency = 6;
          } else {
            this.proficiency = 2;
          }
        },
        classCalc() {
          if( this.characterClass == 'Rogue') {
            this.weapons.push('Bow', 'Short Sword', 'Dagger');
            this.inventory.push('Torch', 'Thieves Tools');
            this.armor.push('Leather Armor');
            this.ac = 15;
          } else if( this.characterClass == 'Wizard') {
            this.weapons.push('Staff', 'Dagger');
            this.inventory.push('Ink', 'Spell Reagents Pouch', 'SpellBook');
            this.armor.push('Robe');
            this.ac = 10;
          } else if( this.characterClass == 'Fighter') {
            this.weapons.push('Long Bow', 'Long Sword', 'Hand Axe');
            this.inventory.push('Torch', 'Playing Cards');
            this.armor.push('Plate Armor', 'Shield');
            this.ac = 19;
          } else if( this.characterClass == 'Barbarian') {
            this.weapons.push('Short Bow', 'Battle Axe', 'Hand Axe');
            this.inventory.push('Torch', 'Totem');
            this.armor.push('None');
            this.ac = 10 + this.stats.dexterity.abilityBonus + this.stats.constitution.abilityBonus;
          } else if(this.characterClass == 'Druid') {
            this.weapons.push('Bow', 'Short Sword', 'Dagger');
            this.inventory.push('Torch', 'Totem');
            this.armor.push('Leather Armor');
            this.ac = 15;
          } else if(this.characterClass == 'Sorcerer') {
            this.weapons.push('Bow', 'Short Sword', 'Dagger');
            this.inventory.push('Torch', 'Thieves Tools');
            this.armor.push('Leather Armor');
            this.ac = 15;
          } else if(this.characterClass == 'Warlock') {
            this.weapons.push('Bow', 'Short Sword', 'Dagger');
            this.inventory.push('Torch', 'Thieves Tools');
            this.armor.push('Leather Armor');
            this.ac = 15;
          } else if( this.characterClass == 'Monk') {
            this.weapons.push('Short Sword', 'Staff');
            this.inventory.push('Torch');
            this.armor.push('None');
            this.ac = 10 + this.stats.dexterity.abilityBonus + this.stats.wisdom.abilityBonus;
          } else if( this.characterClass == 'Ranger') {
            this.weapons.push('Long Bow', 'Short Sword', 'Dagger');
            this.inventory.push('Torch');
            this.armor.push('Leather Armor');
            this.ac = 15;
          } else if( this.characterClass == 'Cleric') {
            this.weapons.push('Mace');
            this.inventory.push('Torch', 'Sacred Sigil');
            this.armor.push('Chain Mail', 'Shield');
            this.ac = 19;
          }
          this.classBonusApplied = true;
        },
        racialBonus() {
          let stats = this.stats;
          if (this.race ==  'Wood Elf') {
            stats.dexterity.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.race ==  'High Elf') {
            stats.intelligence.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.race ==  'Half-Elf') {
            stats.intelligence.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.race ==  'Dwarf') {
            stats.constitution.abilityStat += 2;
            stats.wisdom.abilityStat += 1;
          } else if (this.race ==  'Halfling') {
            stats.dexterity.abilityStat += 2;
            stats.intelligence.abilityStat += 1;
          } else if (this.race ==  'Gnome') {
            stats.dexterity.abilityStat += 1;
            stats.wisdom.abilityStat += 2;
          } else if (this.race == 'Half-Orc') {
            stats.strength.abilityStat += 2;
            stats.constitution.abilityStat += 1;
          } else {
            stats.constitution.abilityStat += 1;
            stats.dexterity.abilityStat += 1;
            stats.intelligence.abilityStat += 1;
            stats.charisma.abilityStat += 1;
          }
          this.racialBonusApplied = true
        }
      },
      watch: {
        characterClass() {
          this.classChosen = true;
        },
        level() {
          this.leveling();
        }
      }
    }
</script>
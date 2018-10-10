<template>
  <div>
    <input placeholder="Character's Name" id="name" v-model="name" type="text">
    <button @click="name = nameGenerator()">Generate Name</button>
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
    <button @click.prevent="statRoller()" v-if="!classAvailable">Generate Stats</button>
    <button @click.prevent="classAvailable = false, reRoll = false" v-if="reRoll">Reroll?</button>
    <div v-if="classAvailable">
      <span>Character Race: </span>
      <select v-model="race">
        <option disabled value="">-- Select Race -- </option>
        <option v-for="(race, index) in races" :key="index">{{ race }}</option>
      </select>
    </div>
    <button v-if="(race != '') && !racialBonusApplied" @click.prevent="racialBonus()">Apply Racial Bonus</button>
    <button @click.prevent="populateClasses()" v-if="!classChosen && classes.length <= 0 && classAvailable">Choose Class</button>
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
      <div class="character-name">Name: {{ name }}</div>
      <div class="character-age">Age: {{ age }}</div>
      <div class="character-gender">Gender: {{ gender }}</div>
      <div class="character-alignment">Alignment: {{ alignment }}</div>
      <div class="character-class">Class: {{ characterClass }}</div>
      <div class="character-level">Level: {{ level }}</div>
      <div class="character-experience">XP: {{ xp }}</div>
      <div class="character-hitpoints">HP: {{ hp }}</div>
      <div class="character-race">Race: {{ race }}</div>
      <div class="character-ac">AC: {{ ac }}</div>
      <div class="character-proficiency">proficiency: +{{ proficiency }}</div>
      <div class="character-armor">Armor: <span v-for="(item, index) in armor" :key="index">{{ item }}, </span></div>
      <div v-if="spells.length > 0">Spells: <span v-for="(item, index) in spells" :key="index">{{ item }},</span></div>
      <div class="stats">
        <div class="stat">STR: {{ stats.strength.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.strength.abilityBonus }}</div>
          </div>
        </div>
        <div class="stat">CON {{ stats.constitution.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.constitution.abilityBonus }}</div>
          </div>
        </div>
        <div class="stat">DEX: {{ stats.dexterity.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.dexterity.abilityBonus }}</div>
          </div>
        </div>
        <div class="stat">INT: {{ stats.intelligence.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.intelligence.abilityBonus }}</div>
          </div>
        </div>
        <div class="stat">WIS {{ stats.wisdom.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.wisdom.abilityBonus }}</div>
          </div>
        </div>
        <div class="stat">CHA {{ stats.charisma.abilityStat }}
          <br>
          <div class="bonus">
            Bonus: 
            <div class="bonus-stat">{{ stats.charisma.abilityBonus }}</div>
          </div>
        </div>
      </div>
      <p>Inventory: <span v-for="(item, index) in inventory" :key="index">{{ item }},</span></p>
    </div>
  </div>
</template>
<script>
import nameGenerator from "../mixins/nameGenerator.js";
    export default {
      mixins: [nameGenerator],
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
          return Math.floor((stat / 2) - 5);
        },
        statsCalc(stat) {
          stat.abilityStat = this.dieroll(6,18);
          stat.abilityBonus = this.bonusCalc(stat.abilityStat);
        },
        statRoller() {
          let stats = this.stats;
          for(let i in stats) {
            let stat = stats[i];
            this.statsCalc(stat);
          }
          this.classAvailable = true;
          this.reRoll = true;
        },
        populateClasses() {
          if(this.stats.wisdom.abilityStat >= 13) {
            this.classes.push('Cleric', 'Druid');
          }
          if(this.stats.strength.abilityStat >= 13) {
            this.classes.push('Fighter (STR)', 'Barbarian');
          }
          if(this.stats.dexterity.abilityStat >= 13) {
            this.classes.push('Rogue', 'Fighter (DEX)');
          }
          if(this.stats.intelligence.abilityStat >= 13) {
            this.classes.push('Wizard');
          }
          if(this.stats.charisma.abilityStat >= 13) {
            this.classes.push('Sorcerer', 'Warlock', 'Bard');
          }
          if((this.stats.dexterity.abilityStat >= 13) && (this.stats.wisdom >= 13)) {
            this.classes.push('Monk', 'Ranger');
          }
          if((this.stats.strength.abilityStat >= 13) && (this.stats.charisma >= 13)) {
            this.classes.push('Paladin');
          }
          this.reRoll = false;
        },
        leveling() {
          // Class Availability
          if( this.characterClass == 'Wizard') {
            this.hp = (4 * (this.level - 1) + 6 + (this.level * this.stats.constitution.abilityBonus));
          } else if(this.characterClass == 'Rogue' || 
                    this.characterClass == 'Druid' || 
                    this.characterClass == 'Sorcerer' ||
                    this.characterClass == 'Bard' || 
                    this.characterClass == 'Warlock' || 
                    this.characterClass == 'Monk' || 
                    this.characterClass == 'Ranger') {
            this.hp = (5 * (this.level - 1) + 8 + (this.level * this.stats.constitution.abilityBonus));
          } else if(this.characterClass == 'Fighter (STR)'||
                    this.characterClass == 'Fighter (DEX)'||
                    this.characterClass == 'Paladin'||
                    this.characterClass == 'Cleric') {
            this.hp = (6 * (this.level - 1) + 10 + (this.level * this.stats.constitution.abilityBonus));
          } else if( this.characterClass == 'Barbarian') {
            this.hp = (7 * (this.level - 1) + 12 + (this.level * this.stats.constitution.abilityBonus));
          }
          // Proficiency calculator
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
          } else if( this.characterClass == 'Fighter (STR)') {
            this.weapons.push('Long Bow', 'Long Sword', 'Hand Axe');
            this.inventory.push('Torch', 'Playing Cards');
            this.armor.push('Plate Armor', 'Shield');
            this.ac = 19;
          } else if( this.characterClass == 'Fighter (DEX)') {
            this.weapons.push('Long Bow', 'Rapier', 'Hand Axe');
            this.inventory.push('Torch', 'Playing Cards');
            this.armor.push('Plate Armor', 'Shield');
            this.ac = 19;
          } else if( this.characterClass == 'Barbarian') {
            this.weapons.push('Short Bow', 'Battle Axe', 'Hand Axe');
            this.inventory.push('Torch', 'Totem');
            this.armor.push('None');
            this.ac = 10 + this.stats.dexterity.abilityBonus + this.stats.constitution.abilityBonus;
          } else if( this.characterClass == 'Bard') {
            this.weapons.push('Short Bow', 'Rapier', 'Dagger');
            this.inventory.push('Torch', 'Lute');
            this.armor.push('Velvet Clothing');
            this.ac = 13;
          } else if( this.characterClass == 'Paladin') {
            this.weapons.push('Battle Hammer');
            this.inventory.push('Torch', 'Holy Sigil');
            this.armor.push('Full Plate', 'Shield');
            this.ac = 18;
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
          this.leveling();
          this.classChosen = true;
        },
        level() {
          this.leveling();
        }
      }
    }
</script>
<style lang="scss">
  .character-sheet {
    border: 1px solid #c1c1c1;
    padding: 20px;
    margin: 20px;
    .stats {
      border: 1px solid #c1c1c1;
      padding: 20px;
      margin: 20px auto;
      width: calc(100% - 40px);
      max-width: 600px;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .stat {
        max-width: 15%;
        margin: 10px;
        border-radius: 4px;
        border: 1px solid #c1c1c1;
        text-align: center;
          .bonus {
          font-size: .8rem;
          .bonus-stat {
            font-size: 1.6rem;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
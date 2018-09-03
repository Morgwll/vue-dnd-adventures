<template>
  <div>
    <input placeholder="Character's Name" id="name" v-model="character.name" type="text">
    <input placeholder="Character's Age" id="age" v-model="character.age" type="number">
    <div>
      <input type="radio" id="male" value="Male" v-model="character.gender">
      <label for="Male">Male</label>
      <input type="radio" id="female" value="Female" v-model="character.gender">
      <label for="Female">Female</label>
      <input type="radio" id="other" value="Other" v-model="character.gender">
      <label for="Other">Other(It's complicated)</label>
    </div>
    <select v-model="character.alignment">
      <option disabled value="">-- Select Alignment -- </option>
      <option v-for="(alignment, index) in character.alignments" :key="index">{{ alignment }}</option>
    </select>
    <div class="">
      <div>Strength: {{ character.stats.strength.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.strength.abilityBonus }}</div>
      <div>Constitution: {{ character.stats.constitution.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.constitution.abilityBonus }}</div>
      <div>Dexterity: {{ character.stats.dexterity.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.dexterity.abilityBonus }}</div>
      <div>Intelligence: {{ character.stats.intelligence.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.intelligence.abilityBonus }}</div>
      <div>Wisdom: {{ character.stats.wisdom.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.wisdom.abilityBonus }}</div>
      <div>Charisma: {{ character.stats.charisma.abilityStat }}
        <br>Ability Bonus Score: {{ character.stats.charisma.abilityBonus }}</div>
    </div>
    <button @click.prevent="statRoller" v-if="!classAvailable">Generate Stats</button>
    <button @click.prevent="populateClasses()" v-if="classAvailable">Choose Class</button>
    <select v-model="character.race">
      <span>Character Race: </span>
      <option disabled value="">-- Select Race -- </option>
      <option v-for="(race, index) in character.races" :key="index">{{ race }}</option>
    </select>
    <div v-if="character.classes.length > 0">
      <span>Character class: </span>
      <select v-model="character.characterClass">
        <option disabled value="">-- Select Class -- </option>
        <option v-for="(classes, index) in character.classes" :key="index">{{ classes }}</option>
      </select>
    </div>
    <button v-if="(character.race != '') && !racialBonusApplied" @click.prevent="racialBonus()">Apply Racial Bonus</button>
    <button v-if="(character.characterClass != '') && !classBonusApplied" @click.prevent="classCalc()">Calculate Class Bonuses</button>
    <div class="character-sheet">
      <p>Name: {{ character.name }}</p>
      <p>Age: {{ character.age }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Class: {{ character.characterClass }}</p>
      <p>Level: {{ character.level }}</p>
      <p>XP: {{ character.xp }}</p>
      <p>HP: {{ character.hp }}</p>
      <p>Race: {{ character.race }}</p>
      <p>Armor: <span v-for="(item, index) in character.armor" :key="index">{{ item }}, </span></p>
      <p>AC: {{ character.ac }}</p>
      <p>proficiency: +{{ character.proficiency }}</p>
      <p v-if="character.spells.length > 0">Spells: <span v-for="(item, index) in character.spells" :key="index">{{ item }},</span></p>
      <p>Inventory: <span v-for="(item, index) in character.inventory" :key="index">{{ item }},</span></p>
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
            money: 0
          },
          classAvailable: false,
          racialBonusApplied: false,
          classBonusApplied: false
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
          let stats = this.character.stats;
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
        },
        populateClasses() {
          let char = this.character;
          if(char.stats.wisdom.abilityStat >= 13) {
            char.classes.push('Cleric', 'Druid');
          }
          if(char.stats.strength.abilityStat >= 13) {
            char.classes.push('Fighter', 'Barbarian');
          }
          if(char.stats.dexterity.abilityStat >= 13) {
            char.classes.push('Rogue');
          }
          if(char.stats.intelligence.abilityStat >= 13) {
            char.classes.push('Wizard');
          }
          if(char.stats.charisma.abilityStat >= 13) {
            char.classes.push('Sorcerer', 'Warlock');
          }
          if((char.stats.dexterity.abilityStat >= 13) && (char.stats.wisdom >= 13)) {
            char.classes.push('Monk', 'Ranger');
          }
        },
        classCalc() {
          let char = this.character;
          let hp = char.hp;
          let wp = char.weapons;
          let inv = char.inventory;
          let arm = char.armor;
          let ac = char.ac;
          if( char.characterClass == 'Rogue') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Bow', 'Short Sword', 'Dagger');
            inv.push('Torch', 'Thieves Tools');
            arm.push('Leather Armor');
            ac = 15;
          } else if( char.characterClass == 'Wizard') {
            hp == (4 * char.level - 1) + 6 + char.stats.constitution.abilityBonus;
            wp.push('Staff', 'Dagger');
            inv.push('Ink', 'Spell Reagents Pouch', 'SpellBook');
            arm.push('Robe');
            ac = 10;
          } else if( char.characterClass == 'Fighter') {
            hp = (6 * char.level - 1) + 10 + char.stats.constitution.abilityBonus;
            wp.push('Long Bow', 'Long Sword', 'Hand Axe');
            inv.push('Torch', 'Playing Cards');
            arm.push('Plate Armor', 'Shield');
            ac = 19;
          } else if( char.characterClass == 'Barbarian') {
            hp = (7 * char.level - 1) + 12 + char.stats.constitution.abilityBonus;
            wp.push('Short Bow', 'Battle Axe', 'Hand Axe');
            inv.push('Torch', 'Totem');
            arm.push('None');
            ac = 10 + char.dexterity.abilityBonus + char.constitution.abilityBonus;
          } else if(char.characterClass == 'Druid') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Bow', 'Short Sword', 'Dagger');
            inv.push('Torch', 'Totem');
            arm.push('Leather Armor');
            ac = 15;
          } else if(char.characterClass == 'Sorcerer') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Bow', 'Short Sword', 'Dagger');
            inv.push('Torch', 'Thieves Tools');
            arm.push('Leather Armor');
            ac = 15;
          } else if(char.characterClass == 'Warlock') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Bow', 'Short Sword', 'Dagger');
            inv.push('Torch', 'Thieves Tools');
            arm.push('Leather Armor');
            ac = 15;
          } else if( char.characterClass == 'Monk') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Short Sword', 'Staff');
            inv.push('Torch');
            arm.push('None');
            ac = 10 + char.dexterity.abilityBonus + char.wisdom.abilityBonus;
          } else if( char.characterClass == 'Ranger') {
            hp = (5 * char.level - 1) + 8 + char.stats.constitution.abilityBonus;
            wp.push('Long Bow', 'Short Sword', 'Dagger');
            inv.push('Torch');
            arm.push('Leather Armor');
            ac = 15;
          } else if( char.characterClass == 'Cleric') {
            hp = (6 * char.level - 1) + 10 + char.stats.constitution.abilityBonus;
            wp.push('Mace');
            inv.push('Torch', 'Sacred Sigil');
            arm.push('Chain Mail', 'Shield');
            ac = 19;
          }
          this.classBonusApplied = true;
        },
        racialBonus() {
          let stats = this.character.stats;
          if (this.character.race ==  'Wood Elf') {
            stats.dexterity.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.character.race ==  'High Elf') {
            stats.intelligence.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.character.race ==  'Half-Elf') {
            stats.intelligence.abilityStat += 1;
            stats.charisma.abilityStat += 2;
          } else if (this.character.race ==  'Dwarf') {
            stats.constitution.abilityStat += 2;
            stats.wisdom.abilityStat += 1;
          } else if (this.character.race ==  'Halfling') {
            stats.dexterity.abilityStat += 2;
            stats.intelligence.abilityStat += 1;
          } else if (this.character.race ==  'Gnome') {
            stats.dexterity.abilityStat += 1;
            stats.wisdom.abilityStat += 2;
          } else if (this.character.race == 'Half-Orc') {
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
      }
    }
</script>
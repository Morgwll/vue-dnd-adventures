<template>
  <div class="monster-match">
    <div class="name-row">
      <div class="name-row__user"><h2>{{ user.name }}</h2></div>
      <div class="name-row__monster"><h2>{{ monster.name }}</h2></div>
    </div>
    <div class="picture-row">
      <div class="picture-row__user" :class="{turn: yourTurn}">
        <img :src="user.picture">
      </div>
      <div class="picture-row__monster">
        <img :src="monster.picture" :class="{turn: !yourTurn}">
      </div>
    </div>
    <div class="hitpoints-row">
      <div class="hitpoints-row__user"><p>{{ user.health }} HP</p>
        <div class="progress-bar" :style="{width: user.health + '%'}"></div>
      </div>
      <div class="hitpoints-row__monster"><p>{{ monster.health }} HP</p>
          <div class="progress-bar" :style="{width: monster.health + '%'}"></div>
      </div>
    </div>
    <div class="message-row">{{ message }}</div>
    <template v-if="(user.health > 0) && (monster.health > 0)">
      <div class="turn-counter">
          <p v-if="yourTurn">It's Your Turn</p>
          <p v-if="!yourTurn">It's the Monster's Turn</p>
      </div>
      <div class="skills-row">
        <button @click="heroAttack">Attack</button>
        <button @click="heroSpecialAttack" v-if="user.superStrengthCount > 0">Special Attack ({{ user.superStrengthCount }} left)</button>
        <button @click="heal" v-if="user.healing > 0">Heal ({{ user.healing }} healing potions left)</button>
      </div>
    </template>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user: {
        name: 'Veraudo',
        picture: 'https://wiki.guildwars2.com/images/thumb/5/56/Warrior_04_concept_art.png/350px-Warrior_04_concept_art.png',
        strength: 18,
        superStrength: 25,
        superStrengthCount: 2,
        thaco: 10,
        ac: 20,
        healing: 3,
        healAmount: 12,
        health: 85,
        permaHealth: 85
      },
      monster: {
        name: 'Umber Hulk',
        picture: 'https://1.bp.blogspot.com/--xjIp85kYic/WX86st6D3bI/AAAAAAAAM2o/l0hfxCJYmI47Onzjgq8i5XjnNi08qtWzgCLcBGAs/s1600/umberhulkfromwhere.jpg',
        strength: 22,
        thaco: 6,
        ac: 15,
        health: 100 
      },
      yourTurn: true,
      message: ''
    }
  },
  methods: {
    launch: function(attack, defense, damage) {
      var roll = Math.floor(Math.random() * 20) + 1;
      if(roll + attack >= defense) {
        return {
          result: damage,
          message: "Hit for " + damage +  " points of damage!"
        };
      } else {
        return {
          result: 0,
          message: "Miss!"
        };
      }
    },
    monsterAttack: function() {
      this.yourTurn = false;
      var self = this;
      if(this.monster.health > 0) {
        setTimeout(function() {
          var returning = self.launch(self.monster.thaco, self.monster.ac, self.monster.strength);
          self.user.health = self.user.health -= returning.result;
          self.message = returning.message;
          self.yourTurn = true;
          if(self.user.health <= 0) {
            self.healing = 0;
            self.message = "Game over, man! Game over!! You are toast!!"
          };
        }, 2000);
      }
    },
    winning: function() {
      if(this.monster.health <= 0) {
        this.healing = 0;
        this.message = "You won!! the beast is dead!"
      };
    },
    heroAttack: function() {
      var returned = this.launch(this.user.thaco, this.user.ac, this.user.strength);
      this.monster.health = this.monster.health -= returned.result;
      this.message = returned.message;
      this.winning();
      this.monsterAttack();
    },
    heroSpecialAttack: function() {
      var returned = this.launch(this.user.thaco, this.user.ac, this.user.superStrength);
      this.monster.health = this.monster.health -= returned.result;
      this.user.superStrengthCount--;
      this.message = returned.message;
      this.winning();
      this.monsterAttack();
    },
    heal: function() {
      if(this.user.health < this.user.permaHealth) {
        this.user.health = this.user.health + this.user.healAmount;
        this.user.healing--;
      } else {
        this.message = "you can't heal above your maximum HP!!"
        this.user.healing--;
      }
      this.monsterAttack();
    }
  }
}
</script>
<style lang="scss">
.monster-match {
  max-width: 992px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Sans-serif;
}

.name-row, .picture-row, .hitpoints-row, .skills-row, .turn-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}
.name-row__user, .name-row__monster {
  width: 50%;
  height: 50px;
}
.picture-row {
  margin: 20px 0;
}
.picture-row__user, .picture-row__monster {
  max-width: 50%;
  max-height: 50%;
}
.picture-row__user img {
  max-width: 50%;
  max-height: 50%;
  border: 1px solid #fff;
}
.picture-row__monster img {
  max-width: 75%;
  max-height: 50%;
}
.picture-row .turn {
  border: 1px solid #f4c542;
}
.hitpoints-row__user, .hitpoints-row__monster {
  width: calc(50% - 10px);
  text-align: center;
  line-height: 30px;
  position: relative;
  border: 1px solid #c1c1c1;
  margin: 0 5px;
}
.hitpoints-row__user p, .hitpoints-row__monster p {
  margin: 0;
  z-index: 20;
  position: relative;
}
.progress-bar {
  height: 30px;
  background-color: #59f442;
  transition: .2s;
  position: absolute;
  top: 0;
  left: 0;
}
.message-row {
  height: 50px;
  text-align: center;
  line-height: 50px;
}
.skills-row button {
  border: 3px solid #f49542;
  border-radius: 3px;
  margin: 5px;
  padding: 5px 10px;
  background-color: #f4c542;
  text-align: center;
  cursor: pointer;
}
</style>
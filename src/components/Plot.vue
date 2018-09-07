<template>
<div>
  <div>The adventure starts because of {{ story }}</div>
  <button @click.prevent="plotGenerator()">Generate Plot</button>
</div>
</template>
<script>
  import appWeather from './Weather.vue';
  import locations from '../location.json';
  import plots from '../plots.json';
  export default {
    components: {
      appWeather
    },
    data() {
      return {
        //plot: plots,
        location: locations,
        story: []
      }
    },
    methods: {
      choosePlot(bank) {
        var choices = Math.floor(Math.random() * bank.length);
        var theInfo = bank[choices];
        return theInfo;
      },
      chooseRandom(number) {
        var choices = Math.floor(Math.random() * number.length);
        return choices;
      },
      mainQuest() {
        var main = plots[0];
        var chosenMain = this.choosePlot(main);
        var chosenWithin = this.choosePlot(chosenMain);
        console.log(chosenWithin);
        this.story.push(chosenWithin);
        for(x in chosenWithin.length){
          this.story.push(chosenWithin[x]);
        }
      },
      plotGenerator() {
        this.mainQuest();
      }
      /*getMonth(number) {
        const months = this.timeframe.months;
        const month = months[number];
        return month;
      },
      getSeason() {   
        let month = this.timeframe.month; 
        if ((month == 2) || (month == 3) || (month == 4)) {
          return 'Spring';
        } else if ((month == 5) || (month == 6) || (month == 7)) {
          return 'Summer';
        } else if ((month == 8) || (month == 9) || (month == 10)) {
          return 'Autumn';
        } else {
          return 'Winter';
        }
      },
      chooseRandom(variable) {
        let rest = Object.keys(variable).length;
        const result = Math.floor((Math.random() * rest) + 1);
        return result;
      },
      chooseProblem() {
        let firstIndex = this.chooseRandom(this.problem);
      },
      chooseTimeframe() {
        let timeframe = this.timeframe;
        timeframe.day = (Math.floor(Math.random() * 30) + 1);       
        timeframe.month = (Math.floor(Math.random() * 12) + 1);
        this.timeframe.year = Math.floor((Math.random() * 50) + 3240);
      },
      chooseHistory() {
        let history = this.history;
      },
      chooseLocation() {
        let location = this.location;
      },
      plotGenerator() {
        this.chooseTimeframe();
        this.chooseProblem();
        this.plotIntro = 'This is the plot of the story: <br>It is the ' + this.getSeason() +' of the year ' + this.timeframe.year + '... to be more precise, the ' + this.timeframe.day + ' of ' + this.getMonth(this.timeframe.month) + '.<br>The adventurers reach ' + this.location.size[1] + this.problem;
      }*/
    }
  }
</script>
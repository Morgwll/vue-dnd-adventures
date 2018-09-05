<template>
<div>
  <div v-html="plotIntro"></div>
  <app-weather :month="timeframe.month"></app-weather>
  <button @click.prevent="plotGenerator()">Generate Plot</button>
</div>
</template>
<script>
  import appWeather from './Weather.vue';
  export default {
    components: {
      appWeather
    },
    data() {
      return {
        problem: {
          characters: {
            villain: {
              status: ['noble', 'royal', 'high cleric', 'merchant', 'preacher', 'beggar', 'cult leader'],
              motivation: ['treason','murder','greed for money','greed for land','greed for title','greed for the supernatural','lust for someone','justice','conquest','madness','affliction'],
            },
            neutral: {
              status: ['noble', 'royal', 'high cleric', 'merchant', 'preacher', 'beggar', 'cult leader'],
              motivation: ['treason','murder','greed for money','greed for land','greed for title','greed for the supernatural','lust for someone','justice','conquest','madness','affliction'],
            },
            ally: {
              status: ['noble', 'royal', 'high cleric', 'merchant', 'preacher', 'beggar', 'cult leader'],
              motivation: ['treason','murder','greed for money','greed for land','greed for title','greed for the supernatural','lust for someone','justice','conquest','madness','affliction'],
            }
          },
          afflictions: ['a terrible plague', 'famine', 'extreme poverty', 'a terrible disease', 'a horrible curse', 'political distrust', 'a horrifying predator'],
        },
        plotTwist: ['in the end it is too late', 'it was all a ruse', 'an unknown curse comes in effect', 'the villain is the hero', 'unforeseen consequences', 'betrayed by the most beloved'],
        deities: ['angry', 'disappointed', 'afflicted', 'absent', 'greedy', 'competitive'],
        timeframe: {
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          year: 0,
          month: 0,
          day: 0,
        },
        history: ['war', 'peace', 'merging of houses', 'religious unrest', 'cultural unrest'],
        location: {
          size: ['an outpost', 'an area with a tavern', 'a village', 'a city'],
          culture: {
            religiousness: ['Secular', 'Religious'],
            inclusiveness: ['mildly Racist', 'strongly racist', 'mildly sexist', 'strongly sexist', 'Inclusive', 'mildly xenophobic', 'strongly xenophobic'],
            political: ['far-right', 'right', 'far-left', 'left']
          },
          government: ['aristocratic', 'republic', 'democratic', 'theocracy']
        },
        plotIntro: '',
        theIssue: []
      }
    },
    methods: {
      getMonth(number) {
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
      }
    }
  }
</script>
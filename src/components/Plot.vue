<template>
<div>
  <div>{{ story }}</div>
  <button @click.prevent="plotGenerator()">Generate Plot</button>
</div>
</template>
<script>
  import appWeather from './Weather.vue';
  import locations from '../location.json';
  import plots from '../plots.json';
  import nameGenerator from '../mixins/nameGenerator.js';
  export default {
    mixins: [nameGenerator],
    components: {
      appWeather
    },
    data() {
      return {
        plot: plots,
        location: locations,
        globalTime: {
          months: {
            january: "January",
            february: "February",
            march: "March",
            april: "April",
            may: "May",
            june: "June",
            august: "August",
            september: "September",
            october: "October",
            november: "November",
            december: "December"
          },
          days: {
            monday: "Monday",
            tuesday: "Tuesday",
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday"
          }
        },
        story: ''
      }
    },
    methods: {
      chooseOption(options) {
        const optionsNumber = Math.floor(Math.random() * Object.keys(options).length);
        const choosy = Object.values(options);
        for(let item in choosy) {
          return choosy[optionsNumber];
        }
      },
      booleanGen() {
        const extNum = Math.floor(Math.random() * 2);
        return extNum;
      },
      chooseNPC() {
        const num = this.booleanGen();
        const name = this.nameGenerator(num);
        const npcAlignment = this.chooseOption(plots.NPC.alignment);
        const npcBackground = this.chooseOption(plots.NPC.background);
        const npcLeitmotiv = this.chooseOption(plots.NPC.leitmotiv);
        return name + " (who is " + npcAlignment + "), " + npcBackground + " and " + npcLeitmotiv;
      },
      timeFrame() {
        const timeframe = this.chooseOption(plots.timeframe);
        const yesNo = this.booleanGen();
        if(yesNo == 0) {
          return timeframe + ". ";
        } else {
          return "";
        }
      },
      externalPlot(option) {
        const choosy = Object.values(plots.externalPlot);
        for(let item in choosy) {
          const externalPlot = this.chooseOption(choosy[option]);
          const yesNo = this.booleanGen();
          if(yesNo == 0) {
            return "Also, " + externalPlot + " is affecting the region.";
          } else {
            return "";
          }
        }
      },
      plotTwist() {
        const plotTwist = this.chooseOption(plots.plotTwist);
        const yesNo = this.booleanGen();
        if(yesNo == 0) {
          return  " but unbeknownst to the heroes, " + plotTwist;
        } else {
          return "";
        }
      },
      religiousPlot() {
        const religiousPlot = this.chooseOption(plots.religionPlot);
        const yesNo = this.booleanGen();
        if(yesNo == 0) {
          return "Also, " + religiousPlot;
        } else {
          return "";
        }
        
      },
      getMonth(number) {
        const months = Object.values(this.globalTime.months);
        const month = months[number];
        return month;
      },
      getDay(number) {
        const days =  Object.values(this.globalTime.days);
        const day = days[number];
        return day;
      },
      getSeason(month) {   
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
      plotGenerator() {
        const extNum = this.booleanGen();
        const monthNum = Math.floor(Math.random() * 12);
        const dayNum = Math.floor(Math.random() * 7);
        const yearNum = "Y" + (3250 + Math.floor(Math.random() * 15));
        const day = this.getDay(dayNum);
        const month = this.getMonth(monthNum);
        const season = this.getSeason(monthNum);
        const npc = this.chooseNPC();
        const time = this.timeFrame();
        const extPlot = this.externalPlot(extNum);
        const plotTwist = this.plotTwist();
        const religiousPlot = this.religiousPlot();
        this.story = "It is the " + season + " of " + yearNum + ". The date, " + day + " the " + (dayNum + 1) + " of " + month + ". " + npc + ". " + time + extPlot + religiousPlot + plotTwist;
      },
      /*
      */
    }
  }
</script>
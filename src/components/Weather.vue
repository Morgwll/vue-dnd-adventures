<template>
    <div>
      <div>It is {{ season.winter.name }} and there is {{ season.winter.weather[3] }}.</div>
      <button @click.prevent="generateWeather">Generate Weather</button>
    </div>
</template>
<script>
  export default {
    props: ['month'],
    data() {
      return {
        season: {
          spring: {
            name: 'spring',
            weather: ['a light rain', 'heavy rain', 'a storm', 'wind', 'a light fog', 'a fresh breeze']
          },
          summer: {
            name: 'summer',
            weather: [ 'wind', 'heat', 'a warm breeze']
          },
          autumn: {
            name: 'autumn',
            weather: ['a light rain', 'heavy rain', 'a storm', 'wind', 'a thick fog']
          },
          winter: {
            name: 'winter',
            weather: ['a light rain', 'heavy rain', 'a storm', 'a cold breeze', 'wind', 'snowfall', 'hale','a thick fog']
          }
        }
      }
    },
    methods: {
      generateWeather() {
        let weather = Object.values(this.weather);
        console.log(weather);
        if(this.month > 4) {
          console.log('que calo');
        } else {
          console.log('que frio');
        }
      }
    }
  }
</script>
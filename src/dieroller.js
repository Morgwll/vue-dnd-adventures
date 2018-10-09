export default {
  methods: {
    dieroll(min,max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
    diceRoller() {
      return {
        dfour: this.dieroll(1,4),
        dsix: this.dieroll(1,6),
        deight: this.dieroll(1,8),
        dten: this.dieroll(1,10),
        dtwelve: this.dieroll(1,12),
        dtwenty: this.dieroll(1,20),
        dhundred: this.dieroll(1,100),
      }
    }
  }
}
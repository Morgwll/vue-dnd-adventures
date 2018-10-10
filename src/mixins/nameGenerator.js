export default {
  methods: {
    nameGenerator(num) {
      const nameStart = ['A','B','C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'Kh','L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'kh', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
      const vowels = ['a', 'ae', 'e', 'ee', 'i', 'y', 'o', 'oo', 'u'];
      const nameLength = Math.floor(Math.random() * 4) + 1;
      const startName = Math.floor(Math.random() * nameStart.length);
      let name = nameStart[startName];
      let lettersArray = [];
      for(let i = 0; i < nameLength; i++) {
        let addCons = Math.floor(Math.random() * consonants.length);
        let addVowel = Math.floor(Math.random() * vowels.length);
        let chosenVowel = vowels[addVowel];
        let chosenConsonant = consonants[addCons];
        lettersArray.push(chosenVowel);
        lettersArray.push(chosenConsonant);
      }
      let rest = lettersArray.join('');
      let end = '';
      if(num == 0) { 
        let addVowel = Math.floor(Math.random() * vowels.length);
        end = vowels[addVowel];
      };
      return name + rest + end;
    }
  }
}

/// Dawid Przydróżny Clearcode
/// Array of all possible runes
const runes = [
    { name: 'El',    power: 28,  argue: 'Ort'},
    { name: 'Eld',   power: 33,  argue: 'Sur' },
    { name: 'Tir',   power: 9,   argue: 'Eth' },
    { name: 'Nef',   power: 7,   argue: 'Ist' },
    { name: 'Eth',   power: 31,  argue: 'Tir' },
    { name: 'Ith',   power: 22,  argue: 'Pul' },    
    { name: 'Tal',   power: 8,   argue: 'Io' },
    { name: 'Ral',   power: 25,  argue: 'Um' },    
    { name: 'Ort',   power: 18,  argue: 'El' },
    { name: 'Thul',  power: 13,  argue: 'Sol' },
    { name: 'Amn',   power: 6,   argue: 'Fal' },
    { name: 'Sol',   power: 10,  argue: 'Thul' },
    { name: 'Shael', power: 17,  argue: 'Lem' },
    { name: 'Dol',   power: 11,  argue: 'Hel' },
    { name: 'Hel',   power: 12,  argue: 'Dol' },
    { name: 'Io',    power: 20,  argue: 'Tal' },
    { name: 'Lum',   power: 32,  argue: 'Gul' },
    { name: 'Ko',    power: 27,  argue: 'Mal' },
    { name: 'Fal',   power: 14,  argue: 'Amn' },
    { name: 'Lem',   power: 26,  argue: 'Shall' },
    { name: 'Pul',   power: 15,  argue: 'Ith' },
    { name: 'Um',    power: 16,  argue: 'Ral' },
    { name: 'Mal',   power: 21,  argue: 'Ko' },
    { name: 'Ist',   power: 4,   argue: 'Nef' },
    { name: 'Gul',   power: 23,  argue: 'Lum' },
    { name: 'Vex',   power: 24,  argue: 'Ohm' },
    { name: 'Ohm',   power: 1,   argue: 'Vex' },
    { name: 'Lo',    power: 2,   argue: 'Cham' },
    { name: 'Sur',   power: 30,  argue: 'Eld' },
    { name: 'Ber',   power: 3,   argue: '' },
    { name: 'Jah',   power: 5,   argue: 'Zod' },
    { name: 'Cham',  power: 29,  argue: 'Lo' },
    { name: 'Zod',   power: 19,  argue: 'Jah' } 
]




exports.generateRunicWords = length => {

    /// Check if input is correct
    if (length < 1 || length > 33) {
        return 'Runic word can be crafted only from 1 rune to 33 runes!';
    } else if (typeof(length) === 'string') {
        return 'You need to type number!';
    } else if (!length) {
        return 'Please insert number of runes!';
    }


    /// Array for runic words and their powers
    const runicWordsArray = [];
    const runicPowerArray = [];

    /// Output array
    const runicWords = [];



    /// Sort array
    runes.sort((a,b) => {
        if(a.power < b.power) return 1;
        if(a.power > b.power) return -1;
        return 0;
    })



    /// Create runic words
    //////////////////////

    let runicWord = '';
    let power = 0;

    runes.forEach((value, index) => {

        if (runicWord === '') {
            runicWord = runicWord + runes[index].name;
        } else {
            runicWord =  runicWord + '-' + runes[index].name;
        }

        power += runes[index].power-1;

        if (runicWord.split('-').length === length) {

            runicWordsArray.push(runicWord);
            runicWord = '';

            runicPowerArray.push(power);
            power = 0;
        }
    })



    /// Construct output array
    for (let i = 0; i < 10; i++) {
        const runeObject = {};
        runeObject.word = runicWordsArray[i];
        runeObject.power = runicPowerArray[i];

        if (runicWordsArray[i] === undefined) {
            break;
        } else {
            runicWords.push(runeObject);
        }
    }


    return runicWords;
}




exports.checkRunicWord = runicWord => {

    /// Check if input is string type
    if (!runicWord || runicWord === ' ') {
        return "Input can't be empty!"
    } else if (typeof(runicWord) !== 'string') {
        return "Please type runic word in format 'Rune1-Rune2-Rune3'. \
        \nType 'runes' in quotes for all possible runes.";
    } else if (runicWord === 'runes') {
        let possibleRunes = [];
        runes.forEach(rune => {
            possibleRunes.push(rune.name);
        })
        return possibleRunes;
    }


    /// Split runic word to single runes
    const runesArray = runicWord.split('-');


    /// Fix user input from xYz to Xyz
    runesArray.forEach((rune, index) => {
        runesArray[index] = runesArray[index].toLowerCase();
        runesArray[index] = runesArray[index].replace(runesArray[index].charAt(0), runesArray[index].charAt(0).toUpperCase())
    })
    

    /// Create 2 arrays to compare if runic word is correct
    const runesName = [];
    const runesArgue = [];

    let energy = 0;


    /// Loop over runesArray and find index of input runes
    /// Push their names to runesName [] and runes they argue to runesArgue []
    for (let i = 0; i < runesArray.length; i++) {
        
        let index = runes.findIndex(rune => rune.name === runesArray[i])

        // Check if runes exist
        if (index === -1) {
            return `Rune: ${runesArray[i]} do not exist! Try again.`;
        }

        energy += runes[index].power-1;

        runesArgue.push(runes[index].argue)
        runesName.push(runes[index].name)
    }


    /// Check if there are 2 same values in arrays (if yes = rune incorrect)
    const checkCorrect = runesArgue.filter(rune => runesName.includes(rune));


    /// Output for mage
    const runicWordObject = checkCorrect.length > 0 ? 'Runic word incorrect!' : energy;

 
    return runicWordObject;
}
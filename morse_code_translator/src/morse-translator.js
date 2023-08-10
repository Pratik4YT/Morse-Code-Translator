// https://www.javascripttutorial.net/javascript-dom/javascript-word-counter/

// import { engDict }  from './morseDict.js';
// console.log(engDict);

const engDict = require('./morseDict.js').engDict;
const morseDict = require('./morseDict.js').morseDict;

// console.log(engDict);
// console.log("Hi");
// console.log(morseDict);

// export class WordCounter {
class WordCounter {

    constructor(inputText, menuVal) {
        this.inputText = inputText;
        this.menuVal = menuVal;
        this.inputText.addEventListener('input', () => {
            this.count()
        });
        
    }
    count() {
        let wordStat = this.getWordStat(this.inputText.value.trim());
        // console.log(engDict);

        if (this.menuVal === 'morse') {
            // Morse to English Decoding
            let morseCode = this.inputText.value;
            wordStat.code = this.decodeMorse(morseCode);
            wordStat.codeLen = 5;
        }
        else if (this.menuVal === 'english') {
            // English to Morse Encoding
            let messageSymbols = this.inputText.value.toUpperCase().split("");
            wordStat.code = this.encodeMessage(messageSymbols);
            wordStat.codeLen = wordStat.code.length - messageSymbols.length + 1; // total size - no. of spaces
        }

        this.emitEvent(wordStat);
    }

    encodeMessage(message) {
        let code = message.map(element => {
             if (engDict[element] === undefined)
                 return element;
             return engDict[element];
            // console.log(element + " : " + engDict[element]);
        });
        // console.log(code);
        return code.join(" ");
    }

    decodeMorse(morseCode) {
        return morseCode
                .split("/") // get words -> /([/!?.])/g => for multiple delimiters
                .map(word => word.trim()
                               .split(" ") // get character code 1 space apart
                               .map(character => morseDict[character]) // decode Morse code character
                               .join('')
                  )
                  .join(' ') // add spaces between words 
                  .trim()
    }


    display(message) {
        console.log(`Hi, ${message}!`);
    }

    getWordStat(str) {
        let matches = str.match(/\S+/g);
        return {
            characters: str.length,
            words: matches? matches.length : 0,
        };
    }

    emitEvent(wordStat) {

        //Create count event
        let countEvent = new CustomEvent('count', {
            bubbles: true,
            cancelable: true,
            detail: {
                wordStat
            }
        });

        //Dispatch count event
        this.inputText.dispatchEvent(countEvent);
    }
}

window.WordCounter = WordCounter;

exports.WordCounter = WordCounter;
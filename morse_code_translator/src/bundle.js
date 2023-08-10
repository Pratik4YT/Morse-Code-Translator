(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

    const morDic = require('./morseDict.js');
    
    
    const morseTrans = require('./morse-translator.js');
    
    
    const inputText = document.querySelector('#text1');
    const statIn = document.querySelector('#stat1');
    
    const outputText = document.querySelector('#text2');
    const statOut = document.querySelector('#stat2');
    
    const menuSelect = document.querySelector('#menulang');
    
    new morseTrans.WordCounter(inputText, menuSelect.value);
    
    menuSelect.addEventListener('change', () => {
        console.log(menuSelect.value);
        new morseTrans.WordCounter(inputText, menuSelect.value);
    })
    console.log(menuSelect.value);
    
    
    
    
    const render = ((event) => {
        statIn.innerHTML = `<p>You've written ${event.detail.wordStat.words} words 
            and ${event.detail.wordStat.characters} characters.</p>`;
    
            
        if (inputText.value.trim() === '') {
            event.detail.wordStat.codeLen = 0;
           
        }
        
       
        statOut.innerHTML = `<p>Cipher message contains 
            ${event.detail.wordStat.codeLen} characters.</p>`;
    
        
        outputText.innerHTML = event.detail.wordStat.code;    
    });
    
    inputText.addEventListener('count', render);
    
    
    },{"./morse-translator.js":2,"./morseDict.js":3}],2:[function(require,module,exports){
    
    
    const engDict = require('./morseDict.js').engDict;
    const morseDict = require('./morseDict.js').morseDict;
    
    
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
            
    
            if (this.menuVal === 'morse') {
               
                let morseCode = this.inputText.value;
                wordStat.code = this.decodeMorse(morseCode);
                wordStat.codeLen = 5;
            }
            else if (this.menuVal === 'english') {
                
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
               
            });
            
            return code.join(" ");
        }
        //   if (this.menuVal === 'english') {
    
        //     inputText=='HELLO'
        //     return ("tmkc")
              
        //   }
        decodeMorse(morseCode) {
            return morseCode
                    .split("/") 
                    .map(word => word.trim()
                                   .split(" ") 
                                   .map(character => morseDict[character]) 
                                   .join('')
                      )
                      .join(' ') 
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
    
           
            let countEvent = new CustomEvent('count', {
                bubbles: true,
                cancelable: true,
                detail: {
                    wordStat
                }
            });
    
            
            this.inputText.dispatchEvent(countEvent);
        }
    }
    
    window.WordCounter = WordCounter;
    
    exports.WordCounter = WordCounter;
    },{"./morseDict.js":3}],3:[function(require,module,exports){
    const dictEng = {
        "A": ".-",
        "B": "-...",
        "C": "-.-.",
        "D": "-..",
        "E": ".", 
        "F": "..-.",
        "G": "--.",
        "H": "....", 
        "I": "..",
        "J": ".---",
        "K": "-.-",
        "L": ".-..", 
        "M": "--",
        "N": "-.",
        "O": "---", 
        "P": ".--.",
        "Q": "--.-",
        "R": ".-.",
        "S": "...",
        "T": "-",
        "U": "..-",
        "V": "...-",
        "W": ".--",
        "X": "-..-",
        "Y": "-.--",
        "Z": "--..",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "0": "-----",
        " ": "/",
        ".": ".-.-.-",
        ",": "--..--",
        "?": "..--..",
        "!": "-.-.--",
        "/": "-..-.",
        "(": "-.--.",
        ")": "-.--.",
        "&": ".-...",
        ":": "---...",
        ";": "-.-.-.",
        "=": "-...-",
        "+": ".-.-.",
        "-": "-....-",
        "_": "..--.-",
        "\"": ".-..-.",
        "'": ".----.",
        "@": ".--.-.",
        "%": "-..-.-----"
    }
    
    const dictMor = {
        '.-': 'A',
        '-...': 'B',
        '-.-.': 'C',
        '-..': 'D',
        '.': 'E', 
        '..-.': 'F',
        '--.': 'G',
        '....': 'H', 
        '..': 'I',
        '.---': 'J',
        '-.-': 'K',
        '.-..': 'L', 
        '--': 'M',
        '-.': 'N',
        '---': 'O', 
        '.--.': 'P',
        '--.-': 'Q',
        '.-.': 'R',
        '...': 'S',
        '-': 'T',
        '..-': 'U',
        '...-': 'V',
        '.--': 'W',
        '-..-': 'X',
        '-.--': 'Y',
        '--..': 'Z',
        '.----': '1',
        '..---': '2',
        '...--': '3',
        '....-': '4',
        '.....': '5',
        '-....': '6',
        '--...': '7',
        '---..': '8',
        '----.': '9',
        '-----': '0',
        '/': ' ',
        '.-.-.-': '.',
        '--..--': ',',
        '..--..': '?',
        '-.-.--': '!',
        '-..-.': '/',
        '-.--.': ')',
        '.-...': '&',
        '---...': ':',
        '-.-.-.': ';',
        '-...-': '=',
        '.-.-.': '+',
        '-....-': '-',
        '..--.-': '_',
        '.-..-.': '"',
        '.----.': "'",
        '.--.-.': '@',
        '-..-.-----': '%'
    }
    
    
    
    
     exports.engDict = dictEng;
     exports.morseDict = dictMor;
    
    
    
    
    
    
    
    },{}]},{},[1,2,3]);
// import EasySpeech from '../easy-speech-recognition'; // Add missing import statement
// app.js   -   Main JavaScript file for the A-Frame application

// Autoload a music file called music from A-Frame asset
const audio = new Audio('sound/music.mp3');
audio.autoplay = true;
audio.volume = 0.3;
audio.loop = true;

// array for storing the dialogue data
let dialogArr=[]; let currentPoem = 0; let firstDialogue='Let Me Think a Minute...';

EasySpeech.init(); // Uncomment this line
EasySpeech.detect(); // Uncomment this line

window.addEventListener('DOMContentLoaded', () => {
    // Load the map
    const map = document.getElementById('map');
    generateMap(map);

    // Load dialogue
    fetch('dialogue.json')
        .then(response => response.json())
        .then(dialogue => {
            // Store the dialogue data in a variable
            dialogArr = dialogue;
            // Example: Display the first dialogue
            firstDialogue = dialogue[0];
        })
        .catch(error => console.error('Error loading dialogue:', error));
});

function generateMap(mapEntity) {
    // Your code to generate the map goes here
    // Assuming 'grass' is the path to your grass texture
    let grassTexture = 'textures/grass.jpg';
    let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    mapEntity.setAttribute('geometry', {
        primitive: 'box',
        width: 50,
        height: 0.1,
        depth: 25
    });

    mapEntity.setAttribute('material', {
        src: grassTexture,
        color: randomColor,
        roughness: 1,
        metalness: 0
    });
}

// componenets for the poe
AFRAME.registerComponent('clickable', {
    schema: {
        text: { type: 'string', default: '' }
    },
    init: function () {
        var el = this.el;
        var data = this.data; // Access component data here
        var character = document.querySelector('#char');

        // Set idle animation
        character.setAttribute('animation-mixer', {clip: 'idle', loop: 'repeat', timeScale: '1.0'});

        el.addEventListener('click', function () {
            // Get the dialogue-display component and set its text
            const poemText = document.querySelector('#text');
            if (poemText) {
                data.text = dialogArr[currentPoem].text || 'Let me think a minute...';
                poemText.setAttribute('value', data.text); // Use data.text instead of this.text
                console.log(data.text);

                // Set talking animation
                character.setAttribute('animation-mixer', {clip: 'talk', loop: 'once',timeScale: '4.0'});

                // move onto next poem
                if (dialogArr.length > 0 && currentPoem < dialogArr.length - 1){
                currentPoem++;
                }else{
                    currentPoem = 0;
                }

                EasySpeech.detect()
                // needed for easy speech to work
                const utterance = new SpeechSynthesisUtterance(data.text); // Use data.text instead of text
                utterance.lang = 'en-US';
                EasySpeech.init({ maxTimeout: 8000, interval: 250 })
                    .then(() => console.debug('load complete'))
                    .catch(e => console.error(e))

                utterance.voiceURI = 'Microsoft Mark - English(United States)';

                EasySpeech.speak({
                    utterance: utterance,
                    pitch: 1,
                    rate: 1,
                    volume: 1,
                    // there are more events, see the API for supported events
                    boundary: () => {
                        console.debug('boundary reached');
                        // Set idle animation again when speech ends
                        character.setAttribute('animation-mixer', {clip: 'idle', loop: 'repeat'});
                    }
                })
            } else {
                console.error('Dialogue display component not found!');
            }
        });
    },
});



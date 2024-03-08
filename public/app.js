// app.js   -   Main JavaScript file for the A-Frame application

// Autoload a music file called music from A-Frame asset
const audio = new Audio('sound/music.mp3');
audio.autoplay = true;
audio.volume = 0.5;
audio.loop = true;

// array for storing the dialogue data
let dialogArr = [];
EasySpeech.init()

window.addEventListener('DOMContentLoaded', () => {
    // Load the map
    const map = document.getElementById('map');
    generateMap(map);

    // Load dialogue
    fetch('dialogue.json')
        .then(response => response.json())
        .then(dialogue => {
            // Store the dialogue data
            console.log(dialogue);
            dialogArr = dialogue;
            // Example: Display the first dialogue
            const firstDialogue = dialogue[0];
            console.log(firstDialogue);
        })
        .catch(error => console.error('Error loading dialogue:', error));
});

function generateMap(mapEntity) {
    // Your code to generate the map goes here
    // This is a placeholder for demonstration purposes
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

// componenets 
AFRAME.registerComponent('clickable', {
    schema: {
        text: { type: 'string', default: 'Hey' }
    },
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            // Get the dialogue-display component and set its text
            var textEntity = document.querySelector('#text');
            if (textEntity) {
               const poemText = document.getElementById('text');
               poemText.setAttribute('value', {
                    value: text,
                });
                dialogArr++;
                // this.talk(text);

            } else {
                console.error('Dialogue display component not found!');
            }
        });
    },

    update: function () {
        this.el.setAttribute('text', 'value', this.data.text);
        this.talk(this.data.text);
    },

    talk: async function() {
        const text = this.data.text;
        let myLangVoice = 'en-US';

        EasySpeech.detect()

        EasySpeech.init({ maxTimeout: 5000, interval: 250 })
            .then(() => console.debug('load complete'))
            .catch(e => console.error(e))

        await EasySpeech.speak({
            text: text,
            voice:'en-US', // optional, will use a default or fallback
            pitch: 1,
            rate: 1,
            volume: 1,
            // there are more events, see the API for supported events
            boundary: e => console.debug('boundary reached')
        })
        // this.update(nextDialogue);
    }
});
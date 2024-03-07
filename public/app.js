// app.js   -   Main JavaScript file for the A-Frame application
// voice config
import '@drnoir/randgen-aframe' from import.js;
import EasySpeech from 'easy-speech';

EasySpeech.detect()
let myLangVoice = 'en-US';
// array for storing the dialogue data
let dialogArr = [];
            
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
            // alert(firstDialogue.text);
        })
        .catch(error => console.error('Error loading dialogue:', error));
});

function nextDialogue() {
    // Get the current dialogue index
    const currentIndex = 0;
    // Get the next dialogue
    const nextDialogue = dialogArr[currentIndex + 1];
    // Display the next dialogue
    return nextDialogue;
}

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

AFRAME.registerComponent('dialogue-display', {
    schema: {
        text: { type: 'string', default: dialogArr[0] }
    },

    init: function () {
        this.el.setAttribute('text', {
            value: this.data.text,
            color: 'white',
            align: 'bottom'
        });
    },

    update: function () {
        this.el.setAttribute('text', 'value', this.data.text);
        this.talk();
    },

    talk: async function() {
        EasySpeech.init({ maxTimeout: 5000, interval: 250 })
        .then(() => console.debug('load complete'))
        .catch(e => console.error(e))

        let nextDialogue = nextDialogue();

        await EasySpeech.speak({
            text: this.data.text,
            voice: myLangVoice, // optional, will use a default or fallback
            pitch: 1,
            rate: 1,
            volume: 1,
            // there are more events, see the API for supported events
            boundary: e => console.debug('boundary reached')
          })
        this.update(nextDialogue);
    }
});

AFRAME.registerComponent('trees', {
    multiple: true,
    schema: {
        position: { type: 'string', default: '0 0.1 0' },
        seed: { type: 'int', default: 20 }
    },

    init: function () {
    data = this.data;
    },

    update: function () {
        let tree = document.createElement('a-entity');
        let randPos = '0 0.1 0'
        for (let i = 0; i < 25; i++) {
            randTreePos = Math.floor(Math.random() * this.data.seed) + 1;
            randPos = Math.floor(Math.random() * this.data.seed) + ' 0.1 ' + Math.floor(Math.random() * this.data.seed);
            tree.setAttribute('gltf-loader', '"url(tree.glb)"');
            tree.setAttribute('position',  randPos);
            this.el.appendChild(tree);  
        }
    }
});




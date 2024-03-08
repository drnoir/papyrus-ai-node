// app.js   -   Main JavaScript file for the A-Frame application
// voice config
EasySpeech.detect()

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
            // alert(firstDialogue.text);
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
    init: function () {
        var el = this.el;
        el.addEventListener('click', function () {
            // Get the dialogue-display component and set its text
            var textEntity = document.querySelector('#textEntity');
            if (textEntity) {
                textEntity.setAttribute('dialogue-display', {text: 'Quoth the Raven, Nevermore.'});
            } else {
                console.error('Dialogue display component not found!');
            }
        });
    }
});

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
        this.talk(this.data.text);
    },

    update: function () {
        this.el.setAttribute('text', 'value', this.data.text);
        this.talk(this.data.text);
    },

    talk: async function() {
        const text = this.data.text;
        let myLangVoice = 'en-US';

        EasySpeech.init({ maxTimeout: 5000, interval: 250 })
        .then(() => console.debug('load complete'))
        .catch(e => console.error(e))

        nextDialogue = nextDialogue();

        await EasySpeech.speak({
            text: 'Hello to you',
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

function nextDialogue() {
    // Get the current dialogue index
    const currentIndex = 0;
    // Get the next dialogue
    let nextDialogue = dialogArr[currentIndex + 1];
    // Display the next dialogue
    return nextDialogue;
}





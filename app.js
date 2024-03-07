// app.js

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
    // alert(nextDialogue.text);
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
    }
});



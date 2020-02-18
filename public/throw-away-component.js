'use strict' //strict javascript

AFRAME.registerComponent('throw-away-component', {
    schema: {},
    init: function()  {
        const Context_AF = this; //this refers to "this" component, keep this context

        //add event listener for "click" event on whatever entity has this component
        Context_AF.el.addEventListener('mousedown', function(event) {
            console.log("clicked!!!!!!!!");
            //Context_AF.createCow();
        });

        Context_AF.el.addEventListener('mouseup', function(event) {
            console.log("upp!!!!!!!!");

            let posZ = this.getAttribute("position").z;

            if (posZ <= -5) {
                console.log("score")
            }
            //Context_AF.createCow();
        });

        //make the object larger on hover
        Context_AF.el.addEventListener('mouseenter', function(event) {
            Context_AF.el.object3D.scale.set(1.1, 1.1, 1.1);
        });

        Context_AF.el.addEventListener('mouseleave', function(event) {
            Context_AF.el.object3D.scale.set(1.0, 1.0, 1.0);
        })

        Context_AF.el.addEventListener('collisions', function(event) {
            console.log(event.detail)
        })
    },

    //custom function for creating random cows
    createCow: function() {
        const Context_AF = this; //be careful of "this"!

        //create an html element that loads in cows model
        let cowElem = document.createElement('a-entity'); //create element by code
        cowElem.setAttribute('class', 'clickable');
        cowElem.setAttribute('obj-model', {obj: 'assets/models/Cow.obj'}); //set model
        cowElem.setAttribute('material', {src: 'assets/textures/Cow.png'}); //set material/texture

        //random transforms
        cowElem.setAttribute('position', {x:(Math.random() * 6.0) - 3.0, y: 0, z:-4.0 - (Math.random() * 3.0)}); //random x around axis and random z behind button, above ground on y=0

        const randScale = 0.2 + (Math.random() * 0.8);
        cowElem.setAttribute('scale', {x:randScale, y:randScale, z:randScale}); //random scale

        cowElem.setAttribute('rotation', {x:0, y:Math.random() * 360.0, z:0}); //random y rotation

        //attach to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(cowElem);
    }
});
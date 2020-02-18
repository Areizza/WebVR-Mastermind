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
            let posY = this.getAttribute("position").y;
            let posX = this.getAttribute("position").x;

            if (posZ <= -12 && posZ >= -13) {

                if(posY < 3) {

                    var id = this.getAttribute("id");

                    if (posX <= -9 && posX >= -12) {
                        console.log("score in 1");
                        console.log(id);
                        Context_AF.createPlane(1, id);
                    }
                    if (posX <= 1.5 && posX >= -1.5) {
                        console.log("score in 2");
                        Context_AF.createPlane(2, id);
                    }
                    if (posX <= 12 && posX >= 9) {
                        console.log("score in 3");
                        Context_AF.createPlane(3, id);
                    }
                    
                    console.log(posY + ", " + posZ);
                }
            }
        });

        //make the object larger on hover
        // Context_AF.el.addEventListener('mouseenter', function(event) {
        //     Context_AF.el.object3D.scale.set(1.1, 1.1, 1.1);
        // });

        // Context_AF.el.addEventListener('mouseleave', function(event) {
        //     Context_AF.el.object3D.scale.set(1.0, 1.0, 1.0);
        // })

        Context_AF.el.addEventListener('collisions', function(event) {
            console.log(event.detail)
        })
    },

    //custom function for creating random cows
    createPlane: function(scorePos, id) {
        const Context_AF = this; //be careful of "this"!

        //create an html element that loads in cows model
        let displayPlane = document.createElement('a-entity'); //create element by code
        displayPlane.setAttribute('material', 'color: black; shader: flat;'); //set material/texture
        displayPlane.setAttribute('text', 'value:' + id + '; width: 20; align: center;');

        var planePos;

        if (scorePos == 1) {
            planePos = {x: -10.5, y: 4, z: -19};
        }
        if (scorePos == 2) {
            planePos = {x: 0, y: 4, z: -19};
        }
        if (scorePos == 3) {
            planePos = {x: 10.5, y: 4, z: -19};
        }

        displayPlane.setAttribute('position', planePos); //random x around axis and random z behind button, above ground on y=0
        displayPlane.setAttribute('width', 3);
        displayPlane.setAttribute('height', 3);
        displayPlane.setAttribute('scale', {x:1, y:1, z:1}); //random scale

        //attach to scene
        let scene = document.querySelector('a-scene');
        scene.appendChild(displayPlane);
    }
});
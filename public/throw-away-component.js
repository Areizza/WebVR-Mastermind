'use strict' //strict javascript

AFRAME.registerComponent('throw-away-component', {
    schema: {},
    init: function()  {
        const Context_AF = this; //this refers to "this" component, keep this context

        //when user lets go of the object
        Context_AF.el.addEventListener('mouseup', function(event) {
            let posZ = this.getAttribute("position").z;
            let posY = this.getAttribute("position").y;
            let posX = this.getAttribute("position").x;

            if (posZ <= -12 && posZ >= -13) {

                if(posY < 3) {

                    var id = this.getAttribute("id");

                    //the first box
                    if (posX <= -9 && posX >= -12) {
                        Context_AF.updatePlane(1, id);
                        Context_AF.updateButton();
                    }
                    //the second box
                    if (posX <= 1.5 && posX >= -1.5) {
                        Context_AF.updatePlane(2, id);
                        Context_AF.updateButton();
                    }
                    //the third box
                    if (posX <= 12 && posX >= 9) {
                        Context_AF.updatePlane(3, id);
                        Context_AF.updateButton();
                    }
                }
            }
        });
    },

    //custom function for creating random cows
    updatePlane: function(scorePos, id) {
        const Context_AF = this; //be careful of "this"!

        //find the correct display plane
        let displayPlane = document.getElementById('score'+scorePos);

        displayPlane.setAttribute('text', 'value:' + id + '; width: 20; align: center;');
    },

    updateButton: function() {
        let button = document.getElementById('submitButton');

        let score1 = document.getElementById('score1');
        let score2 = document.getElementById('score2');
        let score3 = document.getElementById('score3');

        if(score1.getAttribute("text").value != '' && score2.getAttribute("text").value != '' && score3.getAttribute("text").value != '') {
            //make green when valid guess can be submitted
            button.setAttribute('material', 'color: green');
        }
        else {
            //invalid guess
            button.setAttribute('material', 'color: red');
        }

    }
});
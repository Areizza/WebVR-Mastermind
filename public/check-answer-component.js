'use strict' //strict javascript

AFRAME.registerComponent('check-answer-component', {
    schema: {},
    init: function()  {
        let socket = io();
        const Context_AF = this; //this refers to "this" component, keep this context

        socket.on('connect', function(){
            console.log("CHECKING: I am connected");
        });

        Context_AF.el.addEventListener('click', function(event) {
            //save to global variable
            window.answer = Context_AF.checkAnswer();
            socket.emit('submitButton', window.answer);
        });
        //make button larger on hover
        Context_AF.el.addEventListener('mouseenter', function(event) {
            Context_AF.el.object3D.scale.set(1.08, 1.08, 1.08);
        });

        Context_AF.el.addEventListener('mouseleave', function(event) {
            Context_AF.el.object3D.scale.set(1.0, 1.0, 1.0);
        })

    },

    //check answer based on score inputs
    checkAnswer: function() {
        let score1 = document.getElementById('score1').getAttribute("text").value;
        let score2 = document.getElementById('score2').getAttribute("text").value;
        let score3 = document.getElementById('score3').getAttribute("text").value;

        let guess = [];

        if(score1 != '' && score2 != '' && score3 != '') {
            //console.log("ready to submit")
            guess = [score1, score2, score3];
        }
        else {
            //console.log("not enough to submit")
            guess = ['', '', '']
        }

        return guess;

    }
});
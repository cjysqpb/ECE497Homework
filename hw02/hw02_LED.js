#!/usr/bin/env node

//Setup LEDs
var b = require('bonescript');
var LED1 = 'P9_24';
var LED2 = 'P9_27';
var LED3 = 'P9_22';
var LED4 = 'P9_26';

b.pinMode(LED1, b.OUTPUT);
b.pinMode(LED2, b.OUTPUT);
b.pinMode(LED3, b.OUTPUT);
b.pinMode(LED4, b.OUTPUT);

//Setup Buttons
var b = require('bonescript');
var buttonUp = 'P9_13';
var buttonLeft = 'P9_11';
var buttonDown= 'P9_21';
var buttonRight = 'P9_17';


b.pinMode(buttonUp, b.INPUT, 7, 'pulldown');
b.pinMode(buttonLeft, b.INPUT, 7, 'pulldown');
b.pinMode(buttonDown, b.INPUT, 7, 'pulldown');
b.pinMode(buttonRight, b.INPUT, 7, 'pulldown');


b.attachInterrupt(buttonUp, true, b.CHANGE, top);
b.attachInterrupt(buttonLeft, true, b.CHANGE, left);
b.attachInterrupt(buttonDown, true, b.CHANGE, down);
b.attachInterrupt(buttonRight, true, b.CHANGE, right);


//Button Functions
function top(x){
    if (x.value) {
        b.digitalWrite(LED1, b.HIGH);
    } else {
        b.digitalWrite(LED1, b.LOW);
    }
}

function left(x){
    if (x.value) {
        b.digitalWrite(LED2, b.HIGH);
    } else {
        b.digitalWrite(LED2, b.LOW);
    }
}

function down(x){
    if (x.value) {
        b.digitalWrite(LED3, b.HIGH);
    } else {
        b.digitalWrite(LED3, b.LOW);
    }
}

function right(x){
    if (x.value) {
        b.digitalWrite(LED4, b.HIGH);
    } else {
        b.digitalWrite(LED4, b.LOW);
    }
}

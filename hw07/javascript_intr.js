#!/usr/bin/env node

//Setup LEDs
var b = require('bonescript');
var LED1 = 'P9_27';
var button = 'P9_28';


b.pinMode(LED1, b.OUTPUT);
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button, true, b.CHANGE, copy);

//Button Functions
function copy(x){
    if (x.value) {
        b.digitalWrite(LED1, b.HIGH);
    } else {
        b.digitalWrite(LED1, b.LOW);
    }
}

console.log("Program Ready");

#!/usr/bin/env node

/*
 * Homework3 tempreture sensor driver
 * Bo Pang
 * CM1222
 */
 
//Setup User I/O ports
var i2c = require('i2c');
var port = '/dev/i2c-2';
var temp1 = new i2c(0x48, {
    device: '/dev/i2c-2'
});
var temp2 = new i2c(0x49, {
    device: '/dev/i2c-2'
});

function displayTEMP(){
    temp1.readBytes(0x00, 1, function(err, data) {
        console.log("Right Temp: " + data[0]);
    });
    
    temp2.readBytes(0x00, 1, function(err, data) {
        console.log("Left Temp: " + data[0]);
    });
}

// This code segment fails, I dont know why.
/*
temp1.readBytes(0x01, 1, function(err, data) {
    console.log("TempCFG Ini: " + data[0].toString(16));
    temp1cfg = data[0] | 0x02;
    console.log("TempCFG: " + temp1cfg.toString(16));
});

temp1.writeBytes(0x01, [temp1cfg], function(err) {});
*/

// Instead, I use shell to change settings.
var exec = require('child_process').exec,
    child;

child = exec('i2cset -y 2 0x48 01 0x80',
  function (error, stdout, stderr) {
});
child = exec('i2cset -y 2 0x48 02 0x1a',
  function (error, stdout, stderr) {
});
child = exec('i2cset -y 2 0x48 03 0x1a',
  function (error, stdout, stderr) {
});

child = exec('i2cset -y 2 0x49 01 0x80',
  function (error, stdout, stderr) {
});
child = exec('i2cset -y 2 0x49 02 0x1a',
  function (error, stdout, stderr) {
});
child = exec('i2cset -y 2 0x49 03 0x1a',
  function (error, stdout, stderr) {
});

// Setup warning
var b = require('bonescript');
var WarningLine= 'P9_12';
var buttonC = 'P9_23';
b.pinMode(WarningLine, b.INPUT, 7, 'pullup');
b.attachInterrupt(WarningLine, true, b.CHANGE, tempwarning);
b.pinMode(buttonC, b.INPUT, 7, 'pulldown');
b.attachInterrupt(buttonC, true, b.CHANGE, currentTemp);

function tempwarning(x){
    if (x.value) {
        console.log("");
        console.log("Temp Normal");
    }else{
        console.log("");
        console.log("Temp Too HIGH");
        displayTEMP();
        console.log("");
    }
}

function currentTemp(x){
    if (x.value) {
        console.log("Current Tempreture:");
        displayTEMP();
    }
}



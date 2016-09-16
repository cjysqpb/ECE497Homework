#!/usr/bin/env node
/*
 * Etch-a-sketch Game Javascript version
 * With 8x8 LED driver
 * Bo Pang CM1222
 */
 


//Setup Game data
const MAXSIZE = 8;
var length;
var data = new Array(MAXSIZE);
for (var i = 0; i < MAXSIZE; i++) {
    data[i] = new Array(MAXSIZE);
    for (var j = 0; j < MAXSIZE; j++){
         data[i][j] = 0;
    }
    
}
var currenti;
var	currentj;
currenti = 0;
currentj = 0;
console.log("Welcome to Etch-a-sketch");
console.log("Game loading....");

//Set the size of DrawingPad (8): 
length = MAXSIZE;


//Set up I2C
var i2c = require('i2c');
var port = '/dev/i2c-2';
var matrix = 0x70;
var displayData = [0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
    0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0];

var wire = new i2c(0x70, {
    device: '/dev/i2c-2'
});

wire.writeByte(0x21, function(err) {});
wire.writeByte(0x81, function(err) {});
wire.writeByte(0xe7, function(err) {});

function draw() {
    updateDisplayData();
    wire.writeBytes(0x00, displayData, function(err) {
    });
}

function updateDisplayData() {
    var sum;
    for (var i = 0; i < length; i++) {
        sum = 1*data[7][i] + 2*data[6][i] +
            4*data[5][i] + 8*data[4][i] +
            16*data[3][i] + 32*data[2][i] +
            64*data[1][i] + 128*data[0][i];
        //console.log("Sum Data R"+i+" is "+sum);
        displayData[i * 2] = sum;
        displayData[i * 2 + 1] = 0;
    }
    displayData[currentj * 2 + 1] = Math.pow(2, (7 - currenti));
}


//Setup buttons
var b = require('bonescript');
var buttonUp = 'P9_13';
var buttonLeft = 'P9_11';
var buttonDown= 'P9_21';
var buttonRight = 'P9_17';
var buttonClear = 'P9_23';

b.pinMode(buttonUp, b.INPUT, 7, 'pulldown');
b.pinMode(buttonLeft, b.INPUT, 7, 'pulldown');
b.pinMode(buttonDown, b.INPUT, 7, 'pulldown');
b.pinMode(buttonRight, b.INPUT, 7, 'pulldown');
b.pinMode(buttonClear, b.INPUT, 7, 'pulldown');

b.attachInterrupt(buttonUp, true, b.CHANGE, top);
b.attachInterrupt(buttonLeft, true, b.CHANGE, left);
b.attachInterrupt(buttonDown, true, b.CHANGE, down);
b.attachInterrupt(buttonRight, true, b.CHANGE, right);
b.attachInterrupt(buttonClear, true, b.CHANGE, clear);

//Game Logic
//Button interrupt handler
function top(x){
    if (x.value) {
    	if (currenti > 0) {
    		currenti--;
	    	refresh();
    	}
    }
}

function left(x){
    if (x.value) {
    	if (currentj > 0) {
    		currentj--;
    		refresh();
    	}
    }
}
function down(x){
    if (x.value) {
    	if (currenti < length - 1) {
    		currenti++;
    		refresh();
    	}
    }
}
function right(x){
    if (x.value) {
    	if (currentj < length - 1) {
    		currentj++;
    		refresh();
    	}
    }
}

function clear(x){
    if (x.value) {
    	currenti = 0;
    	currentj = 0;
		for (var i = 0; i < MAXSIZE; i++) {
    		for (var j = 0; j < MAXSIZE; j++){
        		 data[i][j] = 0;
    		}
		}
		refresh();
    }
}

function refresh(){
	data[currenti][currentj] = 1;
	printAll();
	draw()
}


printAll();
draw();


//Print helpers
function printNum(num)
{
	if (length <= 10) {
		process.stdout.write("  " + num);
	} else if (num < 10){
		process.stdout.write(" 0" + num);
	} else {
		process.stdout.write(" "+num);
	}
}


function printDot(i, j)
{
	if (data[i][j]) {
		process.stdout.write(" X ");
	} else {
		process.stdout.write("   ");
	}
}

function printAll()
{
	var i;
	var j;
	process.stdout.write("    ");
	for (j = 0; j < length; j++) {
		printNum(j);
	}
	process.stdout.write("\n");
	for (i = 0; i < length; i++) {
		printNum(i);
		process.stdout.write(": ");
		for (j = 0; j < length; j++) {
			printDot(i, j);
		}
		process.stdout.write("\n");
	}
}


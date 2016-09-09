#!/usr/bin/env node

/*
 * Etch-a-sketch Game Javascript version
 * Bo Pang CM1222
 */
var a = 1;

const MAXSIZE = 100;
var length;
var data = new Array(MAXSIZE);
for (var i = 0; i < MAXSIZE; i++) {
    data[i] = new Array(MAXSIZE);
}

//Set the size of DrawingPad (1-100): 
length = 20;


var currenti;
var	currentj;
currenti = 0;
currentj = 0;
console.log("Welcome to Etch-a-sketch");

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
    		data[i] = new Array(MAXSIZE);
		}
		refresh();
    }
}

function refresh(){
	data[currenti][currentj] = 1;
	printAll();
}

//Print helpers
printAll();

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


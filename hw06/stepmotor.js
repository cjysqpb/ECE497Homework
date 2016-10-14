#!/usr/bin/env node

/* 
 * HW06 IR tracker
 * Bo Pang CM1222; 
 * Boyu Zhang CM1402;
 */

//Define constants
const delaytime = 50;
const ArraySize = 20;
var b = require('bonescript');
var step1a = 'P9_11';
var step2b = 'P9_13';
var step1b = 'P9_15';
var step2a = 'P9_16';
var AIN0 = 'P9_39';
var AIN1 = 'P9_40';

//Setup basic (I/O)
b.pinMode(step1a, b.OUTPUT);
b.pinMode(step2b, b.OUTPUT);
b.pinMode(step1b, b.OUTPUT);
b.pinMode(step2a, b.OUTPUT);

//Start button
var button = 'P9_21';
b.pinMode(button, b.INPUT, 7, 'pulldown');
b.attachInterrupt(button, true, b.CHANGE, runButton);

//Stop button
var button = 'P9_23';
b.pinMode(button, b.INPUT, 7, 'pulldown');

// IR sensor data array
var IR_data_avg = new Array(ArraySize);

// Step motor driving pattern
var phase1 = new Array(0,0,1,1);
var phase2 = new Array(0,1,1,0);
var phase3 = new Array(1,1,0,0);
var phase4 = new Array(1,0,0,1);

// Put step motor driving patterns into an array
var phasesequence = new Array(ArraySize);
for (var i =0; i<5; i++){
    phasesequence[i*4 + 0] = phase1;
    phasesequence[i*4 + 1] = phase2;
    phasesequence[i*4 + 2] = phase3;
    phasesequence[i*4 + 3] = phase4;
}

// Main, when the run button is pressed
var step_count = 0;
function runButton(a) {
  if (a.value === 1) {
    step_count = 0;
    
    //360 rortate scan
    console.log("Running Scan:");
    for (var i =0; i<20; i++){
      runphase(phasesequence[i]);
      // A/D read is in sleep();
      sleep(50);
    }

    //Find maxium
    var maxValue = 0;
    var maxIndex = 0;
    for (var i = 0; i < ArraySize; i++){
      if (IR_data_avg[i] > maxValue) {
        maxIndex = i;
        maxValue = IR_data_avg[i];
      }
    }
    
    console.log("maxValue: "+maxValue);
    console.log("maxIndex: "+maxIndex);
    
    //Rotate back and stop at Maxium brightness
    for (var i = 18; i > maxIndex; i--){
      runphase(phasesequence[i]);
      sleep(50);
    }
    
    sleep(1000);
    console.log("Real-Time following Mode");
    
    //Entering following Mode
    tracking(maxIndex);
  }
}

function runphase(phasearray){
    b.digitalWrite(step1a, phasearray[0]);
    b.digitalWrite(step2b, phasearray[1]);
    b.digitalWrite(step1b, phasearray[2]);
    b.digitalWrite(step2a, phasearray[3]);
}

//When the start button is ready to be clicked
console.log("READY!");

//Read A/D helper
var IR_data_0 = 0;
var IR_data_1 = 0;
function read_analog(){
  if (step_count < ArraySize) {
    IR_data_0 = b.analogRead(AIN0);
    IR_data_1 = b.analogRead(AIN1);
    IR_data_avg[step_count] = (IR_data_0 + IR_data_1) / 2.0;
  }
  step_count++;
}

//Real-time following helper
//Press P9-23 to stop.
var currentIndex = 0;
function tracking(maxIndex){
  var currentIndex = maxIndex;
  //console.log("Index:"+currentIndex);
  //console.log("Data:"+phasesequence[currentIndex]);
  while(!b.digitalRead('P9_23')){
    IR_data_0 = b.analogRead(AIN0);
    IR_data_1 = b.analogRead(AIN1);
    //0.002 is a threshold
    if ((IR_data_0 > IR_data_1)&&(IR_data_0-IR_data_1>0.002)) {
      if (currentIndex == 19){
        runphase(phasesequence[0]);
        currentIndex = 0;
      }
      else{
        currentIndex = currentIndex + 1;
        runphase(phasesequence[currentIndex]);
      }
      sleep(50);
    } else if ((IR_data_0 < IR_data_1)&&(IR_data_1-IR_data_0>0.002)) {
      if (currentIndex == 0){
        runphase(phasesequence[19]);
        currentIndex = 19;
      }
      else{
        currentIndex = currentIndex - 1;
        //console.log("Index:"+currentIndex);
        //console.log("Data:"+phasesequence[currentIndex]);
        runphase(phasesequence[currentIndex]);
      }
      sleep(50);
    }
  }
}

//Sleep helper to make delay
function sleep(milliseconds) {
  var start = new Date().getTime();
  while(1){
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
  read_analog();
}

Bo Pang, CM1222.
I have finished "Tempreture sensor" driver and "Etch-a-sketch" Javascript game for LED matrix.


The .sh file:
Shell script to read tempreture sensor at 0x48, convert to Fahrenheit and print.



"hw03_temp.js":
This program reads both tempreture sensor data and will print the reading
if button 'P9_23' is pressed.

if the tempreture of any-of-these-two goes above threshold (Currently 26 degree Celsus )
the interrupt pin will go low, the warning text will print with current temp reading.

If the tempreture drops back to normal, text will be printed to indicate. 



"hw03_Game.js":
My Etch-a-sketch takes four buttons to control direction: P9_13, P9_11, P9_21, P9_17
and button P9_23 to clear the sketch area.

The 8x8 LED shows the gaming plot. The console will also print the plot.
Orange Color shows where is current cursor position.



Bo Pang, CM1222.
I have finished "Memory Map" activities and "MatrixLED" modification.

-----
"Memory Map"

My program uses GPIO3 and GPIO49 to control the LED on GPIO14 and GPIO 15.
Another button at GPIO5 help exiting the program smoothly.

Note that all the buttons use external pull-down.

Extra: I also tried the delay between input and output, using a C while loop.
Upon my measurement, the average delay is about 1us. When the execute another for loop simutanously,
The delay sometimes rises to 400us.

-----
"MatrixLED"

I modified the MatrixLED.html and css file to added another 8x8 table.
Then I modified the javascript file to let the new table control the Red LEDs.


Q&A:

1.	The message “matrix” is sent to the bone. What happens in response to the message?
boneServer.js is running, which opens the i2c connection as a socket. Then MatrixLED.js uses the socket to exchange data.
“Matrix” is a function in matrixLED.js that will be called when connect() is called. In function “matrix”, data is read from the LED over i2c and fed into variable “data”. The first “for” loop then extract green light information from “data” and put them into “disp”. The second “for” loop updates the display color on webpage’s matrix, by adding or removing “css” file defined class, which contains color information.

2.	What happens when an “LED” is clicked on in the browser?
An “LED” on the html page is actually a small object whose ID is “id=i+j”. When it is clicked, function “LEDclick” is called. Function “LEDclick” then updates “disp[]” data set, sends data to the LED array using “socket.emit”, and updates the display color on corresponding “LED button” on the webpage. 

3.	What entry in matrix.css is used to color the LED?
The matrixLED.css has an entry named “on” which defines color “#00ee00” which in RGB stands for relatively bright pure green.

4.	How you will control the two LEDs? What messages will be sent between the browser and the bone?
I implemented another 8x8 matrix on the webpage, which controls red LEDs. Thus, two matrices need to be taken care: one for green, another for red. Similarly, two matrices will generate two groups of 64 buttons, linked to two different “LEDclick” function. Another class represent red color is also added to the css file to support the new matrix.



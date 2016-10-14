Bo Pang, CM1222.
Boyu Zhang, CM1042.

HW06
-----
Our IR light locator and tracker:

The stepmotor.js contains everything we have. We uses:
P9_21 as the start button.
P9_11,13,15,16 to control the servo
P9_39,40 to read analog data.
P9_23 as the stop button.

Two IR sensor is wired on common Vcc, so our voltage sensing range from 0-0.2V,
instead of 1.8-1.6V.

Press the start button to search for maximum IR light. The motor to rotate back and stop at
where the most intense light come from.

After one second, the motor will continue tracking for light source.
If the two light sensor captures similar intensity, the motor will temporarily stop moving.
(threshold = 0.002)

Press the stop button to stop the process.



Bo Pang, CM1222.

HW07
-----


---
PRU:
--- 
main_pru0.c
I modified main_pru0.c to trigger R31 based on input from R30. 


---
Kernel Module: 
---
gpio_kernel.c
I modified gpio_kernel.c to link GPIO 115 with GPIO 113.
Then I added flag IRQF_TRIGGER_FALLING, to make it behave like a GPIO copier.


---
JavaScript using interrupt:
---
javascript_intr.js
I created javascript_intr.js to register a interrupt on P9_28.


---
C while loop
---
c_mmap.c
I created c_mmap.c to keep reading P9_28 and copy it to P9_27.


---
Result
---
Result is documented in HW07_result.PDF.

==========
Prof. Yoder's comments
Nice plots.  Min and Max times weren't reported.  %CPU was missing on some.

Grade:  9/10

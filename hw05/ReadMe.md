Bo Pang, CM1222.
I have finished hw05.

-----
"Makefile"
My makefile works on the bone. I uploaded the makefile.

-----
"Installing the Kernel Source"
I successfully installed the kernel on the kernel. Now its running on 4.4.23-bone14


-----
"Cross-Compiling"

The helloWorld running on Ubuntu X86:
pb@PB-Ubuntu:~/ECE497/hw05_kernel$ ./helloWorld 
Hello, World! Main is executing at 0x400596
This address (0x7ffcdb600a10) is in our stack frame
This address (0x601048) is in our bss section
This address (0x601040) is in our data section

The helloWorld running on Bone:
root@beaglebone:/# ./helloWorld
Hello, World! Main is executing at 0x10495
This address (0xbefbbbd0) is in our stack frame
This address (0x21038) is in our bss section
This address (0x2102c) is in our data section


-----
"Pushing to the Cloud"

I modified the javaScript to push the data to the cloud.
It will upload 2 temp sensor data every minute.

The javascript file 'temp101stream.js' is uploaded.





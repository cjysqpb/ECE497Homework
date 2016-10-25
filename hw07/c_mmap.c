/*
 * Using mmap to copy p9_28 to p9_27
 * Bo Pang
 * CM1222
 */

#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h> 
#include <signal.h>
#include <unistd.h> 

//Memory Locations
#define GPIO3_START_ADDR 0x481AE000
#define GPIO3_END_ADDR 0x481B0000
#define GPIO3_SIZE (GPIO3_END_ADDR - GPIO3_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

//P9_28 and P9_27
#define GPIO_113  (1<<17)
#define GPIO_115  (1<<19)


int main(){
    volatile void *gpio_addr;
    volatile unsigned int *gpio_oe_addr;
    volatile unsigned int *gpio_datain;
    volatile unsigned int *gpio_setdataout_addr;
    volatile unsigned int *gpio_cleardataout_addr;
    unsigned int reg;
    int fd;
    int BUT1;
    int OE_config;
    
    
    printf("TestRunC:\n");
    fd = open("/dev/mem", O_RDWR);
    gpio_addr = mmap(0, GPIO3_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO3_START_ADDR);
    
    // Calculate address
    gpio_oe_addr           = gpio_addr + GPIO_OE;
    gpio_datain            = gpio_addr + GPIO_DATAIN;
    gpio_setdataout_addr   = gpio_addr + GPIO_SETDATAOUT;
    gpio_cleardataout_addr = gpio_addr + GPIO_CLEARDATAOUT;
    
    printf("Running Program.......\n");
    
    OE_config = (~(GPIO_115)) ;
    *gpio_oe_addr = OE_config & (*gpio_oe_addr);
    printf ("OE Set to: %X, Re-read get: %X\n", OE_config, *gpio_oe_addr);
    
    // The main while loop
    while (1) {
        BUT1 = (*gpio_datain) & (GPIO_113);
        if (BUT1) {
            *gpio_setdataout_addr = GPIO_115;
        }else{
            *gpio_cleardataout_addr = GPIO_115;
        }
    }
    
    munmap((void *)gpio_addr, GPIO3_SIZE);
    close(fd);
    printf("Program Stopped\n");
    return 0;
}


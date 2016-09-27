/*
 * Using mmap to control buttons and LEDs
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

#define GPIO0_START_ADDR 0x44e07000
#define GPIO0_END_ADDR 0x44e09000
#define GPIO0_SIZE (GPIO0_END_ADDR - GPIO0_START_ADDR)

#define GPIO1_START_ADDR 0x4804C000
#define GPIO1_END_ADDR 0x4804e000
#define GPIO1_SIZE (GPIO1_END_ADDR - GPIO1_START_ADDR)

#define GPIO_OE 0x134
#define GPIO_DATAIN 0x138
#define GPIO_SETDATAOUT 0x194
#define GPIO_CLEARDATAOUT 0x190

#define GPIO_3  (1<<3)
#define GPIO_5  (1<<5)
#define GPIO_49  (1<<17)
#define GPIO_14  (1<<14)
#define GPIO_15  (1<<15)

int main(){
    volatile void *gpio_addr;
    volatile void *gpio_addr_1;
    volatile unsigned int *gpio_oe_addr;
    volatile unsigned int *gpio_datain;
    volatile unsigned int *gpio_datain_1;
    volatile unsigned int *gpio_setdataout_addr;
    volatile unsigned int *gpio_cleardataout_addr;
    unsigned int reg;
    int fd;
    int BUT1;
    int BUTexit;
    int BUT2;
    int OE_config;
    
    
    printf("TestRunC:\n");
    fd = open("/dev/mem", O_RDWR);
    gpio_addr = mmap(0, GPIO0_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO0_START_ADDR);
    gpio_addr_1 = mmap(0, GPIO1_SIZE, PROT_READ | PROT_WRITE, MAP_SHARED, fd, GPIO1_START_ADDR);
    
    gpio_oe_addr           = gpio_addr + GPIO_OE;
    gpio_datain            = gpio_addr + GPIO_DATAIN;
    gpio_datain_1          = gpio_addr_1 + GPIO_DATAIN;
    gpio_setdataout_addr   = gpio_addr + GPIO_SETDATAOUT;
    gpio_cleardataout_addr = gpio_addr + GPIO_CLEARDATAOUT;
    
    printf("Running Program.......\n");
    
    OE_config = (~(GPIO_14 | GPIO_15)) ;
    *gpio_oe_addr = OE_config & (*gpio_oe_addr);
    printf ("OE Set to: %X, Re-read get: %X\n", OE_config, *gpio_oe_addr);
    
    while (1) {
        BUT1 = (*gpio_datain) & (GPIO_3);
        BUTexit = (*gpio_datain) & (GPIO_5);
        BUT2 = (*gpio_datain_1) & (GPIO_49);
        if (BUT1) {
            *gpio_setdataout_addr = GPIO_14;
        }else{
            *gpio_cleardataout_addr = GPIO_14;
        }
        if (BUT2) {
            *gpio_setdataout_addr = GPIO_15;
        }else{
            *gpio_cleardataout_addr = GPIO_15;
        }
        if (BUTexit) {
            break;
        }
    }
    
    munmap((void *)gpio_addr, GPIO0_SIZE);
    munmap((void *)gpio_addr_1, GPIO1_SIZE);
    close(fd);
    printf("Program Stopped\n");
    return 0;
}


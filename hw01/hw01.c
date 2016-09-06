#include <stdio.h>
#include <curses.h>
#include <termios.h>
#include <unistd.h>
#include <string.h>

int length;
char data[100][100];

printNum(int num)
{
	if (length <= 10) {
		printf(" %d", num);
	} else if (num < 10){
		printf("0%d", num);
	} else {
		printf("%d", num);
	}
	
}

printDot(int i, int j)
{
	if (data[i][j]) {
		printf("X ");
	} else {
		printf("  ");
	}
}

/*
 *  Print everything on the screen.
 */
printAll()
{
	int i;
	int j;
	printf("   ");
	for (j = 0; j < length; j++) {
		printNum(j);
	}
	printf("\n");
	for (i = 0; i < length; i++) {
		printNum(i);
		printf(": ");
		for (j = 0; j < length; j++) {
			printDot(i, j);
		}
		printf("\n");
	}
}

/*
 * This is from Internet, to capture key stroke.
 */
int mygetch(void)
{
    struct termios oldt,newt;
    int ch;
    tcgetattr( STDIN_FILENO, &oldt );
    newt = oldt;
    newt.c_lflag &= ~( ICANON | ECHO );
    tcsetattr( STDIN_FILENO, TCSANOW, &newt );
    ch = getchar();
    tcsetattr( STDIN_FILENO, TCSANOW, &oldt );
    return ch;
}

/*
 * Etch-a-sketch game.
 */
main()
{
	int currenti;
	int	currentj;
	char input;
	bzero(&data, sizeof(char)*100*100);
	currenti = 0;
	currentj = 0;
	length = 0;
	printAll();
	printf("Welcome to Etch-a-sketch\n");
	
	//Set drawing size.
	while(1){
		printf("Set the size of DrawingPad (1-100): ");
		scanf("%d", &length);
		if (length > 0 && length <= 100)
			break;
	}
	
	//Switch key stroke.
	while(1){
		input = mygetch();
		switch (input) {
			case 'w':
				if (currenti > 0)
					currenti --;
				break;
				
			case 'a':
				if (currentj > 0)
					currentj --;
				break;
			
			case 's':
				if (currenti < length - 1)
					currenti ++;
				break;
			
			case 'd':
				if (currentj < length - 1)
					currentj ++;
				break;
				
			case 'c':
				bzero(&data, sizeof(char)*100*100);
				currenti = 0;
				currentj = 0;
				break;
				
			case 'e':
				printf("Program Ends\n");
				return 0;

			default:
				break;
		}
		data[currenti][currentj] = 1;
		printAll();
	}

	

}

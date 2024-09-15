#include <iostream>
#include <cmath>
#include <stdlib.h>    
#include <map>
// All measurements will be in meters or seconds
const double gravity { 9.81 };
int bulletInitialSpeed = {823};
int bulletSpeed;
double gunAngle {};
double bulletX {3};
double bulletY {20};
int targetPositionX {150};
int targetPositionY {0};
bool targetHit = false;



double quadratic(double a, double b, double c)
{
    double result = sqrt((b * b) - (4 * a * c));
    if(-b + result > -b - result)
    {
        result = (-b + result)/(2*a);
    } else{
        std::cout << "this shouldn't be possible to hit this side of the quadratic equation \n";
        result = (-b - result)/(2*a);
    }
    return result;
}

double degToRad(double angle)
{
    return ((angle * 3.14)/180);
}
double bulletMovement()
{
    double time = quadratic(gravity, (-2 * sin(gunAngle) * bulletInitialSpeed), (-2 * bulletY));
    double range = bulletInitialSpeed * cos(gunAngle) * time;
   
    return range; 
}

std::map<int, int> printCoords()
{
    std::map<int, int> screwMe {};
    double time = quadratic(gravity, (-2 * sin(gunAngle) * bulletInitialSpeed), (-2 * bulletY));
    int x = bulletX;
    double y {};

    while(x < targetPositionX)
    {
        y = (x * tan(gunAngle)) - ((gravity * x * x)/(2*bulletInitialSpeed*bulletInitialSpeed*cos(gunAngle) * cos(gunAngle))) + bulletY;
        // if(x % 10 == 0)
        // {
        //     std::cout << x << ", " << y << '\n';
        // }
        screwMe[x] = y;
        
        x = x + 1;

    }
    return screwMe;
}

bool shootBullet()
{
     
    double bulletYAtTarget = (targetPositionX * tan(gunAngle)) - ((gravity * targetPositionX * targetPositionX)/(2*bulletInitialSpeed*bulletInitialSpeed*cos(gunAngle) * cos(gunAngle))) + bulletY;
    if(bulletYAtTarget - targetPositionY < 2 && bulletYAtTarget - targetPositionY > 0)
    {
        //printCoords();
        // system("cls");
        std::cout << "You hit your target, your bullet went " << bulletMovement() << " meters \n";

        targetHit = true;
    } else
    {
        std::cout << "Missed, " << (bulletYAtTarget - targetPositionY) << " meters too high, your gun angle was " << (gunAngle * 180/3.14)<< "\n";
    }
    
    
    // if((bulletMovement() - targetPositionX) > -20 && (bulletMovement() - targetPositionX) < 20)
    // {
    //     //printCoords();
    //     system("cls");
    //     std::cout << "You hit your target, your bullet went " << bulletMovement() << " meters \n";

    //     targetHit = true;
    // } else
    // {
    //     std::cout << "Missed " << bulletMovement() << "\n";
    // }

    // while(bulletY >= 0)
    // {
    //     bulletMovement();
    //     std::cout << "Bullet xpos = " << bulletX << " Bullet ypos = " << bulletY << '\n';
    // }
    return true;
}

bool isGround()
{
    if(bulletY <= 0)
    {
        return true;
    }
    return false;
}


void createBuilding()
{
    int x = bulletX;
    int y = bulletY;
    int x1 = targetPositionX;
    int y1 = targetPositionY;
     for(int j = 30; j > 0; j--)
    {
        
        for(int i = 0; i < 155; i++)
        {
            if((j == (y-1)) && (i > 0 && i < 3) || (j == (y1 + 1)) && (i > 114 && i < 117))
            {
                std::cout << "_";
            }
            if((i == 0 || i == 4)  && j <= (y-2) || ((i *30) == (x1 - 2) || i == 114 || i == 118 || (i * 30) == (x1-2)) && j <= y1)
            {

                std::cout << "|";
            } else if(j == 1)
            {
                std::cout << "_";
            }else{
                std::cout << " ";
            }
        }
        std::cout << '\n';
        //std::cout << count;
    }
    // for(int j = 30; j > 0; j--)
    // {
        
    //     for(int i = 0; i < 155; i++)
    //     {
    //         if((j == (y + 1)) && (i > 0 && i < 3) || (j == (y1 + 1)) && (i > 114 && i < 117))
    //         {
    //             std::cout << "_";
    //         }
    //         // if((j == (y)) && (i > 0 && i < 3) || (j == (y1)) && (i > 114 && i < 117))
    //         // {
    //         //     std::cout << "|";
    //         // }
    //         if(((i == 0 || i == 4)  && j <= (y - 4)) || ((i *30) == (x1 - 2) || i == 114 || i == 118 || (i * 30) == (x1-2)) && j <= y1)
    //         {

    //             std::cout << "|";
    //         } else if(j == 1)
    //         {
    //             std::cout << "_";
    //         }else{
    //             std::cout << " ";
    //         }
    //     }
    //     std::cout << '\n';
    // }
}
void renderGame()
{
    system("cls");
    //createBuilding();
    // for(int i = 0; i < 157; i++)
    // {
    //     std::cout << "_";

    // }
    //std::cout << '\n';
}

void createLocations()
{
    srand (time(NULL));

  /* generate number between 1 and 10: */
    int randomNum = rand() % 10 + 20;
    std::cout << randomNum << '\n';
    bulletY = randomNum;
    randomNum = rand() % 10 + 10;
    targetPositionY = randomNum;
    std::cout << randomNum << '\n';
 
}

void printTrajectory()
{
    system("cls");
    std::map<int, int> bulletLocations = printCoords();
    int x = bulletX;
    int y = bulletY;
    int x1 = targetPositionX;
    int y1 = targetPositionY;
    int count {0};
    // for(int i = 0; i < 3300; i = i + 300)
    // {
    //     std::cout << bulletLocations[i] << " ";
    // }
    //std::cout << bulletLocations.at(1500);
    //std::cout << bulletLocations[1500];
    for(int j = 30; j > 0; j--)
    {
        
        for(int i = 0; i < 155; i++)
        {
                // std::cout << bulletLocations[i];
                // std::cout << j;
                if(bulletLocations[i] == j && (i <= 116 || !targetHit))
                {
                    if(!(bulletLocations[i] < targetPositionY && i > 113))
                    {
                        count = count + 1;
                        std::cout << "-";
                        continue;
                    }

                }
            if((j == (y-1)) && (i > 0 && i < 3) || (j == (y1 + 1)) && (i > 114 && i < 117))
            {
                std::cout << "_";
            }
            if((i == 0 || i == 4)  && j <= (y-2) || ((i *30) == (x1 - 2) || i == 114 || i == 118 || (i * 30) == (x1-2)) && j <= y1)
            {

                std::cout << "|";
            } else if(j == 1)
            {
                std::cout << "_";
            }else{
                std::cout << " ";
            }
        }
        std::cout << '\n';
        //std::cout << count;
    }
}

int main()
{
    system("cls");
    createLocations();
        renderGame();
        std::cout << "Enter angle above ground in degrees, your enemy is " << (targetPositionY  - bulletY) << " relative to you in height, and " << targetPositionX << " meters away" << std::endl;
        std::cin >> gunAngle;
        gunAngle = degToRad(gunAngle);
        shootBullet();

    while(!targetHit)
    {   
        system("cls");
        renderGame();
        printTrajectory();
        std::cout << "Missed " << bulletMovement() << "\n";
        shootBullet();
        std::cout << "Enter angle above ground in degrees your enemy is " << (targetPositionY - bulletY) << " relative to you in height, and " << targetPositionX << " meters away" << std::endl;
        std::cin >> gunAngle;
        gunAngle = degToRad(gunAngle);
        shootBullet();
    }

    // std::map<int, int> a = printCoords();

    printTrajectory();
    shootBullet();
    std::cout << "Target hit, your enemy was " << (targetPositionY - bulletY) << " relative to you in height, and " << targetPositionX << " meters away" << '\n';
    return 0;
}
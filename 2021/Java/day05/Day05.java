package day05;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;


public class Day05 {

    static int numberLines = 500;
    static int size = 1000;
    
    public static void main(String[] args) {

        int[][] diagram = new int[size][size];
        int[][] coords = new int[numberLines][4];

        try {

            parse(coords);

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(0);

        }

        partOne(coords, diagram);
        System.out.println("Partie 1 : il y a " + overlap(diagram) + " chevauchements");
        partTwo(coords, diagram);
        System.out.println("Partie  : il y a " + overlap(diagram) + " chevauchements");

    }

    private static void parse(int[][] coords) throws IOException {

        File file = new File("day05/day05.txt");
        Scanner scanner = new Scanner(file);

        int i = 0; // ligne

        while (scanner.hasNext()) {

            int j = 0; // colonne

            while (j != 4) {

                String[] element = scanner.next().split(",");

                for (String number: element) {
                    if (number.equals("->")) {
                        continue;
                    } else {
                        coords[i][j] = Integer.parseInt(number);
                        j++;
                    
                    }
                }
            }

            i++;
        }
        
        scanner.close();
    }

    private static void fill(int line, int col, int[][] diagram) {

        diagram[line][col]++;

    }

    private static int overlap(int[][] diagram) {

        int result = 0;

        for (int line = 0 ; line < size ; line++) {
            for (int col = 0 ; col < size ; col++) {

                if (diagram[line][col] > 1) {
                    result++;
                }
            }
        }
        
        return result;
    }

    private static void partOne(int[][] coords, int[][] diagram) {

        int x1, y1, x2, y2;
        for (int line = 0 ; line < numberLines ; line++) {
            x1 = coords[line][0];
            x2 = coords[line][2];
            y1 = coords[line][1];
            y2 = coords[line][3];

            // dans le cas d'un déplacement selon y
            if (x1 == x2) {
                if (y1 > y2) {
                
                    for (int y = y2 ; y <= y1 ; y++) {
                        fill(y, x1, diagram);
                    }
                } else if (y1 < y2) {
                    for (int y = y1 ; y <= y2 ; y++) {
                        fill(y, x1, diagram);
                    }
                }

            // dans le cas d'un déplacement selon x
            } else if (y1 == y2) {
                if (x1 > x2) {
                    for (int x = x2 ; x <= x1 ; x++) {
                        fill(y1, x, diagram);
                    }
                } else if (x1 < x2) {
                    for (int x = x1 ; x <= x2 ; x++) {
                        fill(y1, x, diagram);
                    }
                }
            }
        }
    }

    private static void partTwo(int[][] coords, int[][] diagram) {

        int x1, y1, x2, y2, x_d, y_d, x, y;
        for (int line = 0 ; line < numberLines ; line++) {
            x1 = coords[line][0];
            x2 = coords[line][2];
            y1 = coords[line][1];
            y2 = coords[line][3];

            // dans le cas d'un déplacement selon y
            if (x1 == x2) {
                continue;
            // dans le cas d'un déplacement selon x
            } else if (y1 == y2) {
                continue;
            // dans le cas d'un déplacement diagonal
            } else {
                if (x1 < x2) {
                    x_d = 1;

                } else if (x1 > x2) {
                    x_d = -1;

                } else {
                    x_d = 0;

                } if (y1 < y2) {
                    y_d = 1;

                } else if (y1 > y2) {
                    y_d = -1;

                } else {
                    y_d = 0;
                }

                x = x1;
                y = y1;

                while ((x != x2 + x_d) && (y != y2 + y_d)) {
                    fill(y, x, diagram);
                    x += x_d;
                    y += y_d;
                }
            }
        }
    }

}

package day06;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


public class Day06 {
    
    public static void main(String[] args) {

        long[] fishes = new long[9];
        
        try {

            parse(fishes);

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1);

        }

        partOne(fishes);
        System.out.println("Partie 1 : il y a " + sum(fishes) + " poissons au bout de 80 jours");

        partTwo(fishes);
        System.out.println("Partie 2 : il y a " + sum(fishes) + " poissons au bout de 256 jours");
    }

    private static void parse(long[] fishes) throws IOException {

        FileReader fileReader = new FileReader("day06/day06.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line = reader.readLine();
        String[] initialFishes = line.split(",");
        
        for (String fish: initialFishes) {

            fishes[Integer.parseInt(fish)]++;
        }

        reader.close();
    }

    private static long sum(long[] fishes) {

        long result = 0;
        for (long fish: fishes) {

            result += fish;
        }

        return result;
    }

    private static void partOne(long[] fishes) {

        int days = 80;
        long newFish;
        for (int day = 0 ; day < days ; day++) {
            newFish = fishes[0];

            fishes[0] = fishes[1];
            fishes[1] = fishes[2];
            fishes[2] = fishes[3];
            fishes[3] = fishes[4];
            fishes[4] = fishes[5];
            fishes[5] = fishes[6];
            fishes[6] = fishes[7] + newFish;
            fishes[7] = fishes[8];
            fishes[8] = newFish;
        }
    }

    private static void partTwo(long[] fishes) {

        int days = 256 - 80;
        long newFish;
        for (int day = 0 ; day < days ; day++) {
            newFish = fishes[0];

            fishes[0] = fishes[1];
            fishes[1] = fishes[2];
            fishes[2] = fishes[3];
            fishes[3] = fishes[4];
            fishes[4] = fishes[5];
            fishes[5] = fishes[6];
            fishes[6] = fishes[7] + newFish;
            fishes[7] = fishes[8];
            fishes[8] = newFish;
        }
    }

}

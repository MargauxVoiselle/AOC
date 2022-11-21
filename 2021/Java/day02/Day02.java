package day02;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;


public class Day02 {
    
    public static void main(String[] args) {
        
        try {

            partOne();
            partTwo();

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1); // le programme ne termine pas correctement

        }

    }

    private static void partOne() throws IOException {
        int forward = 0;
        int depth = 0;

        FileReader fileReader = new FileReader("day02/day02.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line = reader.readLine();

        while (line != null) {
            if (line.contains("forward")) {

                forward += Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));
    
            } else if (line.contains("down")) {

                depth += Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));

            } else if (line.contains("up")) {

                depth -= Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));

            }

            line = reader.readLine();
        }

        reader.close();

        System.out.println("Résultat partie 1 : " + forward * depth);
    }

    private static void partTwo() throws IOException {
        int forward = 0;
        int depth = 0;
        int aim = 0;

        FileReader fileReader = new FileReader("day02/day02.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line = reader.readLine();

        while (line != null) {
            if (line.contains("forward")) {

                forward += Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));
                depth += aim * Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));
    
            } else if (line.contains("down")) {

                aim += Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));

            } else if (line.contains("up")) {

                aim -= Integer.parseInt(String.valueOf(line.charAt(line.length() - 1)));

            }

            line = reader.readLine();
        }

        reader.close();

        System.out.println("Résultat partie 2 : " + forward * depth);
    }
}

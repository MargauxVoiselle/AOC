package day07;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class Day07 {
    
    public static void main(String[] args) {

        List<Integer> positions = new ArrayList<Integer>();

        try {

            parse(positions);

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1);

        }

        partOne(positions);
        partTwo(positions);
    }

    private static void parse(List<Integer> positions) throws IOException {

        FileReader fileReader = new FileReader("day07/day07.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line = reader.readLine();
        String[] horizontalPositions = line.split(",");

        for (String position: horizontalPositions) {
            positions.add(Integer.parseInt(position));
        }

        reader.close();
    }

    private static int max(List<Integer> positions) {

        int max = 0;
        for (Integer position: positions) {
            if (max < position) {
                max = position;
            }
        }

        return max;
    }

    private static int min(List<Integer> positions) {

        int min = positions.get(0);
        for (Integer position: positions) {
            if (min > position) {
                min = position;
            }
        }

        return min;
    }

    private static void partOne(List<Integer> positions) {

        int mini = min(positions);
        int maxi = max(positions);
        int[] fuel = new int[maxi - mini + 1];
        int j = 0;

        for (int i = mini ; i <= maxi ; i++) {
            for (Integer position: positions) {

                fuel[j] += Math.abs(position - i);
            }
            j++;
        }

        int result = fuel[0];
        for (int i = 1 ; i < maxi - mini + 1 ; i++) {
            if (result > fuel[i]) {
                result = fuel[i];
            }
        }

        System.out.println("Partie 1 : le minimum de fuel est " + result);
    }

    private static void partTwo(List<Integer> positions) {

        int mini = min(positions);
        int maxi = max(positions);
        int[] fuel = new int[maxi - mini + 1];
        int j = 0;

        for (int i = mini ; i <= maxi ; i++) {
            for (Integer position: positions) {
                for (int k = 1 ; k <= Math.abs(position - i) ; k++) {
                    
                    fuel[j] += k;
                }
            }
            j++;
        }

        int result = fuel[0];
        for (int i = 1 ; i < maxi - mini + 1 ; i++) {
            if (result > fuel[i]) {
                result = fuel[i];
            }
        }

        System.out.println("Partie 2 : le minimum de fuel est " + result);
    }
}

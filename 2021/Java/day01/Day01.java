package day01;

import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

public class Day01 {

    public static void main(String[] args) {

        List<Integer> depthMeasures = new ArrayList<Integer>();

        try {
        
            parse(depthMeasures);
            
        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1); // le programme ne termine pas correctement

        }

        partOne(depthMeasures);
        partTwo(depthMeasures);

    }

    private static void parse(List<Integer> depthMeasures) throws IOException {

        FileReader fileReader = new FileReader("day01/day0.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line;
        line = reader.readLine();

        while (line != null) {
            depthMeasures.add(Integer.parseInt(line));

            line = reader.readLine();
        }

        reader.close();

    }

    private static void partOne(List<Integer> depthMeasures) {

        int result = 0;

        for (int i = 0 ; i < depthMeasures.size() - 1 ; i++) {
            if (depthMeasures.get(i) < depthMeasures.get(i + 1)) {
                result++;
            }
        }

        System.out.println("Résultat partie 1 : " + result);

    }

    private static void partTwo(List<Integer> depthMeasures) {

        int result = 0;

        for (int i = 0 ; i < depthMeasures.size() - 3 ; i++) {
            if (depthMeasures.get(i) + depthMeasures.get(i + 1) + depthMeasures.get(i + 2) < depthMeasures.get(i + 1) + depthMeasures.get(i + 2) + depthMeasures.get(i + 3))
            {
                result++;
            }
        }

        System.out.println("Résultat partie 2 : " + result);
    }

}
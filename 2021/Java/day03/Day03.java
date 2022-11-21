package day03;

import java.util.List;
import java.util.ArrayList;
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.IOException;

public class Day03 {
    
    public static void main(String[] args) {

        List<String> binaryNumbers = new ArrayList<String>();
        List<String> gammaRate = new ArrayList<String>();
        List<String> epsilonRate = new ArrayList<String>();

        try {

            parse(binaryNumbers);

        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1); // le programme ne se termine pas correctement
        }
        
        partOne(binaryNumbers, gammaRate, epsilonRate);
        partTwo(binaryNumbers);


    }

    private static void parse(List<String> binaryNumbers) throws IOException {

        FileReader fileReader = new FileReader("day03/day03.txt");
        BufferedReader reader = new BufferedReader(fileReader);

        String line = reader.readLine();

        while (line != null) {
            binaryNumbers.add(line);

            line = reader.readLine();
        }

        reader.close();

    }

    private static void partOne(List<String> binaryNumbers, List<String> gammaRate, List<String> epsilonRate) {

        int mostCommon;

        for (int i = 0 ; i < binaryNumbers.get(0).length() ; i++) {
            
            mostCommon = mostCommonValue(binaryNumbers, i);

            if (mostCommon == 1) {

                gammaRate.add("1");
                epsilonRate.add("0");

            } else {

                gammaRate.add("0");
                epsilonRate.add("1");

            }

        }

        System.out.println("Résultats partie 1 :");
        System.out.println("Gamma vaut : " + binaryToDecimal(gammaRate));
        System.out.println("Epsilon vaut : " + binaryToDecimal(epsilonRate));
        System.out.println("Le produit vaut : " + binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate));

    }

    private static void partTwo(List<String> binaryNumbers) {

        int oxygen = findOxygen(binaryNumbers);
        int dioxyde = findDioxyde(binaryNumbers);
        System.out.println("Résultats partie 2 :");
        System.out.println("L'oxygène vaut : " + oxygen);
        System.out.println("Le CO2 vaut : " + dioxyde);
        System.out.println("Le produit vaut : " + oxygen * dioxyde);

    }

    private static int mostCommonValue(List<String> binaryNumbers, int index) {

        int countZero = 0;
        int countOne = 0;

        for (String binaryNumber: binaryNumbers) {

            if (Character.compare(binaryNumber.charAt(index), '1') == 0) {

                countOne++;

            } else {

                countZero++;

            }
        }

        if (countZero > countOne) {

            return 0;

        } else {

            return 1;

        }

    }

    private static int findOxygen(List<String> binaryNumbers) {

        // création d'une copie sur laquelle on va travailler
        List<String> oxygenRating = new ArrayList<String>();
        for (String binaryNumber: binaryNumbers) {

            oxygenRating.add(binaryNumber);

        }

        int indexBit = 0;
        int currentBit;

        while (oxygenRating.size() != 1) {

            currentBit = mostCommonValue(oxygenRating, indexBit);
            List<String> toRemove = new ArrayList<String>();

            if (currentBit == 1) {
                

                for (String binaryNumber: oxygenRating) {

                    if (binaryNumber.charAt(indexBit) == '0') {

                        toRemove.add(binaryNumber);

                    }
                }

                for (String binaryNumber: toRemove) {

                    oxygenRating.remove(binaryNumber);

                }
            } else {

                for (String binaryNumber: oxygenRating) {

                    if (binaryNumber.charAt(indexBit) == '1') {

                        toRemove.add(binaryNumber);

                    }
                }

                for (String binaryNumber: toRemove) {

                    oxygenRating.remove(binaryNumber);

                }
            }

            indexBit++;
        }

        List<String> toConvert = new ArrayList<String>();
        for (int i = 0 ; i < oxygenRating.get(0).length() ; i++) {

            toConvert.add((Character.toString(oxygenRating.get(0).charAt(i))));

        }

        return binaryToDecimal(toConvert);

    }

    private static int findDioxyde(List<String> binaryNumbers) {

        // création d'une copie sur laquelle on va travailler
        List<String> dioxydeRating = new ArrayList<String>();
        for (String binaryNumber: binaryNumbers) {

            dioxydeRating.add(binaryNumber);

        }

        int indexBit = 0;
        int currentBit;

        while (dioxydeRating.size() != 1) {

            currentBit = mostCommonValue(dioxydeRating, indexBit);
            List<String> toRemove = new ArrayList<String>();

            if (currentBit == 1) {
                

                for (String binaryNumber: dioxydeRating) {

                    if (binaryNumber.charAt(indexBit) == '1') {

                        toRemove.add(binaryNumber);

                    }
                }

                for (String binaryNumber: toRemove) {

                    dioxydeRating.remove(binaryNumber);

                }
            } else {

                for (String binaryNumber: dioxydeRating) {

                    if (binaryNumber.charAt(indexBit) == '0') {

                        toRemove.add(binaryNumber);

                    }
                }

                for (String binaryNumber: toRemove) {

                    dioxydeRating.remove(binaryNumber);

                }
            }

            indexBit++;
        }

        List<String> toConvert = new ArrayList<String>();
        for (int i = 0 ; i < dioxydeRating.get(0).length() ; i++) {

            toConvert.add((Character.toString(dioxydeRating.get(0).charAt(i))));

        }

        return binaryToDecimal(toConvert);

    }

    private static int binaryToDecimal(List<String> binary) {

        int result = 0;
        int i = 1;

        for (String bit: binary) {
            result += Integer.parseInt(bit) * (int) Math.pow(2.0, (double) binary.size() - i);
            i++;
        }

        return result;

    }
}

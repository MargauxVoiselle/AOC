package day08;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Day08 {
    
    public static void main(String[] args) {

        try {

            partOne();
            partTwo();

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1);
        }
    }

    private static int countCommon(String firstString, String secondString) {

        char[] first = firstString.toCharArray();
        char[] second = secondString.toCharArray();

        int charInCommon = 0;
        for (int i = 0 ; i < firstString.length() ; i++) {
            for (int j = 0 ; j < secondString.length() ; j++) {

                if (first[i] == second[j]) {
                    charInCommon++;
                }
            }
        }

        return charInCommon;
    }

    // fonction qui remet les lettres dans l'ordre
    private static String makeOrder(String stringToOrder) {

        char[] characters = stringToOrder.toCharArray();

        for (int i = 0 ; i < stringToOrder.length() ; i++) {
            for (int j = i + 1 ; j < stringToOrder.length() ; j++) {

                if (String.valueOf(characters[i]).compareTo(String.valueOf(characters[j])) > 0) {

                    char toReplace = characters[i];
                    characters[i] = characters[j];
                    characters[j] = toReplace;
                }
            }
        }

        String stringOrdered = "";
        for (int i = 0 ; i < stringToOrder.length() ; i++) {
            stringOrdered += characters[i];
        }

        return stringOrdered;
    }



    private static void partOne() throws IOException {
        FileReader fileReader = new FileReader("day08/day08.txt");
        BufferedReader reader = new BufferedReader(fileReader);
        int[] countDigits = new int[10];

        String line = reader.readLine();
        while (line != null) {

            String[] digits = line.split(" ");
            for (int i = 11 ; i < 15 ; i++) {

                if (digits[i].length() == 2) {
                    countDigits[1]++;
                } else if (digits[i].length() == 4) {
                    countDigits[4]++;
                } else if (digits[i].length() == 3) {
                    countDigits[7]++;
                } else if (digits[i].length() == 7) {
                    countDigits[8]++;
                }
            }
            line = reader.readLine();
        }
        reader.close();
        
        int sum = countDigits[1] + countDigits[4] + countDigits[7] + countDigits[8];
        System.out.println("Partie 1 : " + sum);
    }

    private static void partTwo() throws IOException {
        
        FileReader fileReader = new FileReader("day08/day08.txt");
        BufferedReader reader = new BufferedReader(fileReader);
        List<Integer> outputValues = new ArrayList<Integer>();

        String line = reader.readLine();
        while (line != null) {

            String[] digits = line.split(" ");

            String[] inputValues = new String[10];

            List<Integer> lastingDigits = new ArrayList<Integer>();
            int index = 0;

            // on trouve d'abord les digits reconnaissables (i.e. 1, 4, 7 et 8)
            for (int i = 0 ; i < 10 ; i++) {

                if (digits[i].length() == 2) {
                    inputValues[1] = digits[i];
                } else if (digits[i].length() == 4) {
                    inputValues[4] = digits[i];
                } else if (digits[i].length() == 3) {
                    inputValues[7] = digits[i];
                } else if (digits[i].length() == 7) {
                    inputValues[8] = digits[i];
                } else {
                    lastingDigits.add(i);
                }
            }

            while (inputValues[3] == null) {
                for (Integer i : lastingDigits) {

                    if ((digits[i].length() == 5) && (countCommon(digits[i], inputValues[1]) == 2)) {
                        inputValues[3] = digits[i];
                        index = i;
                        break;
                    }
                }
            }
            lastingDigits.remove(lastingDigits.indexOf(index));

            while (inputValues[9] == null) {
                for (Integer i : lastingDigits) {

                    if ((digits[i].length() == 6) && (countCommon(digits[i], inputValues[3]) == 5)) {
                        inputValues[9] = digits[i];
                        index = i;
                        break;
                    }
                }
            }
            lastingDigits.remove(lastingDigits.indexOf(index));

            while (inputValues[0] == null) {
                for (Integer i : lastingDigits) {

                    if ((digits[i].length() == 6) && (countCommon(digits[i], inputValues[7]) == 3)) {
                        inputValues[0] = digits[i];
                        index = i;
                        break;
                    }
                }
            }
            lastingDigits.remove(lastingDigits.indexOf(index));

            while (inputValues[5] == null) {
                for (Integer i : lastingDigits) {

                    if ((digits[i].length() == 5) && (countCommon(digits[i], inputValues[4]) == 3)) {
                        inputValues[5] = digits[i];
                        index = i;
                        break;
                    }
                }
            }
            lastingDigits.remove(lastingDigits.indexOf(index));

            while (inputValues[2] == null) {
                for (Integer i : lastingDigits) {

                    if (digits[i].length() == 5) {
                        inputValues[2] = digits[i];
                        index = i;
                        break;
                    }
                }
            }
            lastingDigits.remove(lastingDigits.indexOf(index));

            inputValues[6] = digits[lastingDigits.get(0)];

            String outputValue = "";
            for (int i = 11 ; i < 15 ; i++) {

                if (makeOrder(digits[i]).equals(makeOrder(inputValues[0]))) {
                    outputValue += "0";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[1]))) {
                    outputValue += "1";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[2]))) {
                    outputValue += "2";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[3]))) {
                    outputValue += "3";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[4]))) {
                    outputValue += "4";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[5]))) {
                    outputValue += "5";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[6]))) {
                    outputValue += "6";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[7]))) {
                    outputValue += "7";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[8]))) {
                    outputValue += "8";
                } else if (makeOrder(digits[i]).equals(makeOrder(inputValues[9]))) {
                    outputValue += "9";
                }
            }

            outputValues.add(Integer.parseInt(outputValue));
            line = reader.readLine();
        }
        reader.close();
        
        int sumLines = 0;
        for (Integer outputValue: outputValues) {
            sumLines += outputValue;
        }

        System.out.println("Partie 2 : " + sumLines);
    }
}


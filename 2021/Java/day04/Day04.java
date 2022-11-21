package day04;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;


public class Day04 {

    static int numberBoards = 100;
    static int boardsSize = 5;
    
    public static void main(String[] args) {

        int[][][] boards = new int[numberBoards][boardsSize][boardsSize];
        List<Integer> draw = new ArrayList<Integer>();

        try {

            parse(boards, draw);

        } catch (IOException e) {

            e.printStackTrace();
            System.exit(1);

        }

        partOne(boards, draw);
        partTwo(boards, draw);

    }

    private static void parse(int[][][] boards, List<Integer> draw) throws IOException {

        File file = new File("day04/day04.txt");
        Scanner scanner = new Scanner(file);

        String line = scanner.nextLine();

        // récupération du tirage
        String[] stringDraw = line.split(",");
        for (String number: stringDraw) {

            draw.add(Integer.parseInt(number));
            
        }

        // récupération des tableaux de bingo
        line = scanner.nextLine();
        int currentBoard = 0;

        while (scanner.hasNext()) {

            for (int i = 0 ; i < 5 ; i++) {

                for (int j = 0 ; j < 5 ; j++) {

                    boards[currentBoard][i][j] = scanner.nextInt();

                }
            }

            currentBoard++;
        }


        scanner.close();
    }

    private static void play(int draw, int[][][] boards) {

        for (int i = 0 ; i < numberBoards ; i++) {
            for (int j = 0 ; j < boardsSize ; j++) {
                for (int k = 0 ; k < boardsSize ; k++) {

                    if (boards[i][j][k] == draw) {

                        boards[i][j][k] = -1;

                    }
                }
            }
        }
    }

    private static boolean hasWin(int number, int[][][] boards) {
        
        int sum = 0;

        // test des sommes sur les lignes
        for (int i = 0 ; i < boardsSize ; i++) {
            for (int j = 0 ; j < boardsSize ; j++) {

                sum += boards[number][i][j];

            }
            if (sum == -5) {
                return true;
            }
            sum = 0;
        }

        // test des sommes sur les colonnes
        for (int j = 0 ; j < boardsSize ; j++) {
            for (int i = 0 ; i < boardsSize ; i++) {

                sum += boards[number][i][j];

            }

            if (sum == -5) {
                return true;
            }
            sum = 0;
        }

        return false;
    }

    private static boolean alreadyWon(int numberBoard, List<Integer> boardsWhichWon) {

        for (int board: boardsWhichWon) {
            if (board == numberBoard) {

                return true;
            }
        }

        return false;
    }

    private static int sumUnmarked(int number, int[][][] boards) {

        int sum = 0;
        for (int i = 0 ; i < boardsSize ; i++) {
            for (int j = 0 ; j < boardsSize ; j++) {
                if (boards[number][i][j] != -1) {
                    sum += boards[number][i][j];
                }
            }
        }
        
        return sum;
    }

    private static void partOne(int[][][] boards, List<Integer> draw) {

        boolean haveWinner = false;
        int i = 0;
        int numberWinner = 0;
        int number = 0;

        while (!(haveWinner)) {

            play(draw.get(i), boards);
            for (int numberBoard = 0 ; numberBoard < numberBoards ; numberBoard++) {
                if (hasWin(numberBoard, boards)) {

                    haveWinner = true;
                    numberWinner = numberBoard;
                    number = draw.get(i);

                    break;
                }
            }

            i++;
        }

        System.out.println("Résultat partie 1 : tableau numéro gagnant -> " + numberWinner);
        System.out.println("Résultat partie 1 : " + sumUnmarked(numberWinner, boards) * number);
    }

    private static void partTwo(int[][][] boards, List<Integer> draw) {

        int i = 0; // pour accéder aux numéros du tirage
        int numberWinner = 0; // pour retenir le tableau gagnant
        int countOfWinners = 0; // dénombre le nombre de tableaux gagnants
        int number = 0; // pour retenir le dernier numéro du tirage tiré

        List <Integer> boardsWhichWon = new ArrayList<Integer>(); // pour recenser les tableaux qui gagnent au fur et à mesure

        // on boucle tant qu'on n'a pas trouvé le dernier tableau gagnant
        while (countOfWinners < numberBoards) {

            number = draw.get(i);
            play(number, boards);

            for (int numberBoard = 0 ; numberBoard < numberBoards ; numberBoard++) {

                if (hasWin(numberBoard, boards)) {
                    if (!(alreadyWon(numberBoard, boardsWhichWon))) {

                        boardsWhichWon.add(numberBoard);
                        countOfWinners++;
                        numberWinner = numberBoard;
                    }
                }
            }

            i++;
        }

        System.out.println("Résultat partie 2 : tableau numéro gagnant -> " + numberWinner);
        System.out.println("Résultat partie 2 : " + sumUnmarked(numberWinner, boards) * number);
    }
}

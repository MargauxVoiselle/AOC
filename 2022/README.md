# [Advent Of Code 2022](https://adventofcode.com/2022/)

Implémentation des solutions pour l'Advent Of Code 2022 par Margaux Voiselle.

---

## Jour 1

- Objectif : Faire la somme des calories des aliments portés par chaque elfe et trouver l'elfe qui en porte le plus dans la première partie, les trois premiers elfes dans la seconde partie.
- Exemple d'input :

```text
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
```

- Difficulté(s) : Rien à signaler.
- Remarque(s) : Rien de spécial.

---

## Jour 2

- Objectif : Calculer le score obtenu à la fin des différentes rencontres entre les elfes (sachant que A = pierre, B = feuille et C = ciseaux) avec les règles X = pierre, Y = feuille et Z = ciseaux pour la première partie et X = perdre, Y = égalité et Z = gagner pour la seconde partie.
- Exemple d'input :

```text
A Y
B X
C Z
```

- Difficulté(s) : Rien à signaler.
- Remarque(s) : Utilisation des dictionnaires pour éviter les multiples déclinaisons de cas (permet donc de raccourcir le code).

---

## Jour 3

- Objectif : Repérer les répétitions d'item dans les différents compartiments (deux compartiments par sac) pour la première partie, dans les sacs des mêmes groupes d'elfes (3 elfes par groupe) dans la seconde partie.
- Exemple d'input :

```text
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
```

- Difficulté(s) : Rien à signaler.
- Remarque(s) : Utilisation des caractères ASCII et de leur code.

---

## Jour 4

- Objectif : Trouver les chevauchements complets des ID entre les paires pour la première partie, complets et partiels pour la seconde partie.
- Exemple d'input :

```text
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
```

- Difficulté(s) : Rien à signaler.
- Remarque(s) : Rien de spécial.

---

## Jour 5

- Objectif : Déplacer les caisses de colonne en colonne selon les instructions données (Last In, First Out) sans maintenir l'ordre pour la première partie et en maintenant l'ordre lorsque plus de 2 caisses sont déplacées dans la seconde partie.
- Exemple d'input :

```text
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
```

- Difficulté(s) : Le parsage de la première partie des données étant plutôt complexe, j'ai préféré les rentrer à la main dans un dictionnaire pour différencier les données de l'example et du puzzle et donc gagner du temps. En revanche, des données plus grandes auraient nécessité une automatisation car les rentrer à la main aurait été trop fastidieux.
- Remarque(s) : Rien de spécial.

---

## Jour 6

- Objectif : Trouver la première suite de 4 caractères différents dans la première partie, 14 caractères différents dans la seconde partie.
- Exemple d'input :

```text
mjqjpqmgbljsphdztnvjfqwrcgsmlb
```

- Difficulté(s) : Rien à signaler
- Remarque(s) : Utilisation des propriétés des ensembles pour trouver les éléments qui apparaissent plusieurs fois.

---

## Jour 7

- Objectif : Trouver la somme des tailles des répertoires dont la taille est inférieure à 100000 pour la première partie, la taille du plus petit des répertoires permettant d'obtenir une taille disponible de 30000000 pour la seconde partie.
- Exemple d'input :

```text
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
```

- Difficulté(s) : J'ai perdu beaucoup de temps car j'étais partie du principe que les noms de répertoire étaient uniques ce qui m'a demandé de changer mon approche initiale en incluant des id.
- Remarque(s) : Le niveau d'aujourd'hui était bien plus élevé que les jours précédents. L'utilisation de dictionnaire m'a permis de garder en mémoire pour chaque fichier ou répertoire son nom, son type, son id et l'id de son parent. Il fallait alors ensuite utiliser une fonction récursive pour trouver la taille de chaque répertoire.

---

## Jour 8 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 9 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 10 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 11 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 12 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 13 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 14 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 15 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 16 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 17 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 18 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 19 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 20 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 21 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 22 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 23 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 24 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

## Jour 25 (à venir)

- Difficulté(s) :
- Remarque(s) :

---

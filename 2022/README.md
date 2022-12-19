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

## Jour 8

- Objectif : Trouver le nombre d'arbres visibles depuis l'extérieur de la grille pour la première partie puis trouver l'arbre avec le score panoramique le plus élevé dans la seconde partie.

- Exemple d'input :

```text
30373
25512
65332
33549
35390
```

- Difficulté(s) : Rien à signaler

- Remarque(s) : J'ai perdu un petit peu de temps sur la deuxième partie avec les effets de bords si jamais l'arbre à l'extrémité était plus grand que celui d'où on se plaçait mais sinon rien de spécial.

---

## Jour 9

- Objectif : Trouver le nombre de positions différentes visitées par la queue de la corde ayant une longueur de 2 nœuds dans la première partie, 10 nœuds dans la seconde partie.

- Exemple d'input :

```text
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
```

- Difficulté(s) : J'ai eu des problèmes à supprimer les doublons d'indice dans la première partie lorsque je les stockais sous forme de tableau dans l'ensemble final.

- Remarque(s) : J'ai pu résoudre le problème des doublons en les incluant dans des chaînes de caractère. Il a également été nécessaire que je change mon implémentation lors de la seconde partie car j'étais partie du principe que la queue prenait la position de la tête avant mouvement.

---

## Jour 10

- Objectif : Suivre les instructions (addx met deux cycles à s'exécuter et ajoute au registre le paramètre donné et noop met un tour à s'exécuter mais ne fait rien) et trouver la somme des forces des signaux spécifié définies par le numéro du cycle multiplié par le registre associé pour la première partie, le message obtenu par le CRT dans la seconde partie.

- Exemple d'input :

```text
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
```

- Difficulté(s) : Rien à signaler.

- Remarque(s) : Rien de spécial.

---

## Jour 11

- Objectif : Trouver le niveau d'activité des singes après 20 tours dans la première partie et 10000 tours dans la seconde partie sachant qu'un niveau d'activité est défini par la multiplication des deux plus grands nombres de fois où les objets ont été inspectés par un singe.

- Exemple d'input :

```text
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0
```

- Difficulté(s) : J'ai eu l'impression que l'énoncé d'aujourd'hui ne donnait pas suffisamment d'indices pour la seconde partie et après de longues recherches, j'ai finalement vu qu'il fallait utiliser le théorème des restes chinois, les diviseurs étant premiers entre eux. En fait, je n'arrivais pas à comprendre comment "garder les niveaux d'inquiétude gérables".

- Remarque(s) : Je pense que rentrer les seules données qui servaient à la main aurait été plus rapide mais j'ai quand même pris le temps de parser les données initiales avec des expressions régulières de manière à ce que mon programme puisse fonctionner avec d'autres données.

---

## Jour 12

- Objectif : Calculer le plus court chemin jusqu'au sommet 'E' en partant de 'S' pour la première partie et le plus court chemin parmis tout ceux arrivant jusqu'à 'E' en partant de 'S' ou d'un des 'a' sachant que chaque lettre de l'alphabet présente un niveau d'élévation différent.

- Exemple d'input :

```text
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
```

- Difficulté(s) : La résolution de ce problème m'a pris beaucoup de temps car il a fallu que j'aille me renseigner sur les algorithmes A*, notamment sur le site [RedBlobGames](https://www.redblobgames.com/pathfinding/a-star/introduction.html). J'ai eu beaucoup de problèmes au début car je me compliquais la vie en essayant d'utiliser des Map pour retenir en mémoire les distances jusqu'aux différents points ainsi que le chemin complet. Attention à bien faire en sorte de se souvenir des chemins déjà vérifiés car sinon le programme n'aboutit pas ...

- Remarque(s) : J'ai perdu pas mal de temps sur la deuxième partie à essayer de comprendre mon erreur car je n'avais pas pris en compte le fait que certains chemins n'aboutissaient pas au sommet. Par ailleurs, j'ai appris à utiliser l'opérateur de chaînage optionnel '?.' qui s'est avéré très utile pour traiter les effets de bords.

---

## Jour 13

- Objectif : Trouver la somme des indices des paires de paquets bien ordonnées pour la première partie, ordonner les paquets en incluant les paquets [[2]], [[6]] et trouver la clé de décodage du signal d'alerte définie par le produit de leur indice dans la seconde partie.

- Exemple d'input :

```text
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]
```

- Difficulté(s) : L'utilisation de la fonction eval() m'a facilité le parsing des données qui aurait été bien plus fastidieux sinon.

- Remarque(s) : L'utilisation de la récursivité est la clé aujourd'hui de manière à pouvoir comparer quand il le faut les sous-listes.

---

## Jour 14

- Objectif : Trouver la quantité de sable qui peut stagner dans la grotte, sans qu'il existe de sol dans la première partie et avec un sol s'étendant à l'infini dans la seconde partie, sachant que des rochers sont présents dans la grotte selon les coordonnées données dans l'input.

- Exemple d'input :

```text
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
```

- Difficulté(s) : Rien de spécial.

- Remarque(s) : L'utilisation d'une table de hachage facilite le stockage des positions contenant un rocher ou un tas de sable.

---

## Jour 15

- Objectif : Trouver le nombre de positions sur une ligne donnée ne pouvant pas contenir de balise pour la première partie puis trouver la balise qui n'est détectée par aucun capteur dans la seconde partie.

- Exemple d'input :

```text
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
```

- Difficulté(s) : J'ai eu beaucoup de difficultés à me plonger dans la géométrie. Au début, j'ai foncé tête baissée sur une solution qui retenait la position de chaque balise et capteur et calculait au fur et à mesure le signal émis par chaque capteur ... En vain car cela s'est avéré fonctionner pour l'exemple de petite taille mais pas pour le puzzle car ce n'était juste plus calculable.

- Remarque(s) : La solution de la seconde partie est basée sur le fait qu'il n'existe qu'un point sur tout ceux présents qui n'est pas capté par l'ensemble des capteurs et donc nécessairement ce point est collé au cercle de Mannhattan de l'un des capteurs. On teste alors toutes les possibilités jusqu'à trouver la bonne ...

---

## Jour 16 (non terminé)

- Objectif : Pour la première partie, trouver le maximum de pression libérable en 30 minutes sachant qu'un déplacement et une ouverture de valve prennent une minute chacun.

- Exemple d'input :

```text
Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
Valve BB has flow rate=13; tunnels lead to valves CC, AA
Valve CC has flow rate=2; tunnels lead to valves DD, BB
```

- Difficulté(s) : Jour le plus compliqué et de loin ... J'ai passé de longues heures à coder des solutions qui finissaient par ne pas aboutir car trop longues.

- Remarque(s) : Je n'ai pas trouvé de manière de réussir ce problème. La solution que j'ai implémenté fonctionne bien pour l'exemple donné mais pas pour le puzzle, tout du moins le programme ne peut pas terminer.

---

## Jour 17

- Objectif : Trouver la taille de la tour de rochers après la chute de 2022 rochers pour la première partie, 1000000000000 pour la seconde partie.

- Exemple d'input :

```text
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
```

- Difficulté(s) : Il a été compliqué de trouver la bonne manière de repérer un cycle dans la seconde partie.

- Remarque(s) : Un cycle est repérable lorsqu'on tombe sur deux états représentant la chute d'un rocher de même type, poussé dans la même direction avec les précédentes lignes des deux états identiques. Mon programme met tout de même une dizaine de seconde à s'exécuter lorsqu'il faut faire tomber les 1000000000000 rochers.

---

## Jour 18

- Objectif : Calculer la surface totale balayée par la lave dans la première partie, la surface extérieure dans la seconde partie.

- Exemple d'input :

```text
2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
```

- Difficulté(s) : Ma première tentative sur la seconde partie a été de calculer la surface de la première partie et en retirant les cubes intérieurs possédant 6 voisins mais cela n'a évidemment pas fonctionné. Il m'a été nécessaire d'aller jeter un coup d'œil au principe de l'algorithme BFS sur le site [RedBlobGames](https://www.redblobgames.com/pathfinding/a-star/introduction.html) afin de réaliser la seconde partie.

- Remarque(s) : La première partie était bien plus accessible que les problèmes des derniers jours. Pour la seconde partie, le principe est de partir d'un coin de la zone et de trouver toutes les positions accessibles depuis avec un algorithme BFS puis de soustraire à cette zone la surface intérieure.

---

## Jour 19

- Objectif : Déterminer le nombre maximum de géodes pouvant être produites en 24 minutes pour la première partie, 32 minutes pour la seconde partie (en considérant tous les plans dans la première partie et seulement les 3 premiers dans la seconde).

- Exemple d'input :

```text
Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.
```

- Difficulté(s) : J'ai trouvé qu'il était compliqué de trouver une manière d'aborder le problème de manière optimisée. Il était aussi facile de se perdre entre toutes les variables à gérer.

- Remarque(s) : J'ai considéré qu'on produisait une géode (le matériau recherché) dès que c'était possible et qu'on arrêtait de produire un robot dès qu'on avait assez de son matériau nécessaire à la construction des autres robots en une minute.

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

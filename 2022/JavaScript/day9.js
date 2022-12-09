import * as fs from 'fs';

const timer = (script, input, numberKnots) => {
    let start = performance.now();
    script(input, numberKnots);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const moveKnot = (childCoord, parentCoord) => {
    if (Math.abs(childCoord.x - parentCoord.x) < 2 && Math.abs(childCoord.y - parentCoord.y) < 2) {
        return { x: childCoord.x, y: childCoord.y };
    }
    if (childCoord.x != parentCoord.x) {
        if (childCoord.x > parentCoord.x) childCoord.x--;
        else childCoord.x++;
    }
    if (childCoord.y != parentCoord.y) {
        if (childCoord.y > parentCoord.y) childCoord.y--;
        else childCoord.y++;
    }
    return { x: childCoord.x, y: childCoord.y };
};

const solvePart = (input, numberKnots) => {
    let coordKnots = [];
    for (let count = 0; count < numberKnots; count++) {
        coordKnots.push({ x: 0, y: 0 });
    }
    const result = new Set().add(coordKnots[0].x.toString() + ' ' + coordKnots[0].y.toString());
    input.forEach((instruction) => {
        for (let loop = 0; loop < Number(instruction[1]); loop++) {
            switch (instruction[0]) {
                case 'R':
                    coordKnots[0].x++;
                    break;
                case 'L':
                    coordKnots[0].x--;
                    break;
                case 'U':
                    coordKnots[0].y++;
                    break;
                case 'D':
                    coordKnots[0].y--;
                    break;
            }
            for (let knot = 1; knot < numberKnots; knot++) {
                coordKnots[knot] = moveKnot(coordKnots[knot], coordKnots[knot - 1]);
            }
            if (!result.has(coordKnots[numberKnots - 1].x.toString() + ' ' + coordKnots[numberKnots - 1].y.toString()))
                result.add(coordKnots[numberKnots - 1].x.toString() + ' ' + coordKnots[numberKnots - 1].y.toString());
        }
    });
    return result.size;
};

['example9.txt', 'puzzle9.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((instruction) => instruction.split(' '));
    console.log(
        `Result of part one for ${file} : ` + solvePart(input, 2) + ` (executed in ${timer(solvePart, input, 2)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` + solvePart(input, 10) + ` (executed in ${timer(solvePart, input, 10)} ms)`
    );
});

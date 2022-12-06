import * as fs from 'fs';

const timer = (script, input, mark) => {
    let start = performance.now();
    script(input, mark);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const solveParts = (input, mark) => {
    let i = mark;
    const signal = [];
    for (let i = 0; i < mark; i++) {
        signal.push(input[i]);
    }
    while (i < input.length) {
        const distinct = new Set(signal);
        if (
            signal.filter((item) => {
                if (distinct.has(item)) {
                    distinct.delete(item);
                } else {
                    return item;
                }
            }).length == 0
        ) {
            return i;
        }
        signal.push(input[i]);
        signal.shift();
        i++;
    }
};

['example6.txt', 'puzzle6.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('');
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 4) + ` (executed in ${timer(solveParts, input, 4)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            solveParts(input, 14) +
            ` (executed in ${timer(solveParts, input, 14)} ms)`
    );
});

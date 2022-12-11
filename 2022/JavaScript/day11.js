import * as fs from 'fs';

const timer = (script, input, numberRounds) => {
    let start = performance.now();
    script(input, numberRounds);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const parse = (input) => {
    const entries = [];
    input.forEach((note) => {
        const monkey = {};
        note.forEach((line, i) => {
            if (i === 0) monkey['id'] = Number(line.trim().replace(/Monkey |\:/, '')[0]);
            else if (i === 1)
                monkey['items'] = line
                    .trim()
                    .replace(/Starting items: /, '')
                    .split(', ')
                    .map((item) => Number(item));
            else if (i === 2)
                monkey['operation'] = line
                    .trim()
                    .replace(/Operation: new = old /, '')
                    .split(' ');
            else if (i === 3) monkey['divisible'] = Number(line.trim().replace(/Test: divisible by /, ''));
            else if (i === 4) monkey['trueId'] = Number(line.trim().replace(/If true: throw to monkey /, '')[0]);
            else if (i === 5) monkey['falseId'] = Number(line.trim().replace(/If false: throw to monkey /, '')[0]);
        });
        monkey['inspection'] = 0;
        entries.push(monkey);
    });
    return entries;
};

const solveParts = (input, numberRounds) => {
    const entries = parse(input);
    let divisor = 1;
    if (numberRounds === 10000) {
        for (let entry of entries) {
            divisor *= entry.divisible;
        }
    } else divisor = 3;
    for (let round = 0; round < numberRounds; round++) {
        for (let entry of entries) {
            let itemsToPop = 0;
            for (let item of entry.items) {
                itemsToPop++;
                entry.inspection++;
                if (entry.operation[0] === '*')
                    if (entry.operation[1] === 'old') {
                        if (numberRounds === 10000) item = Math.floor((item * item) % divisor);
                        else item = Math.floor((item * item) / divisor);
                    } else {
                        if (numberRounds === 10000) item = Math.floor((item * Number(entry.operation[1])) % divisor);
                        else item = Math.floor((item * Number(entry.operation[1])) / divisor);
                    }
                else if (entry.operation[0] === '+')
                    if (entry.operation[1] === 'old') {
                        if (numberRounds === 10000) item = Math.floor((item + item) % divisor);
                        else item = Math.floor((item + item) / divisor);
                    } else {
                        if (numberRounds === 10000) item = Math.floor((item + Number(entry.operation[1])) % divisor);
                        else item = Math.floor((item + Number(entry.operation[1])) / divisor);
                    }
                if (item % entry.divisible === 0) {
                    entries.find((monkey) => monkey.id === entry.trueId).items.push(item);
                } else {
                    entries.find((monkey) => monkey.id === entry.falseId).items.push(item);
                }
            }
            for (let i = 0; i < itemsToPop; i++) entry.items.shift();
        }
    }
    let result = [];
    for (let entry of entries) {
        result.push(entry.inspection);
    }
    result.sort(function (a, b) {
        return a - b;
    });
    return result[result.length - 1] * result[result.length - 2];
};

['example11.txt', 'puzzle11.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n\n')
        .map((monkey) => monkey.split('\n'));
    console.log(
        `Result of part one for ${file} : ` +
            solveParts(input, 20) +
            ` (executed in ${timer(solveParts, input, 20)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            solveParts(input, 10000) +
            ` (executed in ${timer(solveParts, input, 10000)} ms)`
    );
});

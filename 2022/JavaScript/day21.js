import * as fs from 'fs';

const timer = (script, input, part) => {
    let start = performance.now();
    script(input, part);
    let end = performance.now();
    return (end - start).toFixed(2);
};

class Monkey {
    constructor(name, yell) {
        this.name = name;
        this.type = Number.isInteger(yell)
            ? 'number'
            : yell[1] === '+'
            ? 'addition'
            : yell[1] === '-'
            ? 'difference'
            : yell[1] === '*'
            ? 'product'
            : 'division';
        this.yell = this.type === 'number' ? yell : [yell[0], yell[2]];
    }
}

const parse = (input) => {
    const monkeys = new Map();
    input.forEach((monkey) => monkeys.set(monkey[0], new Monkey(monkey[0], monkey[1])));
    return monkeys;
};

const solveParts = (input, part) => {
    const monkeys = parse(input);

    const calculate = (name) => {
        if ((name !== 'root' && part === 2) || part === 1) {
            if (monkeys.get(name).type === 'number') return monkeys.get(name).yell;
            let first = calculate(monkeys.get(name).yell[0]);
            let second = calculate(monkeys.get(name).yell[1]);
            if ((name !== 'root' && name !== 'humn' && part === 2) || part === 1)
                switch (monkeys.get(name).type) {
                    case 'addition':
                        return first + second;
                    case 'difference':
                        return first - second;
                    case 'product':
                        return first * second;
                    case 'division':
                        return first / second;
                }
        } else {
            monkeys.set('humn', new Monkey('humn', 1));
            let first = calculate(monkeys.get(name).yell[0]);
            let second = calculate(monkeys.get(name).yell[1]);
            let interval = [0, 0];
            let sign = first > second;
            while (first !== second) {
                if (first > second === sign) {
                    interval[0] = monkeys.get('humn').yell;
                    interval[1] = monkeys.get('humn').yell * 2;
                    monkeys.set('humn', new Monkey('humn', monkeys.get('humn').yell * 2));
                } else {
                    break;
                }
                first = calculate(monkeys.get(name).yell[0]);
                second = calculate(monkeys.get(name).yell[1]);
            }
            while (first !== second) {
                let current = Math.ceil(interval[1] - (interval[1] - interval[0]) / 2);
                monkeys.set('humn', new Monkey('humn', current));
                first = calculate(monkeys.get(name).yell[0]);
                second = calculate(monkeys.get(name).yell[1]);
                if (first > second === sign) {
                    interval = [current, interval[1]];
                } else {
                    interval = [interval[0], current];
                }
            }

            return monkeys.get('humn').yell;
        }
    };

    return calculate('root');
};

['example21.txt', 'puzzle21.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .split('\n')
        .map((instruction) => instruction.split(': '))
        .map((instruction) => [
            instruction[0],
            instruction[1].match(/[+-/*]/)?.length > 0 ? instruction[1].split(' ') : Number(instruction[1]),
        ]);
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 1) + ` (executed in ${timer(solveParts, input, 1)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` + solveParts(input, 2) + ` (executed in ${timer(solveParts, input, 2)} ms)`
    );
});

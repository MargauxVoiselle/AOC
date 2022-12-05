import * as fs from 'fs';

const timer = (script, instructions, crates) => {
    let start = performance.now();
    script(instructions, crates);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input, initialCrates) => {
    const crates = new Array();
    for (let i = 0; i < initialCrates.length; i++) {
        const list = new Array();
        for (let j = 0; j < initialCrates[i].length; j++) {
            list.push(initialCrates[i][j]);
        }
        crates.push(list);
    }
    for (let instruction of input) {
        for (let i = 0; i < instruction[0]; i++) {
            let element = crates[instruction[1]].pop();
            crates[instruction[2]].push(element);
        }
    }
    let result = '';
    for (let i = 1; i < crates.length; i++) {
        result += crates[i][crates[i].length - 1];
    }
    return result;
};

const partTwo = (input, initialCrates) => {
    const crates = new Array();
    for (let i = 0; i < initialCrates.length; i++) {
        const list = new Array();
        for (let j = 0; j < initialCrates[i].length; j++) {
            list.push(initialCrates[i][j]);
        }
        crates.push(list);
    }
    for (let instruction of input) {
        if (instruction[0] == 1) {
            let element = crates[instruction[1]].pop();
            crates[instruction[2]].push(element);
        } else {
            const cratesToMove = [];
            for (let i = 0; i < instruction[0]; i++) {
                let element = crates[instruction[1]].pop();
                cratesToMove.push(element);
            }
            for (let i = 0; i < instruction[0]; i++) {
                let element = cratesToMove.pop();
                crates[instruction[2]].push(element);
            }
        }
    }
    let result = '';
    for (let i = 1; i < crates.length; i++) {
        result += crates[i][crates[i].length - 1];
    }
    return result;
};

['example5.txt', 'puzzle5.txt'].forEach((file) => {
    let instructions = fs.readFileSync(`../data/${file}`, 'utf-8').split('\n\n');
    instructions.shift();
    instructions[0] = instructions[0].split('\n');
    instructions = instructions
        .flat()
        .map((list) => list.split(/move | from | to /))
        .map((list) => list.filter((instruction) => instruction != ''));
    let crates = {
        'example5.txt': [[], ['Z', 'N'], ['M', 'C', 'D'], ['P']],
        'puzzle5.txt': [
            [],
            ['L', 'N', 'W', 'T', 'D'],
            ['C', 'P', 'H'],
            ['W', 'P', 'H', 'N', 'D', 'G', 'M', 'J'],
            ['C', 'W', 'S', 'N', 'T', 'Q', 'L'],
            ['P', 'H', 'C', 'N'],
            ['T', 'H', 'N', 'D', 'M', 'W', 'Q', 'B'],
            ['M', 'B', 'R', 'J', 'G', 'S', 'L'],
            ['Z', 'N', 'W', 'G', 'V', 'B', 'R', 'T'],
            ['W', 'G', 'D', 'N', 'P', 'L'],
        ],
    };
    console.log(
        `Result of part one for ${file} : ` +
            partOne(instructions, crates[file]) +
            ` (executed in ${timer(partOne, instructions, crates[file])} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            partTwo(instructions, crates[file]) +
            ` (executed in ${timer(partTwo, instructions, crates[file])} ms)`
    );
});

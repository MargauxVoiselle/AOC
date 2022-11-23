import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    input = input.map((instruction) => [instruction.slice(0, 3), instruction.slice(4, 5), instruction.slice(5)]);
    let executed = [];
    let i = 0;
    let result = 0;
    while (!executed.includes(i)) {
        executed.push(i);
        switch (input[i][0]) {
            case 'nop':
                i += 1;
                break;
            case 'acc':
                if (input[i][1] === '+') {
                    result += Number(input[i][2]);
                } else {
                    result -= Number(input[i][2]);
                }
                i += 1;
                break;
            case 'jmp':
                if (input[i][1] === '+') {
                    i += Number(input[i][2]);
                } else {
                    i -= Number(input[i][2]);
                }
                break;
        }
    }
    return result;
};

const partTwo = (input) => {
    input = input.map((instruction) => [instruction.slice(0, 3), instruction.slice(4, 5), instruction.slice(5)]);
    let j = 0;
    let executed = [];

    let possibleChange = [];
    for (const instruction of input) {
        if (instruction[0] === 'jmp' || instruction[0] == 'nop') {
            possibleChange.push(input.indexOf(instruction));
        }
    }

    while (!executed.includes(input.length - 1)) {
        let result = 0;
        let i = 0;
        executed = [];
        let toChange = possibleChange[j];

        while (!executed.includes(i) && i < input.length) {
            executed.push(i);
            if (i === toChange) {
                switch (input[i][0]) {
                    case 'nop':
                        if (input[i][1] === '+') {
                            i += Number(input[i][2]);
                        } else {
                            i -= Number(input[i][2]);
                        }
                        break;
                    case 'jmp':
                        i += 1;
                        break;
                }
            } else {
                switch (input[i][0]) {
                    case 'nop':
                        i += 1;
                        break;
                    case 'acc':
                        if (input[i][1] === '+') {
                            result += Number(input[i][2]);
                        } else {
                            result -= Number(input[i][2]);
                        }
                        i += 1;
                        break;
                    case 'jmp':
                        if (input[i][1] === '+') {
                            i += Number(input[i][2]);
                        } else {
                            i -= Number(input[i][2]);
                        }
                        break;
                }
            }
        }
        j++;
    }
    return result;
};

['example8.txt', 'puzzle8.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

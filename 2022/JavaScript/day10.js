import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const signalStrength = new Map([
        [20, 0],
        [60, 0],
        [100, 0],
        [140, 0],
        [180, 0],
        [220, 0],
    ]);
    let signal = 0;
    let register = 1;
    input.forEach((instruction) => {
        if (instruction[0] === 'noop') {
            signal++;
            if (signalStrength.has(signal)) signalStrength.set(signal, register);
        } else {
            for (let i = 0; i < 2; i++) {
                signal++;
                if (signalStrength.has(signal)) signalStrength.set(signal, register);
            }
            register += Number(instruction[1]);
        }
    });
    let result = 0;
    for (let [signal, register] of signalStrength) {
        result += signal * register;
    }
    return result;
};

const partTwo = (input) => {
    const signalStrength = new Set([40, 80, 120, 160, 200, 240]);
    let signal = 0;
    let register = 1;
    let CRT = '\n';
    input.forEach((instruction) => {
        if (instruction[0] === 'noop') {
            signal++;
            CRT += [register - 1, register, register + 1].includes(signal - 1) ? '#' : '.';
            if (signalStrength.has(signal)) {
                CRT += '\n';
                signal = 0;
            }
        } else {
            for (let i = 0; i < 2; i++) {
                signal++;
                CRT += [register - 1, register, register + 1].includes(signal - 1) ? '#' : '.';
                if (signalStrength.has(signal)) {
                    CRT += '\n';
                    signal = 0;
                }
            }
            register += Number(instruction[1]);
        }
    });
    return CRT;
};

['example10.txt', 'puzzle10.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((instruction) => instruction.split(' '));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    input = input.map((list) => list.split(/\s|/)).map((list) => list.filter((x, i) => list.indexOf(x) === i).length);
    return input.reduce((acc, cur) => acc + cur, 0);
};

const partTwo = (input) => {
    const value = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    var peoplePerGroup = input
        .map((list) => list.split(''))
        .map((list) => list.filter((char) => char === '\n').length + 1);

    input = input.map((list) => list.split(/\s|/));

    return input
        .map(
            (list) =>
                value.filter(
                    (char) => list.filter((element) => element === char).length == peoplePerGroup[input.indexOf(list)]
                ).length
        )
        .reduce((acc, cur) => acc + cur, 0);
};

['example6.txt', 'puzzle6.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

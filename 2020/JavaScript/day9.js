import * as fs from 'fs';

const timer = (script, input, sizePreamble) => {
    var start = performance.now();
    script(input, sizePreamble);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const isSum = (number, data) => {
    return data.filter((x) => data.includes(number - x)).length >= 2;
};

const partOne = (input, sizePreamble) => {
    var preamble = Array.from({ length: sizePreamble }, (_v, i) => input[i]);
    var i = sizePreamble;
    while (isSum(input[i], preamble)) {
        preamble.push(input[i]);
        preamble.shift();
        i++;
    }
    return input[i];
};

const partTwo = (input, sizePreamble) => {
    const invalidNumber = partOne(input, sizePreamble);
    const list = Array.from({ length: input.indexOf(invalidNumber) }, (_v, i) => input[i]);
    var i = 0;
    var sum = 0;
    while (sum != invalidNumber) {
        var bottom = list[i];
        var top = list[i];
        sum = 0;
        var j = i;
        while (sum < invalidNumber) {
            if (list[j] < bottom) {
                bottom = list[j];
            } else if (list[j] > top) {
                top = list[j];
            }
            sum += list[j];
            j++;
        }
        i++;
    }
    return bottom + top;
};

['example9.txt', 'puzzle9.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n').map(Number);
    if (file === 'example9.txt') {
        var sizePreamble = 5;
    } else {
        var sizePreamble = 25;
    }
    console.log(
        `Result of part one for ${file} : ` +
            partOne(input, sizePreamble) +
            ` (executed in ${timer(partOne, input, sizePreamble)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` +
            partTwo(input, sizePreamble) +
            ` (executed in ${timer(partTwo, input, sizePreamble)} ms)`
    );
});

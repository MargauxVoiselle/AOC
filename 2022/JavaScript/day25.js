import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const digits = { 2: 2, 1: 1, 0: 0, '-': -1, '=': -2 };

const getDecimal = (SNAFU) => {
    let decimal = 0;
    SNAFU.forEach((digit, i) => {
        decimal += digits[digit] * Math.pow(5, SNAFU.length - 1 - i);
    });
    return decimal;
};

const getSNAFU = (decimal) => {
    let SNAFU = '';
    if (decimal === 0) SNAFU = 0 + SNAFU;
    else {
        while (decimal !== 0) {
            let rest = decimal % 5;
            switch (rest) {
                case 3:
                    SNAFU = '=' + SNAFU;
                    decimal += 5;
                    break;
                case 4:
                    SNAFU = '-' + SNAFU;
                    decimal += 5;
                    break;
                default:
                    SNAFU = rest + SNAFU;
                    break;
            }
            decimal = Math.floor(decimal / 5);
        }
    }
    return SNAFU;
};

const partOne = (input) => {
    let sum = 0;
    input.forEach((SNAFU) => {
        sum += getDecimal(SNAFU);
    });
    return getSNAFU(sum);
};

['example25.txt', 'puzzle25.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((data) => data.split(''));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    // console.log(`Result of part one for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    const requirements = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    return input.filter((list) => requirements.every((key) => list.includes(key))).length;
};

const matchCriteria = (key, value) => {
    if (key === 'byr' && 1920 <= Number(value) && Number(value) <= 2002) {
        return true;
    } else if (key === 'iyr' && 2010 <= Number(value) && Number(value) <= 2020) {
        return true;
    } else if (key === 'eyr' && 2020 <= Number(value) && Number(value) <= 2030) {
        return true;
    } else if (key === 'hgt') {
        if (value[value.length - 1] === 'm' && 150 <= Number(value.slice(0, -2)) && Number(value.slice(0, -2)) <= 193) {
            return true;
        } else if (
            value[value.length - 1] === 'n' &&
            59 <= Number(value.slice(0, -2)) &&
            Number(value.slice(0, -2)) <= 76
        ) {
            return true;
        } else {
            return false;
        }
    } else if (
        key === 'hcl' &&
        value[0] === '#' &&
        value.length === 7 &&
        value
            .slice(1)
            .split('')
            .every((char) =>
                ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'].includes(char)
            )
    ) {
        return true;
    } else if (key === 'ecl' && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)) {
        return true;
    } else if (
        key === 'pid' &&
        value.length === 9 &&
        value.split('').every((char) => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char))
    ) {
        return true;
    } else {
        return false;
    }
};

const validate = (list, requirements) => {
    return (
        list.filter((key) => {
            if (!requirements.includes(key)) {
                return false;
            } else {
                var value = list[list.indexOf(key) + 1];
                return matchCriteria(key, value);
            }
        }).length == requirements.length
    );
};

const partTwo = (input) => {
    const requirements = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    const result = input.filter((list) => requirements.every((key) => list.includes(key)));
    return result.filter((list) => validate(list, requirements)).length;
};

['example4.txt', 'puzzle4.txt'].forEach((file) => {
    const regularExp = /\n\n/;
    const separator = /\s|\:/;
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split(regularExp)
        .map((list) => list.split(separator));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

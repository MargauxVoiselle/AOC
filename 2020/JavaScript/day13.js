import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const partOne = (input) => {
    let result = input[1].map((busID) => {
        let depart = 0;
        while (depart < input[0]) {
            depart += busID;
        }
        return depart;
    });
    let nearestDepart = Math.min(...result);
    return (nearestDepart - input[0]) * input[1][result.indexOf(nearestDepart)];
};

['example13.txt', 'puzzle13.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    input[0] = Number(input[0]);
    input[1] = input[1]
        .split(',')
        .filter((busID) => busID != 'x')
        .map((busID) => Number(busID));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    // console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

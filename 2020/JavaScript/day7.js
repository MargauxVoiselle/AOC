import * as fs from 'fs';

const timer = (script, input) => {
    var start = performance.now();
    script(input);
    var end = performance.now();
    return (end - start).toFixed(2);
};

const search = (toSearch, input) => {
    for (var list of input) {
        if (list[1].filter((color) => toSearch.includes(color)).length > 0 && !toSearch.includes(list[0])) {
            toSearch.push(list[0]);
        }
    }
    return toSearch;
};

const partOne = (input) => {
    input = input.map((rule) => rule.split(' bags contain '));
    input = Array.from(input, (rule, i) => {
        if (rule[1] != 'no other bags.') {
            return [
                rule[0],
                rule[1].split(/ bags\, [1-9] | bag\, [1-9] |[1-9] | bag\.| bags\./).filter((element) => element != ''),
            ];
        } else {
            return [rule[0], []];
        }
    });
    var result = ['shiny gold'];
    while (result.length != search(result, input).length) {
        result = search(result, input);
    }
    return result.length - 1;
};

const sumBags = (topBag, map) => {
    if (topBag.number == 0) {
        return 0;
    }
    const bagsWithin = map.get(topBag.color);
    let sum = 1;
    for (const bag of bagsWithin) {
        sum += bag.number * sumBags(bag, map);
    }
    return sum;
};

const partTwo = (input) => {
    const map = new Map();
    for (const rule of input) {
        const [bag, content] = rule.split(' bags contain ');
        content
            .replace(/\./, '')
            .split(', ')
            .map((txt) => {
                const { groups } = /((?<number>\d+) )?(?<color>.*)/.exec(txt.replace(/ bags?/, ''));
                if (!map.has(bag)) {
                    map.set(bag, []);
                }
                if (!groups.number) {
                    groups.number = 0;
                }
                map.set(bag, [...map.get(bag), groups]);
            });
    }

    return sumBags({ number: 1, color: 'shiny gold' }, map) - 1;
};

['example7.txt', 'puzzle7.txt'].forEach((file) => {
    const input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

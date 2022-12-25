import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

const toString = (number) => {
    return number[0] + ',' + number[1];
};

class PriorityQueueElement {
    constructor(value, distance) {
        this.value = value;
        this.distance = distance;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    put(value, distance) {
        const newElement = new PriorityQueueElement(value, distance);
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (newElement.priority < this.items[i].priority) {
                this.items.slice(i, 0, newElement);
                contain = true;
            }
        }
        if (!contain) this.items.push(newElement);
    }

    get() {
        if (this.items.isEmpty) return null;
        return this.items.shift();
    }
}

const parse = (input) => {
    const map = [];
    input.forEach((line) => {
        map.push({ id: line[0], rate: Number(line[1]), next: line[2].split('|') });
    });
    return map;
};

const shortestDistance = (valves, distances, start, end) => {
    if (distances.has(toString([start, end]))) return distances.get(toString([start, end]));
    const path = new PriorityQueue();
    let startValve = valves.find((valve) => valve.id === start);
    let endValve = valves.find((valve) => valve.id === end);
    const seen = new Set();
    path.put(startValve, 0);
    while (!path.isEmpty()) {
        let current = path.get();
        if (current.value.id === endValve.id) {
            distances.set(toString([start, end]), current.distance);
            return current.distance;
        }
        for (const nextId of current.value.next) {
            if (seen.has(nextId)) continue;
            seen.add(nextId);
            let next = valves.find((valve) => valve.id === nextId);
            path.put(next, current.distance + 1);
        }
    }
};

const nextOptimalValve = (valves, distances, current, timeLeft, significantValves) => {
    let optimalValve = null;
    let flow = 0;
    for (let valve of significantValves) {
        let newSignificantValves = [...significantValves].filter((v) => v !== valve);
        let newTime = timeLeft - shortestDistance(valves, distances, current, valve) - 1;
        if (newTime <= 0) continue;
        let newFlow = newTime * valves.find((v) => v.id === valve).rate;
        let optimal = nextOptimalValve(valves, distances, valve, newTime, newSignificantValves);
        newFlow += optimal.flow;

        if (newFlow > flow) {
            optimalValve = valve;
            flow = newFlow;
        }
    }
    return { optimalValve, flow };
};

const partOne = (input) => {
    const valves = parse(input);
    const distances = new Map();
    const significantValves = valves.filter((valve) => valve.rate !== 0).map((valve) => valve.id);
    return nextOptimalValve(valves, distances, 'AA', 30, significantValves).flow;
};

const calculateDistance = (valves, myValves, elephantValves) => {
    let distance = 0;
    let distances = new Map();
    for (let i = 0; i < myValves.length; i++) {
        for (let j = i + 1; j < myValves.length; j++) {
            distance += shortestDistance(valves, distances, myValves[i], myValves[j]);
        }
    }
    distances = new Map();
    for (let i = 0; i < elephantValves.length; i++) {
        for (let j = i + 1; j < elephantValves.length; j++) {
            distance += shortestDistance(valves, distances, elephantValves[i], elephantValves[j]);
        }
    }
    return distance;
};

const split = (significantValves, valves) => {
    let distance = 99999999;
    let myValves = [];
    let elephantValves = [];
    for (let i = 0; i < 100000; i++) {
        let elephantValvesTest = [];
        let myValvesTest = [];
        for (let significantValve of significantValves) {
            if (Math.random() > 0.5) myValvesTest.push(significantValve);
            else elephantValvesTest.push(significantValve);
        }
        let newDistance = calculateDistance(valves, myValvesTest, elephantValvesTest);
        if (newDistance < distance) {
            distance = newDistance;
            myValves = myValvesTest;
            elephantValves = elephantValvesTest;
        }
    }
    return { myValves, elephantValves };
};

const partTwo = (input) => {
    const valves = parse(input);
    const distances = new Map();
    const significantValves = valves.filter((valve) => valve.rate !== 0).map((valve) => valve.id);
    const { myValves, elephantValves } = split(significantValves, valves);
    return (
        nextOptimalValve(valves, distances, 'AA', 26, myValves).flow +
        nextOptimalValve(valves, distances, 'AA', 26, elephantValves).flow
    );
};

['example16.txt', 'puzzle16.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((line) =>
            line
                .replace('Valve ', '')
                .replace('has flow rate=', '')
                .replace('; tunnels lead to valves', '')
                .replace('; tunnel leads to valve', '')
                .replaceAll(', ', '|')
        )
        .map((line) => line.split(' '));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
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

const findPath = (map, reducedMap, length) => {
    let path = new Map().set(30, [['AA'], 0]);
    for (let count = 0; count < length; count++) {
        for (let [_, possibility] of path) {
            let lastValve = reducedMap.find((valve) => valve.id === possibility[0][possibility[0].length - 1]);
            for (let next of lastValve.next) {
                if (possibility[0].includes(next)) continue;
                let [flow, timeLeft] = calculateFlow([[...possibility[0]].flat(), next].flat(), map);
                if (timeLeft < 0) {
                    continue;
                }

                if (path.has(timeLeft)) {
                    let current = path.get(timeLeft);
                    if (current[1] < flow) path.set(timeLeft, [[[...possibility[0]].flat(), next].flat(), flow]);
                } else {
                    path.set(timeLeft, [[[...possibility[0]].flat(), next].flat(), flow]);
                }
            }
        }
    }
    return path;
};

const shortestDistance = (map, start, end) => {
    const path = new PriorityQueue();
    start = map.find((valve) => valve.id === start);
    end = map.find((valve) => valve.id === end);
    path.put(start, 0);
    while (!path.isEmpty()) {
        let current = path.get();
        if (current.value.id === end.id) return current.distance;
        for (const nextId of current.value.next) {
            let next = map.find((valve) => valve.id === nextId);
            path.put(next, current.distance + 1);
        }
    }
};

const calculateFlow = (path, map) => {
    let timeLeft = 30;
    let flow = 0;
    for (let i = 0; i < path.length; i++) {
        if (timeLeft <= 0) {
            return flow;
        }
        if (map.find((v) => v.id === path[i]).rate === 0) {
            timeLeft -= shortestDistance(map, path[i], path[i + 1]);
        } else if (i === path.length - 1) {
            timeLeft--;
            flow += map.find((v) => v.id === path[i]).rate * timeLeft;
        } else {
            timeLeft--;
            flow += map.find((v) => v.id === path[i]).rate * timeLeft;
            timeLeft -= shortestDistance(map, path[i], path[i + 1]);
        }
    }

    return [flow, timeLeft];
};

const partOne = (input) => {
    const map = parse(input);
    const importantValves = map.filter((valve) => valve.rate !== 0).map((valve) => valve.id);
    const reducedMap = [{ id: 'AA', rate: 0, next: importantValves }];
    for (let i = 0; i < importantValves.length; i++) {
        reducedMap.push({
            id: importantValves[i],
            rate: map.find((valve) => valve.id === importantValves[i]).rate,
            next: importantValves.filter((valve) => valve != importantValves[i]),
        });
    }
    const pathPossible = findPath(map, reducedMap, reducedMap.length - 1);
    let max = 0;
    for (let [_, possibility] of pathPossible) {
        max = Math.max(max, possibility[1]);
    }
    return max;
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
});

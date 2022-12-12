import * as fs from 'fs';

const timer = (script, input, part) => {
    let start = performance.now();
    script(input, part);
    let end = performance.now();
    return (end - start).toFixed(2);
};

class PriorityQueueElement {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.items = [];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    put(element, priority) {
        const newElement = new PriorityQueueElement(element, priority);
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

const parse = (input, part) => {
    let starts = [],
        end;
    const map = input.map((line, i) =>
        line.split('').map((char, j) => {
            if (char === 'S' || (part === 2 && char === 'a')) {
                starts.push([i, j]);
                return 0;
            } else if (char === 'E') {
                end = [i, j];
                return 25;
            } else {
                return char.charCodeAt(0) - 'a'.charCodeAt(0);
            }
        })
    );
    return [map, starts, end];
};

const solveParts = (input, part) => {
    let [map, starts, end] = parse(input, part);

    const findShortestPath = (start) => {
        const possibleNeighbors = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ];
        const path = new PriorityQueue();
        path.put(start, 0);

        const alreadyExplored = [];
        for (let i = 0; i < map.length; i++) {
            let line = [];
            for (let j = 0; j < map[0].length; j++) {
                line.push(0);
            }
            alreadyExplored.push(line);
        }
        while (!path.isEmpty()) {
            let current = path.get();
            let i = current.element[0],
                j = current.element[1];
            if (alreadyExplored[i]?.[j]) {
                continue;
            }
            if (i === end[0] && j === end[1]) return current.priority;
            for (const [ord, abs] of possibleNeighbors) {
                if (
                    map[i + ord]?.[j + abs] !== undefined &&
                    map[i + ord][j + abs] <= map[i][j] + 1 &&
                    !alreadyExplored[i + ord]?.[j + abs]
                ) {
                    path.put([i + ord, j + abs], current.priority + 1);
                }
            }
            alreadyExplored[i][j] = 1;
        }
    };

    if (part === 1) {
        return findShortestPath(starts[0]);
    } else if (part === 2) {
        const shortestPaths = [];
        for (let start of starts) {
            let result = findShortestPath(start);
            if (result != undefined) {
                shortestPaths.push(result);
            }
        }
        return Math.min(...shortestPaths);
    }
};

['example12.txt', 'puzzle12.txt'].forEach((file) => {
    let input = fs.readFileSync(`../data/${file}`, 'utf-8').trim().split('\n');
    console.log(
        `Result of part one for ${file} : ` + solveParts(input, 1) + ` (executed in ${timer(solveParts, input, 1)} ms)`
    );
    console.log(
        `Result of part two for ${file} : ` + solveParts(input, 2) + ` (executed in ${timer(solveParts, input, 1)} ms)`
    );
});

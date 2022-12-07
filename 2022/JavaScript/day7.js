import * as fs from 'fs';

const timer = (script, input) => {
    let start = performance.now();
    script(input);
    let end = performance.now();
    return (end - start).toFixed(2);
};

let id = 0;
const createId = () => {
    id++;
    return id;
};

const defineEntries = (input) => {
    const entries = [{ name: '/', type: 'dir', id: createId(), parentId: -1 }];
    let cwd = entries[0];
    input.forEach((command) => {
        if (command[1] === 'cd') {
            if (command[2] === '..') {
                if (cwd.id === 1) return;
                cwd = entries.find((entry) => entry.id === cwd.parentId);
            } else if (command[2] === '/') {
                cwd = entries[0];
            } else {
                cwd = entries.find((entry) => entry.parentId === cwd.id && entry.name === command[2]);
            }
        } else if (command[1] === 'ls') {
            return;
        } else if (command[0] === 'dir') {
            entries.push({ name: command[1], type: 'dir', id: createId(), parentId: cwd.id });
        } else {
            entries.push({
                name: command[1],
                type: 'file',
                id: createId(),
                parentId: cwd.id,
                fileSize: Number(command[0]),
            });
        }
    });
    return entries;
};

const calculateSizes = (input) => {
    const entries = defineEntries(input);

    const calculateFolderSize = (id) => {
        const files = entries.filter((entry) => entry.parentId === id);
        let size = 0;
        files.forEach((entry) => {
            if (entry.type === 'file') {
                size += entry.fileSize;
            } else if (entry.type === 'dir') {
                size += calculateFolderSize(entry.id);
            }
        });
        return size;
    };

    return entries.filter((entry) => entry.type === 'dir').map((dir) => calculateFolderSize(dir.id));
};

const partOne = (input) => {
    const sizes = calculateSizes(input);
    return sizes.filter((size) => size <= 100000).reduce((acc, cur) => acc + cur, 0);
};

const partTwo = (input) => {
    let sizes = calculateSizes(input);
    const spaceLeft = 70000000 - Math.max(...sizes);
    sizes = sizes.filter((size) => spaceLeft + size >= 30000000);
    return Math.min(...sizes);
};

['example7.txt', 'puzzle7.txt'].forEach((file) => {
    const input = fs
        .readFileSync(`../data/${file}`, 'utf-8')
        .trim()
        .split('\n')
        .map((command) => command.split(' '));
    console.log(`Result of part one for ${file} : ` + partOne(input) + ` (executed in ${timer(partOne, input)} ms)`);
    console.log(`Result of part two for ${file} : ` + partTwo(input) + ` (executed in ${timer(partTwo, input)} ms)`);
});

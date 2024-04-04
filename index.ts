import * as fs from 'fs';

const nodes: string = fs.readFileSync('data.txt', 'utf-8');

console.log(nodes);

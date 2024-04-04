import * as fs from 'fs';
import { citiesNodes } from './shared/citiesNodes';

const nodes: string[] = fs.readFileSync('data.txt', 'utf-8').split('\r\n');
let citiesNodesArray: citiesNodes[] = []; 

for(let i: number = 0; i < nodes.length; i++){
    const [from, to, time] = nodes[i].split(" ");
    const cityNode: citiesNodes = {from: '', to: '', time: ''};
    cityNode.from = from;
    cityNode.to = to;
    cityNode.time = time;
    citiesNodesArray.push(cityNode);
}


console.log(citiesNodesArray);

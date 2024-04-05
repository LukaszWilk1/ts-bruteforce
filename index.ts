import * as fs from 'fs';
import { citiesNodes } from './shared/citiesNodes';

let roads: citiesNodes[] = [];

const getData = () : citiesNodes[] => {
    const nodes: string[] = fs.readFileSync('data.txt', 'utf-8').split('\r\n');
    let citiesNodesArray: citiesNodes[] = []; 
    let cities: string[] = [];

    const [nodesAmmount, startNode] = nodes.shift().split(" ");

    for(let i: number = 0; i < nodes.length; i++){
        const [from, to, time] = nodes[i].split(" ");
        const cityNode: citiesNodes = {from: '', to: '', time: ''};
        cityNode.from = from;
        cityNode.to = to;
        cityNode.time = time;
        citiesNodesArray.push(cityNode);
    }

    console.log(startNode, nodesAmmount);

    cities.push(citiesNodesArray[0].from);
    cities.push(citiesNodesArray[0].to);

    for(let i: number = 1; i < citiesNodesArray.length; i++){
        const previous = citiesNodesArray[i-1].to;
        const current =  citiesNodesArray[i].to;
        if(!cities.includes(citiesNodesArray[i].to) && !cities.includes(citiesNodesArray[i].from)){
            cities.push(citiesNodesArray[i].to);
            cities.push(citiesNodesArray[i].from);
        } 
    }

    console.log(cities);

    return citiesNodesArray;
}



roads = getData();
console.log(roads);
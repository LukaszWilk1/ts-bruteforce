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

    cities.push(citiesNodesArray[0].from);
    cities.push(citiesNodesArray[0].to);

    for(let i: number = 1; i < citiesNodesArray.length; i++){
        if(!cities.includes(citiesNodesArray[i].to) && !cities.includes(citiesNodesArray[i].from)){
            cities.push(citiesNodesArray[i].to);
            cities.push(citiesNodesArray[i].from);
        } 
    }

    console.log(cities);

    let similarityMatrix: number[][] = [];

    for(let i: number = 0; i<Number(nodesAmmount);i++){
        similarityMatrix[i] = [];
        for(let j: number = 0; j<Number(nodesAmmount);j++){
            if(i===j){
                similarityMatrix[i][j] = 1;
            } else {
                similarityMatrix[i][j] = 0;
            }
        }
    }

    for(let i: number = 1; i < citiesNodesArray.length; i++){
       
    }

    return citiesNodesArray;
}



roads = getData();
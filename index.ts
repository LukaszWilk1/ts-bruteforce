import * as fs from 'fs';
import { citiesNodes } from './shared/citiesNodes';
import { log } from 'console';

let roads: citiesNodes[] = [];
let citiesNodesArray: citiesNodes[] = [];
let cities: string[] = [];
const nodes: string[] = fs.readFileSync('data.txt', 'utf-8').split('\r\n');
let visitedNodes: boolean[] = [];
let similarityMatrix: number[][] = [];

const [nodesAmmount, startNode] = nodes.shift().split(" ");

const getData = () : void => {

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

    for(let i: number = 0; i < citiesNodesArray.length; i++){
        const from = cities.indexOf(citiesNodesArray[i].from);
        const to = cities.indexOf(citiesNodesArray[i].to);
        if(similarityMatrix[from][to] == 0){
            similarityMatrix[from][to] = Number(citiesNodesArray[i].time);
        }

        if(similarityMatrix[to][from] == 0){
            similarityMatrix[to][from] = Number(citiesNodesArray[i].time);
        }
    }

    /*
    for(let i: number = 0; i<Number(nodesAmmount);i++){
        for(let j: number = 0; j<Number(nodesAmmount);j++){
            process.stdout.write(String(similarityMatrix[i][j]) + ' ');
        }
        process.stdout.write('\n');
    }
    */
}

getData();

for(let i: number = 0; i<cities.length;i++){
    visitedNodes[i] = false;
}

let sumOfEdges: number = 2147483647;
let helperSumOfEdges: number = 0;
let nodesStack: string[] = [];
const helperNodesStack: string[] = [];

const tsp = (currentNode: string): void => {
    helperNodesStack.push(currentNode);
    if(helperNodesStack.length < Number(nodesAmmount)){
        visitedNodes[cities.indexOf(currentNode)] = true;
        for(let i:number = 0; i<Number(nodesAmmount); i++){
            if (similarityMatrix[cities.indexOf(currentNode)] && !visitedNodes[i]) {
                helperSumOfEdges += similarityMatrix[cities.indexOf(currentNode)][i];
                tsp(cities[i]);
                helperSumOfEdges -= similarityMatrix[cities.indexOf(currentNode)][i];
            }
        }
        visitedNodes[cities.indexOf(currentNode)] = false; 
    } else if(helperNodesStack.length === Number(nodesAmmount)){
        helperSumOfEdges += similarityMatrix[cities.indexOf(currentNode)][cities.indexOf(startNode)];
        if(helperSumOfEdges < sumOfEdges){
            sumOfEdges = helperSumOfEdges;
            nodesStack = [...helperNodesStack];
            console.log("Aktualna minimalna wartość ścieżki: " + sumOfEdges);
        }
        helperSumOfEdges -= similarityMatrix[cities.indexOf(currentNode)][cities.indexOf(startNode)];
    }
    helperNodesStack.pop(); 
}

tsp(startNode);
console.log(sumOfEdges);
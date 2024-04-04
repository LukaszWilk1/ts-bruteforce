"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var nodes = fs.readFileSync('data.txt', 'utf-8');
console.log(nodes);

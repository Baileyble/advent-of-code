// const fs = require("fs");
//
// function readFile(filePath: string, splitBy?: string) {
//     if (splitBy) {
//         return fs.readFileSync(filePath, 'utf8').split(splitBy);
//     } else {
//         return fs.readFileSync(filePath, 'utf8');
//     }
// }

// import {readFile} from 'fs';

import {readFile} from '../file-reader';

const day25Input = readFile('./day-25/day-25-input', '\n');

function parseInput(input: string[]): string[][] {
    return input.filter(arrItem => !!arrItem).map((arrItem) => {
        const cleanR = arrItem.replace('\r', '');
        return cleanR.split('');
    });
}

function testDay25() {
    const data = parseInput(day25Input);
    let moves;
    let runs = 0;

    while (moves !== 0) {
        moves = theMovement(data);
        runs++
    }

    theMovement(data);
    console.table(data);
    return runs
}

function theMovement(data: string[][]): number {
    const eastMovingCoord = getEastMovingCoord(data);
    handleMovement(data, eastMovingCoord, 'east');

    const southMovingCoord = getSouthMovingCoord(data);
    handleMovement(data, southMovingCoord, 'south');

    return eastMovingCoord.concat(...southMovingCoord).length;
}

function getEastMovingCoord(data: string[][]): Array<{x: number, y: number}> {
    return data.reduce((canMoveCoord : Array<{x: number, y: number}>, row, index) => {
        let xCoord: number[]
        xCoord = row.reduce((canMoveIndex: number[], item, i) => {
            if (item === '>' && ((!!row[i + 1] && row[i + 1] === '.') || (!row[i + 1] && row[0] === '.'))) {
                canMoveIndex.push(i);
            }
            return canMoveIndex
        }, [])

        const coordArr = xCoord.map((x) => {
            return {x: x, y: index}
        })

        return canMoveCoord.concat(...coordArr)
    }, [])
}

function getSouthMovingCoord(data: string[][]): Array<{x: number, y: number}> {
    return data[0].reduce((canMoveCoord: Array<{x: number, y: number}>, colHead, index) => {
        const yCoord: number[] = []
        for (let i: number = 0; i < data.length; i++) {
            const item = data[i][index]
            if (item === 'v' && ((!!data[i + 1] && data[i + 1][index] === '.') || (!data[i + 1] && data[0][index] === '.'))) {
                yCoord.push(i);
            }
        }

        const coordArr: Array<{x: number, y: number}> = yCoord.map(y => {
            return {x: index, y: y}
        });

        return canMoveCoord.concat(...coordArr);
    }, [])
}

function handleMovement(data: string[][], movingCoords: Array<{x: number, y: number}>, direction: 'east' | 'south') {
    const newPositions = movingCoords.map(coord => {
        const axis = direction === 'east' ? 'x' : 'y'
        const axisLength = direction === 'south' ? data.length - 1 : data[0].length - 1;
        const newCoords = Object.assign({}, coord);
        if (newCoords[axis] < axisLength) {
            newCoords[axis]++
        } else {
            newCoords[axis] = 0
        }
        return newCoords
    })

    movingCoords.forEach(coord => {
        data[coord.y][coord.x] = '.';
    })

    newPositions.forEach(coord => {
        data[coord.y][coord.x] = direction === 'east' ? '>' : 'v';
    })
}

console.log(testDay25());

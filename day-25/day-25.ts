const fs = require("fs");

function readFile(filePath: string, splitBy?: string) {
    if (splitBy) {
        return fs.readFileSync(filePath, 'utf8').split(splitBy);
    } else {
        return fs.readFileSync(filePath, 'utf8');
    }
}

const day25Input = readFile('./day-25/day-25-input', '\n');

function parseInput(input: string[]): string[][] {

    let twoDInput = input.filter(arrItem => !!arrItem).map((arrItem) => {
        const cleanR = arrItem.replace('\r', '');
        return cleanR.split('');
    })

    console.table(twoDInput);
    return twoDInput;

}

function testDay25() {
    const data = parseInput(day25Input);

    let prev = data;
    let curr = theMovement(data);
    let runs = 0

    while (prev !== curr) {
      prev = curr;
      curr = theMovement(prev);
      console.table(curr)
      runs++
    }

    console.log(runs);
    return runs
}

function theMovement(data: string[][]): string[][] {

    let cucumberMap = data;

    const eastMovingCoord = getEastMovingCoord(data);

    const newEastPositions = eastMovingCoord.map(coord => {
        if (coord.x < data[0].length) {
            coord.x = coord.x++
        } else {
            coord.x = 0
        }

        return coord
    })

    eastMovingCoord.forEach(coord => {
        cucumberMap[coord.y][coord.x] = '.';

    })

    newEastPositions.forEach(coord => {
        cucumberMap[coord.y][coord.x] = '>';
    })


    const southMovingCoord = getSouthMovingCoord(data);

    const newSouthPositions = southMovingCoord.map(coord => {
        if (coord.y < data.length) {
            coord.y = coord.y++
        } else {
            coord.y = 0
        }

        return coord
    })

    southMovingCoord.forEach(coord => {
        cucumberMap[coord.y][coord.x] = '.';
    })

    newSouthPositions.forEach(coord => {
        cucumberMap[coord.y][coord.x] = 'v';
    })

    return cucumberMap
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

testDay25();

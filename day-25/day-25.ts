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


}

function theMovement(data: string[][], direction: 'east' | 'south') {

    data.reduce((canMoveCoord : Array<{x: number, y: number}>, row, index) => {
        let xCoord: number[]
        if (direction === 'east') {
            xCoord = row.reduce((canMoveIndex: number[], item, i) => {
                 if (item === '>' && ((!!row[i + 1] && row[i + 1] === '.') || !row[i + 1] && row[0] === '.')) {
                     canMoveIndex.push(i);
                 }
                 return canMoveIndex
            }, [])
        }

        if (direction === 'south') {

            

        }



        // @ts-ignore
        const coordArr = xCoord.map((x) => {
            return {x: x, y: index}
        })

        return  canMoveCoord.concat(...coordArr)
    }, [])


}

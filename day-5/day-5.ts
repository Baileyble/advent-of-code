const day5Input = readFile('./day-5/day-5-input', '\n');

interface pointCoord {
    x: number,
    y: number
}

interface lines {
    start: pointCoord,
    end: pointCoord
}


function convertInput(input: string[]): lines[] {
    let lineArr = input.filter(arrItem => !!arrItem).map((arrItem) => {
        let newItem: string;
        newItem = arrItem.replace('\r', '').replace(' -> ', '-').trim();

        let lineArrs: string[];
        lineArrs = newItem.split('-');

        const start = lineArrs[0].split(',');
        const end = lineArrs[1].split(',');
        const lineCoord: lines = {
            start: {x: +start[0], y: +start[1]},
            end: {x: +end[0], y: +end[1]}
        }
        return lineCoord
    })
    return lineArr
}

function testFile(part: 1 | 2): number {
    const data =  part === 1 ? filterDiagonal(convertInput(day5Input)) : convertInput(day5Input)
    const linePlot: Array<string | number>[] = genLinePlot(1000);

    data.forEach((line) => {
        const xAdd: boolean = line.start.x < line.end.x;
        const yAdd: boolean = line.start.y < line.end.y;

        for (let i = {x: line.start.x, y: line.start.y};
             i.x !== doMath(line.end.x, xAdd) && i.y !== doMath(line.end.y, yAdd);) {
            linePlot[i.y][i.x] = linePlot[i.y][i.x] === '.' ? 1 : +linePlot[i.y][i.x] + 1;

            if (!(i.x === line.end.x && i.y === line.end.y)) {
                if (i.x !== line.end.x) i.x = doMath(i.x, xAdd);
                if (i.y !== line.end.y) i.y = doMath(i.y, yAdd);
            } else {
                i.x = doMath(i.x, xAdd);
                i.y = doMath(i.y, yAdd);
            }
        }
    })
    // console.table(linePlot);

    return linePlot.reduce((numOfPoints, column) => {
        return numOfPoints += column.filter((point) => point !== '.' && point !== 1).length;
    }, 0)
}

function filterDiagonal(data: lines[]): lines[] {
    return data.filter(line => {
        return !(line.start.x !== line.end.x && line.start.y !== line.end.y);
    })
}

function doMath(firstValue: number, add: boolean, secondValue = 1): number {
    return add ? firstValue + secondValue : firstValue - secondValue;
}

function genLinePlot(size: number): Array<string | number>[] {
    const linePlot = []
    for (let i = 0; i < size; i++) {
        linePlot.push(new Array(size).fill('.'))
    }
    return linePlot;
}

console.log('part 1', testFile(1));
console.log('part 2', testFile(2));


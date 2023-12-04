import {readFile} from '../../file-reader';

const input = readFile('./2023/day-2/input', '\r\n').filter((v: any) => v && v !== '' );

function dayTwo(data: string[], bag: {red: number, green: number, blue: number}) {
    return data.map((v) => Object.entries(bag).every(([clr, amt]) => v.split(';').every((v) => +v.slice(v.indexOf(clr) - 3, v.indexOf(clr) + clr.length).replace(/\D/g,'') <= amt)) ? +v.slice(0, v.indexOf(':')).replace(/\D/g,'') : 0).reduce((acc, cv) => acc + cv, 0);
}

function dayTwoPartTwo(data: string[], bag: {red: number, green: number, blue: number}) {
    return data.map((v) => Object.entries(bag).map(([clr, amt]) => v.split(';').reduce((acc, cv) => acc > +cv.slice(cv.indexOf(clr) - 3, cv.indexOf(clr) + clr.length).replace(/\D/g,'') ? acc : +cv.slice(cv.indexOf(clr) - 3, cv.indexOf(clr) + clr.length).replace(/\D/g,''), 0)).reduce((acc, cv) => acc * cv, 1)).reduce((acc, cv) => acc + cv, 0);
}

console.log(dayTwo(input, {red: 12, green: 13, blue: 14}));
console.log(dayTwoPartTwo(input, {red: 12, green: 13, blue: 14}));

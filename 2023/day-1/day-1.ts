import {readFile} from '../../file-reader';

const day1Input = readFile('./2023/day-1/day-1-input', '\n');

function dayOne(input: string[]) {
    return input.map(v => v.replace(/\D/g,'')).filter(v => !!v).map((v) => v[0].toString() + v.slice(-1).toString()).reduce((acc, cv) => acc + +cv, 0);
}

const numberWords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function dayOnePartTwo(input: string[]) {
    return input.filter(v => !!v).map(v => v.split('').reduce((acc, cv) => !!numberWords.find(num => acc.includes(num)) ? acc.replace(numberWords.find(num => acc.includes(num))!, numberWords.find(num => acc.includes(num))!.slice(0, 1) + (numberWords.findIndex(num => acc.includes(num)) + 1).toString() + numberWords.find(num => acc.includes(num))!.slice(-1)) : acc, v).replace(/\D/g,'')).filter(v => !!v).map((v) => v[0].toString() + v.slice(-1).toString()).reduce((acc, cv) => acc + +cv, 0);
}

console.log(dayOne(day1Input));
console.log(dayOnePartTwo(day1Input));

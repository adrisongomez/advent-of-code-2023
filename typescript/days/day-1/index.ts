import { readFile } from "node:fs/promises";

const numbers: [string, number][] = [
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
];

export function parseSpelledNumberToNumber(value: string): string {
  let newValue = "";

  for (const c of value) {
    newValue += c;
    for (const [numberStr, numb] of numbers) {
      newValue = newValue.replace(numberStr, numb.toString());
    }
  }

  return newValue;
}

export function getPair(value: string): number {
  value = parseSpelledNumberToNumber(value.toLowerCase());
  console.log(value);
  const clean = value.toUpperCase().replace(/[A-Z]/g, "");
  return parseInt(`${clean.at(0)}${clean.at(-1)}`);
}

export function handler(value: string): number {
  const r = value.split("\n").map<number>((currentLine) => {
    const value = getPair(currentLine.trim());
    if (Number.isNaN(value)) {
      return 0;
    }
    return value;
  });
  return r.reduce<number>((acc, value) => {
    return acc + value;
  }, 0);
}

async function main() {
  const fileContent = await readFile(__dirname + "/input.txt");
  // this may cause an error

  const input = fileContent.toString("utf-8");
  console.log("Answer is: ", handler(input));
}

main();

// shame on me
// let currentPosition = 0;
// let posibleOptionIndex: number[] = [];
// for (let i = 0; i <= value.length; i++) {
//   if (posibleOptionIndex.length === 0) {
//     currentPosition = 0;
//   }
//   const c = value[i];
//   const temp = numbers
//     .map(([v], index) => {
//       return v[currentPosition] === c ? index : null;
//     })
//     .filter((v): v is number => v !== null);
//   if (temp.length === 0) {
//     if (posibleOptionIndex.length) {
//       i = i - 1;
//     }
//     posibleOptionIndex = [];
//     continue;
//   }

//   if (Boolean(posibleOptionIndex.length)) {
//     posibleOptionIndex = posibleOptionIndex.filter((v) => temp.includes(v));
//   } else {
//     posibleOptionIndex = temp;
//   }

//   let found = false;
//   for (const index of posibleOptionIndex) {
//     const [numberStr, number] = numbers[index];
//     if (numberStr.length - 1 === currentPosition) {
//       value = value.replace(numberStr, number.toString());
//       found = true;
//       // replace value
//       break;
//     }
//   }

//   if (found) {
//     return parseSpelledNumberToNumber(value);
//   }
//   currentPosition++;
// }

// return value;

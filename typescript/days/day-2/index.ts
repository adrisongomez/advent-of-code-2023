import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

type GameSet = {
  red: number;
  blue: number;
  green: number;
};

export type Game = {
  id: number;
  sets: GameSet[];
};

const defaultSet: GameSet = {
  red: 0,
  blue: 0,
  green: 0,
};

export function parseGame(entry: string): Game {
  const [gameId, setStr] = entry.split(":");

  const idMatch = gameId.match(/\d+/);
  const id = parseInt(idMatch?.at(0) ?? "\n", 10);
  let sets: GameSet[] = [];
  for (const set of setStr.split(";")) {
    const setObj = structuredClone(defaultSet);
    const valueMatch = set.match(/\d+\s(blue|red|green)/g);
    if (valueMatch?.length === 0) {
      console.log(setStr);
      throw new Error("Something happen");
    }
    valueMatch?.forEach((valueStr) => {
      const [value, key] = valueStr.split(/\s/);
      setObj[key as keyof GameSet] = parseInt(value, 10);
    });
    sets.push(setObj);
  }
  return {
    id,
    sets,
  };
}

export function handler(input: string): number {
  let games: Game[] = [];
  for (const line of input.split("\n")) {
    games.push(parseGame(line));
  }

  games = games.filter((game) =>
    game.sets.every(
      (set) => set.red <= 12 && set.green <= 13 && set.blue <= 14,
    ),
  );
  return games.reduce((acc, game) => acc + game.id, 0);
}

export function handlerPart2(input: string): number {
  let games: Game[] = [];
  for (const line of input.split("\n")) {
    games.push(parseGame(line));
  }

  const minGames = games.flatMap((game) =>
    game.sets.reduce<GameSet>(
      (acc, set) => ({
        blue: acc.blue > set.blue ? acc.blue : set.blue,
        red: acc.red > set.red ? acc.red : set.red,
        green: acc.green > set.green ? acc.green : set.green,
      }),
      structuredClone(defaultSet),
    ),
  );
  return minGames
    .map<number>((set) => set.blue * set.red * set.green)
    .reduce((acc, value) => acc + value, 0);
}

async function main() {
  let input = await readFile(resolve(__dirname, "./input.txt"));
  let inputStr = input.toString();

  console.log("Answer part 1 is:", handler(inputStr.trim()));
  console.log("Answer part 2 is:", handlerPart2(inputStr.trim()));
}

main();

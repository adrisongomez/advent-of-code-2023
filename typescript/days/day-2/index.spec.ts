import { describe, expect, it } from "vitest";
import { parseGame, Game, handler, handlerPart2 } from "./index";

describe("Advent of Code 2023 - Day 2", () => {
  it("should a parce a game and sets", () => {
    const input = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green";
    expect(parseGame(input)).toMatchObject({
      id: 1,
      sets: [
        {
          blue: 3,
          red: 4,
          green: 0,
        },
        {
          red: 1,
          green: 2,
          blue: 6,
        },
        {
          green: 2,
          red: 0,
          blue: 0,
        },
      ],
    } as Game);
  });

  it("should resolve the problem", () => {
    const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

    expect(handler(input)).toBe(8);
    expect(handlerPart2(input)).toBe(2286);
  });
});

import { describe, it, expect } from "vitest";
import { getPair, handler } from ".";

describe("Advent of Code: Day 1", () => {
  it("should be extract the pair of numbers in the border", () => {
    const input = "1abc2";
    const expected = 12;

    expect(getPair(input)).toBe(expected);
  });

  it("should remove the in between", () => {
    const input = "pqr3stu8vwx";
    const expected = 38;
    expect(getPair(input)).toBe(expected);
  });

  it("should take only the two number in the border", () => {
    const input = "a1b2c3d4e5f";
    const expected = 15;
    expect(getPair(input)).toBe(expected);
  });

  it("should repeat the only number", () => {
    const input = "treb7uchet";
    const expected = 77;
    expect(getPair(input)).toBe(expected);
  });

  it("should resolve the problem", () => {
    /* The idea is look for the pair of number for every row and add them
     */
    const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
    const expected = 142;

    expect(handler(input)).toBe(expected);
  });

  it("should looks for spell numbers and show them", () => {
    const value = "two1nine";
    const expected = 29;
    expect(getPair(value)).toBe(expected);
  });

  it("should be handle only number spell line", () => {
    const value = "eightwothree";
    const expected = 83;
    expect(getPair(value)).toBe(expected);
  });
  it.each([
    ["qzjggk1one", 11],
    ["abcone2threexyz", 13],
    ["xtwone3four", 24],
    ["4nineeightseven2", 42],
    ["zoneight234", 14],
    ["7pqrstsixteen", 76],
  ])("should parse the number %s, %i", (value: string, expected: number) => {
    expect(getPair(value)).toBe(expected);
  });

  it("should resolve the problem with letters", () => {
    /* The idea is look for the pair of number for every row and add them
     */
    const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
    const expected = 281;

    expect(handler(input)).toBe(expected);
  });
});

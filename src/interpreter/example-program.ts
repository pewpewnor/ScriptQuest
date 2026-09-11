import { readFileSync } from "node:fs";

// Keep interpreter tests pointed at the same sample program that the website
// loads instead of maintaining a second copy of the game's source.
export const EXAMPLE_CODE = readFileSync(
    new URL("../../public/sample-game.txt", import.meta.url),
    "utf8"
).trimEnd();

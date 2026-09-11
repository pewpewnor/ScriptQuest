import { describe, expect, it } from "vitest";
import { EXAMPLE_CODE } from "./example-program";
import { CommandType, parseLines, Visibility } from "./parse-code";

describe("parseLines", () => {
    it("parses the basic commands and their arguments", () => {
        const lines = parseLines([
            "say hello, world",
            "read playerName",
            "pause",
            "exit",
        ]);

        expect(lines).toEqual([
            {
                commandType: CommandType.SAY,
                visible: Visibility.FALSE,
                ifStack: [],
                say: "hello, world\n",
            },
            {
                commandType: CommandType.READ,
                visible: Visibility.FALSE,
                ifStack: [],
                variable: "playerName",
            },
            {
                commandType: CommandType.PAUSE,
                visible: Visibility.FALSE,
                ifStack: [],
            },
            {
                commandType: CommandType.EXIT,
                visible: Visibility.FALSE,
                ifStack: [],
            },
        ]);
    });

    it("normalizes command whitespace without losing spaces in say text", () => {
        const lines = parseLines([
            "  say   hello   brave   world  ",
            "\tif\tchoice\tis\tvery good",
        ]);

        expect(lines[0].say).toBe("hello   brave   world\n");
        expect(lines[1]).toMatchObject({
            commandType: CommandType.IF,
            variable: "choice",
            compareTo: "very good",
        });
    });

    it("preserves nested if scopes and closes the nearest scope", () => {
        const lines = parseLines([
            "if outer is yes",
            "    say outer",
            "    if inner is yes",
            "        say inner",
            "    end",
            "end",
            "say after",
        ]);

        expect(lines[0]).toMatchObject({
            commandType: CommandType.IF,
            ifId: 0,
            ifStack: [],
        });
        expect(lines[1].ifStack).toEqual([0]);
        expect(lines[2]).toMatchObject({
            commandType: CommandType.IF,
            ifId: 2,
            ifStack: [0],
        });
        expect(lines[3].ifStack).toEqual([0, 2]);
        expect(lines[4]).toMatchObject({
            commandType: CommandType.END,
            ifId: 2,
            ifStack: [0],
        });
        expect(lines[5]).toMatchObject({
            commandType: CommandType.END,
            ifId: 0,
            ifStack: [],
        });
        expect(lines[6].ifStack).toEqual([]);
    });

    it("does not share mutable if-stack snapshots between lines", () => {
        const lines = parseLines(["if choice is yes", "say inside", "end"]);

        lines[1].ifStack.push(999);

        expect(lines[2].ifStack).toEqual([]);
    });

    it("represents blank and unknown lines as no-op commands", () => {
        const lines = parseLines(["", "   ", "unknown command"]);

        expect(lines.map((line) => line.commandType)).toEqual([
            CommandType.NOTHING,
            CommandType.NOTHING,
            CommandType.NOTHING,
        ]);
    });

    it("parses the complete sample program with balanced scopes", () => {
        const lines = parseLines(EXAMPLE_CODE.split("\n"));
        const ifLines = lines.filter(
            (line) => line.commandType === CommandType.IF
        );
        const endLines = lines.filter(
            (line) => line.commandType === CommandType.END
        );

        expect(ifLines).toHaveLength(6);
        expect(endLines).toHaveLength(6);
        expect(lines.some((line) => line.ifStack.length > 1)).toBe(true);
        expect(lines[lines.length - 1].commandType).toBe(CommandType.END);
    });
});

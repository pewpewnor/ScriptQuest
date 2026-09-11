import { describe, expect, it } from "vitest";
import { EXAMPLE_CODE } from "./example-program";
import detectError from "./syntax-validation";

describe("syntax validation", () => {
    it("accepts an empty program", () => {
        expect(detectError("")).toEqual([]);
        expect(detectError("  \n\t\n")).toEqual([]);
    });

    it("accepts the sample program used by the app", () => {
        expect(detectError(EXAMPLE_CODE)).toEqual([]);
    });

    it("accepts indentation, tabs, CRLF, and multi-word comparisons", () => {
        const program = [
            "read    choice",
            "if\tchoice   is\tvery good",
            "\tsay\tThe choice was very good",
            "end",
        ].join("\r\n");

        expect(detectError(program)).toEqual([]);
    });

    it.each([
        ["say", "say"],
        ["read", "read"],
        ["read name extra", "read"],
        ["pause now", "pause"],
        ["exit now", "exit"],
        ["end now", "end"],
    ])("rejects malformed %s commands", (program, keyword) => {
        const errors = detectError(program);

        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain("line 1");
        expect(errors[0]).toContain("Incorrect syntax for '" + keyword + "'");
    });

    it("rejects unknown commands", () => {
        const errors = detectError("narrate hello");

        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain("Keyword 'narrate' is unrecognized");
    });

    it("rejects an if expression with invalid syntax", () => {
        const errors = detectError("read choice\nif choice equals yes\nend");

        expect(errors).toHaveLength(2);
        expect(errors[0]).toContain("Incorrect syntax for 'if'");
        expect(errors[1]).toContain("No if expression to close");
    });

    it("requires a variable to be read before it is used in an if", () => {
        const errors = detectError("if choice is yes\nsay hello\nend");

        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain("You first must read variable 'choice'");
        expect(errors[0]).not.toContain("There is no end");
    });

    it("rejects duplicate read variables", () => {
        const errors = detectError("read choice\nread choice");

        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain("read variable 'choice'");
        expect(errors[0]).toContain("must be unique");
    });

    it("matches nested if blocks with the nearest end", () => {
        const program = [
            "read outer",
            "read inner",
            "if outer is yes",
            "    if inner is yes",
            "        say nested",
            "    end",
            "end",
        ].join("\n");

        expect(detectError(program)).toEqual([]);
    });

    it("reports an unmatched end", () => {
        const errors = detectError("end");

        expect(errors).toHaveLength(1);
        expect(errors[0]).toContain("No if expression to close");
    });

    it("reports every unclosed if expression", () => {
        const program = [
            "read outer",
            "read inner",
            "if outer is yes",
            "if inner is yes",
        ].join("\n");
        const errors = detectError(program);

        expect(errors).toHaveLength(2);
        expect(errors[0]).toContain("line 3");
        expect(errors[1]).toContain("line 4");
        expect(errors.every((error) => error.includes("There is no end"))).toBe(
            true
        );
    });
});

const PROPER_PAUSE =
    "\tIncorrect syntax for 'pause' found\n" +
    "\tExample of correct syntax for 'pause':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\tpause\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
const PROPER_EXIT =
    "\tIncorrect syntax for 'exit' found\n" +
    "\tExample of correct syntax for 'exit':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\texit\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
const PROPER_SAY =
    "\tIncorrect syntax for 'say' found\n" +
    "\tExample of correct syntax for 'say':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\tsay hello world\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
const PROPER_READ =
    "\tIncorrect syntax for 'read' found\n" +
    "\tExample of correct syntax for 'read':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\tread name\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
const PROPER_IF_SYNTAX =
    "\tIncorrect syntax for 'if' found\n" +
    "\tExample of correct syntax for 'if':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\tif choice is 1\n" +
    "\t\t\tsay You just typed 1\n" +
    "\t\tend\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";
const PROPER_END =
    "\tIncorrect syntax for 'end' found\n" +
    "\tExample of correct syntax for 'end':\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
    "\t\tend\n" +
    "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

interface OpenIf {
    line: number;
}

function detectError(code: string): string[] {
    const lines = code.split(/\r?\n/);
    const errors: string[] = [];
    const reads = new Set<string>();
    const openIfs: OpenIf[] = [];

    function addError(line: number, message: string) {
        errors.push(
            "Syntax error found at line " + (line + 1) + ".\n" + message
        );
    }

    function pushError(line: number, cause: string) {
        switch (cause) {
            case "pause":
                addError(line, PROPER_PAUSE);
                break;
            case "exit":
                addError(line, PROPER_EXIT);
                break;
            case "say":
                addError(line, PROPER_SAY);
                break;
            case "read":
                addError(line, PROPER_READ);
                break;
            case "if":
                addError(line, PROPER_IF_SYNTAX);
                break;
            case "end":
                addError(line, PROPER_END);
                break;
            default:
                addError(line, "\tKeyword '" + cause + "' is unrecognized");
        }
    }

    for (let index = 0; index < lines.length; index++) {
        const line = lines[index].trim();

        if (!line) {
            continue;
        }

        const tokens = line.split(/\s+/);
        const first = tokens[0];

        switch (first) {
            case "say":
                if (tokens.length < 2) {
                    pushError(index, first);
                }
                break;

            case "read":
                if (tokens.length !== 2) {
                    pushError(index, first);
                    break;
                }

                if (reads.has(tokens[1])) {
                    addError(
                        index,
                        "\tThere is already read variable '" +
                            tokens[1] +
                            "'\n\t\tYour read variable must be unique"
                    );
                } else {
                    reads.add(tokens[1]);
                }
                break;

            case "pause":
            case "exit":
                if (tokens.length !== 1) {
                    pushError(index, first);
                }
                break;

            case "if":
                if (tokens.length < 4 || tokens[2] !== "is") {
                    pushError(index, first);
                    break;
                }

                // Keep a syntactically valid block on the stack even when its
                // variable has not been declared. This prevents a missing-read
                // error from also producing a misleading unmatched-end error.
                openIfs.push({ line: index });

                if (!reads.has(tokens[1])) {
                    addError(
                        index,
                        "\tYou first must read variable '" +
                            tokens[1] +
                            "'\n\t\tYou can do this by adding the code:\n\t\tread " +
                            tokens[1]
                    );
                }
                break;

            case "end":
                if (tokens.length !== 1) {
                    pushError(index, first);
                    break;
                }

                if (openIfs.length === 0) {
                    addError(
                        index,
                        "\tNo if expression to close with 'end' mark\n\t\tYou can simply remove this"
                    );
                } else {
                    openIfs.pop();
                }
                break;

            default:
                pushError(index, first);
        }
    }

    for (const openIf of openIfs) {
        addError(
            openIf.line,
            "\tThere is no end for this if expression\n" +
                "\t\tClose it with the 'end' keyword, example:\n" +
                "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" +
                "\t\tif choice is 1\n" +
                "\t\t\tsay You just typed 1\n" +
                "\t\tend\n" +
                "\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
        );
    }

    return errors;
}

export default detectError;

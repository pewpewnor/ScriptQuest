enum CommandType {
    NOTHING,
    SAY,
    READ,
    PAUSE,
    EXIT,
    IF,
    END,
}

enum Visibility {
    FALSE,
    TRUE,
    DONE,
}

interface Line {
    commandType: CommandType;
    visible: Visibility;
    ifStack: number[];
    ifId?: number;
    say?: string;
    variable?: string;
    compareTo?: string;
}

function parseLine(index: number, ifStack: number[], line: string): Line {
    const trimmedLine = line.trim();
    const tokens = trimmedLine ? trimmedLine.split(/\s+/) : [];
    const first = tokens[0];
    const currentIfStack = [...ifStack];

    if (first === "say") {
        const say = trimmedLine.slice(first.length).replace(/^\s+/, "") + "\n";

        return {
            commandType: CommandType.SAY,
            visible: Visibility.FALSE,
            ifStack: currentIfStack,
            say,
        };
    }

    if (first === "read") {
        return {
            commandType: CommandType.READ,
            visible: Visibility.FALSE,
            ifStack: currentIfStack,
            variable: tokens[1],
        };
    }

    if (first === "pause") {
        return {
            commandType: CommandType.PAUSE,
            visible: Visibility.FALSE,
            ifStack: currentIfStack,
        };
    }

    if (first === "exit") {
        return {
            commandType: CommandType.EXIT,
            visible: Visibility.FALSE,
            ifStack: currentIfStack,
        };
    }

    if (first === "if") {
        return {
            commandType: CommandType.IF,
            visible: Visibility.FALSE,
            ifStack: currentIfStack,
            ifId: index,
            variable: tokens[1],
            compareTo: tokens.slice(3).join(" "),
        };
    }

    if (first === "end") {
        const ifId = ifStack[ifStack.length - 1];

        return {
            commandType: CommandType.END,
            visible: Visibility.FALSE,
            ifStack: ifStack.slice(0, -1),
            ifId,
        };
    }

    return {
        commandType: CommandType.NOTHING,
        visible: Visibility.FALSE,
        ifStack: currentIfStack,
    };
}

function parseLines(lines: string[]): Line[] {
    const ifStack: number[] = [];

    return lines.map((line, index) => {
        const parsedLine = parseLine(index, ifStack, line);

        if (parsedLine.commandType === CommandType.IF) {
            ifStack.push(index);
        } else if (parsedLine.commandType === CommandType.END) {
            ifStack.pop();
        }

        return parsedLine;
    });
}

export { parseLines, CommandType, Visibility };
export type { Line };

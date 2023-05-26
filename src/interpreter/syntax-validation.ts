interface SyntaxResult {
	error: string[];
}

const PROPER_PAUSE = `\tIncorrect syntax for 'pause' found\n\tExample of correct syntax for 'pause':\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\tpause\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
const PROPER_EXIT = `\tIncorrect syntax for 'exit' found\n\tExample of correct syntax for 'exit':\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\texit\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
const PROPER_SAY = `\tIncorrect syntax for 'say' found\n\tExample of correct syntax for 'say':\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\tsay hello world\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
const PROPER_READ = `\tIncorrect syntax for 'read' found\n\tExample of correct syntax for 'read':\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\tread name\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
const PROPER_IF_SYNTAX = `\tIncorrect syntax for 'if' found\n\tExample of correct syntax for 'if':\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\tif choice is 1\n\t\t\tsay You just typed 1\n\t\tend\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`;
// const PROPER_CHECKPOINT = `Example of correct syntax for 'savepoint'\n\tcheckpoint alpha`;
// const PROPER_GOTO = `Example of correct syntax for 'goto':\n\tgoto alpha`;

function detectError(code: string) {
	const lines = code.split("\n");
	const errors: string[] = [];
	let index = 0;

	function addErrorDirectly(message: string) {
		errors.push(`Syntax error found at line ${index + 1}.\n${message}`);
	}

	function pushError(cause: string) {
		switch (cause.toLowerCase()) {
			case "pause":
				addErrorDirectly(PROPER_PAUSE);
				break;
			case "exit":
				addErrorDirectly(PROPER_EXIT);
				break;
			case "say":
				addErrorDirectly(PROPER_SAY);
				break;
			case "read":
				addErrorDirectly(PROPER_READ);
				break;
			case "if":
				addErrorDirectly(PROPER_IF_SYNTAX);
				break;
			case "end":
				addErrorDirectly(PROPER_IF_SYNTAX);
				break;
			// case "checkpoint":
			// 	addErrorDirectly(PROPER_CHECKPOINT);
			// 	break;
			// case "goto":
			// 	addErrorDirectly(PROPER_GOTO);
			// 	break;
			default:
				addErrorDirectly(`\tKeyword '${cause}' is unrecognized`);
				break;
		}
	}

	const reads: string[] = [];
	const takenEnd: number[] = [];

	function hasEnd() {
		for (let i = index + 1; i < lines.length; i++) {
			const line = lines[i].trim();
			if (line === "end" && takenEnd.includes(i) === false) {
				takenEnd.push(i);
				return true;
			}
		}
		return false;
	}

	for (index = 0; index < lines.length; index++) {
		const line = lines[index].trim();
		const tokens = line.split(" ");
		const tokensLength = tokens.length;

		if (tokensLength === 0 || (tokensLength === 1 && tokens[0] === ""))
			continue;

		const first = tokens[0];

		if (tokensLength > 2) {
			if (first !== "say" && first !== "if") {
				pushError(first);
			}

			if (first === "if") {
				if (tokensLength < 4) {
					pushError(first);
					continue;
				}
				if (tokens[2] !== "is") {
					pushError(first);
					continue;
				}
				if (reads.includes(tokens[1]) === false) {
					addErrorDirectly(
						`\tYou first must read varible '${tokens[1]}'\n\t\tYou can do this by adding the code:\n\t\tread ${tokens[1]}`
					);
					continue;
				}
				if (!hasEnd()) {
					addErrorDirectly(
						`\tThere is no end for this if expression\n\t\Close it with the 'end' keyword, example:\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\t\tif choice is 1\n\t\t\tsay You just typed 1\n\t\tend\n\t\t~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
					);
					continue;
				}
			}
		} else if (tokensLength === 2) {
			if (first !== "say" && first !== "read") {
				pushError(first);
			}

			if (first === "read") {
				reads.push(tokens[1]);
			}
		} else if (tokensLength === 1) {
			if (first !== "pause" && first !== "exit" && first !== "end") {
				pushError(first);
			}
			if (first === "end" && takenEnd.includes(index) === false) {
				addErrorDirectly(
					`\tNo if expression to close with 'end' mark\n\t\tYou can simply remove this`
				);
				continue;
			}
		}
	}

	return errors;
}

export default detectError;

// const code = `
// say You find yourself standing at the entrance of a mysterious temple hidden deep within the dense jungle.
// say Legend has it that the temple holds a powerful artifact capable of granting immense knowledge and wisdom.
// say As an adventurer seeking glory and answers, you step forward, ready to embark on a thrilling quest.

// say You enter the temple and are greeted by an eerie silence.
// say The air is heavy with anticipation. Before you lies a long corridor, its walls adorned with ancient hieroglyphics.
// say To the left, a set of rusted iron doors beckons, while to the right, a dimly lit staircase leads downward.

// pause

// say What do you do?

// pause

// read a
// if a is a
// 	say "hey"
// 	say "yos"

// 	if a is a
// 	end
// end

// exit

// `;

// const res = detectError(code);

// console.log(res);

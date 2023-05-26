interface SyntaxResult {
	ok: boolean;
	error: string[];
}

const PROPER_PAUSE = `Example of correct syntax for 'pause':\n\tpause`;
const PROPER_EXIT = `Example of correct syntax for 'exit':\n\texit`;
const PROPER_SAY = `Example of correct syntax for 'say':\n\tsay hello world`;
const PROPER_READ = `Example of correct syntax for 'read':\n\tread name`;
const PROPER_IF_SYNTAX = `Example of correct syntax for 'if':\n\tif choice is 1\n\t\tsay You just typed 1\nend`;
// const PROPER_CHECKPOINT = `Example of correct syntax for 'savepoint'\n\tcheckpoint alpha`;
// const PROPER_GOTO = `Example of correct syntax for 'goto':\n\tgoto alpha`;

function detectError(code: string): SyntaxResult {
	const lines = code.split("\n");
	const error: string[] = [];
	let index = 0;

	function addErrorDirectly(message: string) {
		error.push(`Syntax error found at line ${index + 1}.\n${message}`);
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
				addErrorDirectly(`Keyword '${cause}' is unrecognized`);
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
						`You must read varible ${tokens[1]} first by doing 'read ${tokens[1]}'`
					);
					continue;
				}
				if (!hasEnd()) {
					addErrorDirectly(
						`There is no end for this if expression, you need to put 'end' to mark the end of the if condition`
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
		}
	}

	return { ok: error.length === 0, error: error };
}

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

// console.log(res.ok ? "CODE IS OK" : `ERROR DETECTED`);
// console.log(res.error);

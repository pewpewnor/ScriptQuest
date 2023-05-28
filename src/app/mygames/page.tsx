"use client";
import EditorPage from "@/components/editor/EditorPage";
import ScriptItem from "@/components/item/ScriptItem";
import ScriptNavbar from "@/components/navbar/ScriptNavbar";
import { DEFAULT_SCRIPTDATA_VALUE, ScriptData } from "@/types/script-type";
import { ScriptAction, ScriptActionType } from "@/types/scriptaction-type";
import { ChangeEvent, FC, Reducer, useReducer, useState } from "react";

const EXAMPLE_CODE = `say Welcome to the Sample ScriptQuest Adventure Game!
pause

say You are standing at the entrance of a cave.
pause

say You can hear strange noises coming from inside.
pause

say Do you dare to enter?
say TYPE 'yes' TO ENTER THE CAVE
say TYPE 'no' TO NOT ENTER THE CAVE

read choice

if choice is yes
    say You summon your courage and step inside the cave.
    pause    

    say As you venture deeper, you notice a faint light ahead.
    pause

    say You cautiously approach the light and found something.
    pause

    say It's a hidden treasure chest!
    pause

    say Do you open it?
    say TYPE 'yes' TO OPEN THE CHEST
    say TYPE 'no' TO TO LEAVE IT
    
    read choice2
    
    if choice2 is yes
        say You open the treasure chest and find a pile of gold and jewels!
        pause

        say Congratulations! You have become rich and victorious!
        pause

        say Game Over.
        exit
    end
    
    if choice2 is no
        say You resist the temptation to open the treasure chest.
        pause

        say You continue exploring the cave and find a hidden passage.
        pause

        say Do you enter the passage?
        say TYPE 'yes' TO ENTER THE PASSAGE
        say TYPE 'no' TO NOT ENTER THE PASSAGE
        
        read choice3
        
        if choice3 is yes
            say You follow the passage and discover a secret exit, leading you safely outside.
            pause

            say Though you missed the treasure, you have survived your adventure!
            pause

            say Game Over.
            exit
        end
        
        if choice3 is no
            say You decide not continue exploring the cave.
            pause

            say Suddenly, you stumble upon a ferocious dragon!
            pause

            say You try to escape, but the dragon blocks your path.
            pause
  
            say In a last-ditch effort, you fight the dragon with your sword.
            pause

            say The battle is fierce, but alas, you slay it and emerge victorious!
            pause

            say Congrats! You have triumphed and claim the cave as your own!
            pause

            say Game Over.
            exit
        end
    end
end

if choice is no
    say You decide it's best to turn back and leave it.
    pause

    say As you exit, you hear a loud noise behind you.
    pause

    say You turn just in time to see the cave collapse.
    pause

    say You narrowly escape a dangerous cave-in safely.
    pause

    say Congrats! You have survived the adventure!
    pause

    say Game Over.
    exit
end`;
const MAX_TITLE_LENGTH = 30;

interface MyScriptsProps {}

const MyScripts: FC<MyScriptsProps> = (props: MyScriptsProps) => {
	const [selectedPage, setSelectedPage] = useState<null | ScriptData>();

	function createScriptReducer(scripts: ScriptData[], action: ScriptAction) {
		switch (action.type) {
			case ScriptActionType.ADD:
				if (action.payload.newScript === undefined) {
					throw new Error("Error during edit action");
				}
				return [
					{
						...(action.payload.newScript
							? action.payload.newScript
							: DEFAULT_SCRIPTDATA_VALUE),
					},
					...scripts,
				];
			case ScriptActionType.DELETE:
				if (action.payload.title === undefined) {
					throw new Error("Error during edit action");
				}
				return scripts.filter(
					(script) => script.title !== action.payload.title
				);
			case ScriptActionType.RENAME:
				if (
					action.payload.newTitle === undefined ||
					action.payload.title === undefined
				) {
					throw new Error("Error during edit action");
				}
				return scripts.map((script) =>
					script.title === action.payload.title
						? {
								...script,
								title: action.payload.newTitle
									? action.payload.newTitle
									: script.title,
						  }
						: script
				);
			case ScriptActionType.EDIT:
				if (action.payload.title === undefined) {
					throw new Error("Error during edit action");
				}
				setSelectedPage(
					scripts.find(
						(script) => script.title === action.payload.title
					)
				);
				return scripts;
			case ScriptActionType.SAVECODE:
				if (
					action.payload.code === undefined ||
					action.payload.title === undefined
				) {
					throw new Error("Error during edit action");
				}

				return scripts.map((script) => {
					if (script.title === action.payload.title) {
						return {
							...script,
							code: action.payload.code
								? action.payload.code
								: script.code,
						};
					}
					return script;
				});
			default:
				return scripts;
		}
	}

	const [scripts, dispatchScripts] = useReducer<
		Reducer<ScriptData[], ScriptAction>
	>(createScriptReducer, [
		{
			title: "sample game",
			code: EXAMPLE_CODE,
		},
	]);
	const [createScriptData, setCreateScriptData] = useState<ScriptData>(
		DEFAULT_SCRIPTDATA_VALUE
	);

	function handleCreateScript() {
		if (createScriptData.title.length > MAX_TITLE_LENGTH) {
			alert(
				`Script title cannot be more than ${MAX_TITLE_LENGTH} characters`
			);
			return;
		} else if (createScriptData.title.length === 0) {
			alert("Script title cannot be empty");
			return;
		} else if (
			scripts.some((script) => script.title === createScriptData.title)
		) {
			alert("Script title must be unique");
			return;
		}

		dispatchScripts({
			type: ScriptActionType.ADD,
			payload: {
				newScript: {
					...DEFAULT_SCRIPTDATA_VALUE,
					title: createScriptData.title,
				},
			},
		});
		setCreateScriptData(DEFAULT_SCRIPTDATA_VALUE);
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		if (
			event.target.name === "title" &&
			event.target.value.length > MAX_TITLE_LENGTH
		) {
			alert(
				`Script title cannot be more than ${MAX_TITLE_LENGTH} characters`
			);
			return;
		}

		setCreateScriptData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	}

	if (!selectedPage) {
		return (
			<>
				<ScriptNavbar />
				<div className="flex w-full flex-col justify-around gap-16 px-10 pb-14 pt-44 sm:px-24 lg:px-96">
					<h1 className="text-center font-vt text-4xl text-clay">
						Create a new game to begin!
					</h1>
					<div className="flex flex-col items-center justify-center gap-x-4 gap-y-8 sm:flex-row sm:gap-10">
						<input
							type="text"
							name="title"
							value={createScriptData.title}
							onChange={handleChange}
							placeholder="Game title..."
							className="w-full rounded-3xl bg-slate-900 px-6 py-2 font-vt text-2xl text-clay outline-none"
						/>
						<button
							className="w-40 rounded-3xl bg-lime p-2 font-vt text-2xl text-dark hover:bg-electric hover:text-clay sm:w-72"
							onClick={handleCreateScript}
						>
							Create
						</button>
					</div>
					<div className="flex flex-col gap-14">
						{scripts.map((script) => (
							<ScriptItem
								key={script.title}
								{...script}
								dispatchScripts={dispatchScripts}
							/>
						))}
					</div>
				</div>
			</>
		);
	}

	return (
		<EditorPage
			dispatchScripts={dispatchScripts}
			{...selectedPage}
			closeEditor={() => {
				setSelectedPage(null);
			}}
		/>
	);
};

export default MyScripts;

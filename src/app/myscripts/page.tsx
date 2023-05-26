"use client";
import EditorPage from "@/components/editor/EditorPage";
import ScriptItem from "@/components/item/ScriptItem";
import ScriptNavbar from "@/components/navbar/ScriptNavbar";
import { DEFAULT_SCRIPTDATA_VALUE, ScriptData } from "@/types/script-type";
import { ScriptAction, ScriptActionType } from "@/types/scriptaction-type";
import { ChangeEvent, FC, Reducer, useReducer, useState } from "react";

const MAX_TITLE_LENGTH = 30;

interface MyScriptsProps {}

const MyScripts: FC<MyScriptsProps> = (props: MyScriptsProps) => {
	const [selectedPage, setSelectedPage] = useState<null | ScriptData>();

	function createScriptReducer(scripts: ScriptData[], action: ScriptAction) {
		switch (action.type) {
			case ScriptActionType.ADD:
				return [
					{
						...(action.payload.newScript
							? action.payload.newScript
							: DEFAULT_SCRIPTDATA_VALUE),
					},
					...scripts,
				];
			case ScriptActionType.DELETE:
				return scripts.filter(
					(script) => script.title !== action.payload.title
				);
			case ScriptActionType.RENAME:
				if (action.payload.newTitle === undefined) {
					throw new Error("Error during edit action");
				}
				return scripts.map((script) =>
					script.title === action.payload.title
						? {
								...script,
								title: action.payload.newTitle
									? action.payload.newTitle
									: "error during rename",
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
			default:
				return scripts;
		}
	}

	const [scripts, dispatchScripts] = useReducer<
		Reducer<ScriptData[], ScriptAction>
	>(createScriptReducer, [
		{
			title: "alpha",
			code: "",
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

	return <EditorPage dispatchScripts={dispatchScripts} {...selectedPage} />;
};

export default MyScripts;

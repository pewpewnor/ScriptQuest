"use client";
import Editor from "@/components/editor/Editor";
import Navbar from "@/components/navbar/Navbar";
import { FC, useState } from "react";

interface MyScriptsProps {}

const MyScripts: FC<MyScriptsProps> = (props: MyScriptsProps) => {
	return (
		<>
			<Navbar leaveWarning={true} />{" "}
			<div className="pt-12">
				<Editor />
			</div>
		</>
	);
};

export default MyScripts;

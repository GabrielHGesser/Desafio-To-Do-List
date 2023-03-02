import { Check, Trash } from "phosphor-react";
import { useState } from "react";
import { NotesProps } from "../App";

interface ListComponentProps {
	note: NotesProps;
	changeCheck: (id: string) => void;
	deleteNote: (id: string) => void;
}

export function ListComponent({ note, changeCheck, deleteNote }: ListComponentProps) {
	return (
		<div
			className="w-full min-h-[72px] p-4 flex items-start justify-between gap-3 
		bg-gray_500 border-[1px] border-gray_400 rounded-lg
		max-[500px]:min-h-fit"
		>
			<div
				onClick={() => changeCheck(note.id)}
				className={`flex items-center justify-center w-6 h-6 rounded-full p-1 cursor-pointer 
				text-gray_100
      ${
				note.isChecked
					? "bg-purple_dark border-purple_dark hover:bg-purple hover:border-purple"
					: "border-2 border-blue hover:bg-blue_dark hover:bg-opacity-60"
			}`}
			>
				{note.isChecked && <Check size={24} />}
			</div>
			<div className="flex-1 h-full">
				<p
					className={` text-gray_100 leading-[140%] text-small 
          ${note.isChecked && "line-through"}`}
				>
					{note.text}
				</p>
			</div>
			<div
				onClick={() => deleteNote(note.id)}
				className="text-gray_300 cursor-pointer px-[6px] py-[5px] rounded-lg 
			hover:bg-gray_400 hover:text-danger duration-300 ease-linear"
			>
				<Trash size={24} />
			</div>
		</div>
	);
}

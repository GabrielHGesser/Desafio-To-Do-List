import { DeviceTabletSpeaker, PlusCircle } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import logo from "./assets/logo.svg";
import { ListComponent } from "./components/ListComponent";
import { v4 as uuidv4 } from "uuid";
import clipBoard from "./assets/clipboard.svg";

export interface NotesProps {
	id: string;
	isChecked: boolean;
	text: string;
}

export function App() {
	const [notes, setNotes] = useState<NotesProps[]>([]);
	const [textNote, setTextNote] = useState<string>("");

	function loadNotes() {
		const save = localStorage.getItem("n0tes");

		if (save) {
			setNotes(JSON.parse(save));
		}
	}

	useEffect(() => {
		loadNotes();
	}, []);

	function saveNotesAndSet(newNote: NotesProps[]) {
		setNotes(newNote);
		localStorage.setItem("n0tes", JSON.stringify(newNote));
	}

	function handleCreateNote(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		saveNotesAndSet([
			...notes,
			{
				id: uuidv4(),
				isChecked: false,
				text: textNote,
			},
		]);
	}

	function changeCheck(id: string) {
		const newNotes = notes.map((note) => {
			if (note.id === id) {
				return {
					...note,
					isChecked: !note.isChecked,
				};
			}
			return note;
		});

		saveNotesAndSet(newNotes);
	}

	function deleteNote(id: string) {
		const newNotes = notes.filter((note) => note.id !== id);
		saveNotesAndSet(newNotes);
	}

	return (
		<div className="w-full h-screen bg-gray_600">
			<header className="w-full py-20 bg-gray_700 flex items-center justify-center">
				<img src={logo} alt="" />
			</header>
			<main className="w-full max-[800px]:px-4">
				<div className="mx-auto max-w-[736px] flex flex-col gap-16 mt-[-27px] max-[400px]:gap-24">
					<form
						onSubmit={handleCreateNote}
						className="w-full h-[54px] flex gap-2 max-[400px]:flex-col"
					>
						<input
							className="flex-1 h-full outline-0 p-4 text-normal leading-[140%] duration-200 ease-in-out
							text-gray_100 bg-gray_500 rounded-lg border-[1px] border-gray_700
							placeholder:text-gray-400 focus:border-purple_dark hover:border-purple_dark"
							type="text"
							placeholder="Adicione uma nova tarefa"
							value={textNote}
							onChange={(event) => setTextNote(event.target.value)}
						/>
						<button
							className="flex items-center justify-center gap-2 p-4  rounded-lg duration-500 ease-in-out border-[1px]
							border-gray_700 bg-blue_dark
							hover:bg-blue"
						>
							<span className="font-bold text-small leading-[140%] text-gray_100">Criar</span>
							<PlusCircle size={20} color={"#FFF"} />
						</button>
					</form>
					<div className="flex flex-col gap-6">
						<div className="flex justify-between items-center max-[400px]:flex-col">
							<div className="flex gap-2 items-center">
								<p className="text-blue">Tarefas criadas</p>
								<span className="text-gray_200 py-[2px] px-2 bg-gray_400 rounded-full text-verySmall font-bold">
									0
								</span>
							</div>
							<div className="flex gap-2 items-center">
								<p className="text-purple">Concluídas</p>
								<span className="text-gray_200 py-[2px] px-2 bg-gray_400 rounded-full text-verySmall font-bold">
									0
								</span>
							</div>
						</div>
						<div className="w-full boxListResize flex flex-col gap-3 overflow-y-auto">
							{notes.length <= 0 ? (
								<div
									className="w-full h-[244px] border-t-[1px] rounded-lg border-[#333333]
								flex items-center justify-center gap-4 flex-col"
								>
									<img src={clipBoard} alt="" />
									<div>
										<p className="font-bold text-normal text-gray_300">
											Você ainda não tem tarefas cadastradas
										</p>
										<span className="text-normal text-gray_300">
											Crie tarefas e organize seus itens a fazer
										</span>
									</div>
								</div>
							) : (
								notes.map((note) => {
									return (
										<ListComponent
											key={note.id}
											note={note}
											changeCheck={changeCheck}
											deleteNote={deleteNote}
										/>
									);
								})
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

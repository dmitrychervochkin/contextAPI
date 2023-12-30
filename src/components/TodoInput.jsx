import React, {useContext} from "react";
import styles from '../App.module.css';
import { AppContext } from "../context";

export function TodoInput({note, setNote}){
	const { addTodo } = useContext(AppContext);

	function handleChange({target}){
		setNote(target.value);
	}

	return(
		<>
			<input
				value={note}
				onChange={handleChange}
				className={styles.TodoInput}
				placeholder='Введите новую задачу...'
			></input>
			<button
				className={styles.AddBtn}
				onClick={addTodo}
			>
				Добавить новую задачу
			</button>
		</>

	)
};
import React, { useState, useContext } from "react";
import styles from '../App.module.css';
import { EditTodo } from './EditTodo';
import { AppContext } from '../context';

export function TodoItem({ ...props }){
	const [isEdit, setIsEdit] = useState(false);
	const { completeTodo, editTodo, deleteTodo } = useContext(AppContext);

	function handleEdit(){
		setIsEdit((prevState) => !prevState)
	};

	function handleComplete({target}){
		completeTodo(props.id, target.checked)
	}

	return(
		<>
			{isEdit ? (
				<EditTodo {...props} handleEdit={handleEdit} editTodo={editTodo} />
			) : (
				<li className={styles.TodoTitle}>
					<div className={styles.inputBox}>
						<input
							checked={props.completed}
							type='checkbox'
							id={props.id}
							onChange={handleComplete}
							className={styles.btnInput}
						/>
						<div data-complete={props.completed}>
							{props.title}
						</div>
					</div>

						<div>
							<button
								onClick={handleEdit}
								className={styles.btn}
							>
								Edit
							</button>
							<button
								id={props.id}
								onClick={deleteTodo}
								className={styles.btn}
							>
								Delete
							</button>

						</div>

				</li>
			)}
		</>
	)
}

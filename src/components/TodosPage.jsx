import React, { useState, useEffect, useContext, createContext } from "react";
import styles from '../App.module.css';
import { useDebounce } from "../hooks/useDebounce";
import { InputSearch } from "./InputSearch";
import { TodoList } from "./TodoList";
import { TodoInput } from "./TodoInput";
import { AppContext } from '../context.js';

const TodosContext = createContext({});
export const useTodos = () => {
	return useContext(TodosContext);
};

export function TodosPage(){
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [note, setNote] = useState('');
	const [refreshTodos, setRefreshTodos] = useState(false);
	const [sort, setSort] = useState(false);
	const [isCompleting, setIsCompleting] = useState(false);

	const debounceValue = useDebounce(searchQuery, 500);

	function loadedTodos(){
		setIsLoading(true);
		fetch(`http://localhost:3005/todos?q=${searchQuery}`)
			.then((responce) => responce.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => setIsLoading(false));
	};

	function sortTodos(){
		let sortTitle = '?_sort=title';
		sort ? sortTitle = '?_sort=title' : sortTitle = '';
		fetch(`http://localhost:3005/todos${sortTitle}`)
			.then((responce) => responce.json())
			.then((data) => {
				setTodos(data);
			})
			.finally(() => {
				setSort(!sort);
			});
    };

	function editTodo(id, payLoad){
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
			body: JSON.stringify({ ...payLoad })
		})
			.then((responce) => responce.json())
			.then((data) => {
				const todosIndex = todos.findIndex((prod) => prod.id === id);
				const copyData = todos.slice();
				copyData[todosIndex] = data;
				setTodos(copyData);
			})
	};

	function addTodo(){
		if(note !== ''){
			fetch(`http://localhost:3005/todos`, {
				method: 'POST',
				headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({
					title: note,
      				completed: false,
				})
			})
				.then((responce) => responce.json())
				.then((data) => {
					setRefreshTodos(data)
				})
				.finally(() => {
					setNote('');
				});
		}
	};

	function deleteTodo(event){
		fetch(`http://localhost:3005/todos/${event.target.id}`, {
			method: 'DELETE'
		})
			.then((responce) => responce.json())
			.then((data) => {
				setRefreshTodos(!refreshTodos)
			})
	}

	function completeTodo(id, bool){
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: {'Content-Type': 'application/json;charset=utf-8'},
				body: JSON.stringify({
					completed: bool,
				})

			})
			.then((rawResponce) => rawResponce.json())
			.then((response) => {
				setRefreshTodos(!refreshTodos);
			})
			.finally(() => {
				setIsCompleting(!isCompleting);
			})
	}

	useEffect(() => {
		setIsLoading(true);
		loadedTodos();
	}, [debounceValue, refreshTodos]);

	return(
		<AppContext.Provider value={{todos, addTodo, editTodo, deleteTodo, completeTodo }}>
			<div>
				<div className={styles.others}>
					<InputSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
					<button onClick={sortTodos} className={styles.sortBtn}>Sort cases</button>
				</div>

				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<>
						<TodoInput note={note} setNote={setNote}/>
						<TodoList />
					</>
						)}
			</div>
		</AppContext.Provider>
	)

};


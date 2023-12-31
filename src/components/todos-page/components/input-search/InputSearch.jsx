import React from "react";
import styles from '../../../../App.module.css';
import { useTodos } from "../../TodosPage";

export function InputSearch(){
	const {searchQuery, setSearchQuery} = useTodos();

	function handleChange(event){
		setSearchQuery(event.target.value)
	};

	return(
		<input
			placeholder='Поиск...'
			value={searchQuery}
			onChange={handleChange}
			className={styles.search}
		></input>
	);
};

import React, { useContext} from "react";
import { TodoItem } from './TodoItem';
import { AppContext } from "../context";

export function TodoList(){
	const { todos } = useContext(AppContext);

	return(
		<ul>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					{...todo}
				/>
			))}
		</ul>
	);
};

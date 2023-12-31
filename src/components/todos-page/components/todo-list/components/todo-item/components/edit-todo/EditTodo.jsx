import React, {useState, useEffect, useContext} from "react";
import * as yup from 'yup';
import {TextField} from './components/text-field/TextField';
import { AppContext } from "../../../../../../../../context";

const validateSchema = yup.object().shape({});
function parceYupError(){};

export function EditTodo({ ...props }){
	const [error, setError] = useState({});
	const [value, setValue] = useState({...props});
	const { editTodo, handleEdit } = useContext(AppContext);

	function handleChange(event){
		const {name, value} = event.target;
		setValue((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const isValid = Object.keys(error).length === 0;

	async function handleSubmit(event){
		event.preventDefault();
		try{
			if(isValid){
				await editTodo(props.id, value);
				handleEdit();
			}
		} catch(error){
			console.log(error);
		};
	};

	useEffect(() => {
		validateSchema
			.validate(value, { abortEarly: false })
			.then(() => {
				setError({})
			})
			.catch((yupError) => {
				const error = parceYupError(yupError);
				setError(error)
			})
	}, [value]);

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				value={value.title}
				id='title'
				onChange={handleChange}
				error={error.title}
			/>
		</form>
	)
};

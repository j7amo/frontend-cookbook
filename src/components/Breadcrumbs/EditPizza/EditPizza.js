import React from 'react';
import { Link, useParams } from 'react-router-dom';

const toppings = [
	{ id: '1', name: 'Cheese' },
	{ id: '2', name: 'Pepperoni' },
	{ id: '3', name: 'Ham' },
	{ id: '4', name: 'Pineapple' },
];

const pizza = [
	{
		id: '1',
		name: 'Pepperoni',
		toppings: [toppings[0], toppings[1]],
	},
	{ id: '2', name: 'Cheese', toppings: [toppings[0]] },
	{
		id: '3',
		name: 'Ham and Pineapple',
		toppings: [...toppings.slice(2)],
	},
];

const EditPizza = () => {
	// используем хук useParams для работы с параметрами (то, что идёт в роутинге после ":" (двоеточия))
	// данный хук позволяет считать эти параметры используя объект location судя по всему
	const { pizzaId } = useParams();

	return (
		<div>
			<h1 className="bold text-6xl">Edit Pizza: {pizza.find(({ id }) => id === pizzaId).name}</h1>
			<Link className="underline text-blue-500" to={`/pizza/${pizzaId}/toppings`}>
				View Toppings
			</Link>
		</div>
	);
};

export default EditPizza;

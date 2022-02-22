import React from 'react';
import { useParams } from 'react-router-dom';

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

const Toppings = () => {
	const { pizzaId } = useParams();

	return (
		<div>
			<h1 className="bold text-6xl">Toppings for {pizza.find(({ id }) => id === pizzaId).name}</h1>
			<ul>
				{pizza
					.find(({ id }) => id === pizzaId)
					.toppings.map(({ id, name }) => (
						<li key={id}>{name}</li>
					))}
			</ul>
		</div>
	);
};

export default Toppings;

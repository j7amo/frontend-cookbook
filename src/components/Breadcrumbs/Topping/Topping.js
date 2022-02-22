import React from 'react';
import { useParams } from 'react-router-dom';

const toppings = [
	{ id: '1', name: 'Cheese' },
	{ id: '2', name: 'Pepperoni' },
	{ id: '3', name: 'Ham' },
	{ id: '4', name: 'Pineapple' },
];

const Topping = () => {
	const { toppingId } = useParams();
	const toppingName = toppings.find(({ id }) => id === toppingId).name;

	return <span>This is {toppingName} topping description!</span>;
};

export default Topping;

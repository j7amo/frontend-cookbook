import React from 'react';
import { Link } from 'react-router-dom';

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

const Pizza = () => {
	return (
		<div>
			<h1 className="bold text-6xl">List Of Pizza</h1>
			<ul>
				{pizza.map(({ id, name }) => {
					// console.log(id);
					return (
						<li className="underline text-blue-500" key={id}>
							{/*/!* используем компонент <Link> из пакета "react-router-dom", чтобы сообщить React Router, что надо:*/}
							{/*  1) запушить в history-stack тот path, который у <Link> в атрибуте TO*/}
							{/*  2) изменить URL в адресной строке браузера за счёт изменения свойства path в объекте location *!/*/}
							{/*ВАЖНО! между `/pizza/${id}` и `pizza/${id}` большая разница! Если в атрибуте TO pathname НЕ начинается*/}
							{/* с прямого слэша, то значение ПРИБАВЛЯЕТСЯ (конкатенируется) к тому, что уже в URL браузера*/}
							<Link to={`/pizza/${id}`}>{name}</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Pizza;

export default [
	{ path: '/pizza', name: 'Pizzas', Component: Pizza },
	{
		path: '/pizza/:pizzaId',
		name: 'Edit Pizza',
		Component: EditPizza,
	},
	{
		path: '/pizza/:pizzaId/toppings',
		name: 'Pizza Toppings',
		Component: Toppings,
	},
];

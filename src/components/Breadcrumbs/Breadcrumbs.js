import React from 'react';
import styles from './Breadcrumbs.module.scss';
import { Link, useParams } from 'react-router-dom';

// нам нужна утилита, которая позволит динамически формировать ссылки для атрибутов TO компонентов <Link />
// идея в том, что мы будем брать исходный список путей и оставлять только те, которые включает в себя текущий

// для этого нам потребуются на входе:
// - исходный массив путей / роутов
// - текущий path / pathname
// - текущие URL-параметры

// на выходе получим массив строк, которые представляют собой пути
const makeRoutes = (routes, matchedPathPattern, urlParams) => {
	return routes
		// Очень важно! matchedPathPattern - здесь изначально мы передаём строку с плейсхолдером, типа:
		// matchedPathPattern = '/pizza/:pizzaId/toppings', где ':pizzaId' и есть плейсхолдер
		// такой подход позволяет нам найти все пути, которые входят в текущий
		// например: '/pizza' входит в '/pizza/:pizzaId/toppings'
		.filter((route) => matchedPathPattern.includes(route.path))
		.map((route) => {
			// проверяем, есть ли у нас вообще URL-параметры в текущем pathname
			if (Object.keys(urlParams).length) {
				// достаём все ключи (названия параметров) из объекта urlParams, который мы получили с помощью хука useParams
				const allParams = Object.keys(urlParams);
				// перебираем получившийся массив и для каждого ключа пытаемся произвести замену в path текущего пути,
				// то есть мы хотим из "/pizza/:pizzaId/toppings" сделать "/pizza/1/toppings"
				// иначе у нас не получится "живых" ссылок, а будут ссылки с плейсхолдерами для URL-параметров
				return allParams.reduce((_, param) => {
					return {
						// динамически (за счёт `:${param}`) находим в строке совпадение и меняем на соответствующее значение из объекта params
						// например: в строке "/pizza/:pizzaId/toppings" находим ":pizzaId" и заменяем на "1", что на выходе даёт "/pizza/1/toppings"
						path: route.path.replace(`:${param}`, urlParams[param]),
						name: route.name,
					};
				}, route);
			}
			// если параметров в pathname нет, возвращаем объект route с pathname в первозданном виде
			return {
				path: route.path,
				name: route.name,
			};
		});
};

// компонент "Хлебные крошки" будет принимать массив "крошек" (путей роутинга на самом деле)
// и рисовать их в виде списка ссылок, который пользователь сможет использовать для
// быстрой навигации по приложению (а именно по дереву любой вложенности)
const Breadcrumbs = ({ routes, path }) => {
	// для получения текущих параметров воспользуемся хуком useParams
	// без этого объекта мы не сможем нормально вызвать функцию makeRoutes!
	const params = useParams();
	// пользуемся утилитой и создаём массив объектов routes, которые представляют собой
	// объекты с изменёнными pathname'ми (плейсхолдеры заменяем на динамические параметры)
	const crumbs = makeRoutes(routes, path, params);

	return (
		<ul className={styles.breadCrumbs}>
			{crumbs.map((crumb) => (
				<li className={styles.breadCrumb}>
					<Link to={crumb.path} className={styles.breadCrumbLink}>
						{crumb.name}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default Breadcrumbs;

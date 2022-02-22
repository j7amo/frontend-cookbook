import './App.css';
import { useCallback, useState } from 'react';
// именованный импорт (если соответствующий экспорт также был именованный) обязывает нас (1)использовать
// фигурные скобки + явным образом (2)писать идентификатор компонента, который мы импортируем
import { Button } from './components/Button/Button';
// import { Button1 } from "./components/Button/Button"; - так работать не будет -> идентификатор "Button1"
// не экспортируется из "./components/Button/Button". При этом это не значит, что его там нет!
// Если мы импортируем что-то, что было экспортировано по умолчанию (default export), то мы можем использовать
// любое наименование при импорте, например:
// import SomeSexyButton from "./components/Button/Button";
import Toggle from './components/Toggle/Toggle';
import Accordion from './components/Accordion/Accordion';
import Tabs from './components/Tabs/Tabs';
import Modal from './components/Modal/Modal';
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu';
// используем Browser Router для автоматической генерации "хлебных крошек"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Pizza from './components/Breadcrumbs/Pizza/Pizza';
import EditPizza from './components/Breadcrumbs/EditPizza/EditPizza';
import Toppings from './components/Breadcrumbs/Toppings/Toppings';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';

const tabsData = [
	{
		label: 'First Tab',
		content:
			'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. ' +
			'Aenean commodo ligula eget dolor. Aenean massa. ',
	},
	{
		label: 'Second Tab',
		content:
			'Cum sociis natoque penatibus et magnis dis parturient montes, ' +
			'nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, ' +
			'pretium quis, sem. Nulla consequat massa quis enim.',
	},
	{
		label: 'Third Tab',
		content:
			' Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ' +
			'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. ' +
			'Nullam dictum felis eu pede mollis pretium. Integer tincidunt.',
	},
];

const hamburgerMenuData = [
	{
		label: 'Yandex',
		href: 'https://yandex.ru',
	},
	{
		label: 'Google',
		href: 'https://www.google.com',
	},
];

// определим данные для роутинга
const routesDataForBreadcrumbs = [
	{
		path: '/pizza',
		name: 'Pizzas',
		// вспоминаем о том, что JSX это прежде всего ОБЪЕКТ! Поэтому мы можем также спокойно ссылаться на него в других структурах данных
		component: <Pizza />,
	},
	{
		// нужно обратить внимание на то, что ДВОЕТОЧИЕ в свойстве path играет особую роль:
		// таким образом мы задаём паттерн, который позволяет в дальнейшем извлекать параметры.
		// в данном случае мы по сути определили ПЕРЕМЕННУЮ, в которой будет собираться всё, что мы напишем в адресной строке
		// после /pizza/. Например, из /pizza/1 мы сможем извлечь 1.
		path: '/pizza/:pizzaId',
		name: 'Edit Pizza',
		component: <EditPizza />,
	},
	{
		path: '/pizza/:pizzaId/toppings',
		name: 'Pizza Toppings',
		component: <Toppings />,
	},
];

function App() {
	// стейт для меню-гамбургера
	const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
	// стейт для модалки
	const [isModalOpen, setIsModalOpen] = useState(false);
	// коллбэк для закрытия модалки, обёрнутый в useCallback, так как мы спускаем его в дочерний компонент
	const closeModal = useCallback(() => setIsModalOpen(false), []);
	// коллбэк для скрытия / показа гамбургер-меню
	const toggleHamburgerMenu = useCallback(() => {
		setIsHamburgerMenuOpen((prevIsOpen) => !prevIsOpen);
	}, []);

	return (
		<div className="App">
			{/*для использования роутера нужно обернуть то, что хотим рендерить в компонента <Router>*/}
			<Router>
				{/*новшество в React Router v6: Routes вместо Switch*/}
				<Routes>
					{routesDataForBreadcrumbs.map(({ path, component }, index) => (
						<Route
							path={path}
							// новшество в React Router v6: element вместо component
							element={
								<>
									{/*не забываем пробросить PATH также в <Breadcrumbs>*/}
									{/*это нужно, чтобы найти все "подпути", которые входят в текущий*/}
									<Breadcrumbs routes={routesDataForBreadcrumbs} path={path} />
									{component}
								</>
							}
							key={`${path}-${index}`}
						/>
					))}
					{/*отрисуем "страницу" для базового pathname*/}
					<Route path="/" element={<Link to="/pizza">To Pizza!</Link>} />
				</Routes>
			</Router>
			<header className="App-header">
				<HamburgerMenu
					isMenuOpen={isHamburgerMenuOpen}
					navItems={hamburgerMenuData}
					toggleMenu={toggleHamburgerMenu}
				/>
				<Button type="button">Don't click me!</Button>
				{/*<SomeSexyButton>Click me!</SomeSexyButton>*/}
				<Tabs data={tabsData} />
				<Toggle name="superToggle" onChangeHandler={(value) => console.log(value)} />
				<button type="button" onClick={() => setIsModalOpen(true)}>
					Show modal
				</button>
				{/*рисуем модалку только, при флаге = true*/}
				{isModalOpen && (
					<Modal
						// динамически прокидываем текст, чтобы было много разных модалок
						title="One sexy modal"
						// прокидываем коллбэк на закрытие модалки, который будет вызван при любом
						// действии в дочернем компоненте, направленном на закрытие модалки
						// здесь же в родительском компоненте он выставит флаг isModalOpen в FALSE
						closeModal={closeModal}
					>
						<p>You are seeing a supercool modal content!</p>
					</Modal>
				)}
				<Accordion />
			</header>
		</div>
	);
}

export default App;

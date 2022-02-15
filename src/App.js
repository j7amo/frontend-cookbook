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

function App() {
	// стейт для модалки
	const [isModalOpen, setIsModalOpen] = useState(false);
	// коллбэк для закрытия модалки, обёрнутый в useCallback, так как мы спускаем его в дочерний компонент
	const closeModal = useCallback(
		() => setIsModalOpen(false),
		[],
	);

	return (
		<div className="App">
			<header className="App-header">
				<Button type="button">
					Don't click me!
				</Button>
				{/*<SomeSexyButton>Click me!</SomeSexyButton>*/}
				<Tabs data={tabsData} />
				<Toggle
					name="superToggle"
					onChangeHandler={(value) =>
						console.log(value)
					}
				/>
				<button
					type="button"
					onClick={() => setIsModalOpen(true)}
				>
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
						<p>
							You are seeing a supercool modal
							content!
						</p>
					</Modal>
				)}
				<Accordion />
			</header>
		</div>
	);
}

export default App;

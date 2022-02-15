import './App.css';
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
				<Accordion />
			</header>
		</div>
	);
}

export default App;

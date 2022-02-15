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
import Tabs from "./components/Tabs/Tabs";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Button type="button">
					Don't click me!
				</Button>
				{/*<SomeSexyButton>Click me!</SomeSexyButton>*/}
				<Tabs />
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

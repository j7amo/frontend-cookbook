import './App.css';
// именованный импорт (если соответствующий экспорт также был именованный) обязывает нас (1)использовать
// фигурные скобки + явным образом (2)писать идентификатор компонента, который мы импортируем
import { Button } from "./components/Button/Button";
// import { Button1 } from "./components/Button/Button"; - так работать не будет -> идентификатор "Button1"
// не экспортируется из "./components/Button/Button". При этом это не значит, что его там нет!
// Если мы импортируем что-то, что было экспортировано по умолчанию (default export), то мы можем использовать
// любое наименование при импорте!
// import SomeSexyButton from "./components/Button/Button";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<Button type="button">Don't click me!</Button>
				{/*<SomeSexyButton>Click me!</SomeSexyButton>*/}
			</header>
		</div>
	);
}

export default App;

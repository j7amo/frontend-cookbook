import React, { useCallback, useState } from 'react';
import { Button } from '../Button/Button';
import RadioButton from '../RadioButton/RadioButton';
import Checkbox from '../Checkbox/Checkbox';
import Dropdown from '../Dropdown/Dropdown';
import styles from './Form.module.scss';

// подготовим данные для нарезки опций в дропдауне
// нужно обратить внимание на структуру данных:
// value и label очень похожи по своему значению, но это принципиально разные вещи!
// value реально отправляется на сервер при сабмите формы,
// а label это просто текстовое значение пункта выпадающего списка, которое нужно пользователю, чтобы понимать, что он выбирает!
const dropdownOptions = [
	{
		value: 'pizza',
		label: 'Pizza',
	},
	{
		value: 'burger',
		label: 'Burger',
	},
	{
		value: 'curry',
		label: 'Curry',
	},
	{
		value: 'pad-thai',
		label: 'Pad Thai',
	},
	{
		value: 'tom-yum',
		label: 'Tom Yum',
	},
	{
		value: 'pelmeshki',
		label: 'Pelmeshki',
	},
];

//подготовим данные для "нарезки" радио-кнопок
const radioData = [
	{
		label: 'React',
		value: 'react',
		name: 'someSexyRadios',
	},
	{
		label: 'Angular',
		value: 'angular',
		name: 'someSexyRadios',
	},
	{
		label: 'Vue',
		value: 'vue',
		name: 'someSexyRadios',
	},
];

//подготовим данные для "нарезки" чекбоксов
const checkboxData = [
	{
		label: 'React',
		name: 'react',
	},
	{
		label: 'Angular',
		name: 'angular',
	},
	{
		label: 'Vue',
		name: 'vue',
	},
];

const Form = () => {
	// храним и меняем состояние выбранной радио-кнопки
	const [currentSelectedRadioButton, setCurrentSelectedRadioButton] = useState(radioData[0].value);

	// храним и меняем состояние чекбоксов
	// для этого будем использовать массив (размер будет равен размеру исходного массива с данными) с boolean-значениями
	const [checkedState, setCheckedState] = useState(new Array(checkboxData.length).fill(false));

	// храним и меняем состояние выпадающего списка
	const [selectedDropdownValue, setSelectedDropdownValue] = useState('');

	// реагируем на отправку формы
	const handleFormSubmit = (evt) => {
		// предотвращаем действие браузера по умолчанию (нам на самом деле сейчас не нужна отправка формы)
		evt.preventDefault();
		// выводим текущее значение радио-кнопки
		console.log(`You've submitted RATING choice: ${currentSelectedRadioButton}`);
		// сформируем и выведем выбранные значения для чекбоксов
		const checkboxesChosen = checkboxData.filter((checkbox, index) => checkedState[index]).map(({ name }) => name);
		console.log(`You've submitted LEARNING choice: ${checkboxesChosen}`);
		// выводим выбранное в выпадающем списке значение
		console.log(`Сегодня будем жрать ${selectedDropdownValue}`);
	};

	// реагируем на изменение значения текущей выбранной радио-кнопки
	const handleRadioButtonsChange = useCallback((evt) => {
		setCurrentSelectedRadioButton(evt.target.value);
	}, []);

	// реагируем на изменение значения чекбоксов и не забываем для useCallback указать зависимость,
	// чтобы возвращался новый коллбэк при изменении (новой ссылке на) checkedState
	// если этого не сделать, то наш коллбэк замкнётся на начальный checkedState (по ссылке!), будет
	// брать данные из него, но так как мы меняем состояние НЕмутирующим способом, то мы полностью меняем ссылку. Но
	// коллбэк всё время (если не указать зависимость) замкнут на старую ссылку и как следствие не "видит" изменения
	// с прошлого шага, которые находятся по новой ссылке.
	const handleCheckboxesChange = useCallback(
		(evt) => {
			const currentCheckboxIndex = checkboxData.findIndex((checkbox) => checkbox.name === evt.target.name);
			setCheckedState([
				...checkedState.slice(0, currentCheckboxIndex),
				evt.target.checked,
				...checkedState.slice(currentCheckboxIndex + 1),
			]);
		},
		[checkedState],
	);

	// реагируем на изменение выбранного значения выпадающего списка
	const handleDropdownSelectedValue = useCallback((evt) => {
		setSelectedDropdownValue(evt.target.value);
	}, []);

	return (
		<form className={styles.superSexyForm} onSubmit={handleFormSubmit}>
			{/*вместо того, чтобы "ловить" событие на каждой отдельной радио-кнопке будем делать это на общем контейнере*/}
			<div onChange={handleRadioButtonsChange}>
				What do you rate more?
				{radioData.map(({ label, value, name }) => (
					<RadioButton label={label} name={name} value={value} selectedValue={currentSelectedRadioButton} />
				))}
			</div>
			{/*добавим группу чекбоксов*/}
			<div onChange={handleCheckboxesChange}>
				What do you want to learn today?
				{checkboxData.map(({ label, name }, index) => (
					<Checkbox label={label} name={name} checked={checkedState[index]} />
				))}
			</div>
			{/*добавим компонент с выпадающим списком*/}
			<Dropdown
				label="Что будем жрать?"
				options={dropdownOptions}
				selectedValue={selectedDropdownValue}
				onChangeHandler={handleDropdownSelectedValue}
			/>
			<Button type="submit">Send data!</Button>
		</form>
	);
};

export default Form;

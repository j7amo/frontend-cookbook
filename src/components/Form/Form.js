import React, { useCallback, useState } from 'react';
import { Button } from '../Button/Button';
import RadioButton from '../RadioButton/RadioButton';

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

const Form = () => {
	// храним и меняем состояние выбранной радио-кнопки
	const [currentSelectedRadioButton, setCurrentSelectedRadioButton] = useState(radioData[0].value);

	// реагируем на отправку формы
	const handleFormSubmit = (evt) => {
		// предотвращаем действие браузера по умолчанию (нам на самом деле сейчас не нужна отправка формы)
		evt.preventDefault();
		// выводим текущее значение радио-кнопки
		console.log(`You've submitted ${currentSelectedRadioButton}`);
	};

	// реагируем на изменение значения текущей выбранной радио-кнопки
	const handleRadioButtonsChange = useCallback((evt) => {
		setCurrentSelectedRadioButton(evt.target.value);
	}, []);

	return (
		<form onSubmit={handleFormSubmit}>
			{/*вместо того, чтобы "ловить" событие на каждой отдельной радио-кнопке будем делать это на общем контейнере*/}
			<div onChange={handleRadioButtonsChange}>
				{radioData.map(({ label, value, name }) => (
					<RadioButton label={label} name={name} value={value} selectedValue={currentSelectedRadioButton} />
				))}
			</div>
			<Button type="submit">Send data!</Button>
		</form>
	);
};

export default Form;

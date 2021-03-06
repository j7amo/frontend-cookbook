import React from 'react';
import styles from './RadioButton.module.scss';

// напишем компонент, который будет рисовать радио-кнопку
// Радио-кнопка это всего лишь <input> с атрибутом type="radio", но есть нюансы:
// - в отличие от чекбоксов в группе радио-кнопок одновременно может быть выбрана только ОДНА кнопка
// - в отличие от чекбоксов у каждой радио-кнопки в группе должно быть ОДНО общее имя

// наш компонент будет принимать:
// - label - текст, который будет подписывать каждую радио-кнопку, чтобы пользователь понимал, что он выбирает
// - name - имя группы радио-кнопок (это позволит нам задать всем радио-кнопкам в группе одно и то же имя, что разрешит выбор только одной радиокнопки)
// - value - значение для атрибута value (оно используется при сабмите формы)
// - selectedValue - текущая выбранная кнопка (это нужно для определения значения атрибута checked)

// Если внимательно посмотреть на компонент, то видно, что он УПРАВЛЯЕМЫЙ, то есть им управляет React, а не браузерный DOM.

const RadioButton = ({ label, name, value, selectedValue }) => {
	return (
		<label>
			<input
				className={styles.radioButton}
				type="radio"
				name={name}
				value={value}
				checked={value === selectedValue}
			/>
			{label}
		</label>
	);
};

export default RadioButton;

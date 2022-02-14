import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toggle.module.css';

// этот компонент будет рисовать тогглер / переключатель
// подобные компоненты с состоянием  ON / OFF удобно делать на <input type="checkbox"/>
// и связанном с ним <label>. Как правило сам чекбокс скрывается с помощью класса "visually-hidden".
// А элемент <label> относительно позиционируется и на нём делается псевдоэлемент,
// который будет выглядеть по-разному в зависимости от состояния чекбокса. В данном случае будем делать
// немного по-другому, но похоже.
const Toggle = ({ name }) => {
	return (
		// обычный контейнер (помним, что Реакт не умеет рендерить одноуровневые элементы без обёртки
		<div className={styles.toggleSwitch}>
			{/*сам инпут с правильным типом, обязательными атрибутами NAME и ID*/}
			<input
				className={styles.toggleSwitchCheckbox}
				type="checkbox"
				// важный момент: если мы хардкодим name, id и htmlFor атрибуты, то наш код
				// становится плохо расширяемым и негибким, поэтому мы будем спускать эти данные сверху
				name={name}
				id={name}
			/>
			{/*проассоциированный с ним с помощью атрибута htmlFor элемент <label>*/}
			<label
				className={styles.toggleSwitchLabel}
				htmlFor={name}
			>
				{/*здесь начинается самое интересное:*/}
				{/*у нас есть <span>, который будет скруглённым контейнером для самого шарика-тогглера*/}
				{/*интересный момент: в Реакте любой элемент может быть самозакрывающимся! например, span ниже*/}
				<span
					className={
						styles.toggleSwitchInnerContainer
					}
				/>
				{/*и 2-ой <span>, который будет самим шариком-тогглером*/}
				<span
					className={styles.toggleSwitchToggle}
				/>
			</label>
		</div>
	);
};

Toggle.propTypes = {};

export default Toggle;

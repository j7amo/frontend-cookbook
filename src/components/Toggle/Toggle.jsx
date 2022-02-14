import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Toggle.module.scss';

// этот компонент будет рисовать тогглер / переключатель
// подобные компоненты с состоянием  ON / OFF удобно делать на <input type="checkbox"/>
// и связанном с ним <label>. Как правило сам чекбокс скрывается с помощью класса "visually-hidden".
// А элемент <label> относительно позиционируется и на нём делается псевдоэлемент,
// который будет выглядеть по-разному в зависимости от состояния чекбокса. В данном случае будем делать
// немного по-другому, но похоже.

// наш компонент будет принимать в объекте props:
// 1) name - этот проп нужен для того, чтобы мы могли динамически создавать нужное нам количество независимых друг
// от друга тогглеров за счёт использования этого name при задании name / id / htmlFor атрибутов
// 2) onChangeHandler - коллбэк, который будет вызываться при взаимодействии с тогглером
const Toggle = ({ name, onChangeHandler }) => {
	// делаем наш тогглер управляемым, что подразумевает наличие:
	// 1) источника истины состояния (в данном случае это стейт, который мы получили с помощью хука useState)
	const [isToggleOn, setIsToggleOn] = useState(false);

	// 2) обеспечиваем способ изменения этого самого состояния с помощью коллбэка
	const handleToggleChange = ({
		target: { checked },
	}) => {
		setIsToggleOn(checked);
		// и не забываем вызвать "родительский" коллбэк с актуальными данными:
		onChangeHandler(checked);
		// есть разница, откуда брать данные:
		// console.log(checked) и console.log(isToggleOn) дадут разный вывод, так как checked атрибут изменится
		// сразу по клику, а isToggleOn обновится асинхронно (когда придёт очередь его setIsToggleOn)
		// console.log(checked); // FALSE
		// console.log(isToggleOn); // TRUE
	};

	return (
		// контейнер (помним, что Реакт не умеет рендерить одноуровневые элементы без обёртки
		<div className={styles.toggleSwitch}>
			{/*сам инпут с правильным типом, обязательными атрибутами NAME и ID*/}
			<input
				className={classnames(
					styles.toggleSwitchCheckbox,
					styles.visuallyHidden,
				)}
				type="checkbox"
				// важный момент: если мы хардкодим name, id и htmlFor атрибуты, то наш код
				// становится плохо расширяемым и негибким, поэтому мы будем спускать эти данные сверху
				name={name}
				id={name}
				checked={isToggleOn}
				onChange={handleToggleChange}
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

// делаем проверку типов пропов
Toggle.propTypes = {
	name: PropTypes.string,
	onChangeHandler: PropTypes.func,
};

export default Toggle;

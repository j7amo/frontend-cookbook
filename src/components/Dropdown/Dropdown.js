import React from 'react';
import styles from './Dropdown.module.scss';

// напишем компонент, который будет рисовать "дропдаун" или выпадающий список / меню
// под этим модным словом скрывается комбинация самых обычных HTML-элементов:
// - <label> - доступность,
// - <select> - элемент, который имеет атрибут name, который важен при отправке данных на бэк(значение этого атрибута станет ключом, а значение выбранного option - значением в паре).
// А также это контейнер для <option>'ов.
// - <option> - пункт меню с атрибутом value.

// компонент будет принимать:
// - label - строковое значение для подписи к select'у
// - options - массив строк для элементов option
// - selectedValue - текущее выбранное значение
// - onChange - коллбэк для изменения текущего выбранного значения

// ВАЖНО! Так как по сути это всего лишь разновидность контрола, то скорее всего она будет использоваться в какой-нибудь форме,
// что значит, что скорее всего значение контрола нужно будет хранить в стейте формы, что в свою очередь приведёт к тому, что такой контрол
// должен быть контролируемым!
// Значит
// (1)его значение - в стейте формы,
// (2) а также должен быть самой формой предоставлен коллбэк для управления этим значением.
const Dropdown = ({ label, options, selectedValue, onChangeHandler }) => {
	return (
		<div className={styles.dropdownContainer}>
			<label className={styles.dropdownLabel}>
				{label}
				{/*в отличие от чистого HTML выбранный option определяется с помощью атрибута value элемента select!*/}
				{/*в чистом же HTML это значение определялось бы с помощью атрибута selected какого-то option*/}
				<select className={styles.dropdownSelect} value={selectedValue} onChange={onChangeHandler}>
					{options.map((option) => (
						<option className={styles.dropdownOption} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export default Dropdown;

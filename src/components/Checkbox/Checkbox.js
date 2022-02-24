import React from 'react';

// напишем компонент, который будет рисовать чекбокс с лейблом

// он будет принимать:
// - label - подпись к чекбоксу, чтобы пользователь понимал, ЧТО он выбирает
// - name - атрибут нужен для отправки данных на сервер при сабмите формы
// - checked - атрибут, который нужен для того, чтобы компонент понимал как ему отрисовать чекбокс (выбран / не выбран)
const Checkbox = ({ label, name, checked }) => {
	return (
		<label>
			<input type="checkbox" name={name} checked={checked} />
			{label}
		</label>
	);
};

export default Checkbox;

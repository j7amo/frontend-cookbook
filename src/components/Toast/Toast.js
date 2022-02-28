import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import styles from './Toast.module.scss';

// напишем компонент, который будет рисовать Тост - всплывающее уведомление, которое будет можно будет явным образом скрыть,
// нажав на кнопку-крестик либо дождаться пока оно само исчезнет с экрана (по таймеру)

// компонент будет принимать:
// - title - заголовок уведомления
// - message - сообщение уведомления
// - position - расположение уведомления
// - dismissDelay - время, через которое уведомление будет скрыто
// - isToastToggledOn - будем управлять показом тоста из компонента-родителя
// - onToastClose - коллбэк для управления состоянием родителя
const Toast = ({ title, message, position, dismissDelay, isToastToggledOn, onToastClose }) => {
	// обработаем закрытие тоста (будем использовать коллбэк как для закрытия с помощью кнопки, так и по таймауту)
	const handleToastClose = () => {
		onToastClose();
	};

	// после того, как компонент смонтирован, будем устанавливать таймер на его скрытие
	useEffect(() => {
		// таймаут для скрытия уведомления (не забываем привести к числу задержку)
		const timerId = setTimeout(handleToastClose, Number(dismissDelay));
		// не забываем возвращать cleanup function иначе у нас обработчики события срабатывания таймера будут накапливаться
		return () => clearTimeout(timerId);
	}, []);

	return (
		// у нас будет контейнер для уведомлений-тостов для того, чтобы позиционировать то,
		// где уведомления будут "выезжать" (например, слева сверху)
		// зачем контейнер? Чтобы можно было позиционировать сразу несколько уведомлений (у нас же может прийти в одно и то же время несколько уведомлений)
		isToastToggledOn && (
			<div className={classnames(styles.notificationContainer, position === 'top-right' && styles.topRight)}>
				{/*само уведомление*/}
				<div className={styles.notificationToast}>
					<button onClick={handleToastClose}>X</button>
					{/*контейнер под текст*/}
					<div>
						<p className={styles.notificationTitle}>{title}</p>
						<p className={styles.notificationMessage}>{message}</p>
					</div>
				</div>
			</div>
		)
	);
};

export default Toast;

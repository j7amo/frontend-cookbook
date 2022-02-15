import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

// напишем компонент, который будет рисовать модальное окно, которое "всплывает" при взаимодействии
// с неким интерактивным элементом на странице, например, с кнопкой "Show Modal".

// Для того, чтобы создать такой компонент, нужно понимать СТРУКТУРУ модального окна:
// 1) Оверлей - по сути это контейнер, который занимает весь размер экрана, имеет как правило полупрозрачный фон, за
// которым видно основное содержимое страницы. Этот контейнер (при правильной стилизации) также обеспечивает
// запрет скролла основного содержимого страницы при открытом модальном окне.
// 2) Модальный хэдер - заголовок модального окна, в котором может (но необязательно) размещаться:
// - название модального окна;
// - кнопка закрытия модального окна (например, традиционный крестик).
// 3) Контент модального окна - основное содержимое модального окна (это может быть просто некий текст или это может
// быть какая-нибудь простая формочка).
// 4) Модальный футер - "подвал" модального окна, в котором как правило размещаются основные кнопки для
// взаимодействия пользователя с модальным окном (например, кнопки закрытия / отмены / подтверждения и т.д.)

// чтобы сделать наше модальное окно более гибким и переиспользуемым, будем в пропах принимать:
// 1) closeModal - коллбэк, который сообщит родительскому компоненту о том, что нужно закрыть модалку
// 2) title - заголовок модального окна.
// 3) children - используем для отрисовки любого вложенного контента (будь то простой текст или
// даже какая-нибудь разметка, например, мы можем в тело модального окна "засунуть" форму).
// ВАЖНО! Свойство CHILDREN (1)передаётся НЕЯВНО, но (2)получается ЯВНО.
const Modal = ({ closeModal, title, children }) => {
	// используем useEffect для того, чтобы поменять стиль <body> после открытия и как следствие отрисовки модалки
	useEffect(() => {
		// ВАЖНО! Именно это ПОЗВОЛЯЕТ УБРАТЬ СКРОЛЛ БЭКГРАУНДА!!!
		document.body.style.overflow = 'hidden';
		// при этом не забываем вернуть всё как было при закрытии и как размонтировании модалки
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, []);

	// заранее подготовим коллбэк на обработку события нажатия Esc / Escape и сохраним ссылку на него, чтобы
	// можно было его потом "отписать"
	const onEscKeydown = (evt) => {
		console.log(evt);
		if (evt.key === 'Escape') {
			closeModal();
		}
	};
	// используем ещё один useEffect для того, чтобы навесить обработчик события нажатия кнопки Esc / Escape
	useEffect(() => {
		// "навешивание" происходит прямо на глобальный объект window
		window.addEventListener('keydown', onEscKeydown);
		return () => {
			window.removeEventListener(
				'keydown',
				onEscKeydown,
			);
		};
	}, []);

	return (
		<div
			className={styles.modalOverlay}
			onClick={closeModal}
		>
			{/*по умолчанию события ловятся в фазе всплытия, а это значит, что любой клик по любому потомку оверлея всплывёт до оверлея, а нам*/}
			{/*нужно эти клики обрабатывать по-разному! Поэтому используем хитрость - evt.stopPropagation - запрещаем всплытие на дочерних элементах*/}
			<div
				className={styles.modalContainer}
				// вот здесь мы останавливаем всплытие
				onClick={(evt) => evt.stopPropagation()}
			>
				<div className={styles.modalHeader}>
					<h3 className={styles.modalTitle}>
						{title}
					</h3>
					<button
						className={
							styles.crossShapedCloseButton
						}
						onClick={closeModal}
					>
						X
					</button>
				</div>
				<div className={styles.modalContent}>
					{children}
				</div>
				<div className={styles.modalFooter}>
					<button
						type="button"
						className={styles.closeButton}
						onClick={closeModal}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

Modal.propTypes = {
	closeModal: PropTypes.func,
	title: PropTypes.string,
};

export default Modal;
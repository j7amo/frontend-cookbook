import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Tab.module.scss';

// сам компонент Tab будет состоять из:
// - <li> - элемента (так как он является элементом списка)
// - <button>, так как мы делаем интерактивный элемент (можно было бы сделать несемантично на каком-нибудь DIV / SPAN,
// но так как элемент интерактивный, то это должно быть что-то из: инпутов, кнопок, ссылок, селектов и т.д.)

// компонент будет принимать в пропах:
// 1) label - текстовое содержимое кнопки, чтобы избежать хардкода и гибко рендерить любое количество табов / вкладок
// 2) isActive - флаг, который используется для применения стилей к активной вкладке
// 3) index - нам нужно где-то записать индекс, чтобы потом его доставать и использовать в состоянии род.компонента Tabs
// 4) onClick - обработчик из родительского компонента, который мы вызываем при возникновении события клика на кнопке
const Tab = ({ label, isActive, index, onClick }) => {
	return (
		<li className={styles.tabContainer}>
			<button
				// используем classnames для динамического формирования списка стилей
				className={classnames(
					styles.tab,
					isActive && styles.tabIsActive,
				)}
				type="button"
				onClick={onClick}
				// ВАЖНО: свойства с префиксом data- ВСЕГДА СТРОКИ!!!
				// Поэтому когда мы "кладём" пришедший из родительского компонента индекс в формате number,
				// он приводится к строке и нужно НЕ ЗАБЫТЬ потом при считывании из dataset'а преобразовать обратно
				data-index={index}
			>
				{label}
			</button>
		</li>
	);
};

Tab.propTypes = {
	label: PropTypes.string,
	isActive: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func,
};

export default Tab;

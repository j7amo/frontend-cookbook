import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tabs.module.scss';
import Tab from '../Tab/Tab.jsx';

// напишем компонент, который будет рисовать Табы (Вкладки по-русски?)
// При создании такого компонента можно использовать разные HTML-тэги.
// Я выбрал (как мне кажется) семантически верный вариант:
// 1) Некий контейнер (обычный DIV)
// 2) Неупорядоченный список, в котором каждый элемент содержит в себе кнопку
// 3) Собственно кнопка. Если мы делаем интерактивный элемент, то не нужно его делать
// семантически неверными тэгами типа DIV, SPAN и т.д.
// компонент на вход получает в пропах объект data, в котором вся необходимая информация для рендеринга
const Tabs = ({ data }) => {
	// отслеживаем активную вкладку с помощью:
	// 1) хранения состояния
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	// 2) обновления этого состояния
	const handleTabClick = useCallback(
		(evt) =>
			// Явным образом приводим к числу, так как всё, что достаётся из dataset'а - String
			setActiveTabIndex(Number(evt.target.dataset.index)),
		[],
	);
	return (
		<div className={styles.tabsContainer}>
			<ul className={styles.tabsList}>
				{/*"нарезаем" данные в массив JSX для последующей отрисовки Реактом*/}
				{data.map((item, index) => (
					// каждый элемент - отдельный компонент Tab
					<Tab
						// не забываем, что при отрисовке списков Реакт требует от нас атрибут KEY
						key={item.label + index}
						// прокидываем label для динамического наполнения вкладки
						label={item.label}
						// отдельно прокидываем индекс, который потом храним в dataset'е элемента
						// и используем при обработке события клика по кнопке
						index={index}
						// для дополнительной стилизации активной открытой вкладки прокидываем проп isActive
						isActive={activeTabIndex === index}
						// прокидываем коллбэк, который позволит правильно обработать клик по кнопке
						onClick={handleTabClick}
					/>
				))}
			</ul>
			{/*в отдельном блочном элементе будет рисовать содержимое вкладки*/}
			<div className={styles.tabContent}>
				{/* по текущему активному индексу в исходном массиве будем искать содержимое для отрисовки*/}
				{data[activeTabIndex].content}
			</div>
		</div>
	);
};

Tabs.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			content: PropTypes.string,
		}),
	),
};

export default Tabs;

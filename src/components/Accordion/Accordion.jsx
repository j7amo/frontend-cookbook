import React from 'react';
// import PropTypes from 'prop-types';
import styles from './Accordion.module.scss';
import AccordionItem from '../AccordionItem/AccordionItem';

// Аккордеон зачастую представляет собой список из однотипных элементов, каждый из которых можно представить как:
// 1) Заголовок-кнопка с псевдо-элементом, обозначающим то, открыт ли элемент с основным содержанием. Нажимается =)
// 2) Элемент с основным содержанием. Разворачивается / сворачивается.

// Раз мы решили, что это некий список однотипных элементов, то нужно подготовить данные в формате "массив объектов"
// для "нарезки" с помощью метода массивов MAP:
const someVerySexyAccordionData = [
	{
		question: 'Lorem ipsum dolor sit amet?',
		answer:
			'Tenetur ullam rerum ad iusto possimus sequi mollitia dolore ' +
			'sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi ' +
			'mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto ' +
			'possimus sequi mollitia dolore sunt quam praesentium.',
	},
	{
		question: 'Lorem ipsum dolor sit amet?',
		answer:
			'Tenetur ullam rerum ad iusto possimus sequi mollitia dolore ' +
			'sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi ' +
			'mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto ' +
			'possimus sequi mollitia dolore sunt quam praesentium.',
	},
	{
		question: 'Lorem ipsum dolor sit amet?',
		answer:
			'Tenetur ullam rerum ad iusto possimus sequi mollitia dolore ' +
			'sunt quam praesentium. Tenetur ullam rerum ad iusto possimus sequi ' +
			'mollitia dolore sunt quam praesentium.Tenetur ullam rerum ad iusto ' +
			'possimus sequi mollitia dolore sunt quam praesentium.',
	},
];

const Accordion = () => {
	return (
		<ul className={styles.accordion}>
			{/*"нарезаем" данные из массива:*/}
			{someVerySexyAccordionData.map(
				({ question, answer }, index) => {
					return (
						<AccordionItem
							// передаём пропы
							question={question}
							answer={answer}
							// не забываем передавать проп KEY (это нужно для эффективного обновления DOM'а Реактом)
							key={question + index}
						/>
					);
				},
			)}
		</ul>
	);
};

// Accordion.propTypes = {};

export default Accordion;

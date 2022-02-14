import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AccordionItem.module.scss';

const AccordionItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () =>
		setIsOpen((prevIsOpen) => !prevIsOpen);

	return (
		<li>
			<button
				className={styles.accordionItemButton}
				onClick={handleClick}
			>
				{question}
				<span
					className={styles.openClosedIndicator}
				>
					{isOpen ? '-' : '+'}
				</span>
			</button>
			<div
				className={classnames(
					styles.answer,
					!isOpen && styles.answerIsClosed,
				)}
			>
				{answer}
			</div>
		</li>
	);
};

AccordionItem.propTypes = {
	question: PropTypes.string,
	answer: PropTypes.string,
};

export default AccordionItem;

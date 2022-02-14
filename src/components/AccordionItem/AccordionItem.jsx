import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './AccordionItem.module.scss';

const AccordionItem = ({ question, answer }) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => setIsOpen(prevIsOpen => !prevIsOpen);

	return (
		<li className={styles.accordionItem}>
			<button onClick={handleClick}>
				{question}
				<span></span>
			</button>
			<div
				className={classnames(
					styles.answer,
					isOpen
						? styles.accordionItemIsOpen
						: styles.accordionItemIsClosed,
				)}
			>
				{answer}
			</div>
		</li>
	);
};

AccordionItem.propTypes = {};

export default AccordionItem;

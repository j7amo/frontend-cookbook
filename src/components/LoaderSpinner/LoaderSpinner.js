import React from 'react';
import styles from './LoaderSpinner.module.scss';

// напишем компонент, который будет представлять собой "спиннер" / "лоадер"
// и использоваться при загрузке чего-то в UI (например, мы получаем какие-то данные с бэка и пока не можем отрисовать интерфейс)
const LoaderSpinner = () => {
	return (
		// компонент очень простой и будет состоять из одного единственного элемента
		<div className={styles.loaderSpinner} />
	);
};

export default LoaderSpinner;

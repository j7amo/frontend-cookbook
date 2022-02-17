import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './HamburgerMenu.module.scss';

// создадим компонент, который будет рисовать легендарное меню-гамбургер

// будем принимать:
// - isMenuOpen - показываем ли меню
// - navItems - структуру данных, в которой будут лейблы для ссылок (элементов меню) и сами ссылки
// - toggleMenu - коллбэк, который меняет состояние родительского компонента
const HamburgerMenu = ({
	isMenuOpen,
	navItems,
	toggleMenu,
}) => {
	const closeMenu = () => {
		if (isMenuOpen) {
			toggleMenu();
		}
	};
	const toggleHamburgerMenu = (evt) => {
		// ключевой момент: нужно остановить всплытие события "Click" с кнопки до <nav>
		// иначе у нас будет 2 подряд вызова toggleMenu, которые по сути отменят друг друга
		// и не позволят нам закрыть меню по нажатию на кнопку-крестик
		evt.stopPropagation();
		toggleMenu();
	};
	// используем useEffect для того, чтобы поменять стиль <body> после открытия и как следствие отрисовки модалки
	useEffect(() => {
		// ВАЖНО! Именно это ПОЗВОЛЯЕТ УБРАТЬ СКРОЛЛ БЭКГРАУНДА!!!
		// в отличии от похожей реализации в компоненте Модального окна
		// здесь нужно проверять флаг isMenuOpen, а также делать апдейт
		// при изменении этого флага, иначе будет безусловное применение эффекта
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		}
		// при этом не забываем вернуть всё как было при закрытии и как размонтировании модалки
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMenuOpen]);

	return (
		<nav
			className={classnames(
				styles.mainNavigation,
				isMenuOpen && styles.mainNavigationOpen,
			)}
			onClick={closeMenu}
		>
			{/*дополнительный контейнер, который будет абсолютно позиционирован*/}
			<div className={styles.menuButtonContainer}>
				<button
					type="button"
					className={classnames(
						styles.hamburgerMenuButton,
						isMenuOpen &&
							styles.hamburgerMenuButtonOpened,
					)}
					onClick={toggleHamburgerMenu}
				>
					<span
						className={styles.middleMenuBar}
					/>
				</button>
			</div>
			<ul
				className={classnames(
					styles.mainNavigationItems,
					isMenuOpen &&
						styles.mainNavigationItemsOpen,
				)}
				// прерываем всплытие события с меню
				onClick={(evt) => evt.stopPropagation()}
			>
				{navItems.map(({ label, href }) => {
					return (
						<li
							className={
								styles.mainNavigationItem
							}
						>
							<a
								href={href}
								className={
									styles.mainNavigationItemLink
								}
							>
								{label}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

HamburgerMenu.propTypes = {
	isMenuOpen: PropTypes.bool,
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			href: PropTypes.string,
		}),
	),
	toggleMenu: PropTypes.func,
};

export default HamburgerMenu;

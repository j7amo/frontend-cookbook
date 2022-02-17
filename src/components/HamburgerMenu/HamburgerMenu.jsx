import React from 'react';
import PropTypes from 'prop-types';
import styles from './HamburgerMenu.module.scss';

// создадим компонент, который будет рисовать легендарное меню-гамбургер

// будем принимать:
// - isMenuOpen - показываем ли меню
// - navItems - структуру данных, в которой будут лейблы для ссылок (элементов меню) и сами ссылки
// - handleMenuClose - коллбэк, который мы будем вызывать при закрытии меню и изменять состояние родительского компонента
// - toggleMenu - коллбэк, который меняет состояние родительского компонента
const HamburgerMenu = ({
	isMenuOpen,
	navItems,
	handleMenuClose,
	toggleMenu,
}) => {
	return (
		<nav className={styles.mainNavigation}>
			<button
				type="button"
				className={styles.hamburgerMenuButton}
				onClick={toggleMenu}
			>
				<span className={styles.middleMenuBar} />
			</button>
			<ul className={styles.mainNavigationItems}>
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
	navItems: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			href: PropTypes.string,
		}),
	),
	handleMenuClose: PropTypes.func,
};

export default HamburgerMenu;

console.log("JavaScript file is connected!");
//import { createFocusTrap } from 'focus-trap';

const page = document.documentElement;
const header = document.querySelector('.header');
const headerButton = document.querySelector('.header__button');
const headerLink = document.querySelector('.header__link');
const menu = document.querySelector('.menu');
const menuList = document.querySelector('.menu__list');
const menuMessengers = document.querySelector('.menu__messengers');
const mobileCheck = matchMedia('(max-width: 1023px)');
//const focusTrap = createFocusTrap(header);

function isMenuOpen() {
	return headerButton.getAttribute('aria-expanded') === 'true';
}

function openMenu() {
	page.classList.add('page--clip');

	headerButton.setAttribute('aria-expanded', 'true');
	headerLink.setAttribute('tabindex', '-1');

	menu.classList.remove('menu--closed');
	setTimeout(() => {
		menu.classList.add('menu--open'), 20
	});

	//focusTrap.activate();
}

function closeMenu() {
	page.classList.remove('page--clip');

	headerButton.setAttribute('aria-expanded', 'false');
	headerLink.removeAttribute('tabindex');

	menu.classList.remove('menu--open');
	menu.addEventListener('transitionend', () => {
		if (!menu.classList.contains('menu--open')) {
			menu.classList.add('menu--closed');
		}
	}, {
		once: true
	});

	//focusTrap.deactivate();
}

headerButton.addEventListener('click', () => {
	isMenuOpen() ? closeMenu() : openMenu();
});

document.addEventListener('keyup', (event) => {
	if (event.key === 'Escape' && isMenuOpen()) {
		closeMenu();
	}
});

mobileCheck.addEventListener('change', (event) => {
	if (event.matches) {
		menuMessengers.after(menuList);
	} else {
		menuMessengers.before(menuList);
		closeMenu();
	}
});

if (mobileCheck.matches) {
	menuMessengers.after(menuList);
}
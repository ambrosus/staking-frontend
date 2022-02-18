import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const MobileMenu = ({
  data = [{}],
  isOpen = false,
  toggleMenu = () => {},
}) => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(-1);

  useEffect(() => {
    if (isOpen) document.querySelector('body').style.overflow = 'hidden';
    else document.querySelector('body').style.overflow = '';
  }, [isOpen]);

  const toggleSubmenu = (index) =>
    setOpenSubmenuIndex(index === openSubmenuIndex ? -1 : index);

  return (
    <div className={`mobile-menu ${isOpen ? 'mobile-menu_open' : ''}`}>
      {data.map((menuItem, i) => {
        if (menuItem.type === 'submenu') {
          return (
            <MobileSubmenu
              name={menuItem.name}
              data={menuItem.data}
              index={i}
              toggleSubmenu={() => toggleSubmenu(i)}
              isOpen={openSubmenuIndex === i}
            />
          );
        }
        if (menuItem.type === 'link') {
          return (
            <a
              href={menuItem.link}
              className="mobile-menu__link"
              data-number={`—\u00A00${i + 1}`}
              onClick={toggleMenu}
            >
              {menuItem.name}
            </a>
          );
        }
        return null;
      })}
    </div>
  );
};

MobileMenu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
  toggleMenu: PropTypes.func,
};

const MobileSubmenu = ({
  name = '',
  data = [{}],
  index = 0,
  toggleSubmenu = () => {},
  toggleMenu = () => {},
  isOpen = false,
}) => (
  <div className={`mobile-submenu ${isOpen ? 'mobile-submenu_open' : ''}`}>
    <button
      type="button"
      className="mobile-submenu__name"
      data-number={`—\u00A00${index + 1}`}
      onClick={toggleSubmenu}
    >
      {name}
      <svg viewBox="0 0 15 8" className="mobile-submenu__arrow" fill="none">
        <path
          d="M14.2031 1L7.53644 7L0.869791 0.999999"
          stroke="currentColor"
        />
      </svg>
    </button>
    <div
      className="mobile-submenu__items"
      style={{ '--items-amount': data.length }}
    >
      {data.map(({ name: itemName, link }) => (
        <a href={link} className="mobile-submenu__item" onClick={toggleMenu}>
          {itemName}
        </a>
      ))}
    </div>
  </div>
);

MobileSubmenu.propTypes = {
  name: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  toggleSubmenu: PropTypes.func,
  toggleMenu: PropTypes.func,
  isOpen: PropTypes.bool,
};

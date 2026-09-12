import { useState, useRef } from 'react';
import services from "../../data/servicesData";
import './ServiceDropdown.css';

const ServiceDropdown = () => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const openMenu = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  const handleClick = () => setOpen((s) => !s);

  return (
    <div
      className="service-dropdown"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onFocus={openMenu}
      onBlur={closeMenu}
    >
      <button
        className={`loom-nav-link service-dropdown__toggle ${open ? 'open' : ''}`}
        onClick={handleClick}
        aria-expanded={open}
      >
        Services
      </button>

      <div className={`service-dropdown__menu ${open ? 'open' : ''}`} role="menu">
        {services.map((s) => (
          <a
            key={s.slug}
            href={`#/services/${s.slug}`}
            className="service-dropdown__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            <div className="service-dropdown__item-left">
              <div className="sd-name">{s.name}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ServiceDropdown;

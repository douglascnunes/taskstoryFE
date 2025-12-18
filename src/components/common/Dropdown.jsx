import { useEffect, useRef } from 'react';
import styles from './Dropdown.module.css';
import { Link } from 'react-router-dom';

export default function Dropdown({ onClose, links }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div ref={dropdownRef} className={styles.dropDownProfile}>
      {links?.map((link, index) => (
        <Link
          key={index}
          to={link.path}
          className={styles.link}
          onClick={onClose}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * منوی انتخاب سفارشی و سازگار با تاچ موبایل و کیبورد.
 * جایگزین select پیش‌فرض مرورگر با دسترسی‌پذیری کامل.
 * @param {{
 *   id: string,
 *   value: string,
 *   options: Array<{id: string, title: string}>,
 *   onChange: (val: string) => void,
 *   placeholder?: string
 * }} props
 */
export default function CustomSelect({ id, value, options, onChange, placeholder = 'انتخاب کنید...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.id === value);
  const displayLabel = selectedOption ? selectedOption.title : placeholder;

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const selectOption = useCallback((optionId) => {
    onChange(optionId);
    setIsOpen(false);
    triggerRef.current?.focus();
  }, [onChange]);

  // بستن منو با لمس خارج از کامپوننت
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [isOpen, closeMenu]);

  // کنترل با کلیدهای صفحه کلید (Escape, ArrowUp, ArrowDown, Enter)
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        closeMenu();
        triggerRef.current?.focus();
      }
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.id === value);
      let nextIndex;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
      }
      onChange(options[nextIndex].id);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  return (
    <div ref={containerRef} className="custom-select-container">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        className={`form-input custom-select-trigger ${isOpen ? 'active' : ''}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
      >
        <span className="custom-select-label">{displayLabel}</span>
        <svg
          className={`custom-select-icon ${isOpen ? 'open' : ''}`}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={id}
          className="custom-select-menu"
        >
          {options.map((opt) => {
            const isSelected = opt.id === value;
            return (
              <li
                key={opt.id}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${isSelected ? 'selected' : ''}`}
                onClick={() => selectOption(opt.id)}
              >
                <span>{opt.title}</span>
                {isSelected && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

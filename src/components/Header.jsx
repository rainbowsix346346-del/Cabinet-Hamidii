import { useCallback, useRef } from 'react';
import { BUSINESS_CONFIG } from '../config/business.js';
import { NAV_LINKS, HEADER_TEXT } from '../data/header.js';
import { useEscapeKey } from '../hooks/useEscapeKey.js';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';

/**
 * هدر سایت + منوی کشویی موبایل از سمت راست.
 * @param {{menuOpen:boolean, onToggleMenu:()=>void, onCloseMenu:()=>void}} props
 */
export default function Header({ menuOpen, onToggleMenu, onCloseMenu }) {
  const drawerRef = useRef(null);
  const close = useCallback(() => onCloseMenu(), [onCloseMenu]);

  useEscapeKey(menuOpen, close);
  useBodyScrollLock(menuOpen);
  useFocusTrap(drawerRef, menuOpen);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-group">
            <a href="#" className="brand-logo" onClick={onCloseMenu}>
              {BUSINESS_CONFIG.brandName}
            </a>
            <span className="brand-tag">{BUSINESS_CONFIG.city}</span>
          </div>

          <nav className="nav-desktop" aria-label={HEADER_TEXT.navAriaLabel}>
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <a href="#estimate" className="btn btn-solid btn-header-cta">
              {HEADER_TEXT.cta}
            </a>
            <button
              type="button"
              className="hamburger-btn"
              onClick={onToggleMenu}
              aria-label={menuOpen ? HEADER_TEXT.closeMenu : HEADER_TEXT.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* لایه پشت منو برای جلوگیری از پرش یا کلیک اشتباه */}
      <div
        className={`drawer-backdrop ${menuOpen ? 'open' : ''}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* دراور موبایل که از سمت راست به چپ باز می‌شود */}
      <nav
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${menuOpen ? 'open' : ''}`}
        aria-label={HEADER_TEXT.mobileAriaLabel}
        aria-hidden={!menuOpen}
      >
        <div className="drawer-header">
          <div>
            <div className="drawer-brand">{BUSINESS_CONFIG.brandName}</div>
            <div className="drawer-city">{BUSINESS_CONFIG.city}</div>
          </div>
          <button
            type="button"
            className="drawer-close-btn"
            onClick={close}
            aria-label={HEADER_TEXT.closeMenu}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="drawer-links">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="drawer-link"
              onClick={close}
            >
              <span className="drawer-bullet" aria-hidden="true" />
              <span>{l.label}</span>
            </a>
          ))}
        </div>

        <div className="drawer-footer">
          <a href="#estimate" className="btn btn-solid btn-block" onClick={close}>
            {HEADER_TEXT.cta}
          </a>
        </div>
      </nav>
    </>
  );
}

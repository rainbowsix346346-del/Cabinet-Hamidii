import { useRef } from 'react';
import { useEscapeKey } from '../hooks/useEscapeKey.js';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { NOTICE_MODAL_CONTENT } from '../data/modal.js';

/**
 * مودال اطلاع‌رسانی دسترسی‌پذیر (Escape، focus trap، قفل اسکرول، بازگشت فوکوس).
 * @param {{isOpen:boolean, onClose:()=>void}} props
 */
export default function NoticeModal({ isOpen, onClose }) {
  const ref = useRef(null);
  useEscapeKey(isOpen, onClose);
  useBodyScrollLock(isOpen);
  useFocusTrap(ref, isOpen);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={ref}
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notice-title"
        aria-describedby="notice-desc"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h4 id="notice-title" className="modal-title">{NOTICE_MODAL_CONTENT.title}</h4>
        <p id="notice-desc" className="modal-text">
          {NOTICE_MODAL_CONTENT.description}
        </p>
        <button type="button" className="btn btn-solid" onClick={onClose}>
          {NOTICE_MODAL_CONTENT.buttonText}
        </button>
      </div>
    </div>
  );
}

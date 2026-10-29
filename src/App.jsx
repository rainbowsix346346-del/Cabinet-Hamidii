import { useCallback, useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Inspiration from './components/Inspiration.jsx';
import Steps from './components/Steps.jsx';
import EstimateForm from './components/EstimateForm.jsx';
import Faq from './components/Faq.jsx';
import Footer from './components/Footer.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import NoticeModal from './components/NoticeModal.jsx';

/**
 * کامپوننت ریشه: صرفاً ترکیب‌کننده اجزا بدون لاجیک تجاری.
 */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);

  useScrollReveal();

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeNotice = useCallback(() => setNoticeOpen(false), []);

  return (
    <div className="hamidi-site">
      <Header menuOpen={menuOpen} onToggleMenu={toggleMenu} onCloseMenu={closeMenu} />
      <main>
        <Hero />
        <Services />
        <Inspiration />
        <Steps />
        <section id="estimate" className="bottom-section">
          <div className="container bottom-grid">
            <EstimateForm />
            <Faq />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingActions />
      <NoticeModal isOpen={noticeOpen} onClose={closeNotice} />
    </div>
  );
}

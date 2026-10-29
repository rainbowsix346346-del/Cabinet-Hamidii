import { useEffect, useId, useRef, useState } from 'react';
import { SERVICES } from '../data/services.js';
import { FORM_TEXT } from '../data/form.js';
import { FORM_COOLDOWN_MS } from '../config/business.js';
import { normalizePhone, isValidMobile } from '../utils/phone.js';
import { sanitizeText } from '../utils/sanitize.js';
import { submitForm } from '../utils/submitForm.js';
import CustomSelect from './CustomSelect.jsx';

const INITIAL = { name: '', phone: '', serviceId: SERVICES[0].id, neighborhood: '', description: '', website: '' };

/**
 * فرم درخواست برآورد (با اعتبارسنجی، honeypot، cooldown، منوی انتخاب سفارشی و حالت شبیه‌سازی).
 */
export default function EstimateForm() {
  const uid = useId();
  const [data, setData] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [result, setResult] = useState(null);
  const lastSubmitRef = useRef(0);
  const abortRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));
  const handleServiceChange = (serviceId) => setData((d) => ({ ...d, serviceId }));
  const id = (k) => `${uid}-${k}`;

  const validate = (clean) => {
    const err = {};
    if (!clean.name) err.name = FORM_TEXT.errors.nameRequired;
    if (!clean.phone) err.phone = FORM_TEXT.errors.phoneRequired;
    else if (!isValidMobile(clean.phone)) err.phone = FORM_TEXT.errors.phoneInvalid;
    if (!clean.neighborhood) err.neighborhood = FORM_TEXT.errors.neighborhoodRequired;
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    // honeypot: بات‌ها این فیلد مخفی را پر می‌کنند؛ نادیده گرفته می‌شود
    if (data.website) {
      setStatus('success');
      setResult({ ...INITIAL });
      return;
    }

    const clean = {
      name: sanitizeText(data.name, 80),
      phone: normalizePhone(sanitizeText(data.phone, 20)),
      serviceId: SERVICES.some((s) => s.id === data.serviceId) ? data.serviceId : SERVICES[0].id,
      neighborhood: sanitizeText(data.neighborhood, 80),
      description: sanitizeText(data.description, 500),
    };

    const errs = validate(clean);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const wait = FORM_COOLDOWN_MS - (Date.now() - lastSubmitRef.current);
    if (wait > 0) {
      setErrors({ form: `${FORM_TEXT.errors.cooldownPrefix}${Math.ceil(wait / 1000)}${FORM_TEXT.errors.cooldownSuffix}` });
      return;
    }

    setStatus('submitting');
    abortRef.current = new AbortController();
    try {
      await submitForm(clean, abortRef.current.signal);
      lastSubmitRef.current = Date.now();
      setResult(clean);
      setStatus('success');
    } catch (err) {
      setErrors({
        form: err?.name === 'AbortError'
          ? FORM_TEXT.errors.timeout
          : FORM_TEXT.errors.generic,
      });
      setStatus('error');
    }
  };

  const serviceTitle = (sid) => SERVICES.find((s) => s.id === sid)?.title ?? '';
  const submitting = status === 'submitting';

  return (
    <div className="form-card reveal-item">
      <div className="sec-label">{FORM_TEXT.secLabel}</div>
      <h3 className="block-title">{FORM_TEXT.blockTitle}</h3>

      {status === 'success' && result ? (
        <div className="form-preview" role="status">
          <p className="preview-title">{FORM_TEXT.preview.title}</p>
          <p><strong>{FORM_TEXT.preview.name}</strong> {result.name}</p>
          <p><strong>{FORM_TEXT.preview.phone}</strong> {result.phone}</p>
          <p><strong>{FORM_TEXT.preview.service}</strong> {serviceTitle(result.serviceId)}</p>
          <p><strong>{FORM_TEXT.preview.neighborhood}</strong> {result.neighborhood}</p>
          {result.description && <p><strong>{FORM_TEXT.preview.description}</strong> {result.description}</p>}
          <div className="form-simulation-badge">{FORM_TEXT.preview.simulationNotice}</div>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => { setStatus('idle'); setData({ ...INITIAL, ...result }); }}
          >
            {FORM_TEXT.preview.editBtn}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid-row">
            <div className="form-group">
              <label htmlFor={id('name')}>{FORM_TEXT.labels.name}</label>
              <input
                id={id('name')}
                type="text"
                className="form-input"
                value={data.name}
                onChange={set('name')}
                placeholder={FORM_TEXT.placeholders.name}
                maxLength={80}
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? id('name-err') : undefined}
              />
              {errors.name && <div id={id('name-err')} className="error-msg" role="alert">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor={id('phone')}>{FORM_TEXT.labels.phone}</label>
              <input
                id={id('phone')}
                type="tel"
                inputMode="numeric"
                className="form-input"
                value={data.phone}
                onChange={set('phone')}
                placeholder={FORM_TEXT.placeholders.phone}
                maxLength={20}
                autoComplete="tel"
                dir="ltr"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? id('phone-err') : undefined}
              />
              {errors.phone && <div id={id('phone-err')} className="error-msg" role="alert">{errors.phone}</div>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor={id('service')}>{FORM_TEXT.labels.service}</label>
            <CustomSelect
              id={id('service')}
              value={data.serviceId}
              options={SERVICES}
              onChange={handleServiceChange}
              placeholder={FORM_TEXT.placeholders.selectService}
            />
          </div>

          <div className="form-group">
            <label htmlFor={id('hood')}>{FORM_TEXT.labels.neighborhood}</label>
            <input
              id={id('hood')}
              type="text"
              className="form-input"
              value={data.neighborhood}
              onChange={set('neighborhood')}
              placeholder={FORM_TEXT.placeholders.neighborhood}
              maxLength={80}
              autoComplete="off"
              aria-invalid={!!errors.neighborhood}
              aria-describedby={errors.neighborhood ? id('hood-err') : undefined}
            />
            {errors.neighborhood && <div id={id('hood-err')} className="error-msg" role="alert">{errors.neighborhood}</div>}
          </div>

          <div className="form-group">
            <label htmlFor={id('desc')}>{FORM_TEXT.labels.description}</label>
            <textarea
              id={id('desc')}
              className="form-input"
              rows={2}
              value={data.description}
              onChange={set('description')}
              placeholder={FORM_TEXT.placeholders.description}
              maxLength={500}
              autoComplete="off"
            />
          </div>

          {/* honeypot: فیلد نامرئی برای شناسایی ربات‌ها */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor={id('web')}>{FORM_TEXT.labels.website}</label>
            <input
              id={id('web')}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.website}
              onChange={set('website')}
            />
          </div>

          {errors.form && <div className="error-msg form-general-err" role="alert">{errors.form}</div>}

          <button type="submit" className="btn btn-solid btn-block" disabled={submitting}>
            {submitting ? FORM_TEXT.submittingBtn : FORM_TEXT.submitBtn}
          </button>
          <div className="form-note">{FORM_TEXT.note}</div>
        </form>
      )}
    </div>
  );
}

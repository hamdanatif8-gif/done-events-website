import { useCallback, useId, useState, type FormEvent } from 'react';
import { contactEmail } from '../../content/navigation';

type Status = 'idle' | 'sending' | 'sent' | 'error';

interface Fields {
  name: string;
  company: string;
  email: string;
  automate: string;
}

const EMPTY: Fields = { name: '', company: '', email: '', automate: '' };

const validate = (values: Fields): Partial<Record<keyof Fields, string>> => {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.automate.trim().length < 8) {
    errors.automate = 'A sentence is enough — what should we look at?';
  }
  return errors;
};

const fieldClass =
  'w-full min-h-[48px] rounded-[var(--r-panel-sm)] border border-[var(--nova-line)] bg-white/[0.04] ' +
  'px-4 py-3 text-[0.95rem] text-white placeholder:text-white/30 outline-none ' +
  'transition-colors duration-300 focus:border-white/40 focus:bg-white/[0.07] ' +
  'aria-[invalid=true]:border-[var(--nova-warm)]/70';

/**
 * Netlify Forms compatible. `index.html` carries a hidden static mirror so the
 * build-time bot registers the fields; this component posts to the same name.
 */
export function ConsultationForm() {
  const id = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = useCallback(
    (key: keyof Fields) => (event: { target: { value: string } }) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
    },
    []
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const found = validate(values);
      setErrors(found);
      if (Object.keys(found).length > 0) {
        setStatus('idle');
        const firstKey = Object.keys(found)[0];
        if (firstKey) document.getElementById(`${id}-${firstKey}`)?.focus();
        return;
      }

      setStatus('sending');
      const body = new URLSearchParams({ 'form-name': 'consultation', ...values });

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString(),
        });
        if (!response.ok) throw new Error(String(response.status));
        setStatus('sent');
        setValues(EMPTY);
      } catch {
        setStatus('error');
      }
    },
    [values, id]
  );

  const describe = (key: keyof Fields) => (errors[key] ? `${id}-${key}-error` : undefined);

  return (
    <form
      name="consultation"
      method="post"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      className="glass rounded-[var(--r-panel)] p-6 sm:p-9"
    >
      <input type="hidden" name="form-name" value="consultation" />
      <p className="hidden">
        <label>
          Leave this empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="type-meta mb-2.5 block text-white/55">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            value={values.name}
            onChange={update('name')}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe('name')}
            className={fieldClass}
          />
          {errors.name ? (
            <p id={`${id}-name-error`} className="mt-2 text-[0.82rem] text-[var(--nova-warm)]">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={`${id}-company`} className="type-meta mb-2.5 block text-white/55">
            Company
          </label>
          <input
            id={`${id}-company`}
            name="company"
            value={values.company}
            onChange={update('company')}
            autoComplete="organization"
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className="type-meta mb-2.5 block text-white/55">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            value={values.email}
            onChange={update('email')}
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe('email')}
            className={fieldClass}
          />
          {errors.email ? (
            <p id={`${id}-email-error`} className="mt-2 text-[0.82rem] text-[var(--nova-warm)]">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-automate`} className="type-meta mb-2.5 block text-white/55">
            What would you like to automate?
          </label>
          <textarea
            id={`${id}-automate`}
            name="automate"
            rows={4}
            value={values.automate}
            onChange={update('automate')}
            aria-invalid={errors.automate ? true : undefined}
            aria-describedby={describe('automate')}
            className={`${fieldClass} resize-y`}
          />
          {errors.automate ? (
            <p id={`${id}-automate-error`} className="mt-2 text-[0.82rem] text-[var(--nova-warm)]">
              {errors.automate}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="glass-strong glass-sheen inline-flex min-h-[48px] items-center rounded-[var(--r-pill)] px-7 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white/[0.17] active:scale-[0.985] disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send request'}
        </button>

        <p role="status" aria-live="polite" className="text-[0.88rem] text-white/60">
          {status === 'sent' ? 'Thank you — we will come back to you shortly.' : null}
          {status === 'error' ? (
            <>
              We could not send that. Please email{' '}
              <a className="text-[var(--nova-warm)] underline" href={`mailto:${contactEmail}`}>
                {contactEmail}
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}

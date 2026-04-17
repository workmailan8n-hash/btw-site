'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'motion/react';
import { ease, dur } from '@/lib/motion/tokens';
import { contactSchema, type ContactInput } from '@/lib/schema';
import { useLocale } from '@/lib/i18n/context';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const { t } = useLocale();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: 'web', budget: 'tbd' },
  });

  async function onSubmit(data: ContactInput) {
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error ?? `HTTP ${res.status}`);
      }
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: dur.slow, ease: ease.expoOut }}
        className="p-8 border border-[color:var(--color-accent)] rounded-sm"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-accent)]">
          {t.contact.success.badge}
        </span>
        <h3 className="mt-4 font-[var(--font-display)] text-3xl tracking-[-0.02em] pb-2">
          {t.contact.success.heading}
        </h3>
        <p className="mt-3 text-[color:var(--color-fg-muted)]">{t.contact.success.body}</p>
        <a
          href="https://t.me/btw_aitech"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center px-5 py-2 border border-[color:var(--color-accent)] text-[color:var(--color-accent)] hover:bg-[color:var(--color-accent)]/10 transition-colors"
        >
          {t.contact.success.tgButton}
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <Field label={f.name} error={errors.name?.message}>
        <input
          {...register('name')}
          type="text"
          placeholder={f.namePlaceholder}
          className="input"
          autoComplete="name"
        />
      </Field>

      <Field label={f.email} error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          placeholder={f.emailPlaceholder}
          className="input"
          autoComplete="email"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label={f.projectType} error={errors.projectType?.message}>
          <select {...register('projectType')} className="input">
            <option value="web">{f.types.web}</option>
            <option value="ai">{f.types.ai}</option>
            <option value="bot">{f.types.bot}</option>
            <option value="other">{f.types.other}</option>
          </select>
        </Field>

        <Field label={f.budget} error={errors.budget?.message}>
          <select {...register('budget')} className="input">
            <option value="tbd">{f.budgets.tbd}</option>
            <option value="<5k">{f.budgets['<5k']}</option>
            <option value="5-20k">{f.budgets['5-20k']}</option>
            <option value="20k+">{f.budgets['20k+']}</option>
          </select>
        </Field>
      </div>

      <Field label={f.message} error={errors.message?.message}>
        <textarea
          {...register('message')}
          placeholder={f.messagePlaceholder}
          rows={6}
          className="input"
        />
      </Field>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 border-l-2 border-[color:var(--color-error)] bg-[color:var(--color-bg-elev-1)] text-sm"
          >
            <strong className="text-[color:var(--color-error)]">{t.contact.error.heading}</strong>{' '}
            <span className="text-[color:var(--color-fg-muted)]">
              {errorMsg ?? t.contact.error.body}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center px-8 py-3 font-[var(--font-sans-alt)] font-semibold bg-[color:var(--color-accent)] text-[color:var(--color-bg-base)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {status === 'submitting' ? f.sending : f.send}
        </button>
        <span className="font-mono text-xs text-[color:var(--color-fg-meta)]">{f.replyNote}</span>
      </div>

      <style jsx>{`
        .input {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          background: var(--color-bg-elev-1);
          border: 1px solid rgba(74, 74, 82, 0.5);
          color: var(--color-fg-primary);
          font-family: var(--font-sans);
          font-size: 15px;
          border-radius: 2px;
          transition:
            border-color 0.2s,
            background 0.2s;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-accent);
          background: var(--color-bg-elev-2);
        }
        .input::placeholder {
          color: var(--color-fg-dim);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-fg-muted)]">
        {label}{' '}
        {error && (
          <span className="text-[color:var(--color-error)] ml-2 normal-case tracking-normal">
            · {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

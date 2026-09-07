'use client';

import { ArrowUpRight, Check, Loader2 } from 'lucide-react';
import { useId, useState } from 'react';
import {
  contactLimits,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from '@/lib/contact-schema';
import { projectBudgets, projectTypes, site } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const emptyForm: ContactPayload = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
  company: '',
};

export function ContactForm() {
  const id = useId();
  const [values, setValues] = useState<ContactPayload>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const set = <K extends keyof ContactPayload>(key: K, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  };

  const field = (key: keyof ContactPayload) => ({
    id: `${id}-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id}-${key}-erro` : undefined,
  });

  const onSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    setStatus('sending');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        errors?: ContactErrors;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus('error');
        setServerMessage(
          data.error ??
            'Não consegui enviar agora. Tente de novo ou me chame no Instagram.',
        );
        return;
      }

      setStatus('sent');
      setValues(emptyForm);
    } catch {
      setStatus('error');
      setServerMessage(
        'Sem conexão com o servidor. Tente de novo ou me chame no Instagram.',
      );
    }
  };

  if (status === 'sent') {
    return (
      <output className="contact-form contact-success">
        <span className="contact-success-icon" aria-hidden="true">
          <Check />
        </span>
        <h3>Mensagem enviada.</h3>
        <p>
          Recebi seu contato e respondo no e-mail informado. Se for urgente, me
          chame direto no Instagram.
        </p>
        <div className="contact-success-actions">
          <a
            href={site.instagram}
            target="_blank"
            rel="noreferrer"
            className="editorial-button editorial-button-light group"
          >
            Falar no Instagram
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 transition-transform duration-300 group-hover:rotate-45"
            />
          </a>
          <button
            type="button"
            className="contact-reset"
            onClick={() => setStatus('idle')}
          >
            Enviar outra mensagem
          </button>
        </div>
      </output>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-grid">
        <div className="contact-field">
          <label htmlFor={`${id}-name`}>Nome</label>
          <input
            {...field('name')}
            type="text"
            autoComplete="name"
            maxLength={contactLimits.name.max}
            placeholder="Como posso te chamar"
            value={values.name}
            onChange={(event) => set('name', event.target.value)}
          />
          {errors.name ? (
            <p className="contact-error" id={`${id}-name-erro`}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="contact-field">
          <label htmlFor={`${id}-email`}>E-mail</label>
          <input
            {...field('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={contactLimits.email.max}
            placeholder="voce@empresa.com.br"
            value={values.email}
            onChange={(event) => set('email', event.target.value)}
          />
          {errors.email ? (
            <p className="contact-error" id={`${id}-email-erro`}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="contact-field">
          <label htmlFor={`${id}-projectType`}>Tipo de projeto</label>
          <select
            {...field('projectType')}
            value={values.projectType}
            onChange={(event) => set('projectType', event.target.value)}
          >
            <option value="">Selecione</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-field">
          <label htmlFor={`${id}-budget`}>Investimento previsto</label>
          <select
            {...field('budget')}
            value={values.budget}
            onChange={(event) => set('budget', event.target.value)}
          >
            <option value="">Selecione</option>
            {projectBudgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-field contact-field-wide">
          <label htmlFor={`${id}-message`}>Sobre o projeto</label>
          <textarea
            {...field('message')}
            rows={5}
            maxLength={contactLimits.message.max}
            placeholder="O que é a marca, o que precisa existir e para quando."
            value={values.message}
            onChange={(event) => set('message', event.target.value)}
          />
          <div className="contact-meta">
            {errors.message ? (
              <p className="contact-error" id={`${id}-message-erro`}>
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <span className="contact-counter">
              {values.message.length}/{contactLimits.message.max}
            </span>
          </div>
        </div>
      </div>

      {/* Isca para bots: escondida de gente e de leitores de tela. */}
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor={`${id}-company`}>Empresa</label>
        <input
          id={`${id}-company`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => set('company', event.target.value)}
        />
      </div>

      <div className="contact-actions">
        <button
          type="submit"
          className="editorial-button editorial-button-light group"
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              Enviando
              <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            </>
          ) : (
            <>
              Enviar mensagem
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 transition-transform duration-300 group-hover:rotate-45"
              />
            </>
          )}
        </button>
        <p className="contact-hint">
          Prefere direto?{' '}
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>{' '}
          ou <a href={`mailto:${site.email}`}>e-mail</a>.
        </p>
      </div>

      <p className="contact-status" role="alert" aria-live="assertive">
        {status === 'error' ? serverMessage : ''}
      </p>
    </form>
  );
}

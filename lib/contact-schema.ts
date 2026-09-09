/**
 * Validação compartilhada do formulário de contato.
 *
 * O mesmo módulo roda no cliente (feedback imediato) e no route handler
 * (fonte de verdade), então as regras nunca saem de sincronia.
 */

import { projectBudgets, projectTypes } from './site';

export type ContactPayload = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  /** Campo isca: precisa chegar vazio. Bots costumam preencher. */
  company?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export const contactLimits = {
  name: { min: 2, max: 80 },
  email: { max: 160 },
  message: { min: 20, max: 2000 },
} as const;

// Deliberadamente permissivo: e-mail válido de verdade só se prova enviando.
const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? '';
  const email = input.email?.trim() ?? '';
  const message = input.message?.trim() ?? '';

  if (name.length < contactLimits.name.min) {
    errors.name = 'Diga como posso te chamar.';
  } else if (name.length > contactLimits.name.max) {
    errors.name = `Máximo de ${contactLimits.name.max} caracteres.`;
  }

  if (!emailPattern.test(email)) {
    errors.email = 'Preciso de um e-mail válido para responder.';
  } else if (email.length > contactLimits.email.max) {
    errors.email = 'E-mail longo demais.';
  }

  if (message.length < contactLimits.message.min) {
    errors.message = `Conte um pouco mais, pelo menos ${contactLimits.message.min} caracteres.`;
  } else if (message.length > contactLimits.message.max) {
    errors.message = `Máximo de ${contactLimits.message.max} caracteres.`;
  }

  if (input.projectType && !projectTypes.includes(input.projectType as never)) {
    errors.projectType = 'Selecione uma opção da lista.';
  }

  if (input.budget && !projectBudgets.includes(input.budget as never)) {
    errors.budget = 'Selecione uma opção da lista.';
  }

  return errors;
}

/**
 * Apenas apara e normaliza. Campos opcionais em branco continuam em branco,
 * porque trocá-los por um rótulo aqui faria a validação rejeitar o rótulo.
 */
export function normalizeContact(
  input: Partial<ContactPayload>,
): ContactPayload {
  const text = (value: unknown) =>
    typeof value === 'string' ? value.trim() : '';
  return {
    name: text(input.name),
    email: text(input.email).toLowerCase(),
    projectType: text(input.projectType),
    budget: text(input.budget),
    message: text(input.message),
    company: text(input.company),
  };
}

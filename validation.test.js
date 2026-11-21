import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  validateWhatsapp,
  validateBooking,
  formatBookingDate,
  getLocalTodayISO
} from './validation.js';

test('validateWhatsapp accepts example placeholder format (+57 300 123 4567)', () => {
  assert.equal(validateWhatsapp('+57 300 123 4567'), true);
  assert.equal(validateWhatsapp('3001234567'), true);
  assert.equal(validateWhatsapp('+57 (300) 123-4567'), true);
});

test('validateWhatsapp rejects non-numeric symbol strings and too-short numbers', () => {
  assert.equal(validateWhatsapp('-------'), false);
  assert.equal(validateWhatsapp('12345'), false);
  assert.equal(validateWhatsapp('abc3001234'), false);
  assert.equal(validateWhatsapp(''), false);
});

test('validateEmail validates standard email addresses', () => {
  assert.equal(validateEmail('paciente@aetheris.co'), true);
  assert.equal(validateEmail('invalido@'), false);
  assert.equal(validateEmail(''), false);
});

test('validateBooking rejects missing fields, invalid whatsapp, and past dates', () => {
  assert.deepEqual(
    validateBooking({
      name: '',
      whatsapp: '+57 300 123 4567',
      treatment: 'HydraFacial Clínico Profundo',
      specialist: 'Dra. Valentina Ríos',
      date: '2026-11-25',
      time: '10:00',
      todayISO: '2026-11-20'
    }),
    { valid: false, error: 'Por favor, completa todos los campos para agendar tu cita.' }
  );

  assert.deepEqual(
    validateBooking({
      name: 'María López',
      whatsapp: '---',
      treatment: 'HydraFacial Clínico Profundo',
      specialist: 'Dra. Valentina Ríos',
      date: '2026-11-25',
      time: '10:00',
      todayISO: '2026-11-20'
    }),
    { valid: false, error: 'Ingresa un número de WhatsApp válido (ej. +57 300 123 4567).' }
  );

  assert.deepEqual(
    validateBooking({
      name: 'María López',
      whatsapp: '+57 300 123 4567',
      treatment: 'HydraFacial Clínico Profundo',
      specialist: 'Dra. Valentina Ríos',
      date: '2026-11-19',
      time: '10:00',
      todayISO: '2026-11-20'
    }),
    { valid: false, error: 'Por favor, selecciona una fecha igual o posterior a hoy.' }
  );

  assert.deepEqual(
    validateBooking({
      name: 'María López',
      whatsapp: '+57 300 123 4567',
      treatment: 'HydraFacial Clínico Profundo',
      specialist: 'Dra. Valentina Ríos',
      date: '2026-11-25',
      time: '10:00',
      todayISO: '2026-11-20'
    }),
    { valid: true, error: '' }
  );
});

test('formatBookingDate formats ISO dates in Spanish and getLocalTodayISO formats YYYY-MM-DD', () => {
  assert.equal(formatBookingDate('2026-11-25'), '25 de noviembre de 2026');
  assert.equal(getLocalTodayISO(new Date(2026, 10, 20)), '2026-11-20');
});

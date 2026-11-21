export function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function validateWhatsapp(phone) {
  if (typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (!/^[0-9+\s()-]{7,20}$/.test(trimmed)) return false;
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

export function getLocalTodayISO(now = new Date()) {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function validateBooking({ name, whatsapp, treatment, specialist, date, time, todayISO }) {
  if (
    !name?.trim() ||
    !whatsapp?.trim() ||
    !treatment?.trim() ||
    !specialist?.trim() ||
    !date?.trim() ||
    !time?.trim()
  ) {
    return {
      valid: false,
      error: 'Por favor, completa todos los campos para agendar tu cita.'
    };
  }

  if (!validateWhatsapp(whatsapp)) {
    return {
      valid: false,
      error: 'Ingresa un número de WhatsApp válido (ej. +57 300 123 4567).'
    };
  }

  if (todayISO && date < todayISO) {
    return {
      valid: false,
      error: 'Por favor, selecciona una fecha igual o posterior a hoy.'
    };
  }

  return { valid: true, error: '' };
}

export function formatBookingDate(dateStr) {
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const parts = String(dateStr).split('-');
  if (parts.length !== 3) return String(dateStr);
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  if (!year || Number.isNaN(day) || monthIndex < 0 || monthIndex > 11) {
    return String(dateStr);
  }
  return `${day} de ${months[monthIndex]} de ${year}`;
}

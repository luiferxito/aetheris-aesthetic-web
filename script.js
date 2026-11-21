/* ========================================
   AETHERIS — Estética Avanzada & Grooming Clínico
   Main JavaScript
   ======================================== */

import {
  validateEmail,
  validateBooking,
  formatBookingDate,
  getLocalTodayISO
} from './validation.js';

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Index: Diagnosis Quick Email Capture ----
  const diagnosisForm = document.getElementById('diagnosis-form');
  const diagnosisFeedback = document.getElementById('diagnosis-feedback');

  if (diagnosisForm && diagnosisFeedback) {
    diagnosisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = diagnosisForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();

      if (!email) {
        diagnosisFeedback.textContent = 'Por favor, ingresa tu correo electrónico.';
        diagnosisFeedback.className = 'diagnosis-feedback error';
        return;
      }

      if (!validateEmail(email)) {
        diagnosisFeedback.textContent = 'Ingresa un correo electrónico válido.';
        diagnosisFeedback.className = 'diagnosis-feedback error';
        return;
      }

      // Simulate success
      diagnosisFeedback.textContent = '¡Listo! Te contactaremos pronto para tu diagnóstico facial gratuito.';
      diagnosisFeedback.className = 'diagnosis-feedback success';
      emailInput.value = '';

      setTimeout(() => {
        diagnosisFeedback.textContent = '';
        diagnosisFeedback.className = 'diagnosis-feedback';
      }, 5000);
    });
  }

  // ---- Servicios: Filter by Category ----
  const filterButtons = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  if (filterButtons.length && serviceCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          if (category === 'todos' || card.getAttribute('data-category') === category) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ---- Reservas: Pre-select treatment from URL param ----
  const treatmentSelect = document.getElementById('treatment-select');
  if (treatmentSelect) {
    const params = new URLSearchParams(window.location.search);
    const servicio = params.get('servicio');
    if (servicio) {
      const options = treatmentSelect.querySelectorAll('option');
      options.forEach(opt => {
        if (opt.value.toLowerCase() === servicio.toLowerCase()) {
          opt.selected = true;
        }
      });
    }
  }

  // ---- Reservas: Minimum Date & Form Validation + Confirmation ----
  const bookingDateInput = document.getElementById('booking-date');
  const todayISO = getLocalTodayISO();
  if (bookingDateInput) {
    bookingDateInput.min = todayISO;
  }

  const bookingForm = document.getElementById('booking-form');
  const bookingFormCard = document.getElementById('booking-form-card');
  const bookingFeedback = document.getElementById('booking-feedback');
  const confirmationCard = document.getElementById('confirmation-card');

  if (bookingForm && confirmationCard) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const whatsapp = document.getElementById('client-whatsapp').value.trim();
      const treatment = document.getElementById('treatment-select');
      const specialist = document.getElementById('specialist-select');
      const date = document.getElementById('booking-date').value;
      const time = document.getElementById('booking-time').value;

      const result = validateBooking({
        name,
        whatsapp,
        treatment: treatment.value,
        specialist: specialist.value,
        date,
        time,
        todayISO: getLocalTodayISO()
      });

      if (!result.valid) {
        if (bookingFeedback) {
          bookingFeedback.textContent = result.error;
          bookingFeedback.className = 'booking-feedback error';
        }
        return;
      }

      if (bookingFeedback) {
        bookingFeedback.textContent = '';
        bookingFeedback.className = 'booking-feedback';
      }

      // Populate confirmation card
      document.getElementById('conf-name').textContent = name;
      document.getElementById('conf-treatment').textContent = treatment.options[treatment.selectedIndex].text;
      document.getElementById('conf-specialist').textContent = specialist.options[specialist.selectedIndex].text;
      document.getElementById('conf-date').textContent = formatBookingDate(date);
      document.getElementById('conf-time').textContent = time;

      // Show confirmation, hide entire booking card (header + form)
      if (bookingFormCard) {
        bookingFormCard.style.display = 'none';
      } else {
        bookingForm.style.display = 'none';
      }
      confirmationCard.classList.add('show');

      // Scroll to confirmation
      confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ---- Initialize Lucide Icons ----
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

});

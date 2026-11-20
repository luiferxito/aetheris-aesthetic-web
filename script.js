/* ========================================
   AETHERIS — Estética Avanzada & Grooming Clínico
   Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
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

  // ---- Reservas: Form Validation & Confirmation ----
  const bookingForm = document.getElementById('booking-form');
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

      // Validation
      if (!name || !whatsapp || !treatment.value || !specialist.value || !date || !time) {
        alert('Por favor, completa todos los campos para agendar tu cita.');
        return;
      }

      const phoneRegex = /^[0-9+\s()-]{7,15}$/;
      if (!phoneRegex.test(whatsapp)) {
        alert('Ingresa un número de WhatsApp válido.');
        return;
      }

      // Populate confirmation card
      document.getElementById('conf-name').textContent = name;
      document.getElementById('conf-treatment').textContent = treatment.options[treatment.selectedIndex].text;
      document.getElementById('conf-specialist').textContent = specialist.options[specialist.selectedIndex].text;
      document.getElementById('conf-date').textContent = formatDate(date);
      document.getElementById('conf-time').textContent = time;

      // Show confirmation, hide form
      bookingForm.style.display = 'none';
      confirmationCard.classList.add('show');

      // Scroll to confirmation
      confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // ---- Date Formatting Helper ----
  function formatDate(dateStr) {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const parts = dateStr.split('-');
    const day = parseInt(parts[2], 10);
    const month = months[parseInt(parts[1], 10) - 1];
    const year = parts[0];
    return `${day} de ${month} de ${year}`;
  }

  // ---- Initialize Lucide Icons ----
  lucide.createIcons();

});

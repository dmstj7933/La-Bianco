/**
 * BIANCO MVP Landing Page JavaScript
 * Robust, production-grade script for form handling, local lead collection,
 * smooth animations, accessible modal & accordion behaviors.
 */

// Global helper: Accessible anywhere in the document
window.scrollToReservation = function() {
  const formSection = document.getElementById('reservation-form');
  const phoneInput = document.getElementById('phone-input');
  
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (phoneInput) {
        phoneInput.focus();
      }
    }, 500);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initSmartPhoneFormatter();
  initFormHandler();
  initFaqAccordion();
  initFloatingCta();
  initModalListeners();
});

/**
 * 1. Smart Phone Formatter (Supports natural backspace & fast typing)
 */
function initSmartPhoneFormatter() {
  const phoneInput = document.getElementById('phone-input');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', (e) => {
    const errorEl = document.getElementById('phone-error');
    if (errorEl) errorEl.classList.add('hidden');

    let digits = e.target.value.replace(/[^0-9]/g, '');
    if (digits.length > 11) digits = digits.slice(0, 11);

    let formatted = '';
    if (digits.length <= 3) {
      formatted = digits;
    } else if (digits.length <= 7) {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    e.target.value = formatted;
  });

  // Handle backspace when cursor is right after a hyphen
  phoneInput.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      const val = e.target.value;
      const cursorPos = e.target.selectionStart;
      if (cursorPos > 0 && val[cursorPos - 1] === '-') {
        e.preventDefault();
        const newVal = val.slice(0, cursorPos - 2) + val.slice(cursorPos);
        e.target.value = newVal;
        e.target.dispatchEvent(new Event('input'));
        e.target.setSelectionRange(cursorPos - 2, cursorPos - 2);
      }
    }
  });
}

/**
 * 2. Fake-Door Lead Capture & Validation
 */
function initFormHandler() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneInput = document.getElementById('phone-input');
    const agreeCheck = document.getElementById('agree-check');
    const errorEl = document.getElementById('phone-error');
    
    if (!phoneInput) return;

    const rawPhone = phoneInput.value.trim();
    // Validate Korean mobile numbers (010, 011, 016, 017, 018, 019)
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

    if (!phoneRegex.test(rawPhone)) {
      if (errorEl) {
        errorEl.textContent = '올바른 휴대폰 번호(010-0000-0000)를 입력해 주세요.';
        errorEl.classList.remove('hidden');
      }
      phoneInput.focus();
      return;
    }

    if (agreeCheck && !agreeCheck.checked) {
      alert('얼리버드 혜택 알림 수신에 동의해 주세요.');
      agreeCheck.focus();
      return;
    }

    // Capture Lead in LocalStorage
    const leadData = {
      phone: rawPhone,
      source: new URLSearchParams(window.location.search).get('utm_source') || 'direct_landing',
      referrer: document.referrer || 'direct',
      timestamp: new Date().toISOString()
    };

    try {
      const currentLeads = JSON.parse(localStorage.getItem('bianco_leads') || '[]');
      currentLeads.push(leadData);
      localStorage.setItem('bianco_leads', JSON.stringify(currentLeads));
      console.log('🎉 [BIANCO MVP] 사전예약 리드 수집 성공:', leadData);
    } catch (err) {
      console.warn('LocalStorage 저장 제한:', err);
    }

    // Display confirmation modal
    openSuccessModal(rawPhone);

    // Reset input fields
    form.reset();
  });
}

/**
 * 3. Modal Dialog Controls
 */
function openSuccessModal(phone) {
  const modal = document.getElementById('success-modal');
  const targetPhoneSpan = document.getElementById('modal-target-phone');
  
  if (targetPhoneSpan) {
    targetPhoneSpan.textContent = phone;
  }

  if (modal) {
    modal.classList.remove('hidden-modal');
    modal.classList.add('visible-modal');
    document.body.style.overflow = 'hidden';
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('success-modal');
  if (modal) {
    modal.classList.remove('visible-modal');
    modal.classList.add('hidden-modal');
    document.body.style.overflow = '';
  }
}

function initModalListeners() {
  const modal = document.getElementById('success-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const confirmBtn = document.getElementById('modal-confirm-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeSuccessModal);
  if (confirmBtn) confirmBtn.addEventListener('click', closeSuccessModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      // Close only if backdrop itself is clicked
      if (e.target === modal) {
        closeSuccessModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSuccessModal();
    }
  });
}

/**
 * 4. FAQ Pure CSS-Driven Accordion Controller
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isAlreadyActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach((other) => {
        other.classList.remove('active');
      });

      // Toggle current
      if (!isAlreadyActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 5. Throttled Floating Bottom CTA Bar Controller
 */
function initFloatingCta() {
  const floatingBar = document.getElementById('floating-cta-bar');
  const heroSection = document.getElementById('hero-section');
  const formSection = document.getElementById('reservation-form');

  if (!floatingBar || !heroSection || !formSection) return;

  let ticking = false;

  const checkScrollPosition = () => {
    const heroRect = heroSection.getBoundingClientRect();
    const formRect = formSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Show after scrolling past half of hero, hide when form is in view
    const isPastHero = heroRect.bottom < 100;
    const isBeforeForm = formRect.top > windowHeight - 80;

    if (isPastHero && isBeforeForm) {
      floatingBar.classList.remove('hidden-bar');
      floatingBar.classList.add('visible-bar');
    } else {
      floatingBar.classList.remove('visible-bar');
      floatingBar.classList.add('hidden-bar');
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(checkScrollPosition);
      ticking = true;
    }
  }, { passive: true });

  // Initial check on load
  checkScrollPosition();
}

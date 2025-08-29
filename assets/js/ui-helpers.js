// Shared UI helpers for HeroZero calculators
(function(){
  // Format number in Indian locale (no currency symbol)
  function HZ_formatINR(num, fd = 0){
    const n = Number(num) || 0;
    return n.toLocaleString('en-IN', {maximumFractionDigits: fd});
  }

  // Animated count up. If isPercent true, show with %; otherwise prefix with ₹
  function HZ_countUp(el, to, duration = 700, isPercent = false){
    const from = Number((el.dataset.value||'0').replace(/[^0-9.-]/g,'')) || 0;
    const start = performance.now();
    function frame(t){
      const p = Math.min(Math.max((t - start) / duration, 0), 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * ease;
      if(isPercent){
        el.textContent = `${val.toFixed(1)}%`;
      } else {
        el.textContent = '₹' + HZ_formatINR(val, 0);
      }
      if(p < 1) requestAnimationFrame(frame);
      else el.dataset.value = String(to);
    }
    requestAnimationFrame(frame);
  }

  // Style a range input with filled track (compatible with existing pages)
  function HZ_styleRange(r){
    if(!r || typeof r.min === 'undefined') return;
    const min = Number(r.min), max = Number(r.max), val = Number(r.value);
    const pct = ((val - min) / (max - min)) * 100;
    const dark = document.documentElement.classList.contains('dark');
    const filled = dark ? '#3b82f6' : '#0d6efd';
    const rest = dark ? '#334155' : '#e2e8f0';
    r.style.background = `linear-gradient(90deg, ${filled} 0%, ${filled} ${pct}%, ${rest} ${pct}%, ${rest} 100%)`;
  }

  // Expose on window for pages to call
  window.HZ_formatINR = HZ_formatINR;
  window.HZ_countUp = HZ_countUp;
  window.HZ_styleRange = HZ_styleRange;
})();

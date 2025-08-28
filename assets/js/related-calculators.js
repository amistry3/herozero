// Inject Related Calculators block based on current calculator path
(function(){
  const map = {
    '/pages/calculators/sip-calculator.html': [
      ['SIP Goal','/pages/calculators/sip-goal.html'],
      ['SIP Top-up Planner','/pages/calculators/sip-topup-planner.html'],
      ['SWP Withdrawal','/pages/calculators/swp-withdrawal.html']
    ],
    '/pages/calculators/sip-goal.html': [
      ['SIP Calculator','/pages/calculators/sip-calculator.html'],
      ['SIP Top-up Planner','/pages/calculators/sip-topup-planner.html'],
      ['SWP Withdrawal','/pages/calculators/swp-withdrawal.html']
    ],
    '/pages/calculators/sip-topup-planner.html': [
      ['SIP Calculator','/pages/calculators/sip-calculator.html'],
      ['SIP Goal','/pages/calculators/sip-goal.html'],
      ['SWP Withdrawal','/pages/calculators/swp-withdrawal.html']
    ],
    '/pages/calculators/swp-withdrawal.html': [
      ['SIP Calculator','/pages/calculators/sip-calculator.html'],
      ['SIP Goal','/pages/calculators/sip-goal.html'],
      ['SIP Top-up Planner','/pages/calculators/sip-topup-planner.html']
    ],
    '/pages/calculators/capital-gains-estimator.html': [
      ['Indexation basics','/pages/calculators/capital-gains-estimator.html#indexation'],
      ['Long vs Short term gains','/pages/calculators/capital-gains-estimator.html#ltst'],
      ['Tax rules FY 2025-26','/pages/blog.html']
    ],
    '/pages/calculators/car-affordability.html': [
      ['Car Affordability guide','/pages/guides/guides.html'],
      ['EMI Prepayment','/pages/calculators/emi-prepayment-calculator.html']
    ],
    '/pages/calculators/mobile-affordability.html': [
      ['Car Affordability','/pages/calculators/car-affordability.html']
    ],
    '/pages/calculators/emi-prepayment-calculator.html': [
      ['EMI Prepayment','/pages/calculators/emi-prepayment-calculator.html'],
      ['FD Calculator','/pages/calculators/fd-calculator.html']
    ],
    '/pages/calculators/fd-calculator.html': [
      ['EMI Prepayment','/pages/calculators/emi-prepayment-calculator.html'],
      ['PPF Calculator','/pages/calculators/ppf-calculator.html']
    ],
    '/pages/calculators/income-tax-calculator.html': [
      ['Capital Gains Estimator','/pages/calculators/capital-gains-estimator.html'],
      ['HRA Calculator','/pages/calculators/hra-calculator.html']
    ],
    '/pages/calculators/ppf-calculator.html': [
      ['FD Calculator','/pages/calculators/fd-calculator.html'],
      ['EPF Interest','/pages/calculators/epf-interest-calculator.html']
    ],
    '/pages/calculators/rd-calculator.html': [
      ['FD Calculator','/pages/calculators/fd-calculator.html'],
      ['PPF Calculator','/pages/calculators/ppf-calculator.html']
    ],
    '/pages/calculators/nps-calculator.html': [
      ['EPF Interest','/pages/calculators/epf-interest-calculator.html'],
      ['PPF Calculator','/pages/calculators/ppf-calculator.html']
    ],
    '/pages/calculators/epf-interest-calculator.html': [
      ['NPS Calculator','/pages/calculators/nps-calculator.html'],
      ['PPF Calculator','/pages/calculators/ppf-calculator.html']
    ],
    '/pages/calculators/hra-calculator.html': [
      ['Income Tax Calculator','/pages/calculators/income-tax-calculator.html'],
      ['Gratuity Calculator','/pages/calculators/gratuity-calculator.html']
    ],
    '/pages/calculators/gratuity-calculator.html': [
      ['HRA Calculator','/pages/calculators/hra-calculator.html'],
      ['EPF Interest','/pages/calculators/epf-interest-calculator.html']
    ]
  };

  const path = window.location.pathname.replace(/\/index.html$/, '');
  // try exact match or endsWith
  function findLinks(p){
    if(map[p]) return map[p];
    for(const k in map){ if(p.endsWith(k)) return map[k]; }
    return null;
  }
  const links = findLinks(path) || [];
  if(links.length===0) return; // nothing to inject

  // build node
  const wrap = document.createElement('aside');
  wrap.className = 'card-tw p-4 mt-6';
  const title = document.createElement('div'); title.className='font-semibold mb-2 text-sm text-slate-700 dark:text-slate-200'; title.textContent='Related calculators'; wrap.appendChild(title);
  const ul = document.createElement('ul'); ul.className='grid gap-2';
  links.forEach(([t,u])=>{
    const li = document.createElement('li'); const a = document.createElement('a'); a.href = u; a.className='text-sm text-slate-700 dark:text-slate-200 hover:underline'; a.textContent = t; li.appendChild(a); ul.appendChild(li);
  });
  wrap.appendChild(ul);

  // find insertion point: notes div, or results column, or main
  const notes = document.getElementById('notes');
  if(notes && notes.parentNode){ notes.parentNode.insertBefore(wrap, notes.nextSibling); return; }
  // try metric-card parent
  const metric = document.querySelector('.metric-card'); if(metric && metric.parentNode){ metric.parentNode.parentNode.insertBefore(wrap, metric.parentNode.nextSibling); return; }
  // fallback: append to main
  const main = document.querySelector('main'); if(main) main.appendChild(wrap);
})();

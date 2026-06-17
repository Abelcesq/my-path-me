/* My Path to Me — custom design interactivity */
// Year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Sticky nav state
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // Mobile menu
  const toggle = document.getElementById('navtoggle');
  const links = document.getElementById('navlinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  }, {threshold:.18});
  document.querySelectorAll('.reveal,.step,.find').forEach(el => io.observe(el));

  // The Path — fill the line as the journey section scrolls through view
  const pathFill = document.getElementById('pathfill');
  const pathWrap = document.querySelector('.path-wrap');
  const updatePath = () => {
    if(!pathWrap) return;
    const r = pathWrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = r.height + vh*0.5;
    let p = (vh*0.7 - r.top) / total;
    p = Math.max(0, Math.min(1, p));
    pathFill.style.height = (p*100) + '%';
  };
  updatePath();
  window.addEventListener('scroll', updatePath, {passive:true});
  window.addEventListener('resize', updatePath);

  // Signup (front-end only — no data leaves the page; wire to your provider later)
  const form = document.getElementById('signup');
  const msg = document.getElementById('signupmsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if(!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      msg.style.color = '#F0C083';
      msg.textContent = 'Please enter a valid email address.';
      return;
    }
    msg.style.color = '#A9C7B8';
    msg.textContent = 'Thank you — you\'re on the path. (Connect this form to your email tool to go live.)';
    form.reset();
  });

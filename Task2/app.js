const app = document.getElementById('app');
const bookingModal = document.getElementById('bookingModal');
const closeBooking = document.getElementById('closeBooking');
const openBookingBtn = document.getElementById('open-booking');
const bookingForm = document.getElementById('bookingForm');
const bookingCourseSelect = document.getElementById('bookingCourse');
const imageModal = document.getElementById('imageModal');
const closeImageModal = document.getElementById('closeImageModal');
const modalImage = document.getElementById('modalImage');
const yearSpan = document.getElementById('year');
const menuToggle = document.getElementById('menuToggle');

yearSpan.textContent = new Date().getFullYear();

const courses = [
  {name: "Course Flutter",description: "تعلم إنشاء تطبيقات موبايل باستخدام Flutter و Dart.",duration: "4 Weeks ",price: "50 USD"},
  { name: " Course Front-End",description: "أساسيات HTML, CSS, JavaScript لبناء مواقع احترافية.",duration: "6 Weeks ", price: "70 USD"},
  { name: " Course UI/UX",description: "تعلم تصميم واجهات المستخدم وتجربة المستخدم.",duration: "3 Weeks ", price: "40 USD"},
  { name: " Course Graphic Design",description: "أساسيات التصميم باستخدام Photoshop و Illustrator.",duration: "5 Weeks ",price: "60 USD"},
  {name: " Course Back-End", description: "تعلم بناء السيرفرات باستخدام Node.js و قواعد البيانات SQL.", duration: "6 Weeks ", price: "80 USD" }
];


const portfolioItems = [
  { id:1, src:'images/Flutter.png', alt:'مشروع 1' },
  { id:2, src:'images/Front-End.png', alt:'مشروع 2' },
  { id:3, src:'images/UI-UX.png', alt:'مشروع 3' },
  { id:4, src:'images/Graphic Design.png', alt:'مشروع 4' },
  { id:5,src:'images/Back-End.png  ', alt:'مشروع 5'}
];

function populateBookingSelect(){
  bookingCourseSelect.innerHTML = '';
  courses.forEach(c=>{
    const opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = `${c.name} - ${c.duration} - ${c.price}`;
    bookingCourseSelect.appendChild(opt);
  });
}

populateBookingSelect();

function router(){
  const hash = location.hash || '#/';
  if(hash === '#/' || hash === '') renderHome();
  else if(hash.startsWith('#/courses')) renderCourses();
  else if(hash.startsWith('#/portfolio')) renderPortfolio();
  else if(hash.startsWith('#/contact')) renderContact();
  else renderHome();
}

function renderHome(){
  app.innerHTML = `
    <section class="hero container">
      <div class="hero-card">
        <h2>شيفرة كود — تدريب وخدمات برمجية</h2>
        <p>نحو احتراف البرمجة والتصميم، دورات عملية ومباشرة مع شهادات. انضم للجيل القادم من المطورين.</p>
        <div style="margin-top:16px">
          <button id="homeBook" class="btn">احجز دورة الآن</button>
        </div>
      </div>
      <div class="hero-illustration hero-card" style="background-color:white; text-align:center;">
  <img src="images/shifra.jpeg" alt="Hero - شيفرة كود" style="display:block; max-width:100%; height:auto;">
</div>

</div>
        </div>
      </div>
    </section>

    <section class="section container">
      <h3>أحدث الدورات</h3>
      <div class="grid" id="coursesPreview"></div>
    </section>
  `;
  const preview = document.getElementById('coursesPreview');
  courses.slice(0,3).forEach(c=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<h3>${c.name}</h3><p class="desc">${c.description}</p><div class="meta"><span>${c.duration}</span><span>${c.price}</span></div><div style="margin-top:auto"><button class="btn book-now" data-id="${c.id}">احجز الآن</button> <a href="#/courses" class="nav-link">عرض كل الدورات</a></div>`;
    preview.appendChild(card);
  });

  document.getElementById('homeBook').addEventListener('click', openBooking);
  document.querySelectorAll('.book-now').forEach(b=>b.addEventListener('click', (e)=>{
    const id = e.currentTarget.dataset.id;
    bookingCourseSelect.value = id;
    openBooking();
  }));
}

function renderCourses(){
  app.innerHTML = `<section class="section container"><h2>الدورات</h2><div class="grid" id="coursesGrid"></div></section>`;
  const grid = document.getElementById('coursesGrid');
  courses.forEach(c=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `
      <h3>${c.name}</h3>
      <p class="desc">${c.description}</p>
      <div class="meta"><span>${c.duration}</span><span>${c.price}</span></div>
      <div style="margin-top:auto"><button class="btn book-now" data-id="${c.id}">احجز الآن</button></div>
    `;
    grid.appendChild(card);
  });
  document.querySelectorAll('.book-now').forEach(b=>b.addEventListener('click', (e)=>{
    const id = e.currentTarget.dataset.id;
    bookingCourseSelect.value = id;
    openBooking();
  }));
}

function renderPortfolio(){
  app.innerHTML = `<section class="section container"><h2>أعمالنا</h2><div class="grid" id="portfolioGrid"></div></section>`;
  const grid = document.getElementById('portfolioGrid');
  portfolioItems.forEach(p=>{
    const el = document.createElement('div'); el.className='card';
    el.innerHTML = `<img src="${p.src}" class="portfolio-img" alt="${p.alt}" data-src="${p.src}">`;
    grid.appendChild(el);
  });
  document.querySelectorAll('.portfolio-img').forEach(img=>{
    img.addEventListener('click', e=>{
      modalImage.src = e.currentTarget.dataset.src;
      imageModal.classList.remove('hidden');
      imageModal.setAttribute('aria-hidden','false');
    });
  });
}

function renderContact(){
  app.innerHTML = `
    <section class="section container">
      <h2>تواصل معنا</h2>
      <div class="grid">
        <div class="card">
          <h3>راسلنا</h3>
          <form id="contactForm">
            <label>الاسم<input name="name" required></label>
            <label>البريد<input name="email" type="email" required></label>
            <label>الرسالة<textarea name="message" required></textarea></label>
            <button class="btn" type="submit">أرسل</button>
          </form>
        </div>

        <div class="card">
          <h3>معلومات</h3>
        <p>رقم: <span dir="ltr">+972 59-232-3418</span></p>
         <p>البريد: <span dir="ltr">Shifra.center@gmail.com</span></p>
          <p>تابعنا على السوشال ميديا:</p>

          <div style="margin-top:12px; display:flex; gap:12px; flex-direction:column">
            <a href="https://www.instagram.com/code_.center?igsh=OWF3bDY1b3loNG5q" class="nav-link" target="_blank">Instagram</a>
            <a href="https://www.facebook.com/share/17QEAZE1pN/?mibextid=wwXIfr" class="nav-link" target="_blank">Facebook</a>
            <a href="https://whatsapp.com/channel/0029VbBHUCv8kyyDuKmDzh2w" class="nav-link" target="_blank">WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  `;

  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('تم إرسال رسالتك — شكرًا لتواصلك معنا!');
    contactForm.reset();
  });
}

function openBooking(){
  bookingModal.classList.remove('hidden');
  bookingModal.setAttribute('aria-hidden','false');
}
function closeBookingModal(){
  bookingModal.classList.add('hidden');
  bookingModal.setAttribute('aria-hidden','true');
}
openBookingBtn.addEventListener('click', openBooking);
closeBooking.addEventListener('click', closeBookingModal);
bookingModal.addEventListener('click', (e)=>{ if(e.target === bookingModal) closeBookingModal(); });

bookingForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  const form = new FormData(bookingForm);
  const booking = {
    id: 'b_' + Date.now(),
    name: form.get('name'),
    phone: form.get('phone'),
    email: form.get('email'),
    courseId: form.get('course'),
    createdAt: new Date().toISOString()
  };
  const existing = JSON.parse(localStorage.getItem('shifra_bookings') || '[]');
  existing.push(booking);
  localStorage.setItem('shifra_bookings', JSON.stringify(existing));
  bookingForm.reset();
  closeBookingModal();
  alert('تم حفظ الحجز بنجاح! سيتواصل معك فريقنا قريبًا.');
});

closeImageModal.addEventListener('click', ()=>{
  imageModal.classList.add('hidden');
  imageModal.setAttribute('aria-hidden','true');
});
imageModal.addEventListener('click', (e)=>{ if(e.target === imageModal) { imageModal.classList.add('hidden'); imageModal.setAttribute('aria-hidden','true'); } });

menuToggle.addEventListener('click', ()=>{
  const nav = document.querySelector('.nav');
  if(nav.style.display === 'flex') nav.style.display = '';
  else nav.style.display = 'flex';
});

window.addEventListener('hashchange', router);
window.addEventListener('load', ()=>{
  populateBookingSelect();
  router();
});
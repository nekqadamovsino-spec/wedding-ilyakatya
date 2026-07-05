const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxjRIsiUPrfMavhKB55ItGLITBdYaaaZ83hWVW4ncznM43w6V4jf_FoofOiB6ZYTgdY9Q/exec";
const weddingDate = new Date('2026-09-11T14:00:00+03:00');

function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  document.getElementById('days').textContent = d;
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}

tick();
setInterval(tick, 1000);

const bar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const percent = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
  bar.style.width = `${percent * 100}%`;
});

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:.25});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.getElementById('soundBtn').addEventListener('click', ()=>{
  alert('Сюда можно добавить музыку: положи файл music.mp3 и я подключу кнопку.');
});
const form = document.getElementById("rsvpForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = form.querySelector("button");
    const result = document.getElementById("result");

    btn.disabled = true;
    btn.textContent = "Отправка...";

    try {
      const data = new FormData(form);

      await fetch(WEB_APP_URL, {
        method: "POST",
        body: data
      });

      result.textContent = "Спасибо! Ваш ответ получен ❤️";
      form.reset();

    } catch (err) {
      result.textContent = "Ошибка отправки";
    }

    btn.disabled = false;
    btn.textContent = "Подтвердить";
  });
}

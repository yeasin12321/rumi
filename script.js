// 1. Starfield Effect
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w, h, particles;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    let numStars = w < 768 ? 40 : 100;
    for (let i = 0; i < numStars; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#d4af37';
    particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if(p.x < 0 || p.x > w) p.dx *= -1;
        if(p.y < 0 || p.y > h) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawStars();

// 2. GSAP Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.to(item, { scrollTrigger: { trigger: item, start: "top 90%" }, opacity: 1, x: 0, duration: 1 });
});

gsap.utils.toArray('.memory-card').forEach(card => {
    gsap.to(card, { scrollTrigger: { trigger: card, start: "top 85%" }, opacity: 1, y: 0, duration: 1 });
});

gsap.from(".vow-container", {
    scrollTrigger: { trigger: ".vow-section", start: "top 80%" },
    opacity: 0, scale: 0.9, duration: 1.5
});

// 3. Generate 18 Reasons
const reasons = [
    "তোমার হাসি", "তোমার মায়া", "তোমার যত্ন", "তোমার পাগলামি", 
    "তোমার গান", "আমাদের স্মৃতি", "তোমার সাহস", "তোমার ধৈর্য",
    "আমার প্রতি বিশ্বাস", "তোমার বুদ্ধিমত্তা", "তোমার রান্না", "তোমার চাহনি",
    "আমাদের বন্ধুত্ব", "তোমার রাগ", "তোমার অভিমান", "তোমার ক্ষমা",
    "তোমার সঙ্গ", "তুমিই আমার সব"
];

const grid = document.getElementById('reasons-grid');
reasons.forEach((reason, index) => {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `<span class="reason-num">${index + 1}</span><p class="reason-text">${reason}</p>`;
    grid.appendChild(card);
});

// 4. Typewriter Effect
const poem = `"প্রিয়,
তুমি কি জানো আমি তোমাকে কতটা ভালোবাসি? মাঝে মাঝে মনে হয়, আমার এই ভালোবাসার গভীরতা মাপার মতো কোনো মাপকাঠি এই পৃথিবীতে নেই। যখন প্রথম তোমাকে দেখেছিলাম, তখন থেকেই আমার জীবনের গল্পটা বদলে গেছে।

সারাদিনের ক্লান্তি শেষে যখন তোমার সাথে কথা বলি, তখন মনে হয় আমি পৃথিবীর সবথেকে সুখী মানুষ। তোমার হাত ধরে বাকিটা জীবন পার করে দেওয়ার স্বপ্ন আমি প্রতিদিন দেখি। তুমি শুধু আমার ভালোবাসাই নও, তুমি আমার বেঁচে থাকার প্রেরণা।

আমি কথা দিচ্ছি, পরিস্থিতি যাই হোক না কেন, আমি কখনও তোমার হাত ছাড়ব না। তোমার চোখে যে মায়া আছে, তাতে আমি বারবার হার মানতে রাজি। তুমি আমার জীবনের সেই শ্রেষ্ঠ উপহার, যা আমি সারাজীবন আগলে রাখতে চাই। আমি তোমাকে অনেক অনেক বেশি ভালোবাসি।"`;

let i = 0;
const speed = 40; 
const typeTarget = document.getElementById("typewriter-text");
let typed = false;

ScrollTrigger.create({
    trigger: ".poetry-section",
    start: "top 65%",
    onEnter: () => {
        if(!typed) { typeWriter(); typed = true; }
    }
});

function typeWriter() {
    if (i < poem.length) {
        if(poem.charAt(i) === '\n') {
            typeTarget.innerHTML += '<br>';
        } else {
            typeTarget.innerHTML += poem.charAt(i);
        }
        i++;
        setTimeout(typeWriter, Math.random() * speed + 10);
    }
}

// 5. Love Counter
const startDate = new Date("September 14, 2024 00:00:00").getTime(); 

function updateCounter() {
    const now = new Date().getTime();
    const distance = now - startDate;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
}
setInterval(updateCounter, 1000);
updateCounter();

// 6. Secret Message Toggle
function toggleSecret() {
    const letter = document.getElementById("secretLetter");
    letter.classList.toggle("show");
    const envelopeText = document.querySelector(".click-text");
    if (letter.classList.contains("show")) {
        envelopeText.innerText = "A Message From My Heart";
        envelopeText.style.animation = "none";
    } else {
        envelopeText.innerText = "Tap to Open";
        envelopeText.style.animation = "pulse 2s infinite";
    }
}

// 7. Interactive Game (Catch the No button)
const noBtn = document.getElementById('noBtn');

// PC এর জন্য 'না' বাটন সরানোর লজিক
noBtn.addEventListener('mouseover', () => {
    // স্ক্রিনের সাইজ চেক করে শুধুমাত্র ডেক্সটপেই সরাবে
    if (window.innerWidth > 768) { 
        const container = document.querySelector('.game-section');
        const containerRect = container.getBoundingClientRect();
        
        const maxX = containerRect.width - noBtn.offsetWidth - 50;
        const maxY = containerRect.height - noBtn.offsetHeight - 50;
        
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }
});

// যদি ফোনে 'না' ক্লিক করে ফেলে
noBtn.addEventListener('click', () => {
    alert("এটা তো কোনো অপশনই না! আবার ভাবো! 😡");
});

function sayYes() {
    document.getElementById('game-response').innerText = "আমি জানতাম! আমিও তোমাকে অনেক বেশি ভালোবাসি রুমী! ❤️";
    noBtn.style.display = 'none'; // 'না' বাটন গায়েব হয়ে যাবে
}

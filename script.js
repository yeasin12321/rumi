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

// Timeline items
gsap.utils.toArray('.timeline-item').forEach(item => {
    gsap.to(item, {
        scrollTrigger: { trigger: item, start: "top 90%" },
        opacity: 1, x: 0, duration: 1
    });
});

// Memory cards
gsap.utils.toArray('.memory-card').forEach(card => {
    gsap.to(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        opacity: 1, y: 0, duration: 1
    });
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

// 4. Typewriter Effect (Restored Original Long Text)
const poem = `"প্রিয়,

তুমি কি জানো আমি তোমাকে কতটা ভালোবাসি? মাঝে মাঝে মনে হয়, আমার এই ভালোবাসার গভীরতা মাপার মতো কোনো মাপকাঠি এই পৃথিবীতে নেই। যখন প্রথম তোমাকে দেখেছিলাম, তখন থেকেই আমার জীবনের গল্পটা বদলে গেছে। তোমার ওই মিষ্টি হাসি আমার সব দুঃখ ভুলিয়ে দেওয়ার জন্য যথেষ্ট। আমার প্রতিটি চিন্তায়, প্রতিটি কামনায় শুধু তোমারই নাম মিশে থাকে।

সারাদিনের ক্লান্তি শেষে যখন তোমার সাথে কথা বলি, তখন মনে হয় আমি পৃথিবীর সবথেকে সুখী মানুষ। তোমার হাত ধরে বাকিটা জীবন পার করে দেওয়ার স্বপ্ন আমি প্রতিদিন দেখি। তুমি শুধু আমার ভালোবাসাই নও, তুমি আমার বেঁচে থাকার প্রেরণা। মাঝে মাঝে আমরা ঝগড়া করি, অভিমান করি, কিন্তু দিনশেষে আমার সবটুকু শান্তি শুধু তোমাকেই ঘিরে।

আমি কথা দিচ্ছি, পরিস্থিতির যাই হোক না কেন, আমি কখনও তোমার হাত ছাড়ব না। তোমার সব আবদার, সব জেদ আমি সারাজীবন এভাবেই সহ্য করে যেতে চাই। যখন তুমি পাশে থাকো, তখন মনে হয় আমি যেকোনো বাধা জয় করতে পারব। আমার অন্ধকার জীবনে তুমি হলে এক টুকরো উজ্জ্বল আলো। তোমাকে ছাড়া একটা মুহূর্ত কাটানোও এখন আমার কাছে অনেক কঠিন মনে হয়।

জানি না ভাগ্যে কী আছে, তবে আমি সৃষ্টিকর্তার কাছে প্রতিবার শুধু তোমাকেই চাই। তোমার চোখে যে মায়া আছে, তাতে আমি বারবার হার মানতে রাজি। তুমি আমার জীবনের সেই শ্রেষ্ঠ উপহার, যা আমি সারাজীবন আগলে রাখতে চাই। আমার ভালোবাসা তোমার জন্য কোনোদিনও কমবে উল্লেখযোগ্য না, বরং সময়ের সাথে সাথে তা আরও গভীর হবে।

আমি তোমাকে কতটা ভালোবাসি তা হয়তো ভাষায় বলে বোঝানো সম্ভব নয়। শুধু এটুকুই বলব, আমার শেষ নিঃশ্বাস পর্যন্ত তুমিই হবে আমার একমাত্র আপনজন। ভালো থেকো আমার প্রিয় মানুষটি, সবসময় আমার হৃদয়ের খুব কাছাকাছি থেকো। আমি তোমাকে অনেক অনেক বেশি ভালোবাসি।"`;

let i = 0;
const speed = 40; 
const typeTarget = document.getElementById("typewriter-text");
let typed = false;

// Trigger now points back to .poetry-section
ScrollTrigger.create({
    trigger: ".poetry-section",
    start: "top 65%",
    onEnter: () => {
        if(!typed) {
            typeWriter();
            typed = true;
        }
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

// 5. Vow Animation
gsap.from(".vow-container", {
    scrollTrigger: { trigger: ".vow-section", start: "top 80%" },
    opacity: 0, scale: 0.9, duration: 1.5
});

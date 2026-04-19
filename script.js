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

const noBtn = document.getElementById('noBtn');

noBtn.addEventListener('mouseover', () => {
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

noBtn.addEventListener('click', () => {
    alert("এটা তো কোনো অপশনই না! আবার ভাবো! 😡");
});

function sayYes() {
    document.getElementById('game-response').innerText = "আমি জানতাম! আমিও তোমাকে অনেক বেশি ভালোবাসি রুমী! ❤️";
    noBtn.style.display = 'none';
}
// --- Updated Book Style Dynamic Kobita Corner ---
const sheetID = '17K1Vg9zUa0CyPtw7To8bdy8svkSN7glfYH-uOc8lx9Q'; 
const sheetName = 'Sheet1'; 
const gSheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

let allPoems = [];
let currentPoemIndex = 0;

async function fetchKobitas() {
    const container = document.getElementById('dynamic-kobita-container');
    
    try {
        const response = await fetch(gSheetURL);
        const text = await response.text();
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonStr);
        
        if (!data.table || !data.table.rows || data.table.rows.length === 0) return;

        const rows = data.table.rows;

        // এক্সেলে যতগুলো কবিতা আছে সবগুলোকে একটি লিস্টে (Array) সাজানো হচ্ছে
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cell1 = row.c && row.c[0] ? row.c[0].v : null;
            const cell2 = row.c && row.c[1] ? row.c[1].v : null;

            if (cell1 && cell2) {
                allPoems.push({
                    title: cell1,
                    poem: String(cell2).replace(/\n/g, '<br>')
                });
            }
        }

        if (allPoems.length > 0) {
             renderPoem(0, 'first'); // প্রথম কবিতা লোড করা
        }

    } catch (error) {
        container.innerHTML = `<p class="loading-text" style="color:#ff4d4d;">Error loading poems.</p>`;
    }
}

function renderPoem(index, direction = 'next') {
    const container = document.getElementById('dynamic-kobita-container');
    const poemData = allPoems[index];
    
    // এনিমেশন চলার সময় বাটনগুলো লক করে দেওয়া
    document.getElementById('prev-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;

    // পাতা উল্টানোর 3D এনিমেশনের ম্যাথ লজিক (GSAP)
    const flipOutAngle = direction === 'next' ? -90 : 90;
    const flipInAngle = direction === 'next' ? 90 : -90;
    const transformOriginOut = direction === 'next' ? "left center" : "right center";
    const transformOriginIn = direction === 'next' ? "right center" : "left center";

    if(direction === 'first') {
         injectPoemHTML(container, poemData, index);
    } else {
        // বর্তমান পাতা উল্টে বিদায় নেওয়া
        gsap.to(container, {
            rotationY: flipOutAngle,
            transformOrigin: transformOriginOut,
            opacity: 0,
            duration: 0.4,
            ease: "power1.in",
            onComplete: () => {
                injectPoemHTML(container, poemData, index);
                
                // নতুন পাতা উল্টে সামনে আসা
                gsap.fromTo(container, 
                    { rotationY: flipInAngle, transformOrigin: transformOriginIn, opacity: 0 },
                    { rotationY: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    }
}

function injectPoemHTML(container, poemData, index) {
    container.innerHTML = `
        <div class="kobita-card">
            <h3 class="kobita-title">${poemData.title}</h3>
            <div class="kobita-body">${poemData.poem}</div>
        </div>
    `;
    document.getElementById('page-indicator').innerText = `পৃষ্ঠা ${index + 1} / ${allPoems.length}`;
    
    // প্রথম বা শেষ পাতায় পৌঁছালে বাটনগুলো হাইড বা ডিসেবল করা
    document.getElementById('prev-btn').disabled = (index === 0);
    document.getElementById('next-btn').disabled = (index === allPoems.length - 1);
}

function nextPoem() {
    if (currentPoemIndex < allPoems.length - 1) {
        currentPoemIndex++;
        renderPoem(currentPoemIndex, 'next');
    }
}

function prevPoem() {
    if (currentPoemIndex > 0) {
        currentPoemIndex--;
        renderPoem(currentPoemIndex, 'prev');
    }
}

fetchKobitas();
// --- Forever Agreement Logic ---
const fingerprintBtn = document.getElementById('fingerprint-btn');
const statusText = document.getElementById('agreement-status');
let holdTimer;
let isAgreed = false;

function startHold(e) {
    if (isAgreed) return; // একবার রাজি হয়ে গেলে আর কাজ করবে না
    e.preventDefault(); // মোবাইলে স্ক্রল হওয়া বন্ধ করতে
    
    fingerprintBtn.classList.add('scanning');
    statusText.innerText = 'স্ক্যান করা হচ্ছে... ধরে রাখুন...';
    statusText.style.color = '#ffb86c';

    // ৩ সেকেন্ড (3000ms) ধরে রাখলে সাকসেস হবে
    holdTimer = setTimeout(() => {
        completeAgreement();
    }, 3000); 
}

function endHold() {
    if (isAgreed) return;
    
    clearTimeout(holdTimer); // আঙুল সরিয়ে নিলে টাইমার বাতিল হবে
    fingerprintBtn.classList.remove('scanning');
    
    // আবার আগের অবস্থায় ফিরে যাওয়া
    statusText.innerText = 'চুক্তিতে রাজি থাকলে ফিঙ্গারপ্রিন্ট চেপে ধরে রাখুন';
    statusText.style.color = '#aaa';
}

function completeAgreement() {
    isAgreed = true;
    fingerprintBtn.classList.remove('scanning');
    fingerprintBtn.classList.add('agreed');
    
    // আইকন পরিবর্তন করে হার্ট বসানো
    fingerprintBtn.innerHTML = '❤'; 
    
    // স্ট্যাটাস টেক্সট পরিবর্তন
    statusText.innerText = 'চুক্তি সম্পন্ন হয়েছে! আপনি এখন আজীবনের জন্য আবদ্ধ।';
    statusText.classList.add('success');
    
    // স্পেশাল কনফেটি বা এনিমেশন (ঐচ্ছিক)
    createConfetti();
}

// মাউস ইভেন্ট (ল্যাপটপের জন্য)
fingerprintBtn.addEventListener('mousedown', startHold);
fingerprintBtn.addEventListener('mouseup', endHold);
fingerprintBtn.addEventListener('mouseleave', endHold);

// টাচ ইভেন্ট (মোবাইলের জন্য)
fingerprintBtn.addEventListener('touchstart', startHold, {passive: false});
fingerprintBtn.addEventListener('touchend', endHold);
fingerprintBtn.addEventListener('touchcancel', endHold);

// ছোট্ট কনফেটি এনিমেশন (সাকসেস হওয়ার পর)
function createConfetti() {
    for(let i=0; i<30; i++) {
        let conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.width = '8px';
        conf.style.height = '8px';
        conf.style.backgroundColor = i%2==0 ? '#d4af37' : '#ff4d4d';
        conf.style.left = '50%';
        conf.style.top = '50%';
        conf.style.borderRadius = '50%';
        conf.style.zIndex = '10';
        fingerprintBtn.parentElement.appendChild(conf);
        
        gsap.to(conf, {
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200 - 100,
            opacity: 0,
            duration: 1 + Math.random(),
            ease: "power2.out",
            onComplete: () => conf.remove()
        });
    }
}
// --- Updated Voice Corner with Page Flip Logic ---
const voiceSheetName = 'VoiceNotes'; 
const voiceSheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${voiceSheetName}`;

let allVoiceNotes = [];
let currentVoiceIndex = 0;

async function fetchVoiceNotes() {
    const container = document.getElementById('dynamic-voice-container');
    try {
        const response = await fetch(voiceSheetURL);
        const text = await response.text();
        const jsonStr = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
        const data = JSON.parse(jsonStr);
        
        if (!data.table || !data.table.rows || data.table.rows.length === 0) return;

        const rows = data.table.rows;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const title = row.c && row.c[0] ? row.c[0].v : null;
            const link = row.c && row.c[1] ? row.c[1].v : null;

            if (title && link) {
                let audioSrc = link;
                if (audioSrc.includes('drive.google.com/file/d/')) {
                    const fileId = audioSrc.split('/d/')[1].split('/')[0];
                    audioSrc = `https://drive.google.com/uc?export=download&id=${fileId}`;
                }
                allVoiceNotes.push({ title: title, src: audioSrc });
            }
        }

        if (allVoiceNotes.length > 0) {
            renderVoiceNote(0, 'first');
        }
    } catch (error) {
        container.innerHTML = `<p class="loading-text" style="color:#ff4d4d;">Voice notes load hote somossa hochche.</p>`;
    }
}

function renderVoiceNote(index, direction = 'next') {
    const container = document.getElementById('dynamic-voice-container');
    const voiceData = allVoiceNotes[index];
    
    document.getElementById('voice-prev-btn').disabled = true;
    document.getElementById('voice-next-btn').disabled = true;

    const flipOut = direction === 'next' ? -90 : 90;
    const flipIn = direction === 'next' ? 90 : -90;

    if(direction === 'first') {
        injectVoiceHTML(container, voiceData, index);
    } else {
        gsap.to(container, {
            rotationY: flipOut,
            opacity: 0,
            duration: 0.4,
            ease: "power1.in",
            onComplete: () => {
                injectVoiceHTML(container, voiceData, index);
                gsap.fromTo(container, 
                    { rotationY: flipIn, opacity: 0 },
                    { rotationY: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    }
}

function injectVoiceHTML(container, data, index) {
    container.innerHTML = `
        <div class="voice-card">
            <h3 class="voice-card-title">${data.title}</h3>
            <audio controls>
                <source src="${data.src}">
            </audio>
        </div>
    `;
    document.getElementById('voice-page-indicator').innerText = `Voice ${index + 1} / ${allVoiceNotes.length}`;
    document.getElementById('voice-prev-btn').disabled = (index === 0);
    document.getElementById('voice-next-btn').disabled = (index === allVoiceNotes.length - 1);
}

function nextVoice() {
    if (currentVoiceIndex < allVoiceNotes.length - 1) {
        currentVoiceIndex++;
        renderVoiceNote(currentVoiceIndex, 'next');
    }
}

function prevVoice() {
    if (currentVoiceIndex > 0) {
        currentVoiceIndex--;
        renderVoiceNote(currentVoiceIndex, 'prev');
    }
}

fetchVoiceNotes();
function checkCompatibility() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    const resultArea = document.getElementById('result-area');
    const percentNum = document.getElementById('percent-num');
    const progressCircle = document.getElementById('circle-progress');
    const msg = document.getElementById('compatibility-msg');

    if (name1 === "" || name2 === "") {
        alert("দয়া করে নাম দুটি লিখুন!");
        return;
    }

    // লজিক চেক: ইয়াছিন কবির এবং রুমী/সাইফা/সাইমা
    const isYeasin = /yeasin|kabir|ইয়াছিন|কবির/.test(name1);
    const isRumi = /rumi|saifa|saima|রুমী|সাইফা|সাইমা/.test(name2);

    resultArea.style.display = "block";
    gsap.to(resultArea, { opacity: 1, y: 0, duration: 1 });

    let finalPercent = 0;
    let message = "";

    if (isYeasin && isRumi) {
        finalPercent = 100;
        message = "You are made for each other! Soulmates forever. ❤️";
    } else {
        // অন্যদের জন্য ২০% থেকে ৪০% এর মধ্যে একটি র‍্যান্ডম রেজাল্ট
        finalPercent = Math.floor(Math.random() * 21) + 20; 
        message = "Good match, but not quite the perfect destiny.";
    }

    // এনিমেশন দিয়ে পার্সেন্টেজ বাড়ানো
    let currentPercent = 0;
    let interval = setInterval(() => {
        if (currentPercent >= finalPercent) {
            clearInterval(interval);
        } else {
            currentPercent++;
            percentNum.innerText = currentPercent;
            progressCircle.setAttribute('stroke-dasharray', `${currentPercent}, 100`);
        }
    }, 20);

    msg.innerText = message;
}

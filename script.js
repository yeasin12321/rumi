// 1. Interactive Starfield (Canvas)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w, h, particles;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    let numStars = window.innerWidth < 768 ? 40 : 120; 
    
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
    ctx.fillStyle = 'rgba(212, 175, 55, 0.8)'; 
    
    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        
        if(p.x < 0 || p.x > w) p.dx *= -1;
        if(p.y < 0 || p.y > h) p.dy *= -1;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
    for(let i=0; i<particles.length; i++) {
        for(let j=i+1; j<particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            
            let connectDist = w < 768 ? 70 : 120;
            
            if(dist < connectDist) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(drawStars);
}

window.addEventListener('resize', initCanvas);
initCanvas();
drawStars();

// 2. GSAP Scroll Animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.memory-card').forEach(card => {
    gsap.to(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 85%", 
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// 3. Typewriter Effect
const poem = `"প্রিয়,

তুমি কি জানো আমি তোমাকে কতটা ভালোবাসি? মাঝে মাঝে মনে হয়, আমার এই ভালোবাসার গভীরতা মাপার মতো কোনো মাপকাঠি এই পৃথিবীতে নেই। যখন প্রথম তোমাকে দেখেছিলাম, তখন থেকেই আমার জীবনের গল্পটা বদলে গেছে। তোমার ওই মিষ্টি হাসি আমার সব দুঃখ ভুলিয়ে দেওয়ার জন্য যথেষ্ট। আমার প্রতিটি চিন্তায়, প্রতিটি কামনায় শুধু তোমারই নাম মিশে থাকে।

সারাদিনের ক্লান্তি শেষে যখন তোমার সাথে কথা বলি, তখন মনে হয় আমি পৃথিবীর সবথেকে সুখী মানুষ। তোমার হাত ধরে বাকিটা জীবন পার করে দেওয়ার স্বপ্ন আমি প্রতিদিন দেখি। তুমি শুধু আমার ভালোবাসাই নও, তুমি আমার বেঁচে থাকার প্রেরণা। মাঝে মাঝে আমরা ঝগড়া করি, অভিমান করি, কিন্তু দিনশেষে আমার সবটুকু শান্তি শুধু তোমাকেই ঘিরে।

আমি কথা দিচ্ছি, পরিস্থিতির যাই হোক না কেন, আমি কখনও তোমার হাত ছাড়ব খন তুমি পাশে থাকো, তখন মনে হয় আমি যেকোনো বাধা জয় করতে পারব। আমার অন্ধকার জীবনে তুমি হলে এক টুকরো উজ্জ্বল আলো। তোমাকে ছাড়া একটা মুহূর্ত কাটানোও এখন আমার কাছে অনেক কঠিন মনে হয়।

জানি না ভাগ্যে কী আছে, তবে আমি সৃষ্টিকর্তার কাছে প্রতিবার শুধু তোমাকেই চাই। তোমার চোখে যে মায়া আছে, তাতে আমি বারবার হার মানতে রাজি। তুমি আমার জীবনের সেই শ্রেষ্ঠ উপহার, যা আমি সারাজীবন আগলে রাখতে চাই। আমার ভালোবাসা তোমার জন্য কোনোদিনও কমবে না, বরং সময়ের সাথে সাথে তা আরও গভীর হবে।

আমি তোমাকে কতটা ভালোবাসি তা হয়তো ভাষায় বলে বোঝানো সম্ভব নয়। শুধু এটুকুই বলব, আমার শেষ নিঃশ্বাস পর্যন্ত তুমিই হবে আমার একমাত্র আপনজন। ভালো থেকো আমার প্রিয় মানুষটি, সবসময় আমার হৃদয়ের খুব কাছাকাছি থেকো। আমি তোমাকে অনেক অনেক বেশি ভালোবাসি।"`;

let i = 0;
const speed = 50; 
const typeTarget = document.getElementById("typewriter-text");
let typed = false;

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
        setTimeout(typeWriter, Math.random() * speed + 20);
    }
}

// 4. Vow Section Animation
gsap.from(".vow-container", {
    scrollTrigger: {
        trigger: ".vow-section",
        start: "top 80%",
    },
    opacity: 0,
    scale: 0.9,
    duration: 1.5,
    ease: "power2.out"
});

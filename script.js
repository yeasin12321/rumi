// 1. Interactive Starfield (Canvas)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w, h, particles;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    let numStars = window.innerWidth < 768 ? 50 : 150;
    
    for (let i = 0; i < numStars; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
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
            
            if(dist < 100) {
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
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// 3. Typewriter Effect
const poem = `"প্রিয় রুমি,

জানি না কতটা ভালোবাসলে ভালোবাসা পূর্ণ হয়, তবে আমি তোমাকে আমার সবটুকু দিয়ে ভালোবাসি। আমার প্রতিটা নিশ্বাস, প্রতিটা ভাবনা শুধু তোমাকে ঘিরে।

তুমি আমার সুখ, আমার শান্তি, আমার সব অভিমান আর ভালোবাসার ঠিকানা। সারাজীবন এভাবেই থেকো আমার হয়ে।

I Love You, Rumi ❤️."`;

let i = 0;
const speed = 50; 
const typeTarget = document.getElementById("typewriter-text");
let typed = false;

ScrollTrigger.create({
    trigger: ".poetry-section",
    start: "top 60%",
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
        setTimeout(typeWriter, Math.random() * speed + 30);
    }
}

// 4. Golden Envelope Toggle
function toggleEnvelope() {
    const env = document.getElementById('envelope');
    env.classList.toggle('open');
}

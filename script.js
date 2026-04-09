// 1. Interactive Starfield (Canvas)
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let w, h, particles;

function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    
    // মোবাইলে পারফরম্যান্স ঠিক রাখতে তারার সংখ্যা কমিয়ে দেওয়া হলো
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
            
            // মোবাইলের জন্য দূরত্ব ক্যালকুলেশন অপ্টিমাইজ করা
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
            start: "top 85%", // মোবাইলে একটু আগে ট্রিগার হবে
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// 3. Typewriter Effect
const poem = `তোমার সাথে সন্ধ্যেবেলায়
ছাদে বসে হাওয়া খাবো।
সে কথা থাক বা না থাক,
আকাশের দিকে তাকিয়ে
তারাদের নিশ্চুপ কোলাহল শুনবো।

আমি গুনগুন করে গান গাইবো,
তুমি আস্তে করে আলতো ছোঁয়ায়
মাথাটা আমার কাঁধে রেখে-
আমার সাথে সুর মেলাবে।

তখন তুমি না হয় আলিংগনে
আমার বুকের ধুকপুকানি শুনবে,
আর আমি তোমার শ্বাস গুনবো।
তাও যদি দূরত্ব না দূর হয়,
চোখে চোখ রেখে
সেটাও মিটিয়ে দেবো।

ব্যাস, এরকম একটা সন্ধ্যেবেলা চাই,
আর আমার পাশে শুধু তোমায়।।`;

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

// 4. Golden Envelope Toggle (Touch Friendly)
function toggleEnvelope() {
    const env = document.getElementById('envelope');
    env.classList.toggle('open');
}

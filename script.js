/* Una rosa para Siomara */
'use strict';

const PERSONALIZACION = {
    titulo: 'Para Siomara ❤️',
    texto: 'Quiero que sepas lo especial que eres para mí. Cada día a tu lado es un regalo y, aunque esta rosa sea digital, representa una pequeña parte de todo el amor que siento por ti.',
    firma: 'Tu gordito bello'
};

const $ = id => document.getElementById(id);
const scene = document.querySelector('.scene');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Pétalos (dibujo) ---------- */
function makePetals() {
    const petals = $('petals');

    petals.innerHTML = '';

    // Las capas se dibujan desde afuera hacia adentro.
    const layers = [
        {
            n: 9,
            w: 78,
            h: 112,
            scale: 0.88,
            color: '#8f0928',
            stroke: '#d92b50',
            offset: 0
        },
        {
            n: 8,
            w: 68,
            h: 100,
            scale: 0.78,
            color: '#bd1238',
            stroke: '#f34b6c',
            offset: 22
        },
        {
            n: 7,
            w: 54,
            h: 83,
            scale: 0.68,
            color: '#df234b',
            stroke: '#ff7189',
            offset: 5
        },
        {
            n: 6,
            w: 39,
            h: 65,
            scale: 0.55,
            color: '#ed4161',
            stroke: '#ff91a3',
            offset: 30
        },
        {
            n: 5,
            w: 27,
            h: 47,
            scale: 0.45,
            color: '#a90c32',
            stroke: '#fa6681',
            offset: 0
        }
    ];

    let index = 0;

    const svgNS = 'http://www.w3.org/2000/svg';

    layers.forEach((layer, layerIndex) => {

        for (let i = 0; i < layer.n; i++) {

            const angle =
                (360 / layer.n) * i + layer.offset;

            const group = document.createElementNS(
                svgNS,
                'g'
            );

            group.setAttribute(
                'transform',
                `translate(250 245) rotate(${angle}) scale(.03)`
            );

            group.style.opacity = '0';

            // Forma curva y redondeada del pétalo.
            const shape = document.createElementNS(
                svgNS,
                'path'
            );

            const w = layer.w;
            const h = layer.h;

            const d = `
                M 0 0
                C ${-w * 0.65} ${-h * 0.12},
                  ${-w * 1.05} ${-h * 0.55},
                  ${-w * 0.68} ${-h * 0.88}

                C ${-w * 0.38} ${-h * 1.16},
                  ${-w * 0.08} ${-h * 0.91},
                  0 ${-h * 0.77}

                C ${w * 0.08} ${-h * 0.91},
                  ${w * 0.38} ${-h * 1.16},
                  ${w * 0.68} ${-h * 0.88}

                C ${w * 1.05} ${-h * 0.55},
                  ${w * 0.65} ${-h * 0.12},
                  0 0 Z
            `;

            shape.setAttribute('d', d);
            shape.setAttribute('fill', layer.color);
            shape.setAttribute('stroke', layer.stroke);
            shape.setAttribute('stroke-width', '1.8');
            shape.setAttribute('stroke-linejoin', 'round');

            group.appendChild(shape);

            // Brillo suave para dar volumen al pétalo.
            const highlight = document.createElementNS(
                svgNS,
                'path'
            );

            highlight.setAttribute(
                'd',
                `M 0 -${h * 0.12}
                 C ${-w * 0.25} -${h * 0.48},
                   ${-w * 0.12} -${h * 0.76},
                   0 -${h * 0.84}`
            );

            highlight.setAttribute('fill', 'none');
            highlight.setAttribute(
                'stroke',
                'rgba(255,210,220,0.38)'
            );
            highlight.setAttribute('stroke-width', '2.2');
            highlight.setAttribute('stroke-linecap', 'round');

            group.appendChild(highlight);

            petals.appendChild(group);

            group.dataset.delay =
                String(index * 55 + layerIndex * 100);

            group.dataset.angle = String(angle);

            group.dataset.scale = String(layer.scale);

            index++;
        }
    });

    // Centro enrollado de la rosa.
    const center = document.createElementNS(svgNS, 'g');

    center.setAttribute(
        'transform',
        'translate(250 245) scale(.03)'
    );

    center.style.opacity = '0';

    const centerPath = document.createElementNS(
        svgNS,
        'path'
    );

    centerPath.setAttribute(
        'd',
        `
        M 0 12
        C -24 5 -29 -25 -12 -39
        C 4 -53 30 -39 27 -20
        C 25 -5 8 1 0 -9
        C -8 -19 1 -30 12 -25
        C 19 -21 16 -12 10 -12
        C 5 -12 4 -17 8 -18
        `
    );

    centerPath.setAttribute('fill', 'none');
    centerPath.setAttribute('stroke', '#ff8b9f');
    centerPath.setAttribute('stroke-width', '12');
    centerPath.setAttribute('stroke-linecap', 'round');
    centerPath.setAttribute('stroke-linejoin', 'round');

    center.appendChild(centerPath);

    const centerFill = document.createElementNS(
        svgNS,
        'ellipse'
    );

    centerFill.setAttribute('cx', '0');
    centerFill.setAttribute('cy', '-8');
    centerFill.setAttribute('rx', '13');
    centerFill.setAttribute('ry', '18');
    centerFill.setAttribute('fill', '#78051e');

    center.appendChild(centerFill);

    petals.appendChild(center);

    center.dataset.delay = String(index * 55 + 550);
    center.dataset.angle = '0';
    center.dataset.scale = '0.85';
}

/* ---------- Animación de floración ---------- */
let raf = 0, blooming = false;

function bloom() {
    if (blooming) return;
    blooming = true;
    scene.classList.add('blooming');
    $('bloomButton').disabled = true;
    $('stemGroup').style.opacity = '1';

    const items = [...$('petals').children];
    const k = reduceMotion ? 0.15 : 1;
    const dur = 1100 * k;
    const t0 = performance.now();

    function frame(now) {
        const el = now - t0;
        let done = true;
        items.forEach(g => {
            const p = Math.min(Math.max((el - g.dataset.delay * k) / dur, 0), 1);
            if (p < 1) done = false;
            const e = 1 - Math.pow(1 - p, 3);
            const s = g.dataset.scale * (0.03 + 0.97 * e);
            const a = +g.dataset.angle - (1 - e) * 25;
            g.setAttribute('transform', `translate(250 245) rotate(${a}) scale(${s})`);
            g.style.opacity = Math.min(1, p * 2.5);
        });
        $('timer').textContent = `t ${(el / 1000).toFixed(2)}s`;
        if (done) return finish();
        raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    startMusic();
}

function finish() {
    setTimeout(() => {
        if (!blooming) return;
        $('letter').classList.add('show');
        $('letter').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    }, 500);
}

function reset() {
    cancelAnimationFrame(raf);
    blooming = false;
    scene.classList.remove('blooming');
    $('letter').classList.remove('show');
    $('stemGroup').style.opacity = '0';
    $('timer').textContent = 't 00.00s';
    makePetals();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(bloom, 900);
}

/* ---------- Música (Web Audio, original) ---------- */
const PROG = [[220, 261.63, 329.63], [174.61, 220, 261.63], [261.63, 329.63, 392], [196, 246.94, 293.66]];
const PATTERN = [0, 1, 2, 1, 2, 1, 0, 1];
let ctx, master, musicTimer, musicOn = false, step = 0, nextT = 0;

function tone(f, t, dur, vol, type) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master);
    o.start(t); o.stop(t + dur + 0.05);
}

function schedule() {
    while (nextT < ctx.currentTime + 0.8) {
        const chord = PROG[Math.floor(step / 8) % 4], i = step % 8;
        tone(chord[PATTERN[i]] * 2, nextT, 1.3, 0.08, 'triangle');
        if (i === 0) chord.forEach(f => tone(f / 2, nextT, 3.8, 0.05, 'sine'));
        nextT += 0.5; step++;
    }
}

function setMusicUI() {
    const b = $('musicButton');
    b.setAttribute('aria-pressed', String(musicOn));
    b.classList.toggle('playing', musicOn);
    b.textContent = musicOn ? '♫ Pausar música' : '♫ Activar música romántica';
}

async function startMusic() {
    if (musicOn) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0;
        master.connect(ctx.destination);
    }
    musicOn = true; setMusicUI();
    try { await ctx.resume(); } catch (e) { }
    nextT = ctx.currentTime + 0.1;
    master.gain.setTargetAtTime(0.8, ctx.currentTime, 0.5);
    clearInterval(musicTimer);
    musicTimer = setInterval(schedule, 200);
}

function stopMusic() {
    if (!musicOn) return;
    musicOn = false; setMusicUI();
    clearInterval(musicTimer);
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    setTimeout(() => { if (!musicOn) ctx.suspend(); }, 1500);
}

/* ---------- Partículas de fondo ---------- */
const cv = $('stars'), c2 = cv.getContext('2d');
let W = 0, H = 0;
const parts = Array.from({ length: 70 }, () => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4,
    s: Math.random() * 0.0003 + 0.0001, a: Math.random() * 6.28
}));

function resize() {
    const d = window.devicePixelRatio || 1;
    W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d;
    c2.setTransform(d, 0, 0, d, 0, 0);
}

function drawStars(t) {
    c2.clearRect(0, 0, W, H);
    parts.forEach(p => {
        p.y -= p.s * (reduceMotion ? 0.2 : 1);
        if (p.y < 0) { p.y = 1; p.x = Math.random(); }
        c2.fillStyle = `rgba(255,160,180,${0.25 + 0.4 * Math.sin(t / 900 + p.a)})`;
        c2.beginPath();
        c2.arc(p.x * W, p.y * H, p.r, 0, 6.283);
        c2.fill();
    });
    requestAnimationFrame(drawStars);
}

/* ---------- Inicio ---------- */
$('letterTitle').textContent = PERSONALIZACION.titulo;
$('letterText').textContent = PERSONALIZACION.texto;
document.querySelector('.signature').innerHTML = '';
document.querySelector('.signature').append(PERSONALIZACION.firma + ' ');
const heart = document.createElement('span');
heart.textContent = '♥';
document.querySelector('.signature').append(heart);

resize();
addEventListener('resize', resize);
requestAnimationFrame(drawStars);
makePetals();

$('bloomButton').addEventListener('click', bloom);
$('againButton').addEventListener('click', reset);
$('musicButton').addEventListener('click', () => musicOn ? stopMusic() : startMusic());

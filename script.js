const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.14});
reveals.forEach(el=>observer.observe(el));
const musicBtn=document.getElementById('musicBtn'); let playing=false;
musicBtn.addEventListener('click',()=>{playing=!playing;musicBtn.querySelector('span').textContent=playing?'♫':'♪';musicBtn.querySelector('b').textContent=playing?'正在播放我们的歌':'播放我们的歌';musicBtn.classList.toggle('playing',playing)});

const canvas=document.getElementById('fireworks');
const ctx=canvas.getContext('2d'); let particles=[]; let fireworksRunning=false;
function resizeFireworks(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}
addEventListener('resize',resizeFireworks);resizeFireworks();
function burst(x,y,color,giant=false){for(let i=0;i<(giant?110:48);i++){const a=Math.PI*2*i/48+Math.random()*.12;const speed=giant?(3+Math.random()*7):(2+Math.random()*4);particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:1,size:1+Math.random()*2,color})}}
function animateFireworks(){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.055;p.vx*=.985;p.life-=.018;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,p.size,0,Math.PI*2);ctx.fill()});ctx.globalAlpha=1;if(particles.length||fireworksRunning)requestAnimationFrame(animateFireworks)}
const modal=document.getElementById('surpriseModal');
document.getElementById('surpriseBtn').addEventListener('click',()=>{fireworksRunning=true;const colors=['#ff5f6d','#ffc371','#fff275','#7ee8fa','#caffbf','#ffffff'];let n=0;const timer=setInterval(()=>{for(let i=0;i<3;i++)burst(innerWidth*(.06+Math.random()*.88),innerHeight*(.06+Math.random()*.5),colors[n++%colors.length],true)},180);setTimeout(()=>{clearInterval(timer);fireworksRunning=false;modal.classList.add('show');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open')},5000);animateFireworks()});
function closeSurprise(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
document.getElementById('closeSurprise').addEventListener('click',closeSurprise);
modal.querySelector('.surprise-backdrop').addEventListener('click',closeSurprise);
addEventListener('keydown',e=>{if(e.key==='Escape')closeSurprise()});




const startDate = new Date('2024-02-14T00:00:00+08:00');
const daysCount = document.getElementById('daysCount');
function updateDays(){const now=new Date();const diff=Math.max(0,Math.floor((now-startDate)/86400000));daysCount.textContent=diff.toLocaleString('zh-CN');}
updateDays();setInterval(updateDays,60000);

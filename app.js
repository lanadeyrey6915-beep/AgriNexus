const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const toast=(msg="DEMO DATA UPDATED ✳")=>{const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)};
document.addEventListener("mousemove",e=>{const g=$("#cursorGlow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px"});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
$$(".section-pad,.section-head,.system-card,.extra-tile,.lab-console,.data-panel,.control-card,.vision-content,.connect-grid").forEach(el=>{el.classList.add("reveal");observer.observe(el)});
function tick(){const d=new Date();$("#clock").textContent=d.toLocaleTimeString("en-IN",{hour12:false})}tick();setInterval(tick,1000);
const systems={
soil:{n:"01 / BELOW THE SURFACE",t:"SOIL INTELLIGENCE",d:"The soil layer brings together moisture sensing and NPK information to help build a picture of field conditions. The planned system uses soil moisture sensing and an NPK sensor.",s:["SOIL MOISTURE SENSOR","NPK SENSOR","ARDUINO / ESP32 LINK","FIELD CONDITION VIEW"]},
climate:{n:"02 / THE ATMOSPHERE",t:"CLIMATE STATION",d:"A compact climate station observes temperature, humidity and air-quality indicators around the field. It helps make environmental conditions visible.",s:["DHT22 TEMPERATURE + HUMIDITY","MQ-135 AIR QUALITY SENSOR","LIVE-STYLE CLIMATE PANEL","TREND VISUALISATION"]},
water:{n:"03 / EVERY DROP",t:"WATER WATCH",d:"The water module presents a turbidity-monitoring concept and a controlled pump pathway. The interface can later receive actual sensor readings and relay status.",s:["TURBIDITY SENSOR","5V RELAY MODULE","WATER PUMP","QUALITY STATUS DISPLAY"]},
bot:{n:"04 / FIELD MOBILITY",t:"AGRI ROVER",d:"The four-wheel rover concept combines a motor chassis with obstacle sensing and a camera module for field observation. These controls currently move only the on-screen simulator.",s:["4-WHEEL CHASSIS + 4 MOTORS","L298N MOTOR DRIVER","HC-SR04 OBSTACLE SENSOR","ESP32-CAM"]},
drone:{n:"05 / THE BIG PICTURE",t:"DRONE OBSERVATION",d:"The aerial layer represents crop and field observation from above. It can complement ground-level sensor information with visual field surveys.",s:["AERIAL FIELD OBSERVATION","CROP MONITORING CONCEPT","FIELD IMAGE COLLECTION","FUTURE DATA INTEGRATION"]},
vision:{n:"06 / LOOK CLOSER",t:"CROP VISION AI",d:"The crop-vision area is designed for image capture and future AI-assisted crop analysis. Uploading a photo here previews it locally; it does not diagnose disease.",s:["ESP32-CAM IMAGE CAPTURE","CROP PHOTO PREVIEW","AI ANALYSIS CONNECTION PLANNED","NO AUTOMATIC DIAGNOSIS IN DEMO"]}
};
$$(".system-card").forEach(card=>card.addEventListener("click",()=>{const x=systems[card.dataset.system];$("#modalKicker").textContent=x.n;$("#modalTitle").textContent=x.t;$("#modalDescription").textContent=x.d;$("#modalSpecs").innerHTML=x.s.map(v=>`<span>${v}</span>`).join("");$("#systemModal").classList.add("open")}));
function closeModal(){$("#systemModal").classList.remove("open")}$("#modalClose").addEventListener("click",closeModal);$("#systemModal").addEventListener("click",e=>{if(e.target.id==="systemModal")closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function newData(){const m=35+Math.floor(Math.random()*55),t=(24+Math.random()*10).toFixed(1),h=45+Math.floor(Math.random()*45);$("#moistureValue").textContent=m;$("#moistureBar").style.width=m+"%";$("#tempValue").textContent=t;$("#humidityValue").textContent=h;toast("NEW FIELD CONDITIONS GENERATED ✳")}
$("#refreshData").addEventListener("click",newData);$("#randomizeData").addEventListener("click",newData);
const rover=$("#roverMini");let angle=0;$$("[data-move]").forEach(b=>b.addEventListener("click",()=>{const d=b.dataset.move;let x=0,y=0;if(d==="up")y=-18;if(d==="down")y=18;if(d==="left")x=-22;if(d==="right")x=22;if(d==="stop"){rover.style.transform="translate(0,0)";$("#roverStatus").textContent="Rover stopped · simulator";return}rover.style.transform=`translate(${x}px,${y}px) rotate(${angle+=d==="left"?-8:d==="right"?8:0}deg)`;$("#roverStatus").textContent=`Virtual rover moved ${d} · no hardware command sent`}));
$("#pumpToggle").addEventListener("click",()=>{const on=$("#pumpToggle").classList.toggle("on");$("#pumpToggle").setAttribute("aria-pressed",on);$(".water-control").classList.toggle("active",on);$("#pumpStatus").textContent=on?"Pump simulation is ON · virtual flow":"Pump simulation is OFF";toast(on?"VIRTUAL PUMP ON":"VIRTUAL PUMP OFF")});
$("#turbiditySlider").addEventListener("input",e=>{const v=+e.target.value;$("#turbidityValue").textContent=v;$("#waterStatus").textContent=v<30?"Illustrative reading: relatively clear":v<65?"Illustrative reading: moderate cloudiness":"Illustrative reading: high turbidity indicator"});
$("#cropUpload").addEventListener("change",e=>{const f=e.target.files[0];if(!f)return;const url=URL.createObjectURL(f);$("#cropPreview").src=url;$("#previewWrap").classList.add("show");toast("CROP IMAGE PREVIEW LOADED")});
$("#connectBtn").addEventListener("click",()=>{const modal=$("#systemModal");$("#modalKicker").textContent="05 / PEOPLE FIRST";$("#modalTitle").textContent="FARMER CONNECT";$("#modalDescription").textContent="The proposed farmer connection layer combines a simple phone-friendly portal with community access options and a pathway to agricultural support offices. A real office connection requires a verified partner, backend and permissions.";$("#modalSpecs").innerHTML=["PHONE-FRIENDLY PORTAL","COMMUNITY KIOSK CONCEPT","AGRICULTURE OFFICE LINK","ACCESSIBLE INFORMATION"].map(v=>`<span>${v}</span>`).join("");modal.classList.add("open")});
$("#menuBtn").addEventListener("click",()=>{const nav=$(".topbar nav");if(innerWidth<=800){nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="81px";nav.style.left="0";nav.style.right="0";nav.style.padding="25px";nav.style.background="#151922";nav.style.flexDirection="column";nav.style.gap="22px"}else $("#systems").scrollIntoView({behavior:"smooth"})});

// Cinematic cursor interaction: parallax, 3D tilt and magnetic controls.
(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!finePointer || reduceMotion) return;
  let frame = 0, px = innerWidth / 2, py = innerHeight / 2;
  const glow = document.querySelector('#cursorGlow');
  const hero = document.querySelector('.hero-art');
  const heroImage = document.querySelector('.hero-image');
  const tiltTargets = document.querySelectorAll('.system-card,.extra-tile,.control-card');
  const magneticTargets = document.querySelectorAll('.round-link,.cream-button,.outline-button,.menu-btn,.data-actions button');

  function renderPointer(){
    frame = 0;
    document.documentElement.style.setProperty('--pointer-x', `${px}px`);
    document.documentElement.style.setProperty('--pointer-y', `${py}px`);
    if(hero){
      const r=hero.getBoundingClientRect();
      const inside=py>=r.top-100 && py<=r.bottom+100;
      if(inside){
        const nx=(px-(r.left+r.width/2))/(r.width/2);
        const ny=(py-(r.top+r.height/2))/(r.height/2);
        hero.style.setProperty('--hero-tilt-x', `${-ny*2.2}deg`);
        hero.style.setProperty('--hero-tilt-y', `${nx*2.8}deg`);
        hero.style.setProperty('--local-x', `${Math.max(0,Math.min(100,(px-r.left)/r.width*100))}%`);
        hero.style.setProperty('--local-y', `${Math.max(0,Math.min(100,(py-r.top)/r.height*100))}%`);
        if(heroImage) heroImage.style.transform=`scale(1.08) translate3d(${-nx*13}px,${-ny*10}px,0)`;
      } else {
        hero.style.setProperty('--hero-tilt-x','0deg');hero.style.setProperty('--hero-tilt-y','0deg');
        if(heroImage)heroImage.style.transform='';
      }
    }
  }
  window.addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(!frame)frame=requestAnimationFrame(renderPointer)},{passive:true});

  tiltTargets.forEach(el=>{
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(), nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--tilt-x',`${-ny*8}deg`);el.style.setProperty('--tilt-y',`${nx*9}deg`);
    });
    el.addEventListener('pointerleave',()=>{el.style.setProperty('--tilt-x','0deg');el.style.setProperty('--tilt-y','0deg')});
  });
  magneticTargets.forEach(el=>{
    el.classList.add('magnetic');
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect(), dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
      el.style.transform=`translate(${dx*.12}px,${dy*.16}px)`;
    });
    el.addEventListener('pointerleave',()=>{el.style.transform=''});
  });
})();


// Scroll-linked cinematic particle transformation, built into the existing visual identity.
(() => {
  const section=document.querySelector('#nexusFilm'), canvas=document.querySelector('#filmCanvas');
  const video=document.querySelector('#filmVideo');
  if(!section||!canvas)return;
  const ctx=canvas.getContext('2d'); if(!ctx)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w=0,h=0,dpr=1,particles=[],progress=0,raf=0;
  const rand=(a,b)=>a+Math.random()*(b-a);
  function resize(){dpr=Math.min(devicePixelRatio||1,1.7);w=canvas.clientWidth;h=canvas.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:560},(_,i)=>({a:Math.random()*Math.PI*2,spread:rand(.15,1),speed:rand(.65,1.35),size:rand(.6,2.6),phase:rand(0,Math.PI*2),depth:rand(.45,1),hue:Math.random()<.72?rand(265,300):rand(28,42)}));draw();}
  function smooth(a,b,x){const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)}
  function draw(){raf=0;ctx.clearRect(0,0,w,h);const cx=w*.68,cy=h*.51,base=Math.min(w,h)*.34;const burst=smooth(.18,.57,progress),settle=smooth(.68,.98,progress);const spread=base*(.12+burst*.95-settle*.2);const core=1-burst*.34+settle*.22;
    // Soft luminous core, changing from a compact seed into a bright energy bloom and back into a field-world.
    const glow=ctx.createRadialGradient(cx,cy,2,cx,cy,base*(.55+burst*.8));glow.addColorStop(0,`rgba(233,167,91,${.12+burst*.08})`);glow.addColorStop(.35,`rgba(143,91,190,${.13+burst*.17})`);glow.addColorStop(1,'rgba(17,20,27,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    // Fine orbital curves gain width as the object expands.
    ctx.save();ctx.translate(cx,cy);ctx.rotate(progress*1.1);for(let j=0;j<4;j++){ctx.beginPath();ctx.ellipse(0,0,base*(.23+j*.13+burst*.22),base*(.09+j*.055+burst*.08),j*.22,0,Math.PI*2);ctx.strokeStyle=`rgba(233,167,91,${.12+burst*.08})`;ctx.lineWidth=1;ctx.stroke();}ctx.restore();
    for(const p of particles){const wave=1+Math.sin(progress*7+p.phase)*.035;let r=spread*p.spread*p.speed*wave;const twist=progress*1.8+p.phase*.05;let x=cx+Math.cos(p.a+twist)*r*p.depth;let y=cy+Math.sin(p.a+twist)*r*.72*p.depth;
      if(progress>.7){const row=(p.a%(Math.PI*2))/(Math.PI*2);const fieldX=(row-.5)*base*2.2;const fieldY=Math.sin(row*18+progress*4)*base*.17;const mix=settle*.72;x=x*(1-mix)+(cx+fieldX)*mix;y=y*(1-mix)+(cy+fieldY)*mix;}
      const alpha=.25+.7*(1-p.spread*.55);ctx.beginPath();ctx.fillStyle=`hsla(${p.hue},${p.hue>200?58:70}%,${p.hue>200?73:68}%,${alpha})`;ctx.shadowBlur=p.size*5;ctx.shadowColor=ctx.fillStyle;ctx.arc(x,y,p.size*(.65+burst*.45),0,Math.PI*2);ctx.fill();
    }ctx.shadowBlur=0;
    // Faceted central seed: its silhouette opens into a radial crystal before settling into a glowing core.
    const radius=base*.19*core;ctx.save();ctx.translate(cx,cy);ctx.rotate(-progress*1.7);for(let k=0;k<9;k++){const a=k*Math.PI*2/9;const b=(k+1)*Math.PI*2/9;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(a)*radius*(1+burst*.65),Math.sin(a)*radius*(1+burst*.65));ctx.lineTo(Math.cos((a+b)/2)*radius*1.55*(1+burst*.5),Math.sin((a+b)/2)*radius*1.55*(1+burst*.5));ctx.lineTo(Math.cos(b)*radius*(1+burst*.65),Math.sin(b)*radius*(1+burst*.65));ctx.closePath();ctx.fillStyle=`hsla(${270+k*3},55%,${35+k*2}%,${.18+burst*.12})`;ctx.strokeStyle='rgba(226,194,235,.34)';ctx.lineWidth=1;ctx.fill();ctx.stroke();}const cg=ctx.createRadialGradient(-radius*.3,-radius*.35,2,0,0,radius*1.4);cg.addColorStop(0,'rgba(255,238,205,.95)');cg.addColorStop(.25,'rgba(233,167,91,.8)');cg.addColorStop(.7,'rgba(114,83,145,.78)');cg.addColorStop(1,'rgba(27,25,40,.12)');ctx.beginPath();ctx.arc(0,0,radius*(.78+burst*.12),0,Math.PI*2);ctx.fillStyle=cg;ctx.fill();ctx.restore();
    // Horizon lines resolve the burst into a cultivated field near the end of the sequence.
    if(progress>.76){const a=smooth(.76,1,progress);ctx.save();ctx.globalAlpha=a*.45;ctx.strokeStyle='#8a9b68';ctx.lineWidth=1;for(let i=-5;i<=5;i++){ctx.beginPath();ctx.moveTo(cx+i*base*.1,cy+base*.38);ctx.quadraticCurveTo(cx+i*base*.24,cy+base*.53,cx+i*base*.5,cy+base*.92);ctx.stroke();}ctx.restore();}
  }
  function update(){const r=section.getBoundingClientRect(),travel=Math.max(1,section.offsetHeight-innerHeight);progress=Math.max(0,Math.min(1,-r.top/travel));if(reduced)progress=0;
    // Scrub the supplied cinematic video directly from scroll progress (never autoplay).
    if(video && Number.isFinite(video.duration) && video.duration>0 && !reduced){const target=progress*Math.max(0,video.duration-0.04);if(Math.abs(video.currentTime-target)>0.045){try{video.currentTime=target;}catch(e){}}}
    const a=1-smooth(.27,.39,progress),b=smooth(.31,.43,progress)*(1-smooth(.62,.74,progress)),c=smooth(.65,.78,progress);document.querySelector('.film-copy-one').style.opacity=a;document.querySelector('.film-copy-two').style.opacity=b;document.querySelector('.film-copy-three').style.opacity=c;document.querySelector('#filmProgress').style.width=(progress*100)+'%';document.querySelector('#filmStep').textContent=progress<.33?'01 — ORIGIN':progress<.68?'02 — SIGNAL':'03 — CONNECTION';draw();}
  function onScroll(){if(!raf)raf=requestAnimationFrame(update)}
  if(video){video.pause();video.addEventListener('loadedmetadata',()=>{if(!reduced){const r=section.getBoundingClientRect(),travel=Math.max(1,section.offsetHeight-innerHeight);video.currentTime=Math.max(0,Math.min(1,-r.top/travel))*Math.max(0,video.duration-.04);}}, {once:true});}
  if(reduced){resize();return;}resize();window.addEventListener('resize',resize,{passive:true});window.addEventListener('scroll',onScroll,{passive:true});update();
})();

// Scroll-based depth on the original visual cards; their content and palette stay unchanged.
(() => {const cards=document.querySelectorAll('.system-card,.extra-tile,.control-card');if(!cards.length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('scroll-arrived');io.unobserve(e.target)}}),{threshold:.18});cards.forEach((el,i)=>{el.style.setProperty('--card-delay',`${(i%4)*90}ms`);io.observe(el)});})();

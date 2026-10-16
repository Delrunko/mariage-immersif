/* Socle commun : en-tête, audio global, défilement, particules, animations */
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,D=window.DATA,P=document.body.dataset.page;
const NAV=[['index','Accueil'],['couple','Le couple'],['histoire','Notre histoire'],['galerie','Galerie'],['programme','Programme'],['musiques','Musiques'],['temoins','Nos proches']];
const ph=(p,c='')=>`<figure class="ph ${c}" style="--h:${p.h||0}"><img src="${p.src}" alt="${p.cap}" loading="lazy" onerror="this.remove()"><figcaption>${p.cap}<small>${p.date||''}</small></figcaption></figure>`;
const ss={get:k=>{try{return sessionStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{sessionStorage.setItem(k,v)}catch(e){}}};
/* Audio global (mémorise piste et position entre les pages) */
const audio=new Audio();audio.preload='none';let ti=+ss.get('ti')||0;
const setTrack=(i,play)=>{ti=(i+D.pistes.length)%D.pistes.length;audio.src=D.pistes[ti].src;ss.set('ti',ti);if(play)audio.play().catch(()=>{});W.onTrack&&W.onTrack()};
audio.src=D.pistes[ti].src;audio.currentTime=+ss.get('tm')||0;
audio.addEventListener('timeupdate',()=>ss.set('tm',audio.currentTime));audio.addEventListener('ended',()=>setTrack(ti+1,true));
const toggle=()=>audio.paused?audio.play().catch(()=>{}):audio.pause();
const W=window.W={D,$,$$,ph,RM,audio,toggle,setTrack,get ti(){return ti},pages:{}};
W.boot=function(){
 const env=P=='index'&&!ss.get('env');document.title=`${D.a.nom} & ${D.b.nom} — Mariage`;
 document.body.insertAdjacentHTML('afterbegin',`<div id="pre"><i class="cl"></i><i class="cr"></i><div class="sig"><span>Un site signé</span><b>${D.signature}</b>${env?`<button class="env" aria-label="Ouvrir l'invitation"><u class="seal">${D.a.nom[0]}${D.b.nom[0]}</u></button><small>Cliquez sur le sceau pour ouvrir l'invitation</small>`:''}</div></div>
 <header><a class="logo" href="index.html">${D.a.nom} & ${D.b.nom}</a><nav class="tn">${NAV.map(([h,t])=>`<a href="${h}.html" class="${h==P?'on':''}">${t}</a>`).join('')}</nav><button class="ib" id="mus">♪</button><button class="ib" id="prj">▶<span class="tx"> Projection</span></button><button id="bg" aria-label="Menu" aria-expanded="false"><span></span><span></span></button></header>
 <div id="menu"><nav>${NAV.map(([h,t])=>`<a href="${h}.html" class="${h==P?'on':''}">${t}</a>`).join('')}</nav><p>${D.signature}</p></div>`);
 $('#app').innerHTML=W.pages[P]();
 $('#app').insertAdjacentHTML('afterend',`<footer><small>Cette histoire d'amour a été mise en lumière par</small><b>${D.signature}</b><small>Sites de mariage sur mesure pour les mairies, les familles et les événements</small></footer>`);
 const mb=$('#mus');const upd=()=>{mb.textContent=audio.paused?'♪':'❚❚';document.body.classList.toggle('playing',!audio.paused)};
 mb.onclick=toggle;audio.onplay=audio.onpause=upd;
 $('#prj').onclick=()=>W.projection();
 const bg=$('#bg'),mn=$('#menu'),tg=x=>{mn.classList.toggle('on',x);bg.classList.toggle('on',x);bg.setAttribute('aria-expanded',x);document.body.classList.toggle('menu-open',x)};bg.onclick=()=>tg(!mn.classList.contains('on'));$$('#menu a').forEach((a,k)=>{a.style.transitionDelay=k*.06+'s';a.onclick=()=>tg(false)});addEventListener('keydown',e=>e.key=='Escape'&&tg(false));
 const g=window.gsap;
 if(g&&window.ScrollTrigger&&!RM){
  g.registerPlugin(ScrollTrigger);
  if(window.Lenis){const l=new Lenis({lerp:.09});l.on('scroll',ScrollTrigger.update);g.ticker.add(t=>l.raf(t*1000));g.ticker.lagSmoothing(0)}
  $$('[data-r]').forEach(e=>g.from(e,{y:60,opacity:0,duration:1.4,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%'}}));
  $$('[data-p]').forEach(e=>g.fromTo(e,{yPercent:-12},{yPercent:12,ease:'none',scrollTrigger:{trigger:e.parentNode,scrub:true}}));
  $$('[data-x]').forEach(e=>g.from(e,{x:+e.dataset.x,opacity:0,ease:'power2.out',scrollTrigger:{trigger:e,start:'top 90%',end:'top 35%',scrub:true}}));
  $$('.names span').length&&g.from('.names span',{opacity:0,y:80,rotateX:-60,stagger:.07,duration:1.8,delay:3.1,ease:'power4.out'});
  $$('[data-h]').forEach((e,i)=>g.from(e,{opacity:0,y:30,duration:1.4,delay:3.7+i*.25}));
 }
 W.extras();
 const ev=$('.env');if(ev&&g&&!RM)g.globalTimeline.pause();
 const opn=()=>{const p=$('#pre');if(!p)return;g&&g.globalTimeline.resume();p.classList.add('open');ss.set('env','1');setTimeout(()=>p.remove(),RM?300:3500)};
 if(ev&&!RM)ev.onclick=()=>{ev.classList.add('op');setTimeout(opn,900)};else setTimeout(opn,RM?200:1700);
 W.fx();
};
W.extras=()=>{const g=window.gsap,ok=g&&window.ScrollTrigger&&!RM;
 if(!ok){$$('[data-count]').forEach(e=>e.textContent=e.dataset.count);$$('.hs').forEach(s=>s.classList.add('free'));return}
 document.body.insertAdjacentHTML('beforeend','<div id="sp"></div>');g.to('#sp',{scaleX:1,ease:'none',scrollTrigger:{scrub:.3,start:0,end:'max'}});
 $$('[data-count]').forEach(e=>{const n=+e.dataset.count,o={v:0};g.to(o,{v:n,duration:2.2,ease:'power2.out',scrollTrigger:{trigger:e,start:'top 90%',once:true},onUpdate:()=>e.textContent=Math.round(o.v)})});
 $$('[data-words]').forEach(e=>{e.innerHTML=e.textContent.split(' ').map(w=>`<span>${w}</span>`).join(' ');g.from(e.children,{opacity:.08,y:30,stagger:.1,ease:'none',scrollTrigger:{trigger:e,start:'top 85%',end:'bottom 50%',scrub:true}})});
 $$('.tl').forEach(e=>g.fromTo(e,{'--s':0},{'--s':1,ease:'none',scrollTrigger:{trigger:e,start:'top 70%',end:'bottom 70%',scrub:true}}));
 $$('.hs').forEach(s=>{const t=$('.tr',s);if(innerWidth<900){s.classList.add('free');return}g.to(t,{x:()=>-(t.scrollWidth-innerWidth+48),ease:'none',scrollTrigger:{trigger:s,pin:true,scrub:1,end:()=>'+='+t.scrollWidth,invalidateOnRefresh:true}})});
 if(matchMedia('(hover:hover)').matches){document.body.insertAdjacentHTML('beforeend','<div id="gl"></div>');const x=g.quickTo('#gl','x',{duration:.8}),y=g.quickTo('#gl','y',{duration:.8});addEventListener('mousemove',e=>{x(e.clientX);y(e.clientY)});
  $$('.card,.note,.pers').forEach(e=>{e.onmousemove=ev=>{const r=e.getBoundingClientRect(),a=(ev.clientX-r.left)/r.width-.5,b=(ev.clientY-r.top)/r.height-.5;e.style.transform=`perspective(800px) rotateY(${a*10}deg) rotateX(${-b*10}deg)`};e.onmouseleave=()=>e.style.transform=''})}
};
W.fx=()=>{try{if(!window.THREE||RM)return;const c=document.createElement('canvas');c.id='fx';document.body.append(c);
 const r=new THREE.WebGLRenderer({canvas:c,alpha:true}),s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(60,1,1,1000);cam.position.z=300;
 const n=260,g=new THREE.BufferGeometry(),a=new Float32Array(n*3);for(let i=0;i<n*3;i++)a[i]=(Math.random()-.5)*(i%3==2?300:700);
 g.setAttribute('position',new THREE.BufferAttribute(a,3));
 const pts=new THREE.Points(g,new THREE.PointsMaterial({color:0xc9a86a,size:2.4,transparent:true,opacity:.7,depthWrite:false}));s.add(pts);
 const rs=()=>{r.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};rs();addEventListener('resize',rs);
 (function f(){requestAnimationFrame(f);for(let i=1;i<n*3;i+=3){a[i]-=.25;if(a[i]<-350)a[i]=350}g.attributes.position.needsUpdate=true;pts.rotation.y+=.0006;r.render(s,cam)})()}catch(e){}};
})();
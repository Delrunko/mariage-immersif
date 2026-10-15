/* Sections supplémentaires + page Programme */
(()=>{const{D,$,$$,ph}=W,P=W.pages,add=(k,f)=>{const o=P[k];P[k]=()=>f(o())};
const top=(t,s)=>`<section class="top"><p class="script" data-r>${s}</p><h1 data-r>${t}</h1></section>`;
const big=t=>`<section class="wrap"><p class="big" data-words>${t}</p></section>`;
const stats=a=>`<section class="wrap c"><div class="stats">${a.map(([n,l])=>`<div data-r><b data-count="${n}">0</b>${l}</div>`).join('')}</div></section>`;
const tl=(a,h)=>`<section class="wrap"><h2 data-r style="text-align:center">${h}</h2><div class="tl">${a.map(([t,x,y])=>`<div data-r><b>${t}</b><h3>${x}</h3><p>${y||''}</p></div>`).join('')}</div></section>`;
const hs=(h,i)=>`<section class="hs"><h2 data-r>${h}</h2><div class="tr">${i}</div></section>`;
const nt=(a)=>`<div class="notes">${a.map(([t,x])=>`<div class="note" data-r>${x}<b>${t}</b></div>`).join('')}</div>`;
add('index',s=>s+big('Une journée, mille émotions, une promesse pour la vie.')+stats(D.chiffres)+tl(D.programme.slice(0,4),'Le programme en bref')+`<section class="fin" style="min-height:75vh"><div class="bg" data-p="1" style="background-image:url(${D.img(7)})"></div><div class="hc"><h2 data-r>Le lieu</h2><p class="script" data-r>${D.lieuTxt}</p><a class="btn" href="programme.html">Voir le programme complet</a></div></section>`);
add('couple',s=>s+stats(D.stats2)+`<section class="wrap"><h2 data-r style="text-align:center">Ce qu'ils aiment</h2>${nt(D.passions)}</section>`+hs('Leurs cinq promesses',D.promesses.map((p,i)=>`<div class="pr"><small>Promesse ${i+1}</small>${p}</div>`).join(''))+big('Aimer, c\'est choisir, encore et encore.'));
add('histoire',s=>s+tl(D.frise,'Les dates qui comptent')+hs('Le film des souvenirs',D.photos.map(p=>ph(p)).join(''))+big('Chaque souvenir est une page de plus.'));
add('galerie',s=>s+hs('Le défilé des albums',D.photos.slice().reverse().map(p=>ph(p)).join(''))+big('Chaque image garde un battement de cœur.'));
add('musiques',s=>s+`<section class="wrap"><h2 data-r>Les dédicaces</h2>${nt(D.dedicaces.map(d=>[d[0],'« '+d[1]+' »']))}</section>`+big(`La musique est la langue de ceux qui s'aiment.`));
add('temoins',s=>{setTimeout(book);return s.replace('<section class="fin">',`<section class="wrap"><h2 data-r>Le livre d'or</h2><div class="book" data-r><input id="bn" placeholder="Votre nom" maxlength="40"><textarea id="bm" rows="3" placeholder="Votre message pour les mariés" maxlength="240"></textarea><button class="btn" id="bs">Signer le livre d'or</button></div><div class="notes" id="bl"></div></section><section class="fin">`)});
function book(){let L=[];try{L=JSON.parse(localStorage.getItem('livre')||'[]')}catch(e){}
 const d=()=>$('#bl').innerHTML=L.map(x=>`<div class="note">« ${x.m} »<b>${x.n}</b></div>`).join('')||'<p>Soyez le premier à signer.</p>';d();
 $('#bs').onclick=()=>{const n=$('#bn').value.trim(),m=$('#bm').value.trim();if(!n||!m)return;const e=s=>s.replace(/[<>&"]/g,'');L.unshift({n:e(n),m:e(m)});try{localStorage.setItem('livre',JSON.stringify(L))}catch(x){}$('#bn').value=$('#bm').value='';d()}}
P.programme=()=>top('Le programme','Heure par heure')+tl(D.programme,'Le déroulé de la journée')+`<section class="wrap"><h2 data-r style="text-align:center">Infos pratiques</h2>${nt(D.infos)}</section><section class="wrap c"><h2 data-r>Prêts pour la projection ?</h2><button class="btn" style="color:var(--tx)" onclick="W.projection()">Lancer le mode projection</button></section>`;
})();
/* Animations signature : lentille, album, signature manuscrite */
(()=>{const{D,$,$$,ph}=W,P=W.pages,add=(k,f)=>{const o=P[k];P[k]=()=>f(o())};
const lens=`<section class="wrap c"><h2 data-r>Révélez le souvenir</h2><p data-r>Passez la souris (ou le doigt) sur la photo : le flou devient net.</p><div class="lens" id="lens"><img class="a" src="${D.img(0)}" alt="" onerror="this.remove()"><img class="b" src="${D.img(0)}" alt="Photo du couple" onerror="this.remove()"></div></section>`;
const F=()=>[`<div class="cv"><p class="script">Notre album</p><h3>${D.a.nom} & ${D.b.nom}</h3><small>${D.date}</small></div>`,...D.photos.map(p=>ph(p)),`<div class="cv"><p class="script">${D.sign}</p></div>`];
const c=x=>x.startsWith('<div class="cv')?' k':'';const album=()=>{const f=F();let h='';for(let k=0;k<f.length/2;k++)h+=`<div class="lf" style="z-index:${f.length/2-k}"><div class="f1${c(f[2*k])}">${f[2*k]}</div><div class="f2${c(f[2*k+1])}">${f[2*k+1]}</div></div>`;
 return `<section class="wrap c"><h2 data-r>L'album à feuilleter</h2><p data-r>Cliquez sur une page pour la tourner.</p><div class="bkw"><div class="bk" id="bk" data-s="c"><div class="bd"></div>${h}</div></div><div class="bkc"><button id="bp">‹ Page précédente</button><button id="bx">Page suivante ›</button></div></section>`};
add('galerie',s=>{setTimeout(init);return s+lens+album()});
function init(){const l=$('#lens'),mv=e=>{const r=l.getBoundingClientRect();l.style.setProperty('--x',e.clientX-r.left+'px');l.style.setProperty('--y',e.clientY-r.top+'px')};l.addEventListener('pointermove',mv);l.addEventListener('pointerdown',mv);
 const bk=$('#bk'),L=$$('.lf',bk),N=L.length;let n=0;
 const go=d=>{const m=n+d;if(m<0||m>N)return;if(d>0){const k=n;L[k].style.zIndex=N+1;L[k].classList.add('mv');setTimeout(()=>L[k].classList.remove('mv'),1700);L[k].classList.add('fl');setTimeout(()=>L[k].style.zIndex=k+1,900)}else{const k=n-1;L[k].style.zIndex=N+1;L[k].classList.add('mv');setTimeout(()=>L[k].classList.remove('mv'),1700);L[k].classList.remove('fl');setTimeout(()=>L[k].style.zIndex=N-k,900)}n=m;bk.dataset.s=n==0?'c':n==N?'e':'o'};
 $('#bp').onclick=()=>go(-1);$('#bx').onclick=()=>go(1);L.forEach((e,k)=>e.onclick=()=>go(k==n-1?-1:k==n?1:0))}
add('temoins',s=>{setTimeout(()=>{const g=$('.sg');if(!g)return;const io=new IntersectionObserver(e=>e[0].isIntersecting&&(g.classList.add('go'),io.disconnect()),{threshold:.5});io.observe(g)});
 return s.replace(/<h1 class="names" data-r>[\s\S]*?<\/h1><p data-r>([^<]*)<\/p><p class="script" data-r>[^<]*<\/p>/,`<svg class="sg" viewBox="0 0 1000 300" role="img" aria-label="${D.a.nom} et ${D.b.nom}. ${D.sign}"><text x="500" y="130" font-size="130">${D.a.nom} &amp; ${D.b.nom}</text><text class="s2" x="500" y="250" font-size="64">${D.sign}</text></svg><p data-r>$1</p>`)});
})();
/* Table de polaroïds */
(()=>{const{D,$,$$}=W,P=W.pages,o=P.galerie;
P.galerie=()=>{setTimeout(()=>{const t=$('#tbl');if(!t)return;const io=new IntersectionObserver(e=>{if(e[0].isIntersecting){t.classList.add('go');io.disconnect()}},{threshold:.35});io.observe(t);
 let z=10;$$('.pol',t).forEach(p=>{p.onpointerdown=e=>{p.setPointerCapture(e.pointerId);p.style.zIndex=++z;const sx=e.clientX-p.offsetLeft,sy=e.clientY-p.offsetTop;p.onpointermove=m=>{p.style.left=Math.max(0,Math.min(t.clientWidth-p.offsetWidth,m.clientX-sx))+'px';p.style.top=Math.max(0,Math.min(t.clientHeight-p.offsetHeight,m.clientY-sy))+'px'};p.onpointerup=()=>{p.onpointermove=null}}})});
 const pos=[[4,6,-7],[34,14,5],[63,4,-4],[10,50,6],[42,46,-6],[70,44,4]];
 return o()+`<section class="wrap c"><h2 data-r>La table des souvenirs</h2><p data-r>Déplacez les photos comme sur une vraie table.</p><div class="tbl" id="tbl">${D.photos.filter((_,i)=>i%2==0).map((p,i)=>`<div class="pol" style="left:${pos[i][0]}%;top:${pos[i][1]}%;--r:${pos[i][2]}deg;--d:${i*.25}s"><img src="${p.src}" alt="${p.cap}" loading="lazy" onerror="this.style.visibility='hidden'"><span>${p.cap}</span></div>`).join('')}</div></section>`}})();

(function(){
const DATA='https://raw.githubusercontent.com/mroschost/feira-do-trabalho/main/src/data/news-overrides.json';
const SLUG={aguaQuente:'agua-quente-2026',cruzeiro:'cruzeiro-2025'};
const DIRECT={
'https://soubrasilia.com/feira-trabalho-campo-agua-quente-12-17-maio-2026/':'https://soubrasilia.com/wp-content/uploads/2026/05/feira_trabalho_5439153.jpg',
'https://midialternativa.com.br/cruzeiro-recebe-feira-que-destaca-mulheres-empreendedoras-e-economia-solidaria/':'https://midialternativa.com.br/wp-content/uploads/2025/12/Mulheres-empreendedoras-696x1263.jpg',
'https://www.instagram.com/p/DSS4loMjSgd/':'https://www.instagram.com/p/DSS4loMjSgd/media/?size=l',
'https://www.instagram.com/reel/DSVg-6JjnlH/':'https://www.instagram.com/p/DSVg-6JjnlH/media/?size=l'};
let active=null,gen=0,dataPromise=null,queued=false;
const cache=new Map(),pending=new Map();
function norm(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
function edition(v){v=norm(v);if(v.includes('agua quente'))return'aguaQuente';if(v.includes('cruzeiro'))return'cruzeiro';return null}
function data(){return dataPromise||(dataPromise=fetch(DATA,{cache:'no-store'}).then(r=>{if(!r.ok)throw Error();return r.json()}))}
function abs(v,b){try{return new URL(v,b).href}catch(e){return''}}
function fromHtml(html,base){const d=new DOMParser().parseFromString(html,'text/html');const sels=['meta[property="og:image:secure_url"]','meta[property="og:image"]','meta[name="twitter:image"]','link[rel="image_src"]'];for(const s of sels){const e=d.querySelector(s),v=e&&(e.content||e.href);if(v)return abs(v,base)}for(const s of ['article .wp-post-image','article img','.entry-content img','main img']){const e=d.querySelector(s),v=e&&(e.dataset.src||e.dataset.lazySrc||e.src);if(v)return abs(v,base)}return''}
function wp(link){const u=new URL(link),slug=u.pathname.split('/').filter(Boolean).pop();return fetch(u.origin+'/wp-json/wp/v2/posts?slug='+encodeURIComponent(slug)+'&_embed=1').then(r=>{if(!r.ok)throw Error();return r.json()}).then(a=>{const p=a[0],m=p&&p._embedded&&p._embedded['wp:featuredmedia'],y=p&&p.yoast_head_json&&p.yoast_head_json.og_image;const x=(m&&m[0]&&m[0].source_url)||(p&&p.jetpack_featured_media_url)||(y&&y[0]&&y[0].url);if(!x)throw Error();return x})}
function html(link){return fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(link)).then(r=>{if(!r.ok)throw Error();return r.text()}).then(t=>{const x=fromHtml(t,link);if(!x)throw Error();return x})}
function meta(link){return fetch('https://api.microlink.io/?url='+encodeURIComponent(link)+'&screenshot=false&video=false&audio=false&palette=false').then(r=>{if(!r.ok)throw Error();return r.json()}).then(p=>{const i=p&&p.data&&p.data.image,x=typeof i==='string'?i:i&&i.url;if(!x)throw Error();return x})}
function noembed(link){return fetch('https://noembed.com/embed?url='+encodeURIComponent(link)).then(r=>{if(!r.ok)throw Error();return r.json()}).then(p=>{const x=p.thumbnail_url||p.image;if(!x)throw Error();return x})}
function seq(list){let p=Promise.reject();list.forEach(f=>p=p.catch(f));return p}
function resolve(e){const l=e.link;if(DIRECT[l])return Promise.resolve(DIRECT[l]);if(cache.has(l))return Promise.resolve(cache.get(l));if(pending.has(l))return pending.get(l);const tries=[];if(l.includes('instagram.com'))tries.push(()=>noembed(l));tries.push(()=>wp(l),()=>html(l),()=>meta(l));const p=seq(tries).then(x=>(cache.set(l,x),x)).finally(()=>pending.delete(l));pending.set(l,p);return p}
function entries(raw,key){const a=raw&&Array.isArray(raw[SLUG[key]])?raw[SLUG[key]]:[];return a.filter(x=>x&&x.title&&x.link).slice().reverse()}
function buckets(list){const m=new Map();list.forEach(e=>{const k=norm(e.title);if(!m.has(k))m.set(k,[]);m.get(k).push(e)});return m}
function apply(card,e,g){const img=card.querySelector('img');if(!img||!e)return;img.dataset.sourceArticle=e.link;img.removeAttribute('srcset');resolve(e).then(url=>{if(g!==gen||img.dataset.sourceArticle!==e.link)return;img.onerror=function(){if(this.dataset.proxy==='1')return;this.dataset.proxy='1';this.src='https://images.weserv.nl/?url='+encodeURIComponent(url)+'&w=1200&h=675&fit=cover&output=webp'};img.dataset.proxy='0';img.src=url}).catch(()=>{})}
function patch(){const s=document.querySelector('#noticias');if(!s||!active)return;const g=gen;data().then(raw=>{if(g!==gen||!active)return;const b=buckets(entries(raw,active));s.querySelectorAll('article').forEach(c=>{const h=c.querySelector('h3'),a=b.get(norm(h&&h.textContent))||[],e=a.shift();if(e)apply(c,e,g)})})}
function activate(k){active=k;gen++;if(!k)return;[50,180,500,1200].forEach(t=>setTimeout(patch,t))}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('button'),s=document.querySelector('#noticias');if(b&&s&&s.contains(b))activate(edition(b.textContent))},true);
new MutationObserver(()=>{if(!active||queued)return;queued=true;setTimeout(()=>{queued=false;patch()},100)}).observe(document.documentElement,{childList:true,subtree:true});
function start(){const s=document.querySelector('#noticias');if(!s)return;for(const b of s.querySelectorAll('button')){const k=edition(b.textContent),c=b.getAttribute('class')||'';if(k&&(c.includes('text-white')||c.includes('bg-[#3FA637]'))){activate(k);break}}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
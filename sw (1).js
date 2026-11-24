const V='wol-v2';
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(['./','./index.html'])));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.open(V).then(c=>c.match(e.request).then(r=>{const n=fetch(e.request).then(x=>{c.put(e.request,x.clone());return x}).catch(()=>r||c.match('./index.html'));return r||n})))});

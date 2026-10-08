const CACHE_NAME="inkzone-v15-5-1-shell";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./.nojekyll"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL).catch(()=>{})))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(u.origin===location.origin){
   e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy)).catch(()=>{});return r}).catch(()=>caches.match(e.request)));
 }
});

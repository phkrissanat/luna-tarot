const PREFIX='luna-'+self.registration.scope;
const CACHE=PREFIX+'-95cfd4c6a0a4';
const FILES=["./index-9Keg2uJ6.js","./index-mxSlEeKr.css","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest"];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith(PREFIX+'-')&&key!==CACHE)await caches.delete(key);
 await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  if(event.request.mode==='navigate')return (await cache.match(new URL('./index.html',self.registration.scope)))||fetch(event.request);
  return (await cache.match(event.request))||fetch(event.request);
 })());
});

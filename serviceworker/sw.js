var cacheName='v2';
var cacheFiles=[
    './',
    './index.html',
    './css/style.css',
    'https://fonts.googleapis.com/css?family=Tangerine',
    './js/app.js'
]


self.addEventListener('install',((e)=>{
    console.log("[Service worker] Installed");
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log("[ServiceWorker] Caching cacheFiles" + cache);
            return cache.addAll(cacheFiles);
        })
    )
}));

self.addEventListener('activate',((e)=>{
    console.log("[Service worker] activate");

    e.waitUntil(
        caches.keys().then((cacheNames)=>{
            return Promise.all(cacheNames.map((thisCache)=>{
                if(cacheName != thisCache){
                    console.log('Removing cache files from' + thisCache);
                    return caches.delete(thisCache);    
                }
            }))
        })
    )


}));

self.addEventListener('fetch',((e)=>{
    console.log("[Service worker] fetching",e.request.url);

    e.respondWith(
        caches.match(e.request).then((res)=>{
            if(res){
                console.log('[ServiceWorker] found in cache', e.request.url);
                return res;
            }

            var requestClone = e.request.clone();

            fetch(requestClone)
            .then((res)=>{
                if(!res){
                    console.log('[ServiceWorker] No response from fetch');
                    return res;
                }
                var responseClone = res.clone();
                caches.open(cacheName).then((cache)=>{
                    cache.put(e.request,responseClone);
                    return res;
                })
            })

            return fetch(e.request);
        })
    )

}));

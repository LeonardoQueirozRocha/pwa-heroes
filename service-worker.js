const CACHE_NAME = "Heroes_cache";

const FILES_CACHE = [
    "css/bootstrap.min.css",
    "css/styles.css",
    "css/fonts/Marvel-Bold.eot",
    "css/fonts/Marvel-Bold.ttf",
    "css/fonts/Marvel-Bold.woff",
    "css/fonts/Marvel-Bold.woff2",
    "css/fonts/Marvel-BoldItalic.eot",
    "css/fonts/Marvel-BoldItalic.ttf",
    "css/fonts/Marvel-BoldItalic.woff",
    "css/fonts/Marvel-BoldItalic.woff2",
    "css/fonts/Marvel-Italic.eot",
    "css/fonts/Marvel-Italic.ttf",
    "css/fonts/Marvel-Italic.woff",
    "css/fonts/Marvel-Italic.woff2",
    "css/fonts/Marvel-Regular.eot",
    "css/fonts/Marvel-Regular.ttf",
    "css/fonts/Marvel-Regular.woff",
    "css/fonts/Marvel-Regular.woff2",
    "icons/favicon.ico",
    "img/load.gif",
    "img/logo.png",
    "img/no-img.png",
    "img/offline.png",
    "js/app.js",
    "js/bootstrap.bundle.min.js",
    "offline.html",
];

self.addEventListener('install', (evt) => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Service Worker: rregistrando caches estáticos");
            return cache.addAll(FILES_CACHE);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        caches.keys().then((keylist) => {
            return Promise.all(keylist.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    )
});

self.addEventListener('fetch', (evt) => {

    if (evt.request.mode !== 'navigate') {
        return;
    }

    evt.respondWith(
        fetch(evt.request).catch(() => {
            return caches.open(CACHE_NAME).then((cache) => {
                return cache.match('offline.html');
            });
        })
    );
});
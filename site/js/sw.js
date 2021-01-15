self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('offline').then(function(cache) {
            return cache.addAll([
                '../',
                '../index.html',
                '../offline.html',
                '../manifest.json',
                '../css/main.css',
                '../img/favicon.png',
                '../img/icon.png',
                './services/utils.js',
                './views/components/footer.js',
                './views/components/header.js',
                './pages/about.js',
                './pages/error404.js',
                './pages/hexagram.js',
                './pages/home.js',
                './pages/reading.js',
                './app.js',
                './ranjs.min.js',
                './sketch.js',
                './noisedeck/modules.js',
                './noisedeck/noisedeck.js',
                './noisedeck/palettes.js',
                './sw.js'
            ])
        }).catch(function(err) { 
            console.log(err) 
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).catch(function() {
            return caches.match(event.request)
        })
    )
})
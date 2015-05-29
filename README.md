
cookies-enabler.js
----------------------

Cookies-enabler.js is a easy-to-use pure Javascript solution for preventively blocking third-party cookies installed by js and comply with the EU cookie law.

### Download
Click [here] or ```bower install cookie-enabler```

####  How to install

 1 - Load the script

```
<script src="cookies-enabler.js"></script>
```
2 - Add the class ```"ce-script"``` and ```type="text/plain"``` to scripts that install cookies

```
<script type="text/plain" class="ce-script">
    // GA Demo
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXX-X']);
    _gaq.push(['_trackPageview']);
    ...
</script>

<script type="text/plain" class="ce-script">
    // FB Share Demo
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    ...
</script>
```

For ```iframes```, move the ```src``` in ```data-ce-src``` and add the class ```"ce-iframe"```
```
<iframe class="ce-iframe" data-ce-src="https://player.vimeo.com/video/1084537" width="500" height="281">
```

3 - Initiate the plugin

```
COOKIES_ENABLER.init();
```




--------

####  Default Options

```
scriptClass: 'ce-script',
iframeClass: 'ce-iframe',
acceptClass: 'ce-accept',
dismissClass: 'ce-dismiss',
bannerClass: 'ce-banner',

bannerHTML:
    '<p>This website uses cookies. '
        +'<a href="#" class="ce-accept">'
            +'Enable Cookies'
        +'</a>'
    +'</p>',

eventScroll: false,
scrollOffset: 200,

clickOutside: false,

cookieName: 'ce-cookie',
cookieDuration: '365',

iframesPlaceholder: true,
iframesPlaceholderHTML:
    '<p>To view this content you need to'
        +'<a href="#" class="ce-accept">Enable Cookies</a>'
    +'</p>',
iframesPlaceholderClass: 'ce-iframe-placeholder',

// Callbacks
onEnable: '',
onDismiss: ''
```


----------

[here]:https://github.com/nicholasruggeri/cookies-enabler/archive/master.zip

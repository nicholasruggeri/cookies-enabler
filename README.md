
cookies-enabler.js
----------------------

Cookies-enabler.js is a easy-to-use **pure Javascript** solution for preventively blocking third-party cookies installed by js.


####  How to install

 1 - Load the script

```
<script src="cookies-enabler.js></script>
```
2 - Add the class "ce-elm" and type="text/plain" to scripts that install cookies

```
<script type="text/plain" class="ce-elm">
    // GA Demo
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXX-X']);
    _gaq.push(['_trackPageview']);
    ...
</script>

<script type="text/plain" class="ce-elm">
    // FB Share Demo
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    ...
</script>
```
3 - Initiate the plugin

```
COOKIES_ENABLER.init();
```




--------

####  Options

```
COOKIES_ENABLER.init({
    element: 'ce-elm',               // Default
    bannerHTML: 'This website uses cookies. <a href="#" class="ce-trigger">Enable Cookies</a>',   // Default
    duration: '365',                 // Default
    eventScroll: false               // Default
});
```


----------
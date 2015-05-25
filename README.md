
cookies-enabler.js
----------------------

Cookies-enabler.js is a easy-to-use **pure Javascript** solution for preventively blocking third-party cookies installed by js.


####  How to install

 1 - Load the script

```
<script src="cookies-enabler.js></script>
```
2 - Aggiungi la classe "ce-elm"  e "text/plain" agli script che installano cookies

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
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=1402028420038023";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
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
    trigger: 'ce-trigger',           // Default
    banner: 'ce-banner',             // Default
    textTrigger: 'Enable Cookies',   // Default
    duration: '365',                 // Default
    eventScroll: false               // Default
});
```


----------

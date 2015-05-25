
----------
cookies-enabler.js
----------------------

Cookies-enabler.js is a easy-to-use **pure Javascript** solution

----------

####  How to install

 1 - Load the script

```
<script src="cookies-enabler.js></script>
```

2 - Initiate the plugin

```
COOKIES_ENABLER.init();
```
3 - Aggiungi la classe "ce-elm"  e "text/plain" agli script che installano cookies

```
<script type="text/plain" class="ce-elm">
    // GA Demo
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXX-X']);
    _gaq.push(['_trackPageview']);
    ...
</script>
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
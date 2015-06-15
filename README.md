
cookies-enabler.js
----------------------

Cookies-enabler.js is a easy-to-use pure Javascript solution for preventively blocking third-party cookies installed by js and comply with the EU cookie law.

### Download
Click [here] or ```bower install cookies-enabler```

####  How to install

 1 - Load the script

```
<script src="cookies-enabler.js"></script>
```

2 - Initiate the plugin

```
COOKIES_ENABLER.init( options );
```


####  Default Options

```
scriptClass: 'ce-script',
iframeClass: 'ce-iframe',

acceptClass: 'ce-accept',
dismissClass: 'ce-dismiss',
disableClass: 'ce-disable',

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
onDismiss: '',
onDisable: ''
```
#### Notice Banner

You can customize the placeholder HTML by creating a script tag with the ID ```ce-banner-html```.

```
    <script id="ce-banner-html" type="text/plain">
      <p>
        This websites uses cookies to give you the <i>best</i> possible experience.
      </p>
      <p>
        <a href="#" class="ce-accept">Enable Cookies</a> <a href="#" class="ce-disable">Disable Cookies</a> or <a href="#">Read More</a>
        <a href="#" class="ce-dismiss">X</a>
      </p>
    </script>
```

 You can also set the option  as a  ```string``` containing the HTML:

```
bannerHTML: '<p>This website uses cookies. <a href="#" class="ce-accept">Enable Cookies</a></p>'
```

#### Blocking Cookies from Script Tags

Add the class ```"ce-script"``` and ```type="text/plain"``` to every script tag that installs cookies

```
<script type="text/plain" class="ce-script">
    // GA Demo
    var _gaq = _gaq || [];
    _gaq.push(['_setAccount', 'UA-XXXXX-X']);
    _gaq.push(['_trackPageview']);
</script>

<script type="text/plain" class="ce-script">
    // FB Share Demo
    (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
</script>
```

#### Blocking Cookies from iFrames and img

For ```iframes``` and ```img```, change the ```src``` attribute to ```data-ce-src``` and add the class ```"ce-iframe"```
```
<iframe class="ce-iframe" data-ce-src="https://player.vimeo.com/video/1084537" width="500" height="281">
```

##### iFrames and img Placeholder

You can enable placeholders for blocked iframes and img using the ```iframesPlaceholder``` option:

```
iframesPlaceholder: true
```

Doing so, a custom placeholder for blocked iframes and img will be inserted after the hidden ```iframe``` and ```img``` element.

You can customize the placeholder HTML by creating a script tag with the ID ```ce-iframePlaceholder-html```.

```
<script id="ce-iframePlaceholder-html" type="text/plain">
      <p>This content is not available without cookies.
          <a href="#" class="ce-accept">Enable Cookies</a>
          <a href="#">Read More</a>
      </p>
</script>
```

 You can also set the option  as a  ```string``` containing the HTML:

```
iFramePlaceholderHTML: '<p>This content is not available without cookies. <a href=#" class="ce-accept">Enable Cookies</a>"</p>',
```

#### Triggers

You can choose how to let the user accept or dismiss the cookies.

##### Scroll

This option will enable cookies when the user scrolls a certain amount in any direction.

```
// the cookies will be enabled after the user scrolls 200px
eventScroll: true   // default false
scrollOffset: 200
```

##### Click on any element of the page

This option will enable cookies when the user clicks on any element on the page that doesn't belong to the notice banner or other script-created elements.

```
clickOutside: true  // default false
```

#### DOM Hooks

Adding the ```ce-accept``` class to any element will make it act as an accept button, enabling the cookies on click.

Adding the ```ce-dismiss``` class to any element will make it act as a dismiss button, removing the notice banner on click.

Adding the ```ce-disable``` class to any element will make it act as a disable button, removing the notice banner and disabling cookies on click.

#### Callbacks

You can use the callback options to execute a function when cookies are accepted or the notice banner is dismissed.

```
onEnable: function(){

    console.log('cookies have been enabled');

},
onDismiss: function(){

    console.log('the banner has been dismissed');

},
onDisable: function(){

    console.log('cookies have been disabled');

}
```

#### Problematic Scripts

Some scripts use ```document.write```, that can't be executed asynchronously. 
We added a workaround using [Postscribe]. Change the ```src``` to ```data-ce-src``` and add the class ```ce-script```. Don't forget to download and include [Postscribe].

```

<script data-ce-src="http://pagead2.googlesyndication.com/pagead/show_ads.js" class="ce-script"></script>

<script scr="postscribe.js"></script>
<script src="cookies-enabler.js"></script>

<script>
  
  COOKIES_ENABLER.init();

</script>

```


#### Donations

If you found this script useful, [buy us a beer]!

----------

[here]:https://github.com/nicholasruggeri/cookies-enabler/archive/master.zip
[buy us a beer]:https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=A5FJ9N7B87WLE
[Postscribe]:https://github.com/krux/postscribe

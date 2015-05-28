// Made with milk and cookies by Nicholas Ruggeri and Gianmarco Simone
// https://github.com/nicholasruggeri/cookies-enabler
// https://github.com/nicholasruggeri
// https://github.com/gsimone

window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    'use strict';

    var defaults = {
        scriptClass: 'ce-script',
        iframeClass: 'ce-iframe',
        acceptClass: 'ce-accept',
        dismissClass: 'ce-dismiss',
        bannerClass: 'ce-banner',
        bannerHTML:

            document.getElementById('ce-banner-html') !== null ?

                document.getElementById('ce-banner-html').innerHTML :

                '<p>This website uses cookies. '
                    +'<a href="#" class="ce-accept">'
                    +'Enable Cookies'
                    +'</a>'
                +'</p>',

        eventScroll: true,
        scrollOffset: 200,
        clickOutside: false,
        cookieName: 'ce-cookie',
        cookieDuration: '365',
        iframesPrevent: false,
        iframesPlaceholder: true,
        iframesPlaceholderHTML:

            document.getElementById('ce-iframePlaceholder-html') !== null ?

                document.getElementById('ce-iframePlaceholder-html').innerHTML :

                '<p>To view this content you need to'
                    +'<a href="#" class="ce-accept">Enable Cookies</a>'
                +'</p>',

        iframesPlaceholderClass: 'ce-iframe-placeholder'
    },
    opts, domElmts, start_Y;

    function _extend() {

        var i, key;
        for(i=1; i<arguments.length; i++)
            for(key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];

    };

    function _debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    var handleScroll = function() {

        if (Math.abs( window.pageYOffset - start_Y ) > opts.scrollOffset) enableCookies();

    };

    var bindUI = function() {

        var i,
            accept = domElmts.accept,
            accept_l = accept.length,
            dismiss = domElmts.dismiss,
            dismiss_l = dismiss.length;

        if (opts.eventScroll) {
            window.addEventListener('load', function(){

                start_Y = window.pageYOffset;
                window.addEventListener('scroll', handleScroll );

            });
        }

        if (opts.clickOutside) {
            document.addEventListener("click", function(e){

                if(e.target != domElmts.banner[0]) enableCookies();
            
            });
        }

        for (i = 0; i < accept_l; i++) {

            accept[i].addEventListener("click", enableCookies );

        }

        for (i = 0; i < dismiss_l; i++) {

            dismiss[i].addEventListener("click", banner.dismiss );

        }

    };

    var init = function(options) {

        opts = _extend( {}, defaults, options );

        if (cookie.get() == 'Y') {

            scripts.get();

            iframes.get();

        } else {

            banner.create();

            iframes.hide();

            bindUI();

        }
    };

    var enableCookies = _debounce(function(event) {

        if( typeof event != "undefined" && event.type === 'click' ){

            event.preventDefault();

        }

        if (cookie.get() != 'Y') {

            cookie.set();
            scripts.get();

            iframes.get();
            iframes.removePlaceholders();

            banner.dismiss();

            window.removeEventListener('scroll', handleScroll );

        }

    }, 250, false);

    var banner = (function() {

        function create() {

            var el = '<div class="'+ opts.bannerClass +'">'
                    + opts.bannerHTML
                    +'</div>';

            document.body.insertAdjacentHTML('beforeend', el);

            domElmts = {
                accept:  document.getElementsByClassName(opts.acceptClass),
                banner: document.getElementsByClassName(opts.bannerClass),
                dismiss: document.getElementsByClassName(opts.dismissClass)
            }

        }

        function dismiss(){

            domElmts.banner[0].style.display = 'none';

        }

        return{

            create: create,
            dismiss: dismiss

        }

    })();

    var cookie = (function() {

        function set(){

            var value = "Y",
                date, expires;

            if (opts.cookieDuration) {
                date = new Date();
                date.setTime(date.getTime()+( opts.cookieDuration*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = opts.cookieName +"="+ value+expires +"; path=/";
        }

        function get(){

            var cookies = document.cookie.split(";"),
                l = cookies.length,
                i, x, y;

            for (i = 0; i < l; i++){
                x = cookies[i].substr(0,cookies[i].indexOf("="));
                y = cookies[i].substr(cookies[i].indexOf("=")+1);
                x = x.replace(/^\s+|\s+$/g,"");
                if (x == opts.cookieName) {
                    return unescape(y);
                }
            }

        }

        return{
            set: set,
            get: get
        }

    })();

    var iframes = (function() {

        function makePlaceholder(iframe) {

            var placeholderElement = document.createElement('div');

            placeholderElement.classList.add( opts.iframesPlaceholderClass );

            placeholderElement.innerHTML = opts.iframesPlaceholderHTML;

            iframe.parentNode.insertBefore( placeholderElement, iframe );

        }

        function removePlaceholders() {

            var iframePlaceholders = document.getElementsByClassName( opts.iframesPlaceholderClass ), 
                n = iframePlaceholders.length,
                i;

            for( i = n - 1; i >= 0; i-- ){

                iframePlaceholders[i].remove();

            }

        }

        function hide() {

            var iframes = document.getElementsByClassName( opts.iframeClass ),
                n = iframes.length,
                src, iframe, i;

            for( i = 0; i < n; i++ ){

                iframe = iframes[i];
                iframe.style.display = 'none';

                if( opts.iframesPlaceholder ) makePlaceholder( iframe );

            }

        }

        function get() {

            var iframes = document.getElementsByClassName( opts.iframeClass ),
                n = iframes.length,
                src, iframe, i;

            for( i = 0; i < n; i++ ){

                iframe = iframes[i];

                src = iframe.attributes[ 'data-ce-src' ].value;
                iframe.src = src;
                iframe.style.display = 'block';

            }

        }

        return{
            hide: hide,
            get: get,
            removePlaceholders: removePlaceholders
        }

    })();

    var scripts = (function() {

        function get() {

            var scripts = document.getElementsByClassName( opts.scriptClass ),
                n = scripts.length,
                documentFragment = document.createDocumentFragment(),
                i, y, s, attrib, el;

            for (i = 0; i < n; i++){

                s = document.createElement('script');
                s.type = 'text/javascript';
                for (y = 0; y < scripts[i].attributes.length; y++) {
                    attrib = scripts[i].attributes[y];
                    if (attrib.specified) {
                        if ((attrib.name != 'type') && (attrib.name != 'class')){
                            s.setAttribute(attrib.name, attrib.value);
                        }
                    }
                }
                s.innerHTML = scripts[i].innerHTML;
                documentFragment.appendChild(s);
            }

            document.body.appendChild(documentFragment);

        }

    })();


    return {
        init: init,
        enableCookies: enableCookies,
        dismissBanner: banner.dismiss
    };

}());

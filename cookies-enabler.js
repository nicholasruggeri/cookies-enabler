// Made with milk and cookies by Nicholas Ruggeri and Gianmarco Simone
// https://github.com/nicholasruggeri/cookies-enabler
// https://github.com/nicholasruggeri
// https://github.com/gsimone

window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    'use strict';

    var defaults = {
            scriptClass: 'ce-script',
            iframeClass: 'ce-iframe',
            eventScroll: false,
            bannerHTML: 'This website uses cookies.<a href="#" class="ce-accept">Enable Cookies</a>',
            cookie: {
                name: 'ce-consent',
                duration: '365'
            },
            preventIframes: false,
            acceptClass: 'ce-accept',
            dismissClass: 'ce-dismiss',
            bannerClass: 'ce-banner'

        },
        opts, domElmts;

    function _extend(){

        var i, key;

        for(i=1; i<arguments.length; i++)
            for(key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];

        return arguments[0];

    }

    var bindUI = function(){

        var i, 
            accept = domElmts.accept, 
            accept_l = accept.length,
            dismiss = domElmts.dismiss,
            dismiss_l = dismiss.length;

        console.log( accept );

        if (opts.eventScroll === true) {

            window.addEventListener('scroll', enableCookies);
        
        }

        for (i = 0; i < accept_l; i++) {

            accept[i].addEventListener("click", enableCookies );
        
        }

        for (i = 0; i < dismiss_l; i++) {

            dismiss[i].addEventListener("click", dismissBanner );
        
        }

    }

    var init = function (options) {

        opts = _extend( {}, defaults, options );

        if (getCookie() == 'Y') {

            getScripts();

            if( opts.preventIframes ) getIframes();

        } else {

            createBanner();
            if( opts.preventIframes ) hideIframes();

            bindUI();

        }
    }

    var enableCookies = function(event){

        if( typeof event != "undefined" && event.type === 'click' ){

            event.preventDefault();

        }

        if (getCookie() != 'Y') {

            setCookie();
            getScripts();
            if( opts.preventIframes ) getIframes();

            dismissBanner();

            window.removeEventListener('scroll', enableCookies);

        }

    }

    var createBanner = function(){

        console.log('create banner');

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

    var dismissBanner = function(){

        domElmts.banner[0].style.display = 'none';

    }

    var setCookie = function(){

        var value = "Y",
            date, expires;

        if (opts.cookie.duration) {
            date = new Date();
            date.setTime(date.getTime()+( opts.cookie.duration*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = opts.cookie.name +"="+ value+expires +"; path=/";
    }

    var getCookie = function(){

        var cookies = document.cookie.split(";"),
            i, x, y;

        for (i = 0; i < cookies.length; i++){
            x = cookies[i].substr(0,cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x == opts.cookie.name) {
                return unescape(y);
            }
        }
    }

    var hideIframes = function(){

        var iframes = document.getElementsByClassName( opts.iframeClass ),
            n = iframes.length,
            src, iframe, i;

        for( i = 0; i < n; i++ ){

            iframe = iframes[i];
            iframe.style.display = 'none';

        }

    }

    var getIframes = function(){

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

    var getScripts = function(){

        var scripts = document.getElementsByClassName( '.' + opts.scriptClass ),
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

    return {
        init: init,
        enableCookies: enableCookies,
        dismissBanner: dismissBanner
    };

}());
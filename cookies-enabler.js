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
        disableClass: 'ce-disable',
        dismissClass: 'ce-dismiss',

        bannerClass: 'ce-banner',
        bannerHTML:

            document.getElementById('ce-banner-html') !== null ?

                document.getElementById('ce-banner-html').innerHTML :

                    '<p>This website uses cookies. '
                        + '<a href="#" class="ce-accept">'
                        + 'Enable Cookies'
                        + '</a>'
                    + '</p>',

        eventScroll: false,
        scrollOffset: 200,
        clickOutside: false,
        cookieName: 'ce-cookie',
        cookieDuration: '365',

        iframesPlaceholder: true,
        iframesPlaceholderHTML:

            document.getElementById('ce-iframePlaceholder-html') !== null ?

                document.getElementById('ce-iframePlaceholder-html').innerHTML :

                    '<p>To view this content you need to'
                        + '<a href="#" class="ce-accept">Enable Cookies</a>'
                    + '</p>',

        iframesPlaceholderClass: 'ce-iframe-placeholder',

        onEnable: '',
        onDismiss: '',
        onDisable: '',
        groups: ''

    }, opts, domElmts, start_Y;

    function _extend() {

        var i, key;
        for (i=1; i<arguments.length; i++)
            for(key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];

    }

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
    }

    function _getClosestParentWithClass(el, parentClass ) {

        do {
            if ( _hasClass( el, parentClass ) ) {
                // tag name is found! let's return it. :)
                return el;
            }
        } while (el = el.parentNode);

        return null;
    }

    function _hasClass( el, cls) {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function _each( object , fn ){

        var l, i;

        l = object.length;

        for (i = 0; i < l; i++) {
            fn( i, object[ i ] );
        }

    }

    var handleScroll = function() {

        if (Math.abs( window.pageYOffset - start_Y ) > opts.scrollOffset) enableCookies();

    };

    var bindUI = function() {

        domElmts = {
            accept:  document.getElementsByClassName(opts.acceptClass),
            disable: document.getElementsByClassName( opts.disableClass ),
            banner: document.getElementsByClassName(opts.bannerClass),
            dismiss: document.getElementsByClassName(opts.dismissClass)
        }

        if (opts.eventScroll) {
            window.addEventListener('load', function(){

                start_Y = window.pageYOffset;
                window.addEventListener('scroll', handleScroll );

            });
        }

        if (opts.clickOutside) {

            document.addEventListener("click", function(e){

                var element = e.target;

                // ignore the click if it is inside of any of the elements created by this plugin
                if(
                    _getClosestParentWithClass( element, opts.iframesPlaceholderClass ) ||
                    _getClosestParentWithClass( element, opts.disableClass ) ||
                    _getClosestParentWithClass( element, opts.bannerClass ) ||
                    _getClosestParentWithClass( element, opts.dismissClass ) ||
                    _getClosestParentWithClass( element, opts.disableClass )
                ){
                    return false;
                }

                enableCookies();  

            });
        }

        groups.createGroupsHTML();

        _each( domElmts.accept, function( i, accept ){

            accept.addEventListener("click", function (ev) {
                ev.preventDefault();
                enableCookies(ev);
            });

        });

        _each( domElmts.disable, function( i, disable ){

            disable.addEventListener("click", function (ev) {
                ev.preventDefault();
                disableCookies(ev);
            });

        });

        _each( domElmts.dismiss, function( i, dismiss ){

            dismiss.addEventListener("click", function (ev) {
                ev.preventDefault();
                banner.dismiss();
            });

        });

    };

    var enableCookies = _debounce(function(event) {

        if( typeof event != "undefined" && event.type === 'click' ){

            event.preventDefault();

        }

        if (cookie.get() != 'Y') {

            cookie.set();

            groups.enable();

            scripts.get();
            iframes.get();

            iframes.removePlaceholders();

            banner.dismiss();
            window.removeEventListener('scroll', handleScroll );

            if( typeof opts.onEnable === "function" ) opts.onEnable();

        }

    }, 250, false);

    var disableCookies = function(event){

        if( typeof event != "undefined" && event.type === 'click' ){

            event.preventDefault();

        }

        if( cookie.get() != 'N' ){

            cookie.set('N');

            banner.dismiss();
            window.removeEventListener('scroll', handleScroll );

            if( typeof opts.onDisable === "function" ) opts.onDisable();

        }

    }

    var banner = (function() {

        function create() {

            var el = '<div class="'+ opts.bannerClass +'">'
                    + opts.bannerHTML
                    +'</div>';

            document.body.insertAdjacentHTML('beforeend', el);

        }

        function dismiss(){

            domElmts.banner[0].style.display = 'none';

            if( typeof opts.onDismiss === "function" ) opts.onDismiss();

        }

        return{

            create: create,
            dismiss: dismiss

        }

    })();

    var groups = (function(){

        function groupHTML( name, group ){

            var checked = group.enabled ? 'checked' : '';

            return '<input type="checkbox" '+ checked +' class="ce-checkbox" ID="ce-'+ name +'"> <label for="ce-'+ name +'">'+ group.name +'</label> <p>'+ group.description +'</p>';

        }

        function createGroupsHTML(){

            var docFragment = document.createDocumentFragment(),
                el = document.createElement('ul'),
                groupEl, key, group;

            docFragment.appendChild(el);

            for ( key in opts.groups ) {

                if ( opts.groups.hasOwnProperty( key )) {

                    groupEl = document.createElement('li');
                    groupEl.classList.add('ce-groups-control');

                    group = opts.groups[key];

                    groupEl.innerHTML = groupHTML( key, group );

                    docFragment.appendChild( groupEl );

                }

            }

            domElmts.banner[0].appendChild( docFragment );

        }

        function enable(  ){

            var key, group;

            for ( key in opts.groups ) {

                if ( opts.groups.hasOwnProperty( key )) {

                    group = opts.groups[key];

                    group.enabled = true;

                }

            }

            set( 'Y' );

        }

        function get(  ){

            var key, group, prop;

            for ( key in opts.groups ) {

                if ( opts.groups.hasOwnProperty( key )) {

                    group = opts.groups[key];

                    if( cookie.get( key ) ){

                        console.log('group is enabled');

                    }

                }

            }

            createGroupsHTML();

        }

        function set( value ){

            var key, group, value = value;

            for ( key in opts.groups ) {

                if ( opts.groups.hasOwnProperty( key )) {

                    group = opts.groups[key];

                    if( group.enabled ){

                        cookie.set( 'ce-' + key, value );

                    } else {

                        cookie.del( 'ce-' + key );

                    }

                    

                }

            }

        }

        return{
            get: get,
            set: set,
            enable: enable,
            createGroupsHTML: createGroupsHTML
        }

    })();

    var cookie = (function() {

        function del( name ){

            document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        }

        function set(){

            var cookieValue = arguments.length === 0 ? "Y" : arguments.length === 1 ? arguments[0] : arguments[1],
                cookieName = arguments.length === 0 || arguments.length === 1 ? opts.cookieName : arguments[0],
                date, expires;

            if (opts.cookieDuration) {
                date = new Date();
                date.setTime(date.getTime()+( opts.cookieDuration*24*60*60*1000));
                expires = "; expires="+date.toGMTString();
            } else {
                expires = "";
            }

            document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
        }

        function get( name ){

            console.log('get cookie');

            var cookies = document.cookie.split(";"),
                cookieName = name != null ? name : opts.cookieName,
                l = cookies.length,
                i, cookie, x, y;

            for ( i = 0; i < l; i++ ) {

                cookie = cookies[i];

                x = cookie.substr(0,cookie.indexOf("="));
                y = cookie.substr(cookie.indexOf("=")+1);

                x = x.replace(/^\s+|\s+$/g,"");

                if ( x ==  cookieName ) {
                    return unescape(y);
                }
            };

        }

        return{
            del: del,
            set: set,
            get: get
        }

    })();

    var iframes = (function() {

        function makePlaceholder( iframe ) {

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

            var iframes = document.getElementsByClassName( opts.iframeClass );

            _each( iframes, function(i, iframe){

                var iframeGroup = iframe.attributes['data-ce-group'].value;

                iframe.style.display = 'none';

                if( opts.iframesPlaceholder ) makePlaceholder( iframe );

            });

        }

        function get() {

            var iframes = document.getElementsByClassName( opts.iframeClass ),
                groups = opts.groups,
                src, iframeGroup;

            _each( iframes, function(i, iframe){

                src = iframe.attributes[ 'data-ce-src' ].value;
                iframeGroup = iframe.attributes['data-ce-group'].value;

                if( groups[ iframeGroup ].enabled ){

                    iframe.src = src;
                    iframe.style.display = 'block';

                }

            });

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
                documentFragment = document.createDocumentFragment();

            _each( scripts, function(i, script){

                var scriptGroup = script.attributes['data-ce-group'].value,
                    s = document.createElement('script');

                s.type = 'text/javascript';

                /* check if the ce-group is enabled */
                if( opts.groups[ scriptGroup ].enabled ){

                    /* copy attributes to the new element */
                    _each( script.attributes, function(i, attrib){

                        if (
                            attrib.specified && 
                            attrib.name != 'type' && 
                            attrib.name != 'class'
                        ){
                            s.setAttribute(attrib.name, attrib.value);
                        }

                    });

                    s.innerHTML = scripts[i].innerHTML;
                    documentFragment.appendChild(s);

                }

            });

            document.body.appendChild(documentFragment);

        }

        return{
            get: get
        }

    })();

    var init = function(options) {

        var cookieStatus;

        opts = _extend( {}, defaults, options );

        cookieStatus = cookie.get();

        // only if yes, the groups feature will be started
        if ( cookieStatus == 'Y') {

            if( typeof opts.onEnable === "function" ) opts.onEnable();

            scripts.get();
            iframes.get();

        } else if( cookieStatus == 'N' ){

            if( typeof opts.onDisable === "function" ) opts.onDisable();

            iframes.hide();
            bindUI();

        } else {

            banner.create();
            iframes.hide();
            bindUI();

        }
    };

    return {
        init: init,
        enableCookies: enableCookies,
        dismissBanner: banner.dismiss,
        groups: groups
    };

}());

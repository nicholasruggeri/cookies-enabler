// Made with milk and cookies by Nicholas Ruggeri
// https://github.com/nicholasruggeri/cookies-enabler

window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    var markupClass = {
            classTrigger : 'ce-trigger',
            classBanner : 'ce-banner'
        }, 
        opts, domElmts;

    var init = function (options) {

        opts = {
            elem : options.element == null ? document.getElementsByClassName('ce-elm') : document.getElementsByClassName(options.element),
            duration : options.duration == null ? '365' : options.duration,
            eventScroll : options.eventScroll == null ? false : options.eventScroll,
            textTrigger : options.textTrigger == null ? 'Enable Cookies' : options.textTrigger
        }

        domElmts = {
            trigger :  document.getElementsByClassName(markupClass.classTrigger),
            banner : document.getElementsByClassName(markupClass.classBanner)
        }

        if (getCookie() == 'Y') {

            getScripts();
        
        } else {

            createBanner();

            if (opts.eventScroll === true) {
                window.addEventListener('scroll', enableCookies );
            }

            domElmts.trigger[0].addEventListener("click", enableCookies );
        }
    };

    var enableCookies = function(){

        if (getCookie() != 'Y') {

            setCookie();
            getScripts();
            domElmts.banner[0].style.display = 'none';

            window.removeEventListener('scroll', enableCookies );

        }

    };

    var createBanner = function(){

        var el = '<div class="'+ markupClass.classBanner +'">'
                +'<a href="#" class="'+ markupClass.classTrigger +'">'+ opts.textTrigger +'</a>'
                +'</div>';

        document.body.insertAdjacentHTML('beforeend', el);
    }

    var setCookie = function(){

        var name = "ce-consent",
            value = "Y",
            date, expires;

        if ( opts.duration ) {
            date = new Date();
            date.setTime(date.getTime()+( opts.duration*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name +"="+ value+expires +"; path=/";
    }

    var getCookie = function(){

        var name = "ce-consent",
            cookies = document.cookie.split(";"),
            i, x, y;

        for (i = 0; i < cookies.length; i++){
            x = cookies[i].substr(0,cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x == name) {
                return unescape(y);
            }
        }
    }

    var getScripts = function(){

        var n = opts.elem.length,
            documentFragment = document.createDocumentFragment(),
            i, y, s, attrib;

        for (i = 0; i < n; i++){
            s = document.createElement('script');
            s.type = 'text/javascript';
            for (y = 0; y < opts.elem[i].attributes.length; y++) {
                attrib = opts.elem[i].attributes[y];
                if (attrib.specified) {
                    if ((attrib.name != 'type') && (attrib.name != 'class')){
                        s.setAttribute(attrib.name, attrib.value);
                    }
                }
            }
            s.innerHTML = opts.elem[i].innerHTML;
            documentFragment.appendChild( s );
        }

        document.body.appendChild( documentFragment );
    }

    return {
        init: init
    };

}());
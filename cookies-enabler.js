// Made with milk and cookies by Nicholas Ruggeri
// https://github.com/nicholasruggeri/cookies-enabler

window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    var init = function (options) {

        var markupClass = {
            classTrigger : 'ce-trigger',
            classBanner : 'ce-banner'
        }

        var opts = {
            elem : options.element == null ? document.getElementsByClassName('ce-elm') : document.getElementsByClassName(options.element),
            duration : options.duration == null ? '365' : options.duration,
            eventScroll : options.eventScroll == null ? false : options.eventScroll,
            textTrigger : options.textTrigger == null ? 'Enable Cookies' : options.textTrigger
        }

        var domElmts = {
            trigger : document.getElementsByClassName(markupClass.classTrigger),
            banner : document.getElementsByClassName(markupClass.classBanner)
        }

        if (getCookie() == 'Y') {
            getScripts(opts.elem, domElmts.trigger, domElmts.banner);
        } else {
            createBanner(markupClass.classBanner, markupClass.classTrigger, opts.textTrigger);
            if (opts.eventScroll === true) {
                window.addEventListener('scroll', function(){
                    if (getCookie() != 'Y') {
                        setCookie(opts.duration);
                        getScripts(opts.elem, domElmts.trigger, domElmts.banner);
                        domElmts.banner[0].style.display = 'none';
                    }
                });
            }
            domElmts.trigger[0].addEventListener("click", function(){
                setCookie(opts.duration);
                getScripts(opts.elem, domElmts.trigger, domElmts.banner);
                domElmts.banner[0].style.display = 'none';
            });
        }
    };

    var createBanner = function(classBanner, classTrigger, textTrigger){

        var classBanner = classBanner,
            classTrigger = classTrigger,
            textTrigger = textTrigger
            el = '<div class="'+classBanner+'">'
                +'<a href="#" class="'+classTrigger+'">'+textTrigger+'</a>'
                +'</div>';

        document.body.insertAdjacentHTML('beforeend', el);
    }

    var setCookie = function(days){

        var name = "ce-consent",
            value = "Y",
            date, expires;

        if (days) {
            date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        } else {
            expires = "";
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    var getCookie = function(){

        var name = "ce-consent";
        var i, x, y,
            cookies = document.cookie.split(";");

        for (i = 0; i < cookies.length; i++){
            x = cookies[i].substr(0,cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=")+1);
            x = x.replace(/^\s+|\s+$/g,"");
            if (x == name) {
                return unescape(y);
            }
        }
    }

    var getScripts = function(elem, trigger, banner){

        var n = elem.length,
            documentFragment = document.createDocumentFragment();

        for (var i = 0; i < n; i++){
            var s = document.createElement('script');
            s.type = 'text/javascript';
            for (var y = 0; y < elem[i].attributes.length; y++) {
                var attrib = elem[i].attributes[y];
                if (attrib.specified) {
                    if ((attrib.name != 'type') && (attrib.name != 'class')){
                        s.setAttribute(attrib.name, attrib.value);
                    }
                }
            }
            s.innerHTML = elem[i].innerHTML;
            documentFragment.appendChild(s);
        }

        document.body.appendChild(documentFragment);
    }

    return {
        init: init
    };

}());
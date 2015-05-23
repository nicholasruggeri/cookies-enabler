window.COOKIES_ENABLER = window.COOKIES_ENABLER || (function () {

    var init = function (options) {

        var elem = options.element == null ? document.getElementsByClassName('ce-elm') : document.getElementsByClassName(options.element),
            trigger =  options.trigger == null ? document.getElementsByClassName('ce-trigger') : document.getElementsByClassName(options.trigger),
            banner = options.banner == null ? document.getElementsByClassName('ce-banner') : document.getElementsByClassName(options.banner),
            eventScroll = options.eventScroll == null ? false : options.eventScroll;

        if (window.sessionStorage){
            if (sessionStorage.consent == 'Y'){
                getScripts(elem, trigger, banner);
            }
        }

        if (eventScroll === true) {
            window.addEventListener('scroll', function(){
                sessionStorage.setItem("consent", "Y");
                getScripts(elem, trigger, banner);
            });
        }

        trigger[0].addEventListener("click", function(){
            sessionStorage.setItem("consent", "Y");
            getScripts(elem, trigger, banner);
        });
    };

    var getScripts = function(elem, trigger, banner){

        var n = elem.length;

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
            document.body.appendChild(s);
        }

        banner[0].style.display = 'none';
    }

    return {
        init: init
    };

}());
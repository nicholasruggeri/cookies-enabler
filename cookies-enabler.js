var elem = document.getElementsByClassName('ce-elm'),
    trigger = document.getElementsByClassName('ce-trigger'),
    bar = document.getElementsByClassName('ce-bar');

var getScripts = function(){
    var n = elem.length;
    for (var i = 0; i < n; i++){
        var s = document.createElement('script');
        s.type = 'text/javascript';
        for (var y = 0; y < elem[i].attributes.length; y++) {
            var attrib = elem[i].attributes[y];
            if (attrib.specified) {
                if ((attrib.name != 'type') && (attrib.name != 'class')){
                    console.log(attrib.name);
                    s.setAttribute(attrib.name, attrib.value);
                }
            }
        }
        s.innerHTML = elem[i].innerHTML;
        document.body.appendChild(s);
    }
    bar[0].style.display = 'none';
}
if (window.sessionStorage){
    if (sessionStorage.consent == 'Y'){
        getScripts();
    }
}
trigger[0].addEventListener("click", function(){
    sessionStorage.setItem("consent", "Y");
    getScripts();
});
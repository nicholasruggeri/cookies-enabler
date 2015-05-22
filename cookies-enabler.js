if (window.sessionStorage){
    if (sessionStorage.consent == 'Y'){
        $('.ce-trigger').remove();
        var elem = $('.ce-elm');
        elem.each(function(){
            var s = $('<script type="text/javascript"></'+'script>');
            for (var i = 0; i < this.attributes.length; i++) {
                var attrib = this.attributes[i];
                if (attrib.specified) {
                    if (attrib.name != 'type'){
                        s.attr(attrib.name, attrib.value);
                    }
                }
            }
            s.html(this.innerHTML);
            $(document.body).append(s);
        });
    }
}
$('.ce-trigger').on('click', function(){
    $(this).remove();
    sessionStorage.setItem("consent", "Y");
    var elem = $('.ce-elm');
    elem.each(function(){
        var s = $('<script type="text/javascript"></'+'script>');
        for (var i = 0; i < this.attributes.length; i++) {
            var attrib = this.attributes[i];
            if (attrib.specified) {
                if (attrib.name != 'type'){
                    s.attr(attrib.name, attrib.value);
                }
            }
        }
        s.html(this.innerHTML);
        $(document.body).append(s);
    });
});
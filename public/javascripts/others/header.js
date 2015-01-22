function writeHeader(url) {
    $.ajax({
        url : url,
        cache : false,
        async : false,
        success : function(html) {
            document.write(html);
        }
    });
}

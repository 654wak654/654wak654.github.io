var sectionHeight = function() {
    var a = $(window).height(),
        c = $("section").css("height", "auto");
    if (c.outerHeight(true) < a) {
        var b = c.outerHeight(true) - c.height();
        c.height(a - b - 20)
    } else {
        c.css("height", "auto")
    }
};
$(window).resize(sectionHeight);
$(document).ready(function() {
    $("section h1, section h2").each(function() {
        $("nav ul").append("<li class='tag-" + this.nodeName.toLowerCase() + "'><a href='#" + $(this).text().toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "'>" + $(this).text() + "</a></li>");
        $(this).attr("id", $(this).text().toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
        $("nav ul li:first-child a").parent().addClass("active")
    });
    $("nav ul li").on("click", "a", function(b) {
        var a = $($(this).attr("href")).offset().top - 20;
        $("html, body").animate({
            scrollTop: a
        }, 400);
        $("nav ul li a").parent().removeClass("active");
        $(this).parent().addClass("active");
        b.preventDefault()
    });
    sectionHeight();
    $("img").load(sectionHeight)
});
fixScale = function(e) {
    var c = "addEventListener",
        b = "gesturestart",
        g = "querySelectorAll",
        f = [1, 1],
        d = g in e ? e[g]("meta[name=viewport]") : [];

    function a() {
        d.content = "width=device-width,minimum-scale=" + f[0] + ",maximum-scale=" + f[1];
        e.removeEventListener(b, a, true)
    }
    if ((d = d[d.length - 1]) && c in e) {
        a();
        f = [0.25, 1.6];
        e[c](b, a, true)
    }
};

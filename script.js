$(document).ready(function() {
    $(".piece").each(function() {
        var maxX = $("main").width() - $(this).width();
        var maxY = $("main").height() - $(this).height();
        var randomX = Math.random() * maxX;
        var randomY = Math.random() * maxY;
        $(this).css({
            left: randomX,
            top: randomY
        });
    });

    $(".piece").draggable({
        containment: "main",
        cursor: "grab",
        // The start and stop functions are removed to eliminate the red border effect
        // start: function() {
        //     $(this).css("border", "2px solid red");
        // },
        // stop: function() {
        //     $(this).css("border", "none");
        // }
    });
});

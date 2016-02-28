$(document).ready(function(){
    var rowCount = $(".gridPadding >tbody >tr").length;
    var arr = [];

    var oneRow = function(date,from,oneRowTo,subject,teacher,room,oneRowDescription){
        this.date=date;
        this.from=from;
        this.oneRowTo=oneRowTo;
        this.subject=subject;
        this.teacher=teacher;
        this.room=room;
        this.oneRowDescription=oneRowDescription;
    };

    for (var i = 2; i <= rowCount; i++)
    {
        var obj = new oneRow();

        obj.date = $(".gridPadding tr:nth-child("+i+") td:nth-child(1)").text();
        obj.from = $(".gridPadding tr:nth-child("+i+") td:nth-child(2)").text();
        obj.oneRowTo = $(".gridPadding tr:nth-child("+i+") td:nth-child(3)").text();
        obj.subject = $(".gridPadding tr:nth-child("+i+") td:nth-child(4)").text();
        obj.teacher = $(".gridPadding tr:nth-child("+i+") td:nth-child(5)").text();
        obj.room = $(".gridPadding tr:nth-child("+i+") td:nth-child(6)").text();
        obj.oneRowDescription = $(".gridPadding tr:nth-child("+i+") td:nth-child(8)").text();

        arr.push((obj));
    }

    $(".gridPadding").prepend("" +
    "<table class='.gridPadding .fill'> " +
    "</table>");

    window.alert(JSON.stringify(arr));
});



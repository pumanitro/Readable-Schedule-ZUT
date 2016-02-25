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

    var check = arr[0].date;
    var l,time=8;
    var days = [];

    function generateDates(){
        var text = "<td><b> "+arr[0].date.slice(10)+"</b><br>"+arr[0].date.slice(0,10)+"</td>";
        days[0] = arr[0].date;
        //window.alert(days[0]);
        var licz = 0;
        for (var i = 1; i < arr.length; i++)
        {
            if(arr[i-1].date!=arr[i].date)
            {
                licz++;
                text += "<td><b> "+arr[i].date.slice(10)+"</b><br>"+arr[i].date.slice(0,10)+"</td>";
                days[licz] = arr[i].date;
                //window.alert("licz = "+licz+"\n"+"days[licz] = "+days[licz]+"\n"+"arr[i].date = "+arr[i].date+"\n");
            }
        }

        //window.alert(days[1]);
        return text;
    }

    function generateSchedule(timeFrom,timeTo,days)
    {
        var text = "";
        var day = days[0];
        var dayCounter = 0;
        var counter = 0;

        for (var i = 0; i < arr.length; i++)
        {
            if((timeFrom == arr[i].from)||(timeTo == arr[i].oneRowTo))
            {
                var godzina = true;
            }
            else var godzina = false;

            //window.alert("day = "+day+"\n"+"arr[i].date  = "+arr[i].date+"\n"+"arr[i+1].date = "+arr[i+1].date+"\n"+"dayCounter =  "+dayCounter+"\n"+"godzina = "+godzina+"\n"+"counter = "+counter+"\n"+"arr[i]"+JSON.stringify(arr[i]));

            if (((timeFrom == arr[i].from)||(timeTo == arr[i].oneRowTo))&&(day == arr[i].date))
            {
                text += "<td>"+arr[i].subject+"</td>";
                counter++;
                window.alert(text);
            }
            else if((counter == 0)&&(arr.length == (i+1)))
            {
                text += "<td> </td>";
            }

            if((arr.length-1)>i)
            {
                if(day != arr[i+1].date)
                {
                    if(counter == 0)
                        text += "<td> </td>";

                    dayCounter++;
                    day = days[dayCounter];

                    counter = 0;
                }
            }

        }

        return text;
    }

    $(".gridPadding").before("<table id='myTable'></table>");
    for (var j = 1; j <= 13; j++)
    {
        l=j-1;

        if( j == 1 ) {
            dates = generateDates();

            $("#myTable").append("" +
            "<tr>" +
            "<td style='width: 100px;'></td>" + dates +
            "</tr>" +
            "");
        }
        else
        {
            scheduleRow = generateSchedule((("0" + time).slice(-2)+":15"),(("0" + (time+1)).slice(-2))+":00",days);
            $("#myTable").append("" +
            "<tr>" +
            "   <td>"+("0" + time).slice(-2)+":15 - "+(("0" + (time+1)).slice(-2))+":00" +
            "   </td>" +scheduleRow+
            "</tr>" +
            "");
            time++;
        }
    }

});



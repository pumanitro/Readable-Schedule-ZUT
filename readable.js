$(document).ready(function(){
    //FA
    $("head").append("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'>");

    //usuwanie zbędnych elementów
    $("#page_left_content").hide();
    var rowCount = $(".gridPadding >tbody >tr").length;
    $("#page_header").hide();
    $("#aspnetForm").css("padding-top" , "0px");
    $("#ctl00_ctl00_ContentPlaceHolder_wumasterWhoIsLoggedIn").hide();
    $("#page_language").hide();
    $("#ctl00_ctl00_TopMenuPlaceHolder_wumasterMenuTop_menuTop").hide();

    $("#page_top_menu").prepend("" +
    "<span class='pull-left'>" +
    "   <abbr title='BACK'><i class='fa fa-arrow-circle-left fa-2x menu-button' onClick='history.go(-1);return true;'></i></abbr>" +
    "</span>"+
    "<span class='pull-right'>" +
    "   <abbr title='APPROX'><i id='approx' class='fa fa-search-plus fa-2x menu-button'></i></abbr>" +
    "   <abbr title='DISTANCE'><i id='distance' class='fa fa-search-minus fa-2x menu-button'></i></abbr>" +
    "</span>");

    $("#page_top_menu").css("height","45px");
    $("#page_top_menu").css("padding-right","49px");

    $('[data-toggle="tooltip"]').tooltip();

    $("#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_Label3").html("Extension created by <span style='color:#092A63; font-size: 22px;'>πJ</span> member of <span style='color:#092A63; font-size: 22px;'>Its a CREW</span> team.");

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

    function generateDates()
    {
        var text = "<td class='navbar-fixed-top'><b> "+arr[0].date.slice(10)+"</b><br>"+arr[0].date.slice(0,10)+"</td>";
        days[0] = arr[0].date;
        //window.alert(days[0]);
        var licz = 0;
        for (var i = 1; i < arr.length; i++)
        {
            if(arr[i-1].date!=arr[i].date)
            {
                licz++;
                text += "<td class='navbar-fixed-top'><b> "+arr[i].date.slice(10)+"</b><br>"+arr[i].date.slice(0,10)+"</td>";
                days[licz] = arr[i].date;
                //window.alert("licz = "+licz+"\n"+"days[licz] = "+days[licz]+"\n"+"arr[i].date = "+arr[i].date+"\n");
            }
        }

        //window.alert(days[1]);
        return text;
    }

    function getTypeOfSubject(subj)
    {
        if(subj == "wykład") return "W";
        else if (subj == "laboratorium") return "L";
        else return "Ć";
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
                text += "<td class='inside'>"+
                    "<div class='room'>"+arr[i].room+"</div>"+
                    "<div style='subject'>"+arr[i].subject+"</div>"+
                    "<div class='teacher'>"+arr[i].teacher+"</div>"+
                    "<div class='typeOfSubject'>"+getTypeOfSubject(arr[i].oneRowDescription)+"</div>"+
                    "</td>";

                counter++;
                //window.alert(text);
            }
            else if((counter == 0)&&(arr.length == (i+1)))
            {
                text += "<td class='inside'> </td>";
            }

            if((arr.length-1)>i)
            {
                if(day != arr[i+1].date)
                {
                    if(counter == 0)
                        text += "<td class='inside'> </td>";

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
            "   <td class='time'>"+("0" + time).slice(-2)+":15 - "+(("0" + (time+1)).slice(-2))+":00" +
            "   </td>" +scheduleRow+
            "</tr>" +
            "");
            time++;
        }
    }

    var zoom =100;

    $("#approx").click(function(){
        zoom+=25;
        $("#myTable").css("zoom",zoom+"%");
    });

    $("#distance").click(function(){
        zoom-=25;
        $("#myTable").css("zoom",zoom+"%");
    });

    $("#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane").hide();
    $("#myTable").after("<input id='showOldSchedule' type='button' value='SHOW OLD SCHEDULE' class='przyciskM'>");

    var hideStatus = 1;

    $("#showOldSchedule").click(function(){
        $("#ctl00_ctl00_ContentPlaceHolder_RightContentPlaceHolder_dgDane").toggle();

        if(hideStatus == 0)
        {
            $("#showOldSchedule").val("SHOW OLD SCHEDULE");
            hideStatus = 1;
        }
        else
        {
            $("#showOldSchedule").val("HIDE OLD SCHEDULE");
            hideStatus = 0;
        }

    });

    $(".stopka_txt").hide();
    $("#page_footer_inner").prepend("Extension created by πJ");

});



function arrange() {
    if( 0 == g_browser_ok ) {
        return;
    }
    var obj = window;
    if( window.opera ) {
        var w = obj.innerWidth;
        var h = obj.innerHeight;
    } else if( document.all ){                //ie4-
        var w = obj.document.body.clientWidth;
        var h = obj.document.body.clientHeight;
    } else if( document.getElementById ){    //n6-7, m1, s1
        var w = obj.innerWidth;
        var h = obj.innerHeight;
    }
    var headmenu_style = document.getElementById("controller").style;
    headmenu_style.left = 156 + "px";
    headmenu_style.top = 70 + "px";
    headmenu_style.width = ( w - 156 ) + "px";
    headmenu_style.height = 45 + "px";
    var main_style = document.getElementById("wrapper").style;
    main_style.left = 156 + "px";
    main_style.top = 70 + 45 + "px";
    main_style.width = ( w - 156 ) + "px";
    main_style.height = ( h - 45 - 70 ) + "px";
}
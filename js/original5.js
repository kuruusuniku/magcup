$(document).ready(function(){

// これらの変数を使うつもりだよー
var hoge;
var fuga;
var preselected;
var position;  //selected grid position
var gridStyle;  //selected grid style
var selectedGrid;
var any_position;
var any_gridStyle;
var gridClass;
var multipleFlag = true;

// 固定値定義
var WIDTH=7;
var HEIGHT=7;

// CLEditer
$("#cl-input").cleditor({
         width:      550, // width not including margins, borders or padding
         height:     135, // height not including margins, borders or padding
         controls:     // controls to add to the toolbar
                        "style size color bold italic image link unlink | undo redo |"+
                        " alignleft center alignright justify | source",
         colors:     // colors in the color popup
                        "FFF FCC FC9 FF9 FFC 9F9 9FF CFF CCF FCF " +
                        "CCC F66 F96 FF6 FF3 6F9 3FF 6FF 99F F9F " +
                        "BBB F00 F90 FC6 FF0 3F3 6CC 3CF 66C C6C " +
                        "999 C00 F60 FC3 FC0 3C0 0CC 36F 63F C3C " +
                        "666 900 C60 C93 990 090 399 33F 60C 939 " +
                        "333 600 930 963 660 060 366 009 339 636 " +
                        "000 300 630 633 330 030 033 006 309 303",
         sizes:        // sizes in the font size popup
                        "1,4,6,8,16",
         styles:       // styles in the style popup
                        [["本文", "<p>"], ["見出し", "<h2>"]]
});

// GRID part
var blocks = $('.block','#wrapper');
blocks.hover(function () {
  $(this).addClass("hilite");
}, function () {
  $(this).removeClass("hilite");
});

blocks.click(function () {
  // 選択中の項目のハイライト設定
  $(preselected).removeClass("hilite2");
  preselected=this;
  $(this).addClass("hilite2");
  
  // 現在選択中の項目のグリッド情報取得
  gridClass = $(this).attr("class").split(" ");
  selectedGrid = getAnyGridInfo(gridClass);
  //$('li:eq(1)').text(selectedGrid.gridPosition);
  //$('li:eq(2)').text(selectedGrid.gridStyle);
  
  // 選択中のグリッドの内容取得
  $("#cl-input").val($(this).html());
  var editor = $("#cl-input").cleditor()[0];
  editor.updateFrame();
 
});

// Controller part
$("#accordion").accordion({ header: "h3" });
$('#tabs').tabs();
	$('#dialog_link, ul#icons li').hover(
		function() { $(this).addClass('ui-state-hover'); },
		function() { $(this).removeClass('ui-state-hover'); }
	);

$(".open").click(function(){
  $("#slideBox").slideToggle("slow");
});

$("#cl-getbtn").click(function() {
  $(preselected).html($("#cl-input").val());
  preselected.updateFrame();
});

// gridStyleChange
$("#left-btn").click(function() {
  if(typeof  selectedGrid === "undefined") {
  	return;
  }
  if (multipleFlag){
  	multipleFlag = false;
  	
  	//grid position
  	var xpo = parseInt(selectedGrid.coordinate.x);
  	var ypo = parseInt(selectedGrid.coordinate.y);
  	
  	if(xpo > 0){
  		//get next left grid style
		var leftTrueGridPosition = getGridByThePosition(new GridCoordinate(xpo-1, ypo));
  		var leftTrueGrid = getAnyGridInfo($("."+leftTrueGridPosition).attr("class").split(" "));
		
  		if(selectedGrid.w+leftTrueGrid.w <= WIDTH){
    		$(preselected).removeClass(selectedGrid.gridStyle);
    		$(preselected).addClass('s'+(selectedGrid.w+leftTrueGrid.w)+'x'+selectedGrid.h);
    	
    		// remove left grid
			var leftgrid = $("."+leftTrueGrid.gridPosition);
    		$(preselected).html($(preselected).html()+leftgrid.html())
    		leftgrid.remove();
    		$(preselected).removeClass(selectedGrid.gridPosition);
    		$(preselected).addClass(leftTrueGrid.gridPosition);
    	
    		// 現在選択中の項目のグリッド情報更新
  			gridClass = $(preselected).attr("class").split(" ");
			selectedGrid = getAnyGridInfo(gridClass);
  		}
  	}
  	multipleFlag = true;
  }
});

$("#right-btn").click(function() {
  if (multipleFlag){
  	multipleFlag = false;
  	
  	//left grid position
  	var xpo = parseInt(position.charAt(1));
  	var ypo = parseInt(position.charAt(3));

  	//gridstyle
  	var ssty = parseInt(gridStyle.charAt(1));
  	var xsty = parseInt(gridStyle.charAt(3));
  	
  	//right grid position
  	var rxpo = xpo + ssty;
  	var rypo = ypo;
  	
  	if(rxpo < WIDTH){
  		//get next right grid style
  		var rightgrid = '.'+'p'+(rxpo)+'x'+rypo;
  		var i = 1;
  		while(1){
  			if($(rightgrid).attr("class")!=null){break;}
  			if(i>WIDTH){return}
  			rightgrid = '.'+'p'+(rxpo+i)+'x'+rypo;
  			i++;
  		}
  		getAnyGridInfo($(rightgrid).attr("class").split(" "));
  		var rgxpo = parseInt(any_position.charAt(1));
  		var rgypo = parseInt(any_position.charAt(3));
  		var rgssty = parseInt(any_gridStyle.charAt(1));
  		var rgxsty = parseInt(any_gridStyle.charAt(3));
  		
  		//right grid position
  		var rgrxpo = rgxpo + rgssty;
  		var rgrypo = rgypo;
  	
  		// redefine style
    	$(preselected).removeClass(gridStyle);
    	$(preselected).addClass('s'+(ssty+rgssty)+'x'+xsty);
    	
    	console.log(rightgrid);
    	console.log($(rightgrid).html());
    	$(preselected).html($(rightgrid).html()+$(preselected).html())
    	$(rightgrid).remove();
    	
    	// 現在選択中の項目のグリッド情報更新
  		gridClass = $(preselected).attr("class").split(" ");
  		getGridInfo(gridClass);
  	}
  	multipleFlag = true;
  }
});

$("#up-btn").click(function() {
  if (multipleFlag){
  	multipleFlag = false;
  	
  	//left grid position
  	var xpo = parseInt(position.charAt(1));
  	var ypo = parseInt(position.charAt(3));

  	//gridstyle
  	var ssty = parseInt(gridStyle.charAt(1));
  	var xsty = parseInt(gridStyle.charAt(3));
  	
  	//up grid position
  	var uxpo = xpo;
  	var uypo = ypo - xsty;
  	
  	console.log(uxpo);
  	console.log(uypo);
  	
  	if(uypo >= 0){
  		//get next up grid style
  		var upgrid = '.'+'p'+uxpo+'x'+uypo;
  		var i = 1;

  		while(1){
  			if($(upgrid).attr("class")!=null){break;}
  			if(i>HEIGHT){return}
  			upgrid = '.'+'p'+(uxpo-i)+'x'+uypo;
  			i++;
  		}
  		console.log(upgrid);
  		getAnyGridInfo($(upgrid).attr("class").split(" "));
  		var ugxpo = parseInt(any_position.charAt(1));
  		var ugypo = parseInt(any_position.charAt(3));
  		var ugssty = parseInt(any_gridStyle.charAt(1));
  		var ugxsty = parseInt(any_gridStyle.charAt(3));
  		
  		console.log(ugxpo);
  		console.log(ugypo);
  		
  		//up grid position
  		var uguxpo = ugxpo;
  		var uguypo = ugypo;
  		
  		//union html
  		$(preselected).html($(upgrid).html()+$(preselected).html())
  		$(upgrid).remove();
  		
  		// redefine position
    	$(preselected).removeClass(position);
    	$(preselected).addClass(any_position);
  		// redefine style
    	$(preselected).removeClass(gridStyle);
    	if(ssty>ugssty){
    		$(preselected).addClass('s'+(ssty)+'x'+(xsty+ugxsty));
    	}else{
    		$(preselected).addClass('s'+(ugssty)+'x'+(xsty+ugxsty));
    	}
    	
    	// 現在選択中の項目のグリッド情報更新
  		gridClass = $(preselected).attr("class").split(" ");
  		getGridInfo(gridClass);
  	}
  	
  	multipleFlag = true;
  }
});

// 縦書きスタイルの切り替え
$("#vertical-button").click(function() {
  $(preselected).toggleClass('vertical2');
});

// 任意のClass情報からグリッド情報を取得
function getAnyGridInfo(gridClasses) {
  var thisGridPosition;
  var thisGridStyle;
  for (i=0; i < gridClasses.length; i++){
    var regposi = gridClasses[i].match(/^p[0-9]x[0-9]$/);
    var regsty = gridClasses[i].match(/^s[0-9]x[0-9]$/);
	if (regposi)thisGridPosition = regposi.toString();
    if (regsty)thisGridStyle = regsty.toString();
  }

  // 未定義なら終了
  if(typeof  thisGridPosition === "undefined" || typeof  thisGridStyle === "undefined" ) {
  	return grid;
  }
  grid = new Grid(thisGridPosition,thisGridStyle);
  return grid;
}

// Gridのブロック座標表現
function GridCoordinate(xposi, yposi){
	this.x = xposi;
	this.y = yposi;
	this.posi = "p"+xposi+"x"+yposi;
}

// Grid表現
function Grid(gridPosition, gridStyle){
	this.gridPosition = gridPosition;
	this.gridStyle = gridStyle;
	//console.log("p="+gridPosition+",s="+gridStyle);
	this.coordinate = new GridCoordinate(parseInt(gridPosition.charAt(1) ), parseInt(gridPosition.charAt(3)) );
	this.w = parseInt(gridStyle.charAt(1) );
	this.h = parseInt(gridStyle.charAt(3) );
}

// To get Grids in this style
function getGridPositionsByTheGrid(grid){
	var gridPositions = new Array();
	// x方向の走査(自grid含む)
	for (var i = 0;  i < grid.w; i++){
		gridPositions.push( new GridCoordinate(grid.coordinate.x+i , grid.coordinate.y));
		//console.log("x方向="+(grid.coordinate.x+i)+","+grid.coordinate.y);
	}
	// y方向の走査（自grid含まず）
	for (var i = 1;  i < grid.h; i++){
		gridPositions.push( new GridCoordinate(grid.coordinate.x , grid.coordinate.y+i));
		//console.log("y方向="+grid.coordinate.x+","+(grid.coordinate.y+i));
	}
	return gridPositions;
}

// To get Grid in this Position
function getGridByThePosition(thisPosition){
	var belongs = scanAllPositions();
	return belongs[thisPosition.posi];	
}

// Scan All Positions
function scanAllPositions(){
    blocks = $('.block','#wrapper');
    var belong = {};
	for(var i = 0; i < blocks.length; i++){
		var tempgrid = getAnyGridInfo($(blocks[i]).attr("class").split(" "));
		var array = getGridPositionsByTheGrid(tempgrid);
		//console.log("nagasa="+array.length);
		for(var j = 0; j < array.length; j++ ){
			belong[array[j].posi] = tempgrid.gridPosition;
			//console.log("belong="+array[j].posi+","+tempgrid.gridPosition);
		}
	}
	return belong;
}

$(".cb-enable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-disable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', true);
});

$(".cb-disable").click(function(){
        var parent = $(this).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
});

});

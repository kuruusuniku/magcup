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
var WIDTH = 6;
var HEIGHT = 6;

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

// Masonary
$('.wrapper').masonry();

// DoragSort
$("#wrapper").sortable();

// sidemenu extension
$("#controller").sidemenu();

// dialog
$("#delete_dialog").dialog({
  autoOpen: false,
  title: '項目の削除',
  closeOnEscape: false,
  modal: true,
  buttons: {
    "OK": function(){
	  $(preselected).remove();
      $(this).dialog('close');
    }
  }
});
$('#gomi').click(function(){
　　if(typeof  selectedGrid === "undefined") {
  	return;
  }
  $('#delete_dialog').dialog('open');
});

$('#tuika').click(function(){
　　if(typeof  selectedGrid === "undefined") {
  	return;
  }
  $('#delete_dialog').dialog('open');
});

////////////////////////////////////
// Save function
////////////////////////////////////
function func_json_request(json_data){
  $.ajax(
        {
            url:'http://www.pages-me.com/magcup-api/save',
            type:'POST',
            data:json_data,
            error:function(){},
            complete:function(data){console.log(data.responseText)},
            dataType:'json'
        }
    );
}

$('#save').click(function(){
  $('#delete_dialog').dialog('open');
  var articles = $('#wrapper').html();
  var data = { "json_data":[{"content": articles}]} ;
  //data = {"content": articles};
  //data = "json_data=" + data;
  func_json_request(data);
  console.log("json send");
});



////////////////////////////////////
// Load function
////////////////////////////////////
$.escapeHTML = function(val) {
        return $("<div/>").text(val).html();
};

$('#load').click(function(){
  console.log("json load start");
  var load_arti = '<div class="box s4x1 p2x2 vertical2">16.ドイツ3/4、日本1/4の血を持つ混血児で橙髪青眼（あるいは紅毛碧眼）。国籍はアメリカ。4歳の時にエヴァンゲリオン操縦の二番目の適格者として選出され、以降、セカンドチルドレンとして英才教育を受けた。14歳にして大学を卒業。EVA弐号機とのコンタクトはドイツ語を基準にしているが、日本語も流暢に話すことができる。非常に高飛車であり傲慢かつ自己中心的な性格で、劇中ではプライドの高さの描写が顕著である。一人称は基本的に「あたし」。口癖は「あんたバカぁ?」。</div>';
  $.getJSON(
      //第一引数：JSONのURL
      'http://www.pages-me.com/magcup-api/load/36',
      //第二引数：RESTパラメータ
      null,
      //第三引数：コールバック関数
      function(data, status) {
        var load_arti = data.content;
        console.log(typeof data);
        console.log(typeof load_arti);
        console.log(load_arti);
        console.log("json load end");
        $('#wrapper').html(load_arti);
      }
  );
});

// GRID part
var blocks = $('.box','#wrapper');
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
 
  // 選択中のグリッドの内容取得
  $("#cl-input").val($(this).html());
  var editor = $("#cl-input").cleditor()[0];
  editor.updateFrame();
 
});

////////////////////////////////////
// Controller part
////////////////////////////////////
//$("#accordion").accordion({ header: "h3" });
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
$("#yoko-kakudai").click(function() {
  if(typeof  selectedGrid === "undefined") {
  	return;
  }
  if(selectedGrid.w >= WIDTH) {
  	return;
  }
  console.log("before="+selectedGrid.gridStyle);
  var nextGridStyle = "s"+(selectedGrid.w+1)+"x"+selectedGrid.h;
  $(preselected).removeClass(selectedGrid.gridStyle);
  $(preselected).addClass(nextGridStyle);
  selectedGrid = new Grid(nextGridStyle);
  console.log("changed="+selectedGrid.gridStyle);
});

////////////////////////////////////
// Button actions
////////////////////////////////////
$("#tate-kakudai").click(function() {
  if(typeof  selectedGrid === "undefined") {
  	return;
  }
  if(selectedGrid.h >= HEIGHT) {
  	return;
  }
  console.log("before="+selectedGrid.gridStyle);
  var nextGridStyle = "s"+selectedGrid.w+"x"+(selectedGrid.h+1);
  $(preselected).removeClass(selectedGrid.gridStyle);
  $(preselected).addClass(nextGridStyle);
  selectedGrid = new Grid(nextGridStyle);
  console.log("changed="+selectedGrid.gridStyle);
});

$("#yoko-shukusyo").click(function() {
  if(typeof  selectedGrid === "undefined") {
  	return;
  }
  if(selectedGrid.w <= 1) {
  	return;
  }
  console.log("before="+selectedGrid.gridStyle);
  var nextGridStyle = "s"+(selectedGrid.w-1)+"x"+selectedGrid.h;
  $(preselected).removeClass(selectedGrid.gridStyle);
  $(preselected).addClass(nextGridStyle);
  selectedGrid = new Grid(nextGridStyle);
  console.log("changed="+selectedGrid.gridStyle);
});

$("#tate-shukusyo").click(function() {
  if(typeof  selectedGrid === "undefined") {
  	return;
  }
  if(selectedGrid.h <= 1) {
  	return;
  }
  console.log("before="+selectedGrid.gridStyle);
  var nextGridStyle = "s"+selectedGrid.w+"x"+(selectedGrid.h-1);
  $(preselected).removeClass(selectedGrid.gridStyle);
  $(preselected).addClass(nextGridStyle);
  selectedGrid = new Grid(nextGridStyle);
  console.log("changed="+selectedGrid.gridStyle);
});

// 縦書き・横書きスタイルの切り替え
$("#vertical-button").click(function() {
	$(preselected).addClass('vertical2');
});
$("#horizontal-button").click(function() {
	$(preselected).removeClass('vertical2');
});

// 任意のClass情報からグリッド情報を取得
function getAnyGridInfo(gridClasses) {
  var thisGridStyle;
  for (i=0; i < gridClasses.length; i++){
    var regsty = gridClasses[i].match(/^s[0-9]x[0-9]$/);
    if (regsty)thisGridStyle = regsty.toString();
  }
  console.log(thisGridStyle);

  // 未定義なら終了
  if(typeof  thisGridStyle === "undefined" ) {
  	return grid;
  }
  grid = new Grid(thisGridStyle);
  console.log("w="+grid.w+",h="+grid.h);
  return grid;
}

// Grid表現
function Grid(gridStyle){
	this.gridStyle = gridStyle;
	//console.log("p="+gridPosition+",s="+gridStyle);
	this.w = parseInt(gridStyle.charAt(1) );
	this.h = parseInt(gridStyle.charAt(3) );
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

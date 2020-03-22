if ($file.exists("shared://SakuraAnime/fav.txt") == false) {
  $file.write({
    data: $data({ string: "[]" }),
    path: "shared://SakuraAnime/fav.txt"
  });
}

//$cache.clear();

$cache.set("download", []);

$cache.remove("nowTotal");

$file.mkdir("shared://SakuraAnime/download/");

var ua =
  "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";
var width = $device.info.screen.width;
var height = $device.info.screen.height;

if (typeof $cache.get("history") == "undefined") {
  $cache.set("history", []);
}

if (typeof $cache.get("jshis") == "undefined") {
  //alert("")
  $cache.set("jshis", []);
}

if (typeof $cache.get("xzjd") == "undefined") {
  //alert("")
  $cache.set("xzjd", true);
}

if (typeof $cache.get("wyxs") == "undefined") {
  $cache.set("wyxs", false);
}

var date0 = [];
var date1 = [];
var date2 = [];
var date3 = [];
var date4 = [];
var date5 = [];
var date6 = [];
var iml = [];

function addzhuifan(dd) {
  var data = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
  var jjd = 0;
  for (i in data) {
    if (data[i].label.text == dd.label.text) {
      data.splice(i, 1);
      data.splice(i, 0, dd);
      var jjd = 1;
      break;
    }
  }
  if (jjd == 0) data.unshift(dd);
  $file.write({
    data: $data({ string: JSON.stringify(data) }),
    path: "shared://SakuraAnime/fav.txt"
  });
  zfrefresh();
}

function addHis(data, hhh) {
  var his = $cache.get("history");
  for (i in his) {
    if (his[i].label.text == data.label.text) {
      his.splice(i, 1);
    }
  }
  his.unshift(data);
  $cache.set("history", his);
  $("m1").data = his;
  var his = $cache.get("jshis");
  his.push(hhh);
  $cache.set("jshis", his);
}

function zfrefresh() {
  var file = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
  for (i in file) {}
  $("m3").data = file;
}

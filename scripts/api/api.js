if ($file.exists("shared://SakuraAnime/fav.txt") == false) {
  $file.write({
    data: $data({ string: "[]" }),
    path: "shared://SakuraAnime/fav.txt"
  });
}

var color = {
  red: $color("#FF0000"),
  green: $color("#32CD32"),
  blue: $color("#3399FF")
};

//$cache.clear();

$cache.set("download", []);

$cache.remove("nowTotal");

$file.mkdir("shared://SakuraAnime/download/");

var ua = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)";
var width = $device.info.screen.width;
var height = $device.info.screen.height;

if (typeof $cache.get("history") == "undefined") {
  $cache.set("history", []);
}

if (typeof $cache.get("jshis") == "undefined") {
  $cache.set("jshis", []);
}

if (typeof $cache.get("xzjd") == "undefined") {
  $cache.set("xzjd", true);
}

if (typeof $cache.get("wyxs") == "undefined") {
  $cache.set("wyxs", false);
}

if (typeof $cache.get("searchHis") == "undefined") {
  $cache.set("searchHis", []);
}

if (typeof $cache.get("animeUpdate") == "undefined") {
  $cache.set("animeUpdate", true);
}

if (typeof $cache.get("watchProgress") == "undefined") {
  $cache.set("watchProgress", new Object());
}

if (typeof $cache.get("jumpop") == "undefined") {
  $cache.set("jumpop", new Object());
}

if (typeof $cache.get("autoProgress") == "undefined") {
  $cache.set("autoProgress", true);
}

if (typeof $cache.get("jumpOP") == "undefined") {
  $cache.set("jumpOP", true);
}

if (typeof $cache.get("favLength") == "undefined") {
  $cache.set("favLength", 0);
}

if (typeof $cache.get("gxjs") == "undefined") {
  $cache.set("gxjs", new Object());
}

if (typeof $cache.get("tomPush") == "undefined") {
  $cache.set("tomPush", {
    date: null,
    check: 0
  });
}

var date = new Date();
if (date.getDate() != $cache.get("tomPush").date) {
  $cache.set("tomPush", {
    date: date.getDate(),
    check: 0
  });
}

if (typeof $cache.get("todayCheck") == "undefined") {
  $cache.set("todayCheck", {
    date: null,
    check: new Object()
  });
}

var date = new Date();
if (date.getDate() != $cache.get("todayCheck").date) {
  $cache.set("todayCheck", {
    date: date.getDate(),
    check: new Object()
  });
}

if (typeof $cache.get("tomCheck") == "undefined") {
  $cache.set("tomCheck", {
    date: null,
    check: new Object()
  });
}

var date = new Date();
if (date.getDate() != $cache.get("tomCheck").date) {
  $cache.set("tomCheck", {
    date: date.getDate(),
    check: new Object()
  });
}

delete date

var apps = [
  {
    name: "nPlayer",
    url: "nplayer-"
  },
  {
    name: "APlayer",
    url: "alookplayer://"
  },
  {
    name: "PlayerXtreme",
    url: "playerxtreme://"
  },
  {
    name: "VLC播放器",
    url: "vlc://"
  }
];

if (typeof $cache.get("defaultPlayer") == "undefined") {
  $cache.set("defaultPlayer", ["关闭"]);
}

//var a = apps.map(function(item){
//  return item.name
//})
//console.log(a)

var date0 = [];
var date1 = [];
var date2 = [];
var date3 = [];
var date4 = [];
var date5 = [];
var date6 = [];
var iml = [];

//老版本数据迁移
var list = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
for (i in list) {
  var item = list[i];
  if (typeof item.status == "undefined") {
    list[i].status = 0;
  }
  if (typeof item.isEnd == "undefined") {
    if (typeof item.gxrq == "undefined") {
      list[i].isEnd = 1;
    } else list[i].isEnd = 0;
  }
}
$file.write({
  data: $data({ string: JSON.stringify(list) }),
  path: "shared://SakuraAnime/fav.txt"
});
delete list

//后台检测更新
if ($cache.get("animeUpdate")) {
  $thread.background(function() {
    var file = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
    var data = [];
    for (i in file) {
      var item = file[i];
      if (item.isEnd == 0) {
        data.push(item);
      }
    }
    var cache = $cache.get("gxjs");
    console.log("检测番剧更新...");
    if (typeof data[0] != "undefined") {
      var count = 0;
      check();
      function check() {
        $http.get({
          url: data[count].href,
          handler: resp => {
            var dd = resp.data;
//            console.log(dd)
            var dt2 = dd.replace(/\s/g, "");
            var aaa = dt2.match(/movurl\"id=\"play_0.*?<\/div>/)[0];
            var js = aaa.match(/href=\'\/player.*?<\/a>/g).length;
            cache[data[count].href] = js;
            var gx = dt2
              .match(/动漫<\/a><\/span><p>.*?<\/p>/)[0]
              .replace("动漫</a></span><p>", "")
              .replace("</p>", "");
            if (!gx.match(/周./)) {
              var list = JSON.parse(
                $file.read("shared://SakuraAnime/fav.txt").string
              );
              for (i in list) {
                if (list[i].href == data[count].href) list[i].isEnd = 1;
              }
              $file.write({
                data: $data({ string: JSON.stringify(list) }),
                path: "shared://SakuraAnime/fav.txt"
              });
            }
            var gxsj = gx.match(/\d\d\:\d\d/);
            if (gxsj) {
              var list = JSON.parse(
                $file.read("shared://SakuraAnime/fav.txt").string
              );
              for (i in list) {
                if (list[i].href == data[count].href) list[i].gxsj = gxsj[0];
              }
              $file.write({
                data: $data({ string: JSON.stringify(list) }),
                path: "shared://SakuraAnime/fav.txt"
              });
            }
            count += 1;
            console.log(count);
            if (count < data.length) {
              check();
            } else {
              $cache.set("gxjs", cache);
              if ($("m3")) zfrefresh($("zfMenu").index);
            }
          }
        });
      }
    }
  });
}

//转换代码来自网络
function change(limit) {
  var size = "";
  if (limit < 0.1 * 1024) {
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  var sizeStr = size + "";
  var index = sizeStr.indexOf(".");
  var dou = sizeStr.substr(index + 1, 2);
  if (dou == "00") {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
}

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
  if (typeof dd.status == "undefined") {
    dd.status = 0;
  }
  if (typeof dd.isEnd == "undefined") {
    if (typeof dd.gxrq == "undefined") {
      dd.isEnd = 1;
    } else dd.isEnd = 0;
  }
  if (jjd == 0) data.unshift(dd);
  $file.write({
    data: $data({ string: JSON.stringify(data) }),
    path: "shared://SakuraAnime/fav.txt"
  });
  zfrefresh($("zfMenu").index);
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
  $("m1").data = his.splice(0, 5);
  var his = $cache.get("jshis");
  his.push(hhh);
  $cache.set("jshis", his);
}

function zfrefresh(mode = 0) {
  var file, data;
  var data = [];
  var file = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
  var date = new Date();
  var cache = $cache.get("gxjs");
  for (i in file) {
    var signText;
    var item = file[i];
    var distance = date.getDay() - item.gxrq;
    var jsd = cache[item.href] - item.xzjs;
    if (distance == 6) distance = -1;
    if (typeof item.gxrq != "undefined") {
      if (distance == -1) {
        if ($cache.get("tomPush").check == 0 && typeof item.gxsj != "undefined") {
          var dt = new Date();
          dt.setDate(dt.getDate() + 1);
          dt.setHours(item.gxsj.split(":").shift())
          dt.setMinutes(item.gxsj.split(":").pop())
//          $push.schedule({
//            title: `你追的番剧[${item.label.name}]即将更新!`,
//            body: "快来看看吧",
//            date: date,
//            handler: function(result) {
//              var id = result.id;
//            }
//          });
        }
        if ($cache.get("tomCheck").check[item.href] != 1) {
          signText = "";
          bgColor = color.blue;
        } else {
          signText = "";
          bgColor = $color("clear");
        }
      } else if (distance == 0) {
        if ($cache.get("todayCheck").check[item.href] != 1) {
          signText = "!";
          bgColor = color.red;
        } else {
          signText = "";
          bgColor = $color("clear");
        }
      } else {
        if (Boolean(jsd)) {
          signText = jsd;
          bgColor = color.green;
        } else {
          signText = "";
          bgColor = $color("clear");
        }
      }
    } else {
      if (Boolean(jsd)) {
        signText = jsd;
        bgColor = color.green;
      } else {
        signText = "";
        bgColor = $color("clear");
      }
    }
    item.sign = {
      text: signText
    };
    item.bgView = {
      bgcolor: bgColor
    };
    switch (mode) {
      case 0:
        data = file;
        data[i].sign = {
          text: signText
        };
        data[i].bgView = {
          bgcolor: bgColor
        };
        break;
      case 1:
        if (item.status == 0) {
          data.push(item);
        }
        break;
      case 2:
        if (item.status == 1) {
          data.push(item);
        }
        break;
      case 3:
        if (item.isEnd == 0) {
          data.push(item);
        }
        break;
      case 4:
        if (item.isEnd == 1) {
          item.sign = {
            text: ""
          };
          item.bgView = {
            bgcolor: $color("clear")
          };
          data.push(item);
        }
        break;
    }
  }
  //  data.sort(function(a,b){
  //    if (b.sign.text == "!"){
  //      console.log(1)
  //      return 1
  //    } else {
  //      return 0
  //    }
  //  })
  $cache.set("favLength", data.length);
  $("m3").data = data;
  $("view2").reload();
  var ccccc = $cache.get("tomPush")
  ccccc.check = 1
  $cache.set("tomPush",ccccc)
}
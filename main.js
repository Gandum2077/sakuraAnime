require("/scripts/encode(gbk)");
$include("/scripts/loading");
$include("/scripts/ui/shadow");
$include("/scripts/api/update");
$include("/scripts/det");
$include("/scripts/api/search");
$include("/scripts/api/api");
$include("/scripts/contact");
$include("/scripts/dashang");
$include("/scripts/history");
$include("/scripts/ui/view3");
$include("/scripts/ui/view1");
$include("/scripts/ui/view2");
$include("/scripts/ui/tab");
$include("/scripts/ui/line");
$include("/scripts/downloads");
$include("/scripts/api/play");
$include("/scripts/api/download");
$include("/scripts/ui/header");
$include("/scripts/searchView");
$include("/scripts/ui/toast");

$http.get({
  url: "http://www.imomoe.in/",
  ua: ua,
  handler: function(resp) {
    var data = resp.data.replace(/\s/g, "");
    var r = data
      .match(/最新更新.*?日本动漫/)[0]
      .match(/<li><ahref=\".*?<\/p><\/li>/g);
    var gxbr = data.match(/<divclass=\"tists\">.*?<\/div>/)[0].split("</ul>");
    for (i in gxbr) {
      var fen = gxbr[i].match(/<li>.*?<\/li>/g);
      for (a in fen) {
        var ffen = fen[a].split("</span>");
        var jishu = ffen[0]
          .match(/ahref.*?<\/a>/)[0]
          .replace(/ahref=\"\/view\/.+\.html\">/, "")
          .replace("</a>", "");
        var title = ffen[1]
          .match(/title.*?<\/a>/)[0]
          .replace(/title=\".+\">/, "")
          .replace("</a>", "");
        var hhref = ffen[0].match(/\/view.*?html/)[0];
        var all = {
          l1: {
            text: title
          },
          l2: {
            text: jishu
          },
          h: hhref
        };
        switch (parseInt(i)) {
          case 0:
            date0.push(all);
            break;
          case 1:
            date1.push(all);
            break;
          case 2:
            date2.push(all);
            break;
          case 3:
            date3.push(all);
            break;
          case 4:
            date4.push(all);
            break;
          case 5:
            date5.push(all);
            break;
          case 6:
            date6.push(all);
            break;
        }
      }
    }
    var mydate = new Date();
    var myddy = mydate.getDay() - 1;
    if (myddy == -1) myddy = 6;
    switch (parseInt(myddy)) {
      case 0:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date0;
        break;
      case 1:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date1;
        break;
      case 2:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date2;
        break;
      case 3:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date3;
        break;
      case 4:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date4;
        break;
      case 5:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date5;
        break;
      case 6:
        $("sjbmenu").index = myddy;
        $("sjblist").data = date6;
        break;
    }
    $("mainList").reload();
    for (a in r) {
      var b = r[a].match(/<li><ahref=.*?<\/p><\/li>/);
      var name = b[0]
        .match(/alt=\".*?\"/)[0]
        .replace('alt="', "")
        .replace('"', "");
      var url = b[0].match(/http.*?\"alt/)[0].replace('"alt', "");
      var href = b[0].match(/view.*?html/)[0];
      iml.push({
        label: {
          text: name
        },
        image: {
          src: url
        },
        href: "http://www.imomoe.in/" + href
      });
    }
    $("m2").data = iml;
    $cache.set("recentUpdate", iml);
  }
});

$ui.render({
  props: {
    title: "樱花动漫",
    id: "window",
    navBarHidden: true,
    statusBarStyle: 0
  },
  views: [
    {
      type: "view",
      layout: function(make, view) {
        make.edges.equalTo(view.super.safeArea);
      },
      views: [Header, View1, View2, View3]
    },
    Tabs,
    line
  ]
});

$("m2").data = $cache.get("recentUpdate");

zfrefresh()
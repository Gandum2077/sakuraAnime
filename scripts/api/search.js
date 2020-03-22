function search(text) {
  $("loading_lottie").play();
  $ui.animate({
    duration: 0.4,
    animation: function() {
      $("hisView").alpha = 0;
    },
    completion: function() {
      
    }
  });
  $http.get({
    url:
      "http://www.imomoe.in/search.asp?page=1&searchword=" +
      ecodeURI(text) +
      "&searchtype=-1",
    handler: function(resp) {
      var data = resp.data.replace(/\s/g, "");
      if (data.indexOf("对不起，没有找到任何记录") == -1) {
        var pages = data
          .match(/页次:[0-9]+\/[0-9]+页/)[0]
          .match(/[0-9]+\/[0-9]+/)[0];
        var r = data
          .match(/divclass=\"pics.*?WRITE_right_ad3/)[0]
          .match(/<li><ahref=\".*?<\/p><\/li>/g);
        var sml = [];
        for (a in r) {
          var b = r[a].match(/<li><ahref=.*?<\/p><\/li>/);
          var bm = b[0]
            .match(/<\/h2><span>.*?<\/span>/)[0]
            .replace("</h2><span>", "")
            .replace("</span>", "");
          var ms = b[0]
            .match(/<\/span><span>.*?<\/span>/)[0]
            .replace("<span>", "")
            .replace(/<\/span>/g, "")
            .replace("类型：", " 类型：");
          var jj = b[0]
            .match(/<\/span><p>.*?<\/p><\/li>/)[0]
            .replace("</span><p>", "")
            .replace("</p></li>", "");
          var name = b[0]
            .match(/alt=\".*?\"/)[0]
            .replace('alt="', "")
            .replace('"', "");
          if (b[0].match(/http.*?\"alt/))
            var url = b[0].match(/http.*?\"alt/)[0].replace('"alt', "");

          var href = b[0].match(/view.*?html/)[0];
          sml.push({
            label: {
              text: name
            },
            image: {
              src: url
            },
            bm: {
              text: bm
            },
            ms: {
              text: ms
            },
            jj: {
              text: jj
            },
            href: "http://www.imomoe.in/" + href
          });
        }
        $("pageLabel").text = pages;
        $("slist").data = sml;
      } else {
        customTosat("对不起，没有找到任何记录");
        $("slist").data = [];
        $("pageLabel").text = "";
      }
      $ui.animate({
        duration: 0.4,
        animation: function() {
          $("loading_lottie").alpha = 0;
          $("slist").alpha = 1;
        },
        completion: function() {
          $("loading_lottie").stop();
          $("loading_lottie").alpha = 1;
          $("hisView").alpha = 1;
          
        }
      });
    }
  });
}
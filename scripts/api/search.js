function search(text) {
  loading.start("window");
  $http.get({
    url: "http://www.imomoe.in/search.asp?page=1&searchword=" + encodeURI(text) + "&searchtype=-1",
    handler: function(resp) {
      console.log(encodeURI(text))
      loading.stop();
      var data = resp.data.replace(/\s/g, "");
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
      $delay(0.4, function() {
        searchR(sml, text);
      });
    }
  });
}

function searchR(sml, k) {
  var page = 1;
  $ui.push({
    props: {
      id: "window1",
      title: k + " 搜索结果"
    },
    views: [{
      type: "list",
      props: {
        id: "slist",
        rowHeight: 180,
        template: [{
            type: "image",
            props: {
              id: "image",
              radius: 5
            },
            layout: function(make, view) {
              make.top.bottom.inset(5);
              make.left.inset(10);
              make.width.equalTo(105);
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              font: $font("bold", 17)
            },
            layout: function(make, view) {
              make.top.right.inset(10);
              make.left.equalTo($("image").right).inset(5);
            }
          },
          {
            type: "label",
            props: {
              id: "bm",
              font: $font(15),
              textColor: $color("gray")
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.left.equalTo($("image").right).inset(5);
              make.top.equalTo($("label").bottom).inset(10);
            }
          },
          {
            type: "label",
            props: {
              id: "ms",
              font: $font(15)
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.left.equalTo($("image").right).inset(5);
              make.top.equalTo($("bm").bottom).inset(10);
            }
          },
          {
            type: "label",
            props: {
              id: "jj",
              font: $font(15)
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.left.equalTo($("image").right).inset(5);
              make.top.equalTo($("ms").bottom).inset(10);
            }
          }
        ],
        data: sml
      },
      layout: $layout.fill,
      events: {
        didSelect(sender, indexPath, data) {
          loading.start("window1");
          det(sender.data[indexPath.row].href, sender.data[indexPath.row].image.src);
        },
        didReachBottom: function(sender) {
          $ui.toast("加载中...");
          page++;
          nextPage(page);
        }
      }
    }]
  });

  function nextPage(p) {
    $http.get({
      url: "http://www.imomoe.in/search.asp?page=" +
        p +
        "&searchword=" +
        encodeURI(k) +
        "&searchtype=-1",
      handler: function(resp) {
        console.log(resp.data)
        $("slist").endFetchingMore();
        var data = resp.data.replace(/\s/g, "");
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
          //sml.push();
          $("slist").insert({
            index: $("slist").data.length,
            value: {
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
            }
          });
        }
      }
    });
  }
}

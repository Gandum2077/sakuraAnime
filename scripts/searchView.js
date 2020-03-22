function searchView() {
  var FlowLayout = require("./components/flowlayout");
  var idManager = require("./utils/id");
  var flowLayout = new FlowLayout({
    props: {
      id: "searchHisList",
      data: $cache.get("searchHis"),
      spacing: 10,
      bgcolor: $color("clear"),
      template: {
        props: {
          bgcolor: $color("#EBEBEB"),
          radius: 15
        }
      }
    },
    layout: $layout.fill,
    events: {
      didScroll: function(sender) {
        console.info(1);
      },
      didSelect: (sender, indexPath, data) => {
        search(data);
        $("search_input").blur();
        keyword = data;
        page = 1;
        $("search_input").text = data;
        $("search_hint").hidden = true;
        $delay(0.4, function() {
          addSearchHistory(data);
        });
      },
      didLongPress: (sender, indexPath, data) => {
        $ui.alert({
          title: "删除此记录?",
          message: `"${data}"`,
          actions: [
            {
              title: "取消",
              handler: function() {}
            },
            {
              title: "确定",
              handler: function() {
                deleteItem(data);
              }
            }
          ]
        });
      }
    }
  });
  var keyword = "";
  var page = 1;
  $ui.push({
    props: {
      id: "searchWindow",
      clipsToSafeArea: true,
      navBarHidden: true,
      statusBarStyle: 0
    },
    views: [
      {
        type: "view",
        props: {
          id: "header"
        },
        layout: function(make, view) {
          make.right.left.top.equalTo(0);
          make.height.equalTo(50);
        },
        views: [
          {
            type: "button",
            props: {
              id: "cancelBtn",
              title: "取消",
              bgcolor: $color("clear"),
              titleColor: $color("gray"),
              font: $font(17)
            },
            layout: function(make, view) {
              make.width.equalTo(35);
              make.right.inset(10);
              make.centerY.equalTo(view.super);
            },
            events: {
              tapped: function() {
                $("search_hint").hidden = false;
                $("search_input").text = "";
                if ($("slist").alpha == 0) {
                  $ui.pop();
                } else {
                  $ui.animate({
                    duration: 0.4,
                    animation: function() {
                      $("slist").alpha = 0;
                    }
                  });
                }
              }
            }
          },
          {
            type: "view",
            layout: function(make, view) {
              make.left.inset(13);
              make.top.bottom.inset(10);
              make.right.equalTo($("cancelBtn").left).offset(-10);
            },
            views: [
              {
                type: "view",
                props: {
                  bgcolor: $color("#EFEFEF"),
                  radius: 10
                },
                layout: function(make, view) {
                  make.centerY.equalTo(view.super);
                  make.left.right.inset(0);
                  make.height.equalTo(35);
                },
                views: [
                  {
                    type: "image",
                    props: {
                      icon: $icon(
                        "023",
                        $rgba(100, 100, 100, 0.4),
                        $size(15, 15)
                      ),
                      bgcolor: $color("clear")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.left.inset(7);
                      make.size.equalTo($size(15, 15));
                    }
                  },
                  {
                    type: "input",
                    props: {
                      id: "search_input",
                      bgcolor: $color("clear"),
                      tintColor: $rgb(213, 213, 213)
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(0);
                      make.height.equalTo(view.super);
                      make.left.equalTo(view.prev.right).inset(0);
                      make.width.equalTo(view.frame.width - 22);
                    },
                    events: {
                      changed: function(sender) {
                        if (sender.text.length > 0) {
                          $("search_hint").hidden = true;
                        } else {
                          $("search_hint").hidden = false;
                          if ($("slist").alpha == 1) {
                            $ui.animate({
                              duration: 0.4,
                              animation: function() {
                                $("slist").alpha = 0;
                              }
                            });
                          }
                        }
                      },
                      returned: function(sender) {
                        sender.blur();
                        search(sender.text);
                        page = 1;
                        keyword = sender.text;
                        $delay(0.4, function() {
                          addSearchHistory(sender.text);
                        });
                      },
                      ready: function(sender) {
                        if (Number($device.info.version) < 13) {
                          sender.focus();
                        }
                      }
                    },
                    views: [
                      {
                        type: "label",
                        props: {
                          id: "search_hint",
                          text: "搜索动漫",
                          align: $align.center,
                          textColor: $color("lightGray"),
                          font: $font(15)
                        },
                        layout: function(make, view) {
                          make.left.inset(8);
                          make.centerY.equalTo(view.super);
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        type: "view",
        props: {
          id: "hisView"
        },
        layout: function(make, view) {
          make.top.equalTo($("header").bottom);
          make.left.right.bottom.inset(0);
        },
        views: [
          {
            type: "label",
            props: {
              text: "搜索历史",
              font: $font("bold", 18),
              id: "searchLabel"
            },
            layout: (make, view) => {
              make.top.inset(15);
              make.left.right.inset(15);
              make.height.equalTo(20);
            }
          },
          {
            type: "view",
            props: {
              id: "searchHisView"
            },
            layout: function(make, view) {
              make.top.equalTo($("searchLabel").bottom).offset(10);
              make.left.right.bottom.inset(0);
            },
            events: {
              ready: function(sender) {
                sender.relayout();
                sender.add(flowLayout.definition);
              }
            }
          }
        ]
      },
      {
        type: "list",
        props: {
          id: "slist",
          rowHeight: 155,
          alpha: 0,
          separatorHidden: true,
          template: [
            {
              type: "image",
              props: {
                id: "image",
                radius: 5
              },
              layout: function(make, view) {
                make.top.bottom.inset(5);
                make.left.inset(10);
                make.width.equalTo(95);
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
                font: $font(14),
                textColor: $color("gray")
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.left.equalTo($("image").right).inset(5);
                make.top.equalTo($("label").bottom).inset(5);
              }
            },
            {
              type: "label",
              props: {
                id: "ms",
                font: $font(14),
                textColor: $color("gray")
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.left.equalTo($("image").right).inset(5);
                make.top.equalTo($("bm").bottom).inset(5);
              }
            },
            {
              type: "label",
              props: {
                id: "jj",
                font: $font(14),
                textColor: $color("gray"),
                lines: 3
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.left.equalTo($("image").right).inset(5);
                make.top.equalTo($("ms").bottom).inset(5);
              }
            }
          ],
          footer: {
            type: "label",
            props: {
              id: "pageLabel",
              height: 30,
              textColor: $color("#AAAAAA"),
              align: $align.center,
              font: $font(12)
            }
          }
        },
        layout: function(make, view) {
          make.top.equalTo($("header").bottom);
          make.right.left.bottom.inset(0);
        },
        events: {
          didSelect(sender, indexPath, data) {
            loading.start("searchWindow");
            det(
              sender.data[indexPath.row].href,
              sender.data[indexPath.row].image.src
            );
          },
          didReachBottom: function(sender) {
            page++;
            if (
              $("pageLabel")
                .text.split("/")
                .pop() !==
              $("pageLabel")
                .text.split("/")
                .shift()
            )
              nextPage(page);
          }
        }
      },
      {
        type: "lottie",
        props: {
          id: "loading_lottie",
          src: "assets/loading.json",
          loop: true
        },
        layout: (make, view) => {
          make.size.equalTo(200);
          make.center.equalTo(view.super);
        }
      }
    ]
  });

  function nextPage(p) {
    $("loading_lottie").play();
    $http.get({
      url:
        "http://www.imomoe.in/search.asp?page=" +
        p +
        "&searchword=" +
        ecodeURI(keyword) +
        "&searchtype=-1",
      handler: function(resp) {
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
          $("pageLabel").text = data
            .match(/页次:[0-9]+\/[0-9]+页/)[0]
            .match(/[0-9]+\/[0-9]+/)[0];
          $ui.animate({
            duration: 0.4,
            animation: function() {
              $("loading_lottie").alpha = 0;
            },
            completion: function() {
              $("loading_lottie").stop();
              $("loading_lottie").alpha = 1;
            }
          });
        }
      }
    });
  }

  function addSearchHistory(text) {
    var data = $cache.get("searchHis");
    var isRepeat = false;
    for (i in data) {
      if (data[i] == text) {
        var item = data[i];
        isRepeat = true;
        data.splice(i, 1);
        data.unshift(item);
      }
    }
    if (!isRepeat) {
      data.unshift(text);
    }
    $cache.set("searchHis", data);
    flowLayout.data = data;
  }

  function deleteItem(text) {
    var data = $cache.get("searchHis");
    for (i in data) {
      if (data[i] == text) {
        data.splice(i, 1);
      }
    }
    $cache.set("searchHis", data);
    flowLayout.data = data;
  }
}

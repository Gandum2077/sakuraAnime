function det(href, isrc, mode = 0) {
  var hdj = [];
  $http.get({
    url: href,
    handler: function(resp) {
      var data = resp.data;
      var dt2 = data.replace(/\s/g, "");
      var a = data.match(/alex.*?bofeng/g);
      var ms = data
        .match(/class=\"info\">.*?<\/div>/)[0]
        .replace('class="info">', "")
        .replace("</div>", "");
      var gx = dt2
        .match(/动漫<\/a><\/span><p>.*?<\/p>/)[0]
        .replace("动漫</a></span><p>", "")
        .replace("</p>", "");
      var name = data
        .match(/class=\"names\">.*?<\/span>/)[0]
        .replace('class="names">', "")
        .replace("</span>", "");
      var dq = data
        .match(/<span>地区：<a.*?<\/a>/)[0]
        .match(/searchword=.+\">.*?<\/a>/)[0]
        .match(/\">.*?<\/a>/)[0]
        .replace('">', "")
        .replace("</a>", "");
      var nd = data
        .match(/<span>年代：<a.*?<\/a>/)[0]
        .match(/searchword=.+\">.*?<\/a>/)[0]
        .match(/\">.*?<\/a>/)[0]
        .replace('">', "")
        .replace("</a>", "");
      var bq = data
        .match(/<span>标签：<a.*?<\/a>/)[0]
        .match(/searchword=.+\">.*?<\/a>/)[0]
        .match(/\">.*?<\/a>/)[0]
        .replace('">', "")
        .replace("</a>", "");
      var lx = data
        .match(/<span>类型：<a.*?<\/span>/)[0]
        .match(/searchword=.+\">.*?<\/a>/)[0]
        .match(/\">.*?<\/a>/g);
      var llx = "";
      lx.map(function(v, i) {
        if (i == 0) {
          llx = v.replace('">', "").replace("</a>", "");
        } else llx = llx + " " + v.replace('">', "").replace("</a>", "");
      });
      var aaa = dt2.match(/movurl\"id=\"play_0.*?<\/div>/)[0];
      var js = aaa.match(/href=\'\/player.*?<\/a>/g);
      var hdj = [];
      js.map(function(v, i) {
        var h = v
          .match(/href.*?target/)[0]
          .replace("href='", "")
          .replace("'target", "");
        var j = v
          .match(/_blank.*?<\/a>/)[0]
          .replace('_blank">', "")
          .replace("</a>", "");
        var jdg = false;
        for (i in $cache.get("jshis")) {
          if ($cache.get("jshis")[i] == h) {
            hdj.push({
              label: {
                text: j,
                textColor: $color("gray")
              },
              tick: {
                hidden: true
              },
              spinner: {
                loading: false
              },
              h: h
            });
            var jdg = true;
            break;
          }
        }
        if (jdg == false) {
          hdj.push({
            label: {
              text: j
            },
            tick: {
              hidden: true
            },
            spinner: {
              loading: false
            },
            h: h
          });
        }
      });
      var hdj1 = [];
      var bbb = dt2.match(/movurl\"id=\"play_1.*?<\/div>/);
      if (bbb) {
        var js1 = bbb[0].match(/href=\'\/player.*?<\/a>/g);
        js1.map(function(v, i) {
          var h = v
            .match(/href.*?target/)[0]
            .replace("href='", "")
            .replace("'target", "");
          var j = v
            .match(/_blank.*?<\/a>/)[0]
            .replace('_blank">', "")
            .replace("</a>", "");
          var jdg = false;
          for (i in $cache.get("jshis")) {
            if ($cache.get("jshis")[i] == h) {
              hdj1.push({
                label: {
                  text: j,
                  textColor: $color("gray")
                },
                tick: {
                  hidden: true
                },
                spinner: {
                  loading: false
                },
                h: h
              });
              var jdg = true;
              break;
            }
          }
          if (jdg == false) {
            hdj1.push({
              label: {
                text: j
              },
              tick: {
                hidden: true
              },
              spinner: {
                loading: false
              },
              h: h
            });
          }
        });
      }
      var mydate = new Date();
      var myddy = mydate.getDay();
      var dateTable = {
        周日: 0,
        周一: 1,
        周二: 2,
        周三: 3,
        周四: 4,
        周五: 5,
        周六: 6
      };
      var xingqi = gx.match(/周./);
      var gxts = "";
      if (xingqi) {
        var num = dateTable[xingqi];
        if (num > myddy) {
          if (num - myddy == 1) {
            var tomC = $cache.get("tomCheck");
            tomC.check[href] = 1;
            tomC.date = mydate.getDate();
            $cache.set("tomCheck", tomC);
            var gxts = "明天更新";
          } else if (num - myddy == 2) {
            var gxts = "后天更新";
          } else {
            var gxts = String(num - myddy) + "天后更新";
          }
        } else if (num < myddy) {
          if (6 - myddy + num + 1 == 1) {
            var tomC = $cache.get("tomCheck");
            tomC.check[href] = 1;
            tomC.date = mydate.getDate();
            $cache.set("tomCheck", tomC);
            var gxts = "明天更新";
          } else if (6 - myddy + num + 1 == 2) {
            var gxts = "后天更新";
          } else {
            var gxts = String(6 - myddy + num + 1) + "天后更新";
          }
        } else {
          var todayC = $cache.get("todayCheck");
          todayC.check[href] = 1;
          todayC.date = mydate.getDate();
          $cache.set("todayCheck", todayC);
          var gxts = "今天更新";
        }
        var gx = gx + "   (" + gxts + ")";
      }
      var dqnd = "地区：" + dq + "     年代：" + nd;
      var yylx = "语言：" + bq + "     类型：" + llx;
      var cc = $cache.get("gxjs");
      cc[href] = js.length;
      $cache.set("gxjs", cc);
      zfrefresh($("zfMenu").index);
      loading.stop();
      $delay(0.4, function() {
        kkk(
          isrc,
          name,
          dqnd,
          yylx,
          gx,
          hdj,
          ms,
          hdj1,
          dateTable[xingqi],
          href,
          dt2
        );
      });
    }
  });

  function kkk(isrc, name, dqnd, yylx, gx, hdj, ms, hdj1, gxrq, uurl, webHtml) {
    var listHeight = 0;
    var lllll = 0;
    $ui.push({
      props: {
        navBarHidden: true,
        statusBarStyle: 0
      },
      views: [
        {
          type: "view",
          layout: (make, view) => {
            make.edges.equalTo(view.super.safeArea);
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
                    title: "返回",
                    bgcolor: $color("clear"),
                    titleColor: $color("tint"),
                    font: $font(18)
                  },
                  layout: function(make, view) {
                    make.height.equalTo(25);
                    make.left.inset(24);
                    make.centerY.equalTo(view.super);
                  },
                  events: {
                    tapped: function() {
                      $ui.pop();
                    }
                  }
                },
                {
                  type: "canvas",
                  layout: function(make, view) {
                    make.left.inset(9);
                    make.centerY.equalTo(view.super);
                    make.width.equalTo(13);
                    make.height.equalTo(25);
                  },
                  events: {
                    draw: function(view, ctx) {
                      var X = view.frame.width - 2;
                      var Y = view.frame.height - 2;
                      ctx.strokeColor = $color("tint");
                      ctx.moveToPoint(X, 2);
                      ctx.setLineWidth(3);
                      ctx.addLineToPoint(2, Y * 0.5);
                      ctx.addLineToPoint(X, Y - 2);
                      ctx.strokePath();
                    },
                    tapped: function() {
                      $ui.pop();
                    }
                  }
                },
                {
                  type: "button",
                  props: {
                    icon: $icon("002", $color("tint")),
                    bgcolor: $color("clear")
                  },
                  layout: function(make, view) {
                    make.right.inset(10);
                    make.width.equalTo(30);
                    make.centerY.equalTo(view.super);
                  },
                  events: {
                    tapped: function(sender) {
                      $ui.menu({
                        items: ["跳过片头设置"],
                        handler: function(title, idx) {
                          if (idx == 0) {
                            $input.text({
                              type: $kbType.number,
                              text:
                                typeof $cache.get("jumpop")[uurl] == "undefined"
                                  ? ""
                                  : $cache.get("jumpop")[uurl],
                              placeholder: "输入片头时长,格式:分.秒(例 01.13)",
                              handler: function(text) {
                                var m = text.match(/\d+\.\d+/);
                                if (m != null && (m[0].length = text.length)) {
                                  var cache = $cache.get("jumpop");
                                  cache[uurl] = text;
                                  $cache.set("jumpop", cache);
                                  customTosat("已保存");
                                } else customTosat("请输入正确的格式", true);
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                }
              ]
            },
            {
              type: "list",
              props: {
                id: "Det",
                showsVerticalIndicator: false,
                separatorHidden: true,
                bgcolor: $color("white"),
                template: [
                  {
                    type: "label",
                    props: {
                      id: "label",
                      align: $align.center
                    },
                    layout: $layout.fill
                  }
                ],
                data: [
                  {
                    rows: [
                      {
                        type: "view",
                        views: [
                          {
                            type: "image",
                            props: {
                              id: "bg",
                              src: isrc,
                              radius: 5
                            },
                            layout: function(make, view) {
                              make.height.equalTo(230);
                              make.width.equalTo(170);
                              make.centerX.equalTo(view.super);
                              make.top.inset(10);
                              //                              shadow(view, 1, 10, $size(0, 0), 5, "lightGray");
                            },
                            events: {
                              longPressed: function(info) {
                                $quicklook.open({
                                  url: isrc
                                });
                              }
                            }
                          },
                          {
                            type: "label",
                            props: {
                              id: "title",
                              text: name,
                              font: $font("bold", 21),
                              align: $align.center
                            },
                            layout: function(make, view) {
                              make.top.equalTo($("bg").bottom).inset(10);
                              make.left.right.inset(5);
                              make.height.equalTo(20);
                            }
                          },
                          {
                            type: "label",
                            props: {
                              id: "t1",
                              text: dqnd,
                              font: $font(17),
                              align: $align.center
                            },
                            layout: function(make, view) {
                              make.top.equalTo($("title").bottom).inset(10);
                              make.left.right.inset(5);
                              make.height.equalTo(20);
                            }
                          },
                          {
                            type: "label",
                            props: {
                              id: "t2",
                              font: $font(17),
                              text: yylx,
                              align: $align.center
                            },
                            layout: function(make, view) {
                              make.top.equalTo($("t1").bottom).inset(10);
                              make.left.right.inset(5);
                              make.height.equalTo(20);
                            }
                          },
                          {
                            type: "label",
                            props: {
                              id: "t3",
                              font: $font("bold", 16),
                              text: gx,
                              align: $align.center
                            },
                            layout: function(make, view) {
                              make.top.equalTo($("t2").bottom).inset(10);
                              make.left.right.inset(5);
                              make.height.equalTo(20);
                            }
                          },
                          {
                            type: "button",
                            props: {
                              title: "   追番",
                              id: "zhuifan",
                              icon: $icon(
                                "061",
                                $color("lightGray"),
                                $size(18, 18)
                              ),
                              bgcolor: $color("white"),
                              titleColor: $color("gray"),
                              font: $font("bold", 16)
                            },
                            layout: function(make, view) {
                              shadow(view, 0.4, 2, $size(1, 1), 5, "lightGray");
                              make.top.equalTo($("t3").bottom).inset(10);
                              make.right.inset(width / 2 + 5);
                              make.width.equalTo(110);
                              make.height.equalTo(35);
                            },
                            events: {
                              tapped: function(sender) {
                                if (sender.title == "   追番") {
                                  addzhuifan({
                                    label: {
                                      text: $("title").text
                                    },
                                    image: {
                                      src: isrc
                                    },
                                    href: href,
                                    gxrq: gxrq,
                                    xzjs: hdj.length
                                  });
                                  sender.title = "   已追番";
                                  sender.alpha = 0.5;
                                } else {
                                  var data = JSON.parse(
                                    $file.read("shared://SakuraAnime/fav.txt")
                                      .string
                                  );
                                  for (i in data) {
                                    if (data[i].label.text == $("title").text) {
                                      data.splice(i, 1);
                                    }
                                  }
                                  $file.write({
                                    data: $data({
                                      string: JSON.stringify(data)
                                    }),
                                    path: "shared://SakuraAnime/fav.txt"
                                  });
                                  zfrefresh($("zfMenu").index);
                                  sender.title = "   追番";
                                  sender.alpha = 1;
                                }
                              }
                            }
                          },
                          {
                            type: "button",
                            props: {
                              title: "   分享",
                              icon: $icon(
                                "022",
                                $color("lightGray"),
                                $size(18, 18)
                              ),
                              bgcolor: $color("white"),
                              titleColor: $color("gray"),
                              font: $font("bold", 16)
                            },
                            layout: function(make, view) {
                              shadow(view, 0.4, 2, $size(1, 1), 5, "lightGray");
                              make.top.equalTo($("t3").bottom).inset(10);
                              make.left.inset(width / 2 + 5);
                              make.width.equalTo(110);
                              make.height.equalTo(35);
                            },
                            events: {
                              tapped: function() {
                                $ui.menu({
                                  items: ["浏览器打开", "分享截图", "分享网页"],
                                  handler: function(title, idx) {
                                    switch (idx) {
                                      case 0:
                                        $app.openURL(uurl);
                                        break;
                                      case 1:
                                        var image = $("Det").snapshotWithScale(
                                          1
                                        );
                                        $share.sheet(image);
                                        break;
                                      case 2:
                                        $share.sheet(uurl);
                                        break;
                                    }
                                  }
                                });
                              }
                            }
                          }
                        ],
                        layout: function(make, view) {
                          make.top.right.left.inset(0);
                          make.bottom.inset(-10);
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "canvas",
                        layout: function(make, view) {
                          var preView = view.prev;
                          make.top.equalTo(preView.top);
                          make.height.equalTo(0.4);
                          make.left.right.inset(0);
                        },
                        events: {
                          draw: function(view, ctx) {
                            var width = view.frame.width;
                            var scale = $device.info.screen.scale;
                            var color = 200;
                            ctx.strokeColor = $rgb(color, color, color);
                            ctx.setLineWidth(0.4);
                            ctx.moveToPoint(10, 0);
                            ctx.addLineToPoint(width - 10, 0);
                            ctx.strokePath();
                          }
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "label",
                        props: {
                          text: "简介",
                          font: $font("bold", 20)
                        },
                        layout: function(make, view) {
                          make.top.inset(0);
                          make.left.right.inset(15);
                          make.bottom.inset(10);
                        }
                      },
                      {
                        type: "text",
                        props: {
                          id: "jianjie",
                          font: $font(18),
                          text: ms,
                          editable: false,
                          scrollEnabled: false
                        },
                        layout: function(make, view) {
                          make.top.inset(0);
                          make.left.right.inset(0);
                          make.bottom.inset(-25);
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "canvas",
                        layout: function(make, view) {
                          var preView = view.prev;
                          make.top.equalTo(preView.top);
                          make.height.equalTo(0.4);
                          make.left.right.inset(0);
                        },
                        events: {
                          draw: function(view, ctx) {
                            var width = view.frame.width;
                            var scale = $device.info.screen.scale;
                            var color = 200;
                            ctx.strokeColor = $rgb(color, color, color);
                            ctx.setLineWidth(0.4);
                            ctx.moveToPoint(10, 0);
                            ctx.addLineToPoint(width - 10, 0);
                            ctx.strokePath();
                          }
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "view",
                        layout: $layout.fill,
                        views: [
                          {
                            type: "label",
                            props: {
                              text: "播放地址1",
                              font: $font("bold", 20)
                            },
                            layout: function(make, view) {
                              make.top.inset(0);
                              make.left.right.inset(15);
                              make.bottom.inset(10);
                            }
                          },
                          {
                            type: "button",
                            props: {
                              title: "批量下载",
                              bgcolor: $color("clear"),
                              titleColor: $color("gray"),
                              font: $font(16)
                            },
                            layout: function(make, view) {
                              make.height.equalTo(25);
                              make.right.inset(33);
                              make.centerY.equalTo(view.super);
                            },
                            events: {
                              tapped: function() {
                                $include("scripts/batch");
                                batchDownload(hdj, name);
                              }
                            }
                          },
                          {
                            type: "canvas",
                            layout: function(make, view) {
                              make.right.inset(20);
                              make.centerY.equalTo(view.super);
                              make.width.equalTo(8);
                              make.height.equalTo(13);
                            },
                            events: {
                              draw: function(view, ctx) {
                                var X = view.frame.width - 2;
                                var Y = view.frame.height;
                                ctx.strokeColor = $color("lightGray");
                                ctx.moveToPoint(0, 0);
                                ctx.setLineWidth(2);
                                ctx.addLineToPoint(X, Y * 0.5);
                                ctx.addLineToPoint(0, Y);
                                ctx.strokePath();
                              },
                              tapped: function() {
                                $include("scripts/batch");
                                batchDownload(hdj, name);
                              }
                            }
                          }
                        ]
                      },
                      {
                        type: "matrix",
                        props: {
                          id: "bf1",
                          columns: 4,
                          scrollEnabled: false,
                          itemHeight: 40,
                          spacing: 5,
                          data: hdj,
                          template: {
                            props: {},
                            views: [
                              {
                                type: "label",
                                props: {
                                  id: "label",
                                  align: $align.center,
                                  font: $font(18)
                                },
                                layout: $layout.fill
                              }
                            ]
                          }
                        },
                        layout: $layout.fill,
                        events: {
                          didSelect(sender, indexPath, data) {
                            if ($cache.get("wyxs")) {
                              player(
                                "http://m.imomoe.in" + hdj[indexPath.row].h,
                                indexPath.row,
                                name + hdj[indexPath.row].label.text
                              );
                            } else
                              player1(
                                "http://m.imomoe.in" + hdj[indexPath.row].h,
                                indexPath.row,
                                name + hdj[indexPath.row].label.text,
                                uurl
                              );
                            addHis(
                              {
                                label: {
                                  text: $("title").text
                                },
                                image: {
                                  src: isrc
                                },
                                href: href
                              },
                              hdj[indexPath.row].h
                            );
                            $("m1").data = $cache.get("history");

                            $("m1").hidden = false;
                            $("ckqb").hidden = false;
                            $("myjl").hidden = true;
                          }
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "label",
                        props: {
                          text: "播放地址2",
                          font: $font("bold", 20)
                        },
                        layout: function(make, view) {
                          make.top.inset(0);
                          make.left.right.inset(15);
                          make.bottom.inset(10);
                        }
                      },
                      {
                        type: "matrix",
                        props: {
                          id: "bf2",
                          columns: 4,
                          scrollEnabled: false,
                          itemHeight: 40,
                          spacing: 5,
                          data: typeof hdj1[0] == "undefined" ? [] : hdj1,
                          bgcolor: $color("white"),
                          template: {
                            props: {},
                            views: [
                              {
                                type: "label",
                                props: {
                                  id: "label",
                                  //bgcolor: $color("#474b51"),
                                  //textColor: $color("#abb2bf"),
                                  align: $align.center,
                                  font: $font(18)
                                },
                                layout: $layout.fill
                              }
                            ]
                          }
                        },
                        layout: $layout.fill,
                        events: {
                          didSelect(sender, indexPath, data) {
                            if ($cache.get("wyxs")) {
                              player(
                                "http://www.imomoe.in" + hdj1[indexPath.row].h
                              );
                            } else
                              player1(
                                "http://www.imomoe.in" + hdj1[indexPath.row].h,
                                "",
                                "",
                                uurl
                              );
                            addHis(
                              {
                                label: {
                                  text: $("title").text
                                },
                                image: {
                                  src: isrc
                                },
                                href: href
                              },
                              hdj1[indexPath.row].h
                            );
                            $("m1").hidden = false;
                            $("ckqb").hidden = false;
                            $("myjl").hidden = true;
                            $("m1").data = $cache.get("history");
                          }
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "canvas",
                        layout: function(make, view) {
                          var preView = view.prev;
                          make.top.equalTo(preView.top);
                          make.height.equalTo(0.4);
                          make.left.right.inset(0);
                        },
                        events: {
                          draw: function(view, ctx) {
                            var width = view.frame.width;
                            var scale = $device.info.screen.scale;
                            var color = 200;
                            ctx.strokeColor = $rgb(color, color, color);
                            ctx.setLineWidth(0.4);
                            ctx.moveToPoint(10, 0);
                            ctx.addLineToPoint(width - 10, 0);
                            ctx.strokePath();
                          }
                        }
                      }
                    ]
                  },
                  {
                    rows: [
                      {
                        type: "label",
                        props: {
                          text: "评论",
                          font: $font("bold", 20)
                        },
                        layout: function(make, view) {
                          make.top.inset(0);
                          make.left.right.inset(15);
                          make.bottom.inset(10);
                        }
                      },
                      {
                        type: "view",
                        props: {
                          id: "commentView"
                        },
                        layout: $layout.fill,
                        views: [
                          {
                            type: "web",
                            props: {
                              id: "getContent",
                              url: uurl,
                              script: function() {
                                var int = self.setInterval("clock()", 1000);

                                function clock() {
                                  var comments = document.getElementById(
                                    "SOHUCS"
                                  ).innerHTML;

                                  if (comments !== "") {
                                    int = window.clearInterval(int);
                                    setTimeout(function() {
                                      var comments = document.getElementById(
                                        "SOHUCS"
                                      ).innerHTML;
                                      var con = comments.replace(/\s*/g, "");
                                      var res = con.replace(/<[^>]+>/g, "");
                                      var res1 = res.replace(/↵/g, "");
                                      var res2 = res1.replace(/[\r\n]/g, "");
                                      $notify("getHTML", res2);
                                    }, 1500);
                                  }
                                }
                              }
                            },
                            layout: function(make, view) {
                              make.left.right.top.inset(0);
                              make.height.equalTo(0);
                            },
                            events: {
                              ready: function() {
                                if (webHtml.indexOf("SOHUCS") == -1) {
                                  $("status").text = "本动漫暂未开放评论";
                                }
                              },
                              getHTML: function(object) {
                                if (object.indexOf("0条评论登录") == 0) {
                                  $("status").text = "本动漫暂无评论";
                                } else {
                                  $("getContent").html = object;
                                  var commentsList = object.split("-->-->");
                                  var data = new Array();
                                  for (i in commentsList) {
                                    var time = commentsList[i].match(
                                      /20[0-9][0-9]年[0-9]+月[0-9]+日[0-9]+:[0-9]+/
                                    );
                                    if (time !== null) {
                                      var content = commentsList[i]
                                        .split(time[0])
                                        .pop();
                                      data.push({
                                        time: {
                                          text: time[0]
                                        },
                                        content: {
                                          text: content
                                            .replace(/[0-9]+(?=[^0-9]*$)/, "")
                                            .replace(/%u[a-zA-Z0-9]+/g, "")
                                        }
                                      });
                                    }
                                  }

                                  $("commentView").add({
                                    type: "list",
                                    props: {
                                      id: "commentList",
                                      separatorHidden: true,
                                      bgcolor: $color("white"),
                                      data: data,
                                      rowHeight: 70,
                                      scrollEnabled: false,
                                      template: [
                                        {
                                          type: "label",
                                          props: {
                                            id: "time",
                                            font: $font(13),
                                            textColor: $color("gray")
                                          },
                                          layout: function(make, view) {
                                            make.top.left.inset(10);
                                          }
                                        },
                                        {
                                          type: "label",
                                          props: {
                                            id: "content",
                                            font: $font(17),
                                            lines: 0
                                          },
                                          layout: function(make, view) {
                                            make.top
                                              .equalTo($("time").bottom)
                                              .offset(5);
                                            make.left.right.bottom.inset(10);
                                          }
                                        }
                                      ]
                                    },
                                    layout: function(make, view) {
                                      make.left.right.inset(5);
                                      make.top.bottom.inset(0);
                                    },
                                    events: {
                                      rowHeight: function(sender, indexPath) {
                                        var size = $text.sizeThatFits({
                                          text:
                                            data[indexPath.row].content.text,
                                          width: width - 15,
                                          font: $font(17),
                                          lineSpacing: 6
                                        });
                                        var height = size.height + 32;
                                        listHeight += height;
                                        return height;
                                      }
                                    }
                                  });
                                  if ($("Det")) $("Det").reload();
                                }
                              }
                            }
                          },
                          {
                            type: "label",
                            props: {
                              id: "status",
                              text: "正在获取评论...",
                              textColor: $color("gray")
                            },
                            layout: function(make, view) {
                              make.center.equalTo(view.super);
                            }
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              layout: function(make, view) {
                make.right.left.bottom.inset(0);
                make.top.equalTo($("header").bottom);
              },
              events: {
                rowHeight: function(sender, indexPath) {
                  switch (indexPath.section) {
                    case 0:
                      return 410;
                      break;
                    case 1:
                      return 2;
                      break;
                    case 2:
                      if (indexPath.row == 0) {
                        return 30;
                      } else {
                        var size = $text.sizeThatFits({
                          text: ms,
                          width: width,
                          font: $font(18)
                        });
                      }
                      return size.height + 15;
                      break;
                    case 3:
                      return 2;
                      break;
                    case 4:
                      if (indexPath.row == 0) {
                        return 30;
                      } else {
                        if (isInteger(hdj.length / 4) == true) {
                          return (hdj.length / 4) * 45 + 5;
                        } else {
                          return (parseInt(hdj.length / 4) + 1) * 45 + 5;
                        }
                      }
                      break;
                    case 5:
                      if (indexPath.row == 0) {
                        return 30;
                      } else {
                        if (typeof hdj1[0] == "undefined") {
                          return 40;
                        } else {
                          if (isInteger(hdj1.length / 4) == true) {
                            return (hdj1.length / 4) * 45 + 5;
                          } else {
                            return (parseInt(hdj1.length / 4) + 1) * 45 + 5;
                          }
                        }
                      }
                      break;
                    case 6:
                      return 2;
                      break;
                    case 7:
                      if (indexPath.row == 0) {
                        return 30;
                      } else {
                        if (lllll == 0) {
                          lllll = listHeight;
                          return listHeight == 0 ? 100 : listHeight * 0.5;
                        } else return lllll * 0.5;
                      }
                      break;
                  }
                }
              }
            }
          ]
        }
      ]
    });
    var data = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
    for (i in data) {
      if (data[i].label.text == name) {
        $("zhuifan").alpha = 0.5;
        $("zhuifan").title = "   已追番";
        addzhuifan({
          label: {
            text: $("title").text
          },
          image: {
            src: isrc
          },
          href: href,
          gxrq: gxrq,
          xzjs: hdj.length
        });
      }
    }
  }
}

function isInteger(obj) {
  return obj % 1 === 0;
}
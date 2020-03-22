function det(href, isrc) {
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
            var gxts = "明天更新";
          } else if (num - myddy == 2) {
            var gxts = "后天更新";
          } else {
            var gxts = String(num - myddy) + "天后更新";
          }
        } else if (num < myddy) {
          if (6 - myddy + num + 1 == 1) {
            var gxts = "明天更新";
          } else if (6 - myddy + num + 1 == 2) {
            var gxts = "后天更新";
          } else {
            var gxts = String(6 - myddy + num + 1) + "天后更新";
          }
        } else {
          var gxts = "今天更新";
        }
        var gx = gx + "   (" + gxts + ")";
      }
      var dqnd = "地区：" + dq + "     年代：" + nd;
      var yylx = "语言：" + bq + "     类型：" + llx;

      loading.stop();
      $delay(0.4, function() {
        kkk(isrc, name, dqnd, yylx, gx, hdj, ms, hdj1, dateTable[xingqi], href);
      });
    }
  });

  function kkk(isrc, name, dqnd, yylx, gx, hdj, ms, hdj1, gxrq, uurl) {
    $ui.push({
      props: {
        title: "详情"
      },
      views: [
        {
          type: "list",
          props: {
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
                          title: "追番",
                          id: "zhuifan"
                        },
                        layout: function(make, view) {
                          make.top.equalTo($("t3").bottom).inset(10);
                          make.right.inset(width / 2 + 5);
                          make.width.equalTo(120);
                          make.height.equalTo(40);
                        },
                        events: {
                          tapped: function(sender) {
                            if (sender.title == "追番") {
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
                              sender.title = "已追番";
                              sender.bgcolor = $color("gray");
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
                                data: $data({ string: JSON.stringify(data) }),
                                path: "shared://SakuraAnime/fav.txt"
                              });
                              zfrefresh();
                              sender.title = "追番";
                              sender.bgcolor = $color("black");
                            }
                          }
                        }
                      },
                      {
                        type: "button",
                        props: {
                          title: "分享"
                        },
                        layout: function(make, view) {
                          make.top.equalTo($("t3").bottom).inset(10);
                          make.left.inset(width / 2 + 5);
                          make.width.equalTo(120);
                          make.height.equalTo(40);
                        },
                        events: {
                          tapped: function() {
                            $share.sheet(uurl);
                          }
                        }
                      }
                    ],
                    layout: $layout.fill
                  }
                ]
              },
              {
                title: "简介",
                rows: [
                  {
                    type: "text",
                    props: {
                      id: "jianjie",
                      font: $font(18),
                      text: ms,
                      editable: false
                      //scrollEnabled:false
                    },
                    layout: $layout.fill
                  }
                ]
              },
              {
                title: "播放地址1",
                rows: [
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
                              //bgcolor: $color("#474b51"),
                              //textColor: $color("#abb2bf"),
                              align: $align.center,
                              font: $font(18)
                              //textColor:$color("black")
                            },
                            layout: $layout.fill
                          }
                        ]
                      }
                    },
                    layout: $layout.fill,
                    events: {
                      didSelect(sender, indexPath, data) {
                        //alert(sender.info[indexPath.row].h)
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
                            name + hdj[indexPath.row].label.text
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
                title: "播放地址2",
                rows: [
                  {
                    type: "matrix",
                    props: {
                      id: "bf2",
                      columns: 4,
                      scrollEnabled: false,
                      itemHeight: 40,
                      spacing: 5,
                      data: typeof hdj1[0] == "undefined" ? [] : hdj1,
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
                        //alert(sender.info[indexPath.row].h)
                        if ($cache.get("wyxs")) {
                          player(
                            "http://www.imomoe.in" + hdj1[indexPath.row].h
                          );
                        } else
                          player1(
                            "http://www.imomoe.in" + hdj1[indexPath.row].h
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
              }
            ]
          },
          layout: $layout.fill,
          events: {
            rowHeight: function(sender, indexPath) {
              switch (indexPath.section) {
                case 0:
                  return 430;
                  break;
                case 1:
                  var size = $text.sizeThatFits({
                    text: ms,
                    width: width,
                    font: $font(18),
                    lineSpacing: 6
                  });
                  return size.height;
                  break;
                case 2:
                  if (isInteger(hdj.length / 4) == true) {
                    return (hdj.length / 4) * 45 + 5;
                  } else {
                    return (parseInt(hdj.length / 4) + 1) * 45 + 5;
                  }
                  break;
                case 3:
                  if (typeof hdj1[0] == "undefined") {
                    return 40;
                  } else {
                    if (isInteger(hdj1.length / 4) == true) {
                      return (hdj1.length / 4) * 45 + 5;
                    } else {
                      return (parseInt(hdj1.length / 4) + 1) * 45 + 5;
                    }
                  }
                  break;
              }
            }
          }
        }
      ]
    });
    var data = JSON.parse($file.read("shared://SakuraAnime/fav.txt").string);
    for (i in data) {
      if (data[i].label.text == name) {
        $("zhuifan").bgcolor = $color("gray");
        $("zhuifan").title = "已追番";
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

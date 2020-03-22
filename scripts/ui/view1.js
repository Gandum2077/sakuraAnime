var View1 = {
  type: "view",
  props: {
    id: "view1",
    hidden: false
  },
  layout: function(make, view) {
    make.left.right.inset(0);
    make.bottom.inset(0);
    make.top.equalTo($("header").bottom);
  },
  views: [{
    type: "list",
    props: {
      id: "mainList",
      separatorHidden: true,
      bgcolor: $color("white"),
      showsVerticalIndicator: false,
      footer: {
        type: "label",
        props: {
          height: 50,
          textColor: $color("#AAAAAA"),
          align: $align.center,
          font: $font(12)
        }
      },
      data: [{
          rows: [{
            type: "view",
            layout: function(make, view) {
              make.right.left.inset(13);
              make.top.bottom.inset(10);
            },
            views: [{
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
              views: [{
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
                    didBeginEditing: function(sender) {
                      sender.text = "";
                      sender.blur()
                      searchView()
                    }
                  },
                  views: [{
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
                  }]
                }
              ]
            }]
          }]
        },
        {
          rows: [{
              type: "view",
              layout: $layout.fill,
              views: [{
                  type: "label",
                  props: {
                    text: "历史记录",
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
                    id: "ckqb",
                    title: "查看全部",
                    hidden: typeof $cache.get("history")[0] == "undefined" ?
                      true :
                      false,
                    bgcolor: $color("clear"),
                    titleColor: $color("lightGray"),
                    font: $font(14)
                  },
                  layout: function(make, view) {
                    make.height.equalTo(25);
                    make.right.inset(33);
                    make.centerY.equalTo(view.super);
                  },
                  events: {
                    tapped: function() {
                      history();
                    }
                  }
                },
                {
                  type: "canvas",
                  props: {
                    hidden: typeof $cache.get("history")[0] == "undefined" ?
                      true :
                      false
                  },
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
                      ctx.strokeColor = $color("#D6D6D6");
                      ctx.moveToPoint(0, 0);
                      ctx.setLineWidth(2);
                      ctx.addLineToPoint(X, Y * 0.5);
                      ctx.addLineToPoint(0, Y);
                      ctx.strokePath();
                    },
                    tapped: function() {
                      history();
                    }
                  }
                }
              ]
            },
            {
              type: "view",
              layout: $layout.fill,
              views: [{
                  type: "text",
                  props: {
                    id: "myjl",
                    align: $align.center,
                    font: $font(15),
                    hidden: typeof $cache.get("history")[0] == "undefined" ?
                      false :
                      true,
                    text: "暂时没有观看记录",
                    textColor: $color("gray")
                  },
                  layout: function(make, view) {
                    make.center.equalTo(view.super);
                    make.width.equalTo(150);
                    make.height.equalTo(30);
                  }
                },
                {
                  type: "matrix",
                  props: {
                    id: "m1",
                    columns: $device.isIpad == true ? 4: 3,
                    scrollEnabled: false,
                    itemHeight: 200,
                    spacing: 5,
                    hidden: typeof $cache.get("history")[0] == "undefined" ?
                      true :
                      false,
                    template: [{
                        type: "image",
                        props: {
                          id: "image",
                          radius: 5
                        },
                        layout: function(make, view) {
                          make.top.inset(5);
                          make.bottom.inset(30);
                          make.width.equalTo(
                            $device.isIpad == true ? 120 : 115
                          );
                          make.centerX.equalTo(view.super);
                        }
                      },
                      {
                        type: "label",
                        props: {
                          id: "label",
                          align: $align.center,
                          font: $font($device.isIpad == true ? 16 : 14),
                          lines: 2
                        },
                        layout: function(make, view) {
                          make.top.equalTo($("image").bottom).inset(-1);
                          make.left.right.inset(5);
                          make.bottom.inset(-3);
                        }
                      }
                    ],
                    data: $cache.get("history").splice(0, 5)
                  },
                  layout: function(make, view) {
                    make.top.left.right.inset(0);
                    make.bottom.inset(-15);
                  },
                  events: {
                    didSelect(sender, indexPath, data) {
                      loading.start("window");
                      det(
                        $cache.get("history")[indexPath.row].href,
                        $cache.get("history")[indexPath.row].image.src
                      );
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          rows: [{
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
                ctx.moveToPoint(15, 0);
                ctx.addLineToPoint(width - 15, 0);
                ctx.strokePath();
              }
            }
          }]
        },
        {
          rows: [{
              type: "label",
              props: {
                text: "最近更新",
                font: $font("bold", 20)
              },
              layout: function(make, view) {
                make.top.inset(0);
                make.left.right.inset(15);
                make.bottom.inset(10);
              },
              events: {}
            },
            {
              type: "matrix",
              props: {
                id: "m2",
                scrollEnabled: false,
                columns: $device.isIpad == true ? 4 : 3,
                itemHeight: 200,
                spacing: 5,
                template: [{
                    type: "image",
                    props: {
                      id: "image",
                      radius: 5
                    },
                    layout: function(make, view) {
                      make.top.inset(5);
                      make.bottom.inset(30);
                      make.width.equalTo($device.isIpad == true ? 120 : 115);
                      make.centerX.equalTo(view.super);
                      //make.left.right.inset(5)
                    }
                  },
                  {
                    type: "label",
                    props: {
                      id: "label",
                      align: $align.center,
                      font: $font($device.isIpad == true ? 16 : 14),
                      lines: 2
                    },
                    layout: function(make, view) {
                      make.top.equalTo($("image").bottom).inset(-1);
                      make.left.right.inset(5);
                      make.bottom.inset(-3);
                    }
                  }
                ],
                data: []
              },
              layout: function(make, view) {
                make.top.left.right.inset(0);
                make.bottom.inset(-20);
              },
              events: {
                didSelect(sender, indexPath, data) {
                  loading.start("window");
                  det(iml[indexPath.row].href, iml[indexPath.row].image.src);
                }
              }
            }
          ]
        },
        {
          rows: [{
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
                ctx.moveToPoint(15, 0);
                ctx.addLineToPoint(width - 15, 0);
                ctx.strokePath();
              }
            }
          }]
        },
        {
          rows: [{
              type: "label",
              props: {
                text: "更新表",
                font: $font("bold", 20)
              },
              layout: function(make, view) {
                make.top.inset(0);
                make.left.right.inset(15);
                make.bottom.inset(10);
              },
              events: {}
            },
            {
              type: "view",
              layout: $layout.fill,
              views: [{
                  type: "menu",
                  props: {
                    id: "sjbmenu",
                    items: [
                      "周一",
                      "周二",
                      "周三",
                      "周四",
                      "周五",
                      "周六",
                      "周日"
                    ]
                  },
                  layout: function(make) {
                    make.left.top.right.inset(0);
                    make.height.equalTo(40);
                  },
                  events: {
                    changed: function(sender) {
                      switch (parseInt(sender.index)) {
                        case 0:
                          $("sjblist").data = date0;
                          break;
                        case 1:
                          $("sjblist").data = date1;
                          break;
                        case 2:
                          $("sjblist").data = date2;
                          break;
                        case 3:
                          $("sjblist").data = date3;
                          break;
                        case 4:
                          $("sjblist").data = date4;
                          break;
                        case 5:
                          $("sjblist").data = date5;
                          break;
                        case 6:
                          $("sjblist").data = date6;
                          break;
                      }
                      $("mainList").reload();
                    }
                  }
                },
                {
                  type: "list",
                  props: {
                    id: "sjblist",
                    separatorHidden: true,
                    scrollEnabled: false,
                    template: [{
                        type: "label",
                        props: {
                          id: "l1",
                          font: $font(16)
                        },
                        layout: function(make, view) {
                          make.left.inset(15);
                          make.centerY.equalTo(view.super);
                        }
                      },
                      {
                        type: "label",
                        props: {
                          id: "l2",
                          font: $font(16),
                          textColor: $color("gray")
                        },
                        layout: function(make, view) {
                          make.right.inset(15);
                          make.centerY.equalTo(view.super);
                        }
                      }
                    ]
                  },
                  layout: function(make) {
                    make.top.inset(44);
                    make.left.bottom.right.inset(0);
                  },
                  events: {
                    didSelect: function(sender, indexPath, data) {
                      loading.start("window");
                      $http.get({
                        url: "http://www.imomoe.in/" +
                          sender.data[indexPath.row].h,
                        handler: function(resp) {
                          var data = resp.data
                            .replace(/\s/g, "")
                            .match(/<imgsrc=\".*?alt=/)[0]
                            .replace('<imgsrc="', "")
                            .replace("alt=", "")
                            .replace('"', "");
                          det(
                            "http://www.imomoe.in/" +
                            sender.data[indexPath.row].h,
                            data
                          );
                        }
                      });
                    }
                  }
                }
              ]
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
            return 50;
            break;
          case 1:
            if (indexPath.row == 0) {
              return 30;
            } else return 200;
            break;
          case 2:
            return 2;
            break;
          case 3:
            if (indexPath.row == 0) {
              return 30;
            } else return 200 * 2;
            break;
          case 4:
            return 2;
            break;
          case 5:
            if (indexPath.row == 0) {
              return 30;
            } else {
              switch ($("sjbmenu").index) {
                case 0:
                  return (date0.length + 1) * 44;
                  break;
                case 1:
                  return (date1.length + 1) * 44;
                  break;
                case 2:
                  return (date2.length + 1) * 44;
                  break;
                case 3:
                  return (date3.length + 1) * 44;
                  break;
                case 4:
                  return (date4.length + 1) * 44;
                  break;
                case 5:
                  return (date5.length + 1) * 44;
                  break;
                case 6:
                  return (date6.length + 1) * 44;
                  break;
              }
            }
            break;
        }
      }
    }
  }]
};
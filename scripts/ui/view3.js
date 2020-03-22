var View3 = {
  type: "view",
  props: {
    id: "view3",
    hidden: true
  },
  layout: function(make, view) {
    make.left.right.inset(0);
    make.bottom.inset(0);
    make.top.equalTo($("header").bottom);
  },
  views: [
    {
      type: "list",
      props: {
        id: "settingList",
        bgcolor: $color("white"),
        separatorHidden: true,
        data: [
          {
            title: "通用",
            rows: [
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "label",
                    props: {
                      font: $font(16),
                      text: "移动数据播放提醒",
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.centerY.equalTo(view.super);
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      id: "xzjdkg",
                      on: $cache.get("xzjd")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(10);
                    },
                    events: {
                      changed: function(sender) {
                        $cache.set("xzjd", sender.on);
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "label",
                    props: {
                      id: "wangyePlaylabel",
                      font: $font(16),
                      text: "使用网页形式播放",
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.centerY.equalTo(view.super);
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      id: "wyxs",
                      on: $cache.get("wyxs")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(10);
                    },
                    events: {
                      changed: function(sender) {
                        $cache.set("wyxs", sender.on);
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "label",
                    props: {
                      font: $font(16),
                      text: "自动跳转已播放进度",
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.centerY.equalTo(view.super);
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      on: $cache.get("autoProgress")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(10);
                    },
                    events: {
                      changed: function(sender) {
                        $cache.set("autoProgress", sender.on);
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "label",
                    props: {
                      font: $font(16),
                      text: "跳过片头 (需设置)",
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.centerY.equalTo(view.super);
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      on: $cache.get("jumpOP")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(10);
                    },
                    events: {
                      changed: function(sender) {
                        $cache.set("jumpOP", sender.on);
                      }
                    }
                  }
                ]
              },
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "label",
                    props: {
                      font: $font(16),
                      text: "后台自动检测番剧更新",
                      textColor: $color("darkGray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.centerY.equalTo(view.super);
                    }
                  },
                  {
                    type: "switch",
                    props: {
                      on: $cache.get("animeUpdate")
                    },
                    layout: function(make, view) {
                      make.centerY.equalTo(view.super);
                      make.right.inset(10);
                    },
                    events: {
                      changed: function(sender) {
                        $cache.set("animeUpdate", sender.on);
                      }
                    }
                  }
                ]
              },
              {
                titleLabel: {
                  text: "自动打开第三方播放器"
                },
                content: {
                  text: $cache.get("defaultPlayer")[0]
                }
              },
              {
                titleLabel: {
                  text: "缓存清理"
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
            title: "其他",
            rows: [
              {
                titleLabel: {
                  text: "下载管理"
                }
              },
              {
                titleLabel: {
                  text: "脚本更新"
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
            title: "关于",
            rows: [
              {
                titleLabel: {
                  text: "联系作者"
                }
              },
              {
                titleLabel: {
                  text: "打赏作者"
                }
              }
            ]
          }
        ],
        template: [
          {
            type: "label",
            props: {
              id: "titleLabel",
              font: $font(16),
              textColor: $color("darkGray")
            },
            layout: function(make, view) {
              make.left.inset(15);
              make.centerY.equalTo(view.super);
            }
          },
          {
            type: "canvas",
            props: {
              id: "cellCanvas"
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.centerY.equalTo(view.super);
              make.width.equalTo(8);
              make.height.equalTo(13);
            },
            events: {
              draw: function(view, ctx) {
                var X = view.frame.width - 2;
                var Y = view.frame.height;
                ctx.strokeColor = $color("#C7C7CC");
                ctx.moveToPoint(0, 0);
                ctx.setLineWidth(2);
                ctx.addLineToPoint(X, Y * 0.5);
                ctx.addLineToPoint(0, Y);
                ctx.strokePath();
              }
            }
          },
          {
            type: "label",
            props: {
              id: "content",
              textColor: $color("tint")
            },
            layout: function(make, view) {
              make.centerY.equalTo(view.super);
              make.right.equalTo($("cellCanvas").left).offset(-10);
            },
            events: {
              changed: function(sender) {}
            }
          }
        ],
        footer: {
          type: "label",
          props: {
            height: 150,
            lines: 0,
            text: "imoemo.in\n\nVersion 1.2.4  by Azite",
            textColor: $color("#AAAAAA"),
            align: $align.center,
            font: $font(12)
          }
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (indexPath.section == 2) {
            if (indexPath.row == 0) {
              downloads();
            } else if (indexPath.row == 1) {
              update();
            }
          } else if (indexPath.section == 4) {
            if (indexPath.row == 0) {
              contact();
            } else dashang();
          } else if (indexPath.section == 0) {
            if (indexPath.row == 6) {
              $ui.action({
                title:
                  "清空记录，恢复所有设置\n（需重新载入脚本）\n\n除追番列表,其他都是存在缓存里的,所以慎重清空",
                actions: [
                  {
                    title: "确定",
                    handler: function() {
                      $cache.clear();
                      $addin.restart();
                    }
                  },
                  {
                    title: "取消",
                    style: "Cancel"
                  }
                ]
              });
            } else if (indexPath.row == 5) {
              var arr = apps.map(function(item) {
                return item.name;
              });
              var items = arr.concat(["关闭"]);
              $ui.menu({
                items: items,
                handler: function(title, idx) {
                  var list = sender.data;
                  list[indexPath.section].rows[
                    indexPath.row
                  ].content.text = title;
                  sender.data = list;
                  $cache.set("defaultPlayer", [title, idx]);
                }
              });
            }
          }
        },
        rowHeight: function(sender, indexPath) {
          if (indexPath.section == 1 || indexPath.section == 3) {
            return 0.4;
          } else {
            return 44;
          }
        }
      }
    }
  ]
};

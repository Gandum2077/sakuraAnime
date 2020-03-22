var View3 = {
  type: "view",
  props: {
    id: "view3",
    hidden: true
  },
  layout: function(make, view) {
    make.top.left.right.inset(0);
    make.bottom.inset($device.isIphoneX == true ? 20 : 0);
  },
  views: [
    {
      type: "list",
      props: {
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
                      text: "移动数据播放提醒"
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
                      text: "使用网页形式播放"
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.top.inset(11);
                    }
                  },
                  {
                    type: "label",
                    props: {
                      font: $font(14),
                      text: "若出现播放页面空屏的情况请开启此开关尝试网页播放",
                      textColor: $color("gray")
                    },
                    layout: function(make, view) {
                      make.left.inset(15);
                      make.top.equalTo($("wangyePlaylabel").bottom).offset(3);
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
              }
            ]
          },
          {
            title: "其他",
            rows: [
              {
                title: {
                  text: "下载管理"
                }
              },
              {
                title: {
                  text: "脚本更新"
                }
              }
            ]
          },
          {
            title: "关于",
            rows: [
              {
                title: {
                  text: "联系作者"
                }
              },
              {
                title: {
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
              id: "title",
              font: $font(16)
            },
            layout: function(make, view) {
              make.left.inset(15);
              make.centerY.equalTo(view.super);
            }
          },
          {
            type: "canvas",
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
          }
        ],
        footer: {
          type: "label",
          props: {
            height: 100,
            lines: 0,
            text: "imoemo.in\n\nVersion 1.1.1  by Azite",
            textColor: $color("#AAAAAA"),
            align: $align.center,
            font: $font(12)
          }
        }
      },
      layout: $layout.fill,
      events: {
        didSelect: function(sender, indexPath, data) {
          if (indexPath.section == 1) {
            if (indexPath.row == 0){
            downloads();
            } else if (indexPath.row == 1){
              update()
            }
          } else if (indexPath.section == 2) {
            if (indexPath.row == 0) {
              contact();
            } else dashang();
          }
        },
        rowHeight: function(sender, indexPath) {
          if (indexPath.section == 0 && indexPath.row == 1) {
            return 62;
          } else {
            return 44.0;
          }
        }
      }
    }
  ]
};

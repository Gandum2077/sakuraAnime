function history() {
  $ui.push({
    props: {
      title: "历史记录",
      id: "w2",
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
              title: "返回",
              bgcolor: $color("clear"),
              titleColor: $color("tint"),
              font: $font(18)
            },
            layout: function(make, view) {
              make.height.equalTo(25);
              make.left.inset(26);
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
              make.left.inset(10);
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
            type: "label",
            props: {
              text: "历史记录",
              font: $font("bold", 18)
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
            }
          },
          {
            type: "button",
            props: {
              titleColor: $color("tint"),
              bgcolor: $color("clear"),
              title: "清除记录",
              font:$font(15)
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.centerY.equalTo(view.super);
            },
            events: {
              tapped: function(sender) {
                $ui.action({
                  title: "清除所有历史记录",
                  actions: [
                    {
                      title: "确定",
                      handler: function() {
                        $cache.set("history", []);
                        $("m1").hidden = true;
                        $("ckqb").hidden = true;
                        $("myjl").hidden = false;
                        $("m1").data = $cache.get("history");
                        $ui.pop();
                      }
                    },
                    {
                      title: "取消",
                      style: "Cancel"
                    }
                  ]
                });
              }
            }
          }
        ]
      },
      {
        type: "matrix",
        props: {
          columns: $device.isIpad == true ? 4 : 3,
          itemHeight: 200,
          spacing: 5,
          template: [
            {
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
          data: $cache.get("history")
        },
        layout: function(make, view) {
           make.top.equalTo($("header").bottom);
           make.right.left.bottom.inset(0);
         },
        events: {
          didSelect(sender, indexPath, data) {
            loading.start("w2");
            det(
              $cache.get("history")[indexPath.row].href,
              $cache.get("history")[indexPath.row].image.src
            );
          }
        }
      }
    ]
  });
}

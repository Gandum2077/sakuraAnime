function dashang() {
  $ui.push({
    props: {
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
              text: "给作者投食",
              font: $font("bold", 18)
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
            }
          }
        ]
      },
      {
        type: "image",
        props: {
          src: "assets/zanshang.jpg"
        },
        layout: function(make, view) {
          make.bottom.left.right.inset(0);
          make.height.equalTo($device.info.screen.width);
          make.width.equalTo($device.info.screen.width);
        }
      },
      {
        type: "text",
        props: {
          text: `写了挺久的脚本,如果你觉得这个脚本对你有帮助,欢迎支持鼓励一下作者,谢谢啦🙏`
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.height.equalTo(50);
          make.top.equalTo($("header").bottom);
        }
      }
    ]
  });
}

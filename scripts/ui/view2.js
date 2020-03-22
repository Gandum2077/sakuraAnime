var View2 = {
  type: "list",
  props: {
    id: "view2",
    hidden: true,
    separatorHidden: true,
    footer: {
      type: "label",
      props: {
        height: 50,
        text: "",
        textColor: $color("#AAAAAA"),
        align: $align.center,
        font: $font(12)
      }
    },
    data: [
      {
        type: "tab",
        props: {
          id: "zfMenu",
          items: ["全部", "未看", "已看", "未完结", "已完结"],
          index: 0
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.height.equalTo(30);
          make.width.equalTo(250);
          make.top.inset(0);
        },
        events: {
          changed: function(sender) {
            zfrefresh(sender.index);
          }
        }
      },
      {
        type: "matrix",
        props: {
          id: "m3",
          scrollEnabled: false,
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
              type: "view",
              props: {
                id: "bgView",
                radius: 9
              },
              layout: (make, view) => {
                make.size.equalTo(18);
                make.top.inset(-0);
                make.centerX
                  .equalTo(view.super)
                  .offset($device.isIpad == true ? 60 : 115 / 2);
              },
              views: [
                {
                  type: "label",
                  props: {
                    id: "sign",
                    font: $font(14),
                    textColor: $color("white")
                  },
                  layout: $layout.center
                }
              ]
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
          ]
        },
        layout: function(make, view) {
          make.left.bottom.top.right.inset(0);
          //          make.width.equalTo(375)
        },
        events: {
          didSelect(sender, indexPath, data) {
            loading.start("window");
            det(
              sender.data[indexPath.row].href,
              sender.data[indexPath.row].image.src
            );
          },
          didLongPress: function(sender, indexPath, data) {
            
            var yuju;
            switch ($("zfMenu").index) {
              case 0:
              yuju = null
              break
              case 1:
                yuju = ["加入到已看"];
                break;
              case 2:
                yuju = ["加入到未看"];
                break;
              case 3:
                yuju = ["加入到已完结"]
                break;
              case 4:
                yuju = ["加入到未完结"]
                break;
            }
            $ui.menu({
              items: yuju,
              handler: function() {
                var list = JSON.parse(
                  $file.read("shared://SakuraAnime/fav.txt").string
                );
                var ii
                for (i in list){
                  if (list[i].href == data.href) ii = i
                }
                switch ($("zfMenu").index) {
                  case 1:
                    list[ii].status = 1;
                    break;
                  case 2:
                    list[ii].status = 0;
                    break;
                  case 3:
                    list[ii].isEnd = 1;
                    break;
                  case 4:
                    list[ii].isEnd = 0;
                    break;
                }
                $file.write({
                  data: $data({ string: JSON.stringify(list) }),
                  path: "shared://SakuraAnime/fav.txt"
                });
                zfrefresh($("zfMenu").index);
              }
            });
          }
        }
      }
    ]
  },
  layout: function(make, view) {
    make.left.right.inset(0);
    make.bottom.inset(0);
    make.top.equalTo($("header").bottom);
  },
  events: {
    rowHeight: function(sender, indexPath) {
      if (indexPath.row == 0) {
        return 35;
      } else var a;
      if ($device.isIpad) {
        a = 4;
      } else a = 3;
      return Math.ceil($cache.get("favLength") / a) * 200 + 50;
    }
  }
};

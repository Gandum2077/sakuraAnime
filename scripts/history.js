function history() {
  $ui.push({
    props: {
      title: "历史记录",
      id: "w2",
      navButtons: [{
        title: "清除记录",
        handler: function() {
          $ui.action({
            title: "清除所有历史记录",
            actions: [{
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
      }]
    },
    views: [{
      type: "matrix",
      props: {
        columns: 4,
        itemHeight: $device.isIpad == true ? 200 : 170,
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
              make.width.equalTo($device.isIpad == true ? 120 : 90);
              make.centerX.equalTo(view.super);
              //make.left.right.inset(5)
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              align: $align.center,
              font: $font(16)
            },
            layout: function(make, view) {
              make.top.equalTo($("image").bottom).inset(5);
              make.left.right.inset(5);
              make.bottom.inset(10);
            }
          }
        ],
        data: $cache.get("history")
      },
      layout: $layout.fill,
      events: {
        didSelect(sender, indexPath, data) {
          loading.start("w2");
          det(
            $cache.get("history")[indexPath.row].href,
            $cache.get("history")[indexPath.row].image.src
          );
        }
      }
    }]
  });
}

function downloads() {
  var timer = $timer.schedule({
    interval: 0.1,
    handler: function() {
      $("xzzhong").data = $cache.get("download");
    }
  });
  $ui.push({
    props: {
      title: "下载管理"
    },
    events: {
      dealloc: function() {
        timer.invalidate();
      }
    },
    views: [
      {
        type: "menu",
        props: {
          id: "xzmenu",
          items: ["下载中", "已完成"],
          index: typeof $cache.get("download")[0] == "undefined" ? 1 : 0
        },
        layout: function(make, view) {
          make.top.left.right.inset(0);
          make.height.equalTo(40);
        },
        events: {
          changed: function(sender) {
            if (sender.index == 0) {
              $("xzzhong").hidden = false;
              $("wancheng").hidden = true;
            } else {
              $("xzzhong").hidden = true;
              $("wancheng").hidden = false;
            }
          }
        }
      },
      {
        type: "list",
        props: {
          id: "xzzhong",
          rowHeight: 70,
          //data: [{}, {}, {}],
          template: [
            {
              type: "label",
              props: {
                id: "title",
                font: $font(16)
              },
              layout: function(make, view) {
                make.left.right.inset(15);
                make.top.inset(10);
              }
            },
            {
              type: "progress",
              props: {
                value: 0.5
              },
              layout: function(make, view) {
                make.right.left.inset(15);
                make.top.equalTo($("title").bottom).inset(5);
              }
            },
            {
              type: "label",
              props: {
                id: "filetj",
                font: $font(16)
              },
              layout: function(make, view) {
                make.left.inset(15);
                make.top.equalTo($("progress").bottom).inset(5);
              }
            },
            {
              type: "label",
              props: {
                id: "jindu",
                font: $font(16)
              },
              layout: function(make, view) {
                make.right.inset(15);
                make.top.equalTo($("progress").bottom).inset(5);
              }
            }
          ]
        },
        layout: function(make, view) {
          make.top.equalTo($("xzmenu").bottom);
          make.bottom.right.left.inset(0);
        }
      },
      {
        type: "list",
        props: {
          id: "wancheng",
          hidden: true,
          data: $file.list("shared://SakuraAnime/download/"),
          actions: [
            {
              title: "删除",
              color: $color("red"),
              handler: function(sender, indexPath) {
                $file.delete(
                  "shared://SakuraAnime/download/" + sender.data[indexPath.row]
                );
                sender.delete(indexPath);
              }
            }
          ]
        },
        layout: function(make, view) {
          make.top.equalTo($("xzmenu").bottom);
          make.bottom.right.left.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            //player()
            if (sender.data[indexPath.row].indexOf(".mp4") == 0) {
              $quicklook.open({
                type: "mp4",
                data: $file.read(
                  "shared://SakuraAnime/download/" + sender.data[indexPath.row]
                )
              });
            } else {
              viewFolder(sender.data[indexPath.row]);
            }
          }
        }
      }
    ]
  });
  if (typeof $cache.get("download")[0] == "undefined") {
    $("xzzhong").hidden = true;
    $("wancheng").hidden = false;
  }
}

function viewFolder(name) {
  $ui.push({
    props: {
      title: name
    },
    views: [
      {
        type: "list",
        props: {
          data: $file.list("shared://SakuraAnime/download/" + name),
          actions: [
            {
              title: "删除",
              color: $color("red"),
              handler: function(sender, indexPath) {
                $file.delete(
                  `shared://SakuraAnime/download/${name}/${
                    sender.data[indexPath.row]
                  }`
                );
                sender.delete(indexPath);
              }
            }
          ]
        },
        layout: $layout.fill,
        events: {
          didSelect: function(sender, indexPath, data) {
            $quicklook.open({
              type: "mp4",
              data: $file.read(
                `shared://SakuraAnime/download/${name}/${
                  sender.data[indexPath.row]
                }`
              )
            });
          }
        }
      }
    ]
  });
}

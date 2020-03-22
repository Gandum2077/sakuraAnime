function downloads() {
  var timer = $timer.schedule({
    interval: 0.5,
    handler: function() {
      $("xzzhong").data = $cache.get("download");
    }
  });
  $ui.push({
    props: {
      clipsToSafeArea: true,
      navBarHidden: true,
      statusBarStyle: 0
    },
    events: {
      dealloc: function() {
        timer.invalidate();
      }
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
              text: "下载管理",
              font: $font("bold", 18)
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
            }
          }
        ]
      },
      {
        type: "tab",
        props: {
          id: "xzmenu",
          items: ["下载中", "已完成"],
          index: typeof $cache.get("download")[0] == "undefined" ? 1 : 0
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super);
          make.height.equalTo(30);
          make.top.equalTo($("header").bottom);
          make.width.equalTo(150);
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
          separatorHidden: true,
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
          make.top.equalTo($("xzmenu").bottom).offset(3);
          make.bottom.right.left.inset(0);
        }
      },
      {
        type: "list",
        props: {
          id: "wancheng",
          separatorHidden: true,
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
          make.top.equalTo($("xzmenu").bottom).offset(3);
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
  var mode = 0;
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
              text: name,
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
              title: "多选",
              font: $font(15)
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.centerY.equalTo(view.super);
            },
            events: {
              tapped: function(sender) {
                mode = 1;
                $("toolbar")
                  .animator.moveY(-65)
                  .easeOutBack.animate(0.5);
                $delay(0.5, function() {
                  $("toolbar").updateLayout(function(make, view) {
                    shadow(view, 1, 20, $size(1, 1), 5, "gray");
                    make.right.bottom.left.inset(5);
                    make.height.equalTo(50);
                  });
                });
              }
            }
          }
        ]
      },
      {
        type: "list",
        props: {
          id: "downloads",
          separatorHidden: true,
          template: [
            {
              type: "label",
              props: {
                id: "label",
                font: $font(16)
              },
              layout: function(make, view) {
                make.left.inset(15);
                make.centerY.equalTo(view.super);
              }
            },
            {
              type: "canvas",
              props: {
                id: "tick"
              },
              layout: function(make, view) {
                make.right.inset(10);
                make.centerY.equalTo(view.super);
                make.width.equalTo(20);
                make.height.equalTo(13);
              },
              events: {
                draw: function(view, ctx) {
                  var X = view.frame.width - 2;
                  var Y = view.frame.height;
                  const offset = 1;
                  ctx.strokeColor = $color("tint");
                  ctx.moveToPoint(offset, Y * 0.5);
                  ctx.setLineWidth(2);
                  ctx.addLineToPoint(X / 3, Y - offset);
                  ctx.addLineToPoint(X, offset);
                  ctx.strokePath();
                }
              }
            }
          ],
          actions: [
            {
              title: "删除",
              color: $color("red"),
              handler: function(sender, indexPath) {
                $file.delete(
                  `shared://SakuraAnime/download/${name}/${sender.data[indexPath.row].label.text}`
                );
                sender.delete(indexPath);
              }
            },
            {
              title:"共享"
            }
          ]
        },
        layout: function(make, view) {
          make.top.equalTo($("header").bottom);
          make.right.left.bottom.inset(0);
        },
        events: {
          didSelect: function(sender, indexPath, data) {
            if (mode == 0) {
              $quicklook.open({
                type: "mp4",
                data: $file.read(
                  `shared://SakuraAnime/download/${name}/${sender.data[indexPath.row].label.text}`
                )
              });
            } else {
              var list = sender.data;
              if (list[indexPath.row].tick.hidden) {
                list[indexPath.row].tick.hidden = false;
              } else list[indexPath.row].tick.hidden = true;
              sender.data = list;
            }
          }
        }
      },
      {
        type: "view",
        props: {
          id: "toolbar",
          backgroundColor: $color("white")
        },
        layout: function(make, view) {
          shadow(view, 1, 20, $size(1, 1), 5, "gray");
          make.right.left.inset(5);
          make.height.equalTo(50);
          make.bottom.inset(-60);
        },
        views: [
          {
            type: "button",
            props: {
              id: "cancelBtn",
              title: "取消",
              titleColor: $color("black"),
              backgroundColor: $color("clear")
            },
            layout: (make, view) => {
              make.centerY.equalTo(view.super);
              make.left.inset(15);
            },
            events: {
              tapped: sender => {
                mode = 0;
                $("toolbar")
                  .animator.moveY(65)
                  .easeInCubic.animate(0.5);
                $delay(0.5, function(make, view) {
                  shadow(view, 1, 20, $size(1, 1), 5, "gray");
                  make.right.left.inset(5);
                  make.height.equalTo(50);
                  make.bottom.inset(-60);
                });
                refresh();
              }
            }
          },
          {
            type: "button",
            props: {
              id: "deleteBtn",
              title: "删除",
              titleColor: $color("red"),
              backgroundColor: $color("clear")
            },
            layout: (make, view) => {
              make.centerY.equalTo(view.super);
              make.right.inset(15);
            },
            events: {
              tapped: sender => {
                var data = $("downloads").data;
                for (i in data) {
                  if (!data[i].tick.hidden) {
                    $file.delete(
                      `shared://SakuraAnime/download/${name}/${
                        $("downloads").data[i].label.text
                      }`
                    );
                  }
                }
                refresh();
              }
            }
          },
          {
            type: "button",
            props: {
              title: "打包",
              titleColor: $color("black"),
              backgroundColor: $color("clear")
            },
            layout: (make, view) => {
              make.centerY.equalTo(view.super);
              make.right.equalTo($("deleteBtn").left).offset(-15);
            },
            events: {
              tapped: sender => {
                var data = $("downloads").data;
                var files = [];
                for (i in data) {
                  if (!data[i].tick.hidden) {
                    files.push(
                      $file.read(
                        `shared://SakuraAnime/download/${name}/${
                          $("downloads").data[i].label.text
                        }`
                      )
                    );
                  }
                }
                var dest = name + ".zip";

                if (files.length == 0) {
                  return;
                }

                $archiver.zip({
                  files: files,
                  dest: dest,
                  handler: function(success) {
                    if (success) {
                      $share.sheet({
                        items: [
                          {
                            name: dest,
                            data: $file.read(dest)
                          }
                        ],
                        handler: function(success) {
                          $file.delete(dest);
                        }
                      });
                    } else customTosat("错误",true);
                  }
                });
              }
            }
          }
        ]
      }
    ]
  });

  function refresh() {
    var data = $file.list("shared://SakuraAnime/download/" + name);
    var list = [];
    for (i in data) {
      list.push({
        label: {
          text: data[i]
        },
        tick: {
          hidden: true
        }
      });
    }
    $("downloads").data = list;
  }
  refresh();
}

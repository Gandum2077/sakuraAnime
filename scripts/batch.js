var num = 0;
var title = new String();
var selected = new Array();

function batchDownload(hdj, name) {
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
              text: "批量下载",
              font: $font("bold", 18)
            },
            layout: (make, view) => {
              make.center.equalTo(view.super);
            }
          }
        ]
      },
      {
        type: "list",
        props: {
          id: "chapterList",
          data: hdj,
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
            },
            {
              type: "label",
              props: {
                id: "spinner"
              },
              layout: function(make, view) {
                make.top.bottom.inset(0);
                make.right.inset(5);
              }
            }
          ],
          footer: {
            type: "label",
            props: {
              height: 40,
              text: "",
              textColor: $color("#AAAAAA"),
              align: $align.center,
              font: $font(12)
            }
          }
        },
        layout: function(make, view) {
          make.top.equalTo($("header").bottom);
          make.right.left.bottom.inset(0);
        },
        events: {
          didSelect: (sender, indexPath, data) => {
            var list = sender.data;
            if (list[indexPath.row].tick.hidden) {
              list[indexPath.row].tick.hidden = false;
            } else list[indexPath.row].tick.hidden = true;
            sender.data = list;
          }
        }
      },
      {
        type: "button",
        props: {
          id: "batchDownBtn",
          bgcolor: $color("white"),
          font: $font(35),
          icon: $icon("165", $color("tint"))
          //          hidden:true
        },
        layout: function(make, view) {
          shadow(view, 0.8, 10, $size(3, 3), 30, "lightGray");
          make.bottom.right.inset(20);
          make.size.equalTo(60);
//          make.centerX.equalTo(view.super)
        },
        events: {
          tapped: function(sender) {
            var data = $("chapterList").data;
            for (i in data) {
              if (!data[i].tick.hidden) {
                data[i].tick.hidden = true;
                data[i].label.textColor = $color("black");
                selected.push(data[i]);
              }
            }
            if (typeof selected[0] == "undefined") {
              customTosat("请先选择要下载的剧集", true);
            } else {
              sender.animator.moveY(80).easeIn.animate(0.5)
              $delay(0.5,function(){
                sender.updateLayout(function(make,view){
                  make.bottom.inset(-80)
                })
              })
              batchDown1()
            }
          }
        }
      },
//      {
//        type: "lottie",
//        props: {
//          src: "assets/ufo.json",
//          loop: true
//        },
//        layout: (make, view) => {
//          make.centerX.equalTo(view.super);
//          make.size.equalTo(1);
//          make.top.inset(10);
//        },
//        events: {
//          ready: function(sender) {
//            sender.play();
////            sender.updateLayout(function(make, view) {
////                              make.centerX.equalTo(view.super);
////                              if ($device.info.screen.width > $device.info.screen.height) {
////                                make.size.equalTo($device.info.screen.height);
////                              } else make.size.equalTo($device.info.screen.width);
////                              make.top.inset(50)
////                              
////                            });
//sender.animator.moveY(50).makeScale(100).easeIn.animate(1)
//            
//          }
//        }
//      },
      {
        type: "web",
        props: {
          id: "getLink",
          script: function() {
            $notify("getPlayLink", video);
          }
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.top.inset(-3);
          make.height.equalTo(0);
        },
        events: {
          getPlayLink: function(link) {
            if (link.indexOf("/ts.php?") == 0) {
              customTosat("下载失败,此视频格式为m3u8",true);
              selected[num].spinner.text = "下载失败";
              $("chapterList").data = selected;
            } else batchDown2(link);
          }
        }
      }
    ]
  });
  title = name;
}

function batchDown1() {
  selected[num].spinner.text = "获取链接...";
  selected[num].label.textColor = $color("red");
  $("getLink").url = "http://www.imomoe.in" + selected[num].h;
  $("chapterList").data = selected;
}

function batchDown2(link) {
  selected[num].spinner.text = "链接已获取,准备下载";
  $("chapterList").data = selected;
  down(link);
}

function down(link) {
  $http.download({
    url: link,
    progress: (bytesWritten, totalBytes) => {
      var percentage = ((bytesWritten * 1.0) / totalBytes) * 100;
      selected[num].spinner.text = percentage.toFixed(1) + "%";
      $("chapterList").data = selected;
    },
    handler: resp => {
      $file.mkdir(`shared://SakuraAnime/download/${title}/`);
      $file.write({
        data: resp.data,
        path: `shared://SakuraAnime/download/${title}/${title +
          selected[num].label.text}.mp4`
      });
      selected[num].spinner.text = "已完成";
      selected[num].label.textColor = $color("black");
      num += 1;
      if (num == selected.length) {
        customTosat("批量下载结束,请前往下载管理查看");
      } else batchDown1();
    }
  });
}

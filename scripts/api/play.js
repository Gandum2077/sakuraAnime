function player(dz) {
  if ($device.networkType == 2 && $cache.get("xzjd") == true) {
      customTosat("你正在使用移动数据,请注意流量花费", true);
    }
  $ui.push({
    props: {
      title: "player",
      navButtons: [
        {
          title: "共享",
          handler: function() {
            $share.sheet(dz);
          }
        }
      ]
    },
    views: [
      {
        type: "web",
        props: {
          url: dz
        },
        layout: $layout.fill
      }
    ]
  });
}

function player1(dz, index, name, uurl) {
  if ($device.networkType == 2 && $cache.get("xzjd") == true) {
    customTosat("你正在使用移动数据,请注意流量花费", true);
  }
  var url = "none";
  $ui.push({
    props: {
      title: name,
      id: "w3",
      navBarHidden: true,
      clipsToSafeArea: true,
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
              id: "returnBtn",
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
            type: "button",
            props: {
              id: "shareBtn",
              icon: $icon("002", $color("tint")),
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.right.inset(10);
              make.centerY.equalTo(view.super);
              make.width.equalTo(30);
            },
            events: {
              tapped: function(sender) {
                $ui.menu({
                  items: ["播放速度", "分享网页"],
                  handler: function(title, idx) {
                    if (idx == 0) {
                      $ui.menu({
                        items: ["2.0", "1.5", "1.0", "0.5", "自定义"],
                        handler: function(title, idx) {
                          if (idx == 4) {
                            $input.text({
                              handler: function(text) {
                                setPlayRate(text);
                              }
                            });
                          } else setPlayRate(title);
                          function setPlayRate(speed) {
                            $("playFrame").notify({
                              event: "setRate",
                              message: {
                                speed: speed
                              }
                            });
                          }
                        }
                      });
                    } else {
                      $ui.menu({
                        items: ["共享播放网址", "第三方播放器打开"],
                        handler: function(title, idx) {
                          if (idx == 0) {
                            $share.sheet(dz);
                          } else {
                            if (url == "none") {
                              customTosat("请等待视频加载出之后再尝试", true);
                            } else {
                              $ui.menu({
                                items: apps.map(function(item) {
                                  return item.name;
                                }),
                                handler: function(title, idx) {
                                  var link = apps[idx].url + url;
                                  $app.openURL(link);
                                }
                              });
                            }
                          }
                        }
                      });
                    }
                  }
                });
              }
            }
          },
          {
            type: "button",
            props: {
              id: "downBtn",
              icon: $icon("165", $color("tint")),
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.right.equalTo($("shareBtn").left).offset(-15);
              make.centerY.equalTo(view.super);
              make.width.equalTo(30);
            },
            events: {
              tapped: function(sender) {
                if (url == "none") {
                  customTosat("请等待视频加载出之后再点击下载", true);
                } else {
                  if (url.indexOf("60.205.184.197:8899") !== -1) {
                    customTosat("此视频格式为m3u8,无法下载", true);
                  } else {
                    loading.start();
                    downloadVideo(url, name);
                  }
                }
              },
              longPressed: function(sender) {
                $clipboard.text = url;
                customTosat("已复制视频链接");
              }
            }
          },
          {
            type: "label",
            props: {
              text: name,
              font: $font("bold", 18),
              align: $align.center
            },
            layout: (make, view) => {
              make.centerY.equalTo(view.super);
              make.right.equalTo($("downBtn").left);
              make.left.equalTo($("returnBtn").right);
            }
          }
        ]
      },
      {
        type: "label",
        props: {
          text: "载入视频中...",
          textColor: $color("gray")
        },
        layout: $layout.center
      },
      {
        type: "web",
        props: {
          id: "videoWeb",
          hidden: false,
          url: dz,
          script: function() {
            setTimeout(function() {
              $notify("getPlayLink", video);
            }, 500);
          }
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.top.inset(0);
          make.height.equalTo(0);
        },
        events: {
          getPlayLink: function(link) {
            if (link.indexOf("/ts.php?") == 0)
              link = "http://60.205.184.197:8899" + link;
            url = link;
            $("playFrame").hidden = false;
            var watchP = $cache.get("watchProgress")[dz];
            if (!$cache.get("autoProgress")) {
              watchP = 0;
            }
            if (typeof watchP == "undefined" || watchP <= 10) {
              var k = $cache.get("jumpop")[uurl];
              if (typeof k != "undefined" && $cache.get("jumpOP") == true) {
                watchP = hsToS(k);
              } else watchP = 0;
            }
            $(
              "playFrame"
            ).html = `<video id="video" oncanplay="changeProgress(${watchP})" controls><source src="${link}" type="video/mp4"></video>`;
            $("videoWeb").hidden = true;
            if ($cache.get("defaultPlayer")[0] !== "关闭") {
              var l = apps[$cache.get("defaultPlayer")[1]].url + url;
              $app.openURL(l);
            }
          }
        }
      },
      {
        type: "web",
        props: {
          id: "playFrame",
          hidden: true,
          showsProgress: false,
          scrollEnabled: false,
          inlineMedia: true,
          style:
            "body{background-color: #FFFFFF;}#video{position:absolute;width:100%;height:100%;}",
          script: function() {
            var video = document.getElementById("video");
            function changeProgress(time) {
              if (getCookie("currentTime") == "") {
                document.cookie = "currentTime=" + time;
                video.currentTime = time;
              }
              getvideoprogress();
              function getvideoprogress() {
                setTimeout(function() {
                  var currentTime = video.currentTime.toFixed(1);
                  $notify("saveProgress", currentTime);
                  getvideoprogress();
                }, 500);
              }
            }
            function setRate(speed) {
              video.playbackRate = speed.speed;
            }
            function getCookie(cname) {
              var name = cname + "=";
              var ca = document.cookie.split(";");
              for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if (c.indexOf(name) == 0)
                  return c.substring(name.length, c.length);
              }
              return "";
            }
          }
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.centerY.equalTo(view.super);
          make.height.equalTo(
            ($device.info.screen.width * 9) / 16 > $device.info.screen.height
              ? $device.info.screen.height - 50
              : ($device.info.screen.width * 9) / 16
          );
        },
        events: {
          saveProgress: function(object) {
            var cache = $cache.get("watchProgress");
            cache[dz] = object;
            $cache.set("watchProgress", cache);
          }
        }
      },
      {
        type: "view",
        props: {
          alpha: 0,
          bgcolor: $color("white")
        },
        layout: function(make, view) {
          make.right.inset(10);
          make.top.equalTo($("header").bottom).offset(5);
          make.width.equalTo(180);
          make.height.equalTo(30);
          shadow(view, 0.5, 9, $size(0, 0), 15, "gray");
        },
        events: {
          ready: function(sender) {
            var text;
            var w = $cache.get("watchProgress")[dz];
            if (!$cache.get("autoProgress")) {
              w = 0;
            }
            if (typeof w != "undefined" && w > 10) {
              text = "已自动跳转至进度" + s_to_hs(w);
            } else {
              var k = $cache.get("jumpop")[uurl];
              if (typeof k != "undefined" && $cache.get("jumpOP") == true) {
                text = "已自动跳过片头";
              }
            }
            if (Boolean(text)) {
              sender.add({
                type: "label",
                props: {
                  text: text,
                  font: $font(14)
                },
                layout: $layout.center
              });
              $ui.animate({
                duration: 1,
                animation: function() {
                  sender.alpha = 1;
                }
              });
              $delay(4, function() {
                $ui.animate({
                  duration: 0.4,
                  animation: function() {
                    sender.alpha = 0;
                  },
                  completion: function() {
                    sender.remove();
                  }
                });
              });
            }
          }
        }
      }
    ]
  });
  function s_to_hs(s) {
    var h;
    h = Math.floor(s / 60);
    s = s % 60;
    h += "";
    s += "";
    s = Number(s).toFixed(0);
    h = h.length == 1 ? "0" + h : h;
    s = s.length == 1 ? "0" + s : s;
    return h + ":" + s;
  }
  function hsToS(hs) {
    var h = hs.split(".").shift();
    var s = hs.split(".").pop();
    return Number(h) * 60 + Number(s);
  }
}
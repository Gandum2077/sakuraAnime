function player(dz){
  $ui.push({
    props: {
      title: "player"
    },
    views: [
      {
        type: "web",
        props: {
          url:dz
        },
        layout: $layout.fill
      }
    ]
  });
}

function player1(dz, index, name) {
  if ($device.networkType == 2 && $cache.get("xzjd") == true) {
    alert("你正在使用移动数据嗷");
  }
  $ui.push({
    props: {
      title: "player",
      id: "w3",
      navButtons: [{
        title: "共享",
        handler: function() {
          $share.sheet(dz);
        }
      }]
    },
    views: [{
        type: "web",
        props: {
          id: "videoWeb",
          hidden:false,
          url:dz,
          script: function() {
            $notify("getPlayLink", video)
          }
        },
        layout: function(make, view) {
          make.left.right.inset(0);
                    make.top.inset(0)
                    make.height.equalTo(3);
        },
        events: {
          getPlayLink: function(link) {
            $("downloadBtn").info = link
            $("playFrame").hidden = false
            $("playFrame").src = link
            $("videoWeb").hidden = true
          }
        }
      },
      {
        type: "video",
        props: {
          id: "playFrame",
          hidden:true
        },
        layout: function(make, view) {
          make.left.right.inset(0);
          make.centerY.equalTo(view.super);
          make.height.equalTo(256);
        }
      },
      {
        type: "button",
        props: {
          id: "downloadBtn",
          title: "下载",
          info:"none"
        },
        layout: function(make, view) {
          make.right.inset(0);
          make.height.equalTo(30);
          make.width.equalTo(100);
        },
        events: {
          tapped: function(sender) {
            if(sender.info == "none"){
            $ui.toast("请等待视频加载出之后再点击下载")
            } else downloadVideo(sender.info, name);
          },
          longPressed:function(sender){
            $clipboard.text = sender.info
            $ui.toast("已复制视频链接")
          }
        }
      }
    ]
  });
}

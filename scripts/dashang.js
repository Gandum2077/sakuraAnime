function dashang() {
  $ui.push({
    props: {
      title: "给作者赏鸡腿🍗"
    },
    views: [{
        type: "image",
        props: {
          src: "assets/zanshang.JPG"
        },
        layout: function(make, view) {
          make.bottom.left.right.inset(0);
          make.height.equalTo($device.info.screen.width);
        }
      },
      {
        type: "text",
        props: {
          text: `全民制作人们大家好，我是写脚本时长两年半的个人练习生Azite(其实是Hhd小号)，喜欢唱，跳，rap，写脚本。在今后的节目中，我还准备了许多自己开(luan)发(xie)的原创脚本，觉得好用的话请为我打赏吧，mua～`
        },
        layout: function(make, view) {
          make.top.left.right.inset(0);
          make.height.equalTo(300);
        }
      }
    ]
  });
}

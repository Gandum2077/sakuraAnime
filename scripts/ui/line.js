var line = {
  type: "canvas",
  layout: function(make, view) {
    var preView = view.prev;
    make.top.equalTo(preView.top);
    make.height.equalTo(1 / $device.info.screen.scale);
    make.left.right.inset(0);
  },
  events: {
    draw: function(view, ctx) {
      var width = view.frame.width;
      var scale = $device.info.screen.scale;
      ctx.strokeColor = $color("gray");
      ctx.setLineWidth(1 / scale);
      ctx.moveToPoint(0, 0);
      ctx.addLineToPoint(width, 0);
      ctx.strokePath();
    }
  }
};
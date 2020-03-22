var location = 0;

var loadingview = {
  type: "",
  props: {
    id: "lodingView",
    alpha:0,
    bgcolor: $color("clear")
  },
  layout: $layout.fill,
  views: [
    {
      type: "view",
      props: {
        style: 2,
        bgcolor:$color("white")
      },
      layout: function(make, view) {
        shadow(view, 0.8, 15, $size(0, 0), 20, "gray");
        make.center.equalTo(view.super);
        make.size.equalTo(100); 
      },
      views: [
        {
          type: "canvas",
          props: {
            id:"loadingCanvas"
          },
          layout: $layout.fill,
          events: {
            draw: function start(view, ctx) {
              ctx.strokeColor = $color("tint");
              ctx.setLineWidth(5);
              ctx.addArc(
                view.frame.width / 2,
                view.frame.height / 2,
                20,
                location,
                Math.PI * 2 * 0.8 + location,
                false
              );
              ctx.strokePath();
            }
          }
        }
      ]
    }
  ]
};

var loading = {
  start: function() {
    $ui.window.add(loadingview);
    timer = $timer.schedule({
      interval: 0.005,
      handler: function() {
        location = location + 0.06;
        $("loadingCanvas")
          .runtimeValue()
          .invoke("setNeedsDisplay");
      }
    });
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("lodingView").alpha = 1;
      }
    });
  },
  stop: function() {
    timer.invalidate();
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("lodingView").alpha = 0;
      },
      completion: function() {     
        $("lodingView").remove();
      }
    });
  }
};

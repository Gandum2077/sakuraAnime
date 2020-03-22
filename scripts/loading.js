var location = 0;

var loadingview = {
  type: "",
  props: {
    id: "lodingView",
    bgcolor: $color("clear")
  },
  layout: $layout.fill,
  views: [
    {
      type: "blur",
      props: {
        style: 2,
        radius: 20
      },
      layout: function(make, view) {
        make.center.equalTo(view.super);
        make.size.equalTo(110);
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
              ctx.strokeColor = $color("white");
              ctx.setLineWidth(6);
              ctx.addArc(
                view.frame.width / 2,
                view.frame.height / 2,
                25,
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
  start: function(id) {
    $(id).add(loadingview);
    timer = $timer.schedule({
      interval: 0.01,
      handler: function() {
        location = location + 0.07;
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
    $ui.animate({
      duration: 0.4,
      animation: function() {
        $("lodingView").alpha = 0;
      },
      completion: function() {
        timer.invalidate();
        $("lodingView").remove();
        $delay(0.5, () => $("lodingView").remove());
      }
    });
  }
};

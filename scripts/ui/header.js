var Header = {
  type: "view",
  props: {
    id: "header"
  },
  layout: function(make, view) {
    make.right.top.left.equalTo(0);
    make.height.equalTo(60);
  },
  views: [{
      type: "label",
      props: {
        id: "headerLabel",
        text: "首页",
        font: $font("bold", 22)
      },
      layout: (make, view) => {
        make.centerX.equalTo(view.super);
        make.top.inset(16);
      }
    },
    {
      type: "button",
      props: {
        id:"downloadBtn",
        icon: $icon("165", $color("tint")),
        bgcolor: $color("clear")
      },
      layout: function(make, view) {
        make.right.inset(15);
        make.centerY.equalTo(view.super)
      },
      events: {
        tapped: function(sender) {
          downloads();
        }
      }
    },
    {
      type: "button",
      props: {
        id:"closeBtn",
        title: "×",
        bgcolor: $color("clear"),
        font: $font(35),
        titleColor:$color("tint")
      },
      layout: function(make, view) {
        make.left.inset(13);
        make.centerY.equalTo(view.super)
      },
      events: {
        tapped: function(sender) {
          $app.close()
        }
      }
    }
  ]
};
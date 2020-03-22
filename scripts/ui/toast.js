//代码来自@Ryan

function customTosat(message, error = false) {
  if ($("toast")) {
    $("toast").remove()
  }
  
  $ui.window.add({
    type: "view",
    props: {
      id: "toast"
    },
    layout: function(make, view) {
      make.height.equalTo(50)
      make.centerX.equalTo()
      make.left.right.inset(0)
      if ($device.isIphonePlus && $app.env == $env.app)
        make.top.equalTo(view.super.safeAreaTop).offset(-50)
      else
        make.top.equalTo(view.super.top).offset(-50)
      shadow(view, 1, 5, $size(0, 0), false, "gray");
    },
    views: [{
      type: "label",
      props: {
        text: `${message}      `,
        font: $font("PingFangSC-Medium", 16),
        bgcolor: error ? $color("#EF454A") : $color("tint"),
        textColor: error ? $color("white") : $color("white"),
        align: $align.center,
        circular: true
      },
      layout: function(make) {
        make.height.equalTo(35)
        make.width.greaterThanOrEqualTo(150)
        make.width.lessThanOrEqualTo(JSBox.device.info.screen.width - 30)
        make.centerX.equalTo()
        make.centerY.equalTo()
      }
    }],
    events: {
      ready: function(view) {
        $delay(0.0, function() {
          toggleToast(view, true, function() {
            toggleToast(view, false, function() {
              view.remove()
            })
          })
        })
      }
    }
  })
}

function toggleToast(view, show = true, completetion = null) {
  var inset = show ? 40 : -50
  var delay = show ? 0.0 : 1.5
  var damping = show ? 1 : 1.0
  var alpha = show ? 1.0 : 0.0
  
  view.updateLayout(function(make) {
    if ($device.isIphonePlus && $app.env == $env.app)
      make.top.equalTo(view.super.safeAreaTop).offset(inset)
    else
      make.top.equalTo(view.super.top).offset(inset)
  })
  
  $ui.animate({
    duration: 0.5,
    delay: delay,
    damping: damping,
    animation: function() {
      view.relayout()
      view.alpha = alpha
    },
    completion: function() {
      if (completetion) completetion()
    }
  })
}
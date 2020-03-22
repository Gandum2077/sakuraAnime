function shadow(view, opacity, shadowRadius, offset, radius, color) {
  var layer = view.runtimeValue().invoke("layer");
  layer.invoke("setShadowOffset", offset);
  layer.invoke(
    "setShadowColor",
    $color(color)
      .runtimeValue()
      .invoke("CGColor")
  );
  layer.invoke("setShadowOpacity", opacity);
  layer.invoke("setShadowRadius", shadowRadius);
  if (radius) {
    layer.invoke("setMasksToBounds", false);
    layer.invoke("setCornerRadius", radius);
  }
}
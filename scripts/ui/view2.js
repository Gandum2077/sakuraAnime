var View2 = {
  type: "view",
  props: {
    id: "view2",
    hidden: true
  },
  layout: function(make, view) {
    make.top.left.right.inset(0);
    make.bottom.inset($device.isIphoneX == true ? 20 : 0);
  },
  views: [
    {
      type: "matrix",
      props: {
        id: "m3",
        scrollEnabled: true,
        columns: 4,
        itemHeight: $device.isIpad == true ? 200 : 170,
        spacing: 5,
        template: [
          {
            type: "image",
            props: {
              id: "image",
              radius: 5
            },
            layout: function(make, view) {
              make.top.inset(5);
              make.bottom.inset(30);
              make.width.equalTo($device.isIpad == true ? 120 : 90);
              make.centerX.equalTo(view.super);
              //make.left.right.inset(5)
            }
          },
          {
            type: "label",
            props: {
              id: "label",
              align: $align.center,
              font: $font(15)
            },
            layout: function(make, view) {
              make.top.equalTo($("image").bottom).inset(5);
              make.left.right.inset(5);
              make.bottom.inset(10);
            }
          }
        ],
        data: JSON.parse($file.read("shared://SakuraAnime/fav.txt").string)
      },
      layout: $layout.fill,
      events: {
        didSelect(sender, indexPath, data) {
          loading.start("window");
          det(
            sender.data[indexPath.row].href,
            sender.data[indexPath.row].image.src
          );
        }
      }
    }
  ]
};

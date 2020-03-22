var Tabs = {
      type: "matrix",
      props: {
        id: "tab",
        columns: 3,
        itemHeight: 60,
        spacing: 0,
        scrollEnabled: false,
        bgcolor: $color("white"),
        template: [{
            type: "image",
            props: {
              id: "menu_image",
              bgcolor: $color("clear")
            },
            layout: function(make, view) {
              make.centerX.equalTo(view.super);
              make.width.height.equalTo(25);
              make.top.inset(7);
            }
          },
          {
            type: "label",
            props: {
              id: "menu_label",
              font: $font(10)
            },
            layout: function(make, view) {
              var preView = view.prev;
              make.centerX.equalTo(preView);
              make.bottom.inset(13);
            }
          }
        ],
        data: [{
            menu_image: {
              icon: $icon("102", $color("black"), $size(50, 50))
            },
            menu_label: {
              text: "首页",
              textColor: $color("black")
            }
          },
          {
            menu_image: {
              icon: $icon("062", $color("gray"), $size(50, 50))
            },
            menu_label: {
              text: "追番",
              textColor: $color("gray")
            }
          },
          {
            menu_image: {
              icon: $icon("002", $color("gray"), $size(50, 50))
            },
            menu_label: {
              text: "设置",
              textColor: $color("gray")
            }
          }
        ]
      },
      layout: function(make, view) {
        make.bottom.inset($device.isIphoneX == true ? 20 : 0);
        if ($device.info.screen.width > 500) {
          make.width.equalTo(500);
        } else {
          make.left.right.inset(0);
        }
        make.left.inset(0);
        make.centerX.equalTo(view.super);
        make.height.equalTo(50);
      },
      events: {
        didSelect(sender, indexPath, data) {
          $("view1").hidden = true;
          $("view2").hidden = true;
          $("view3").hidden = true;
          var data = sender.data;
          data[0].menu_image.icon = $icon("102", $color("gray"), $size(50, 50));
          data[1].menu_image.icon = $icon("062", $color("gray"), $size(50, 50));
          data[2].menu_image.icon = $icon("002", $color("gray"), $size(50, 50));
          data[0].menu_label.textColor = $color("gray");
          data[1].menu_label.textColor = $color("gray");
          data[2].menu_label.textColor = $color("gray");
          switch (indexPath.row) {
            case 0:
              $("view1").hidden = false;
              data[0].menu_image.icon = $icon(
                "102",
                $color("black"),
                $size(50, 50)
              );
              data[0].menu_label.textColor = $color("black");
              break;
            case 1:
              $("view2").hidden = false;
              data[1].menu_image.icon = $icon(
                "062",
                $color("black"),
                $size(50, 50)
              );
              data[1].menu_label.textColor = $color("black");
              break;
            case 2:
              $("view3").hidden = false;
              data[2].menu_image.icon = $icon(
                "002",
                $color("black"),
                $size(50, 50)
              );
              data[2].menu_label.textColor = $color("black");
              break;
          }
          sender.data = data;
        }
      }
    }

var View1 = {
  type: "view",
  props: {
    id: "view1",
    hidden: false
  },
  layout: function(make, view) {
    make.top.left.right.inset(0);
    make.bottom.inset(50);
  },
  views: [
    {
      type: "list",
      props: {
        data: [
          {
            rows: [
              {
                type: "input",
                props: {
                  id: "search",
                  type: $kbType.search,
                  placeholder: "搜索...",
                  clearsOnBeginEditing: true
                },
                layout(make) {
                  make.top.bottom.inset(5);
                  make.right.left.inset(10);
                },
                events: {
                  returned(sender) {
                    sender.blur();
                    search(sender.text);
                  }
                }
              }
            ]
          },
          {
            title: "历史记录",
            rows: [
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "text",
                    props: {
                      id: "myjl",
                      align: $align.center,
                      font: $font(15),
                      hidden:
                        typeof $cache.get("history")[0] == "undefined"
                          ? false
                          : true,
                      text: "暂时没有观看记录",
                      textColor: $color("gray")
                    },
                    layout: function(make, view) {
                      make.center.equalTo(view.super);
                      make.width.equalTo(150);
                      make.height.equalTo(30);
                    }
                  },
                  {
                    type: "matrix",
                    props: {
                      id: "m1",
                      columns: 4,
                      scrollEnabled: false,
                      itemHeight: $device.isIpad == true ? 200 : 170,
                      spacing: 5,
                      hidden:
                        typeof $cache.get("history")[0] == "undefined"
                          ? true
                          : false,
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
                            make.width.equalTo(
                              $device.isIpad == true ? 120 : 90
                            );
                            make.centerX.equalTo(view.super);
                            //make.left.right.inset(5)
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "label",
                            align: $align.center,
                            font: $font(16)
                          },
                          layout: function(make, view) {
                            make.top.equalTo($("image").bottom).inset(5);
                            make.left.right.inset(5);
                            make.bottom.inset(10);
                          }
                        }
                      ],
                      data: $cache.get("history")
                    },
                    layout: function(make, view) {
                      make.top.left.right.inset(0);
                      make.bottom.inset(25);
                    },
                    events: {
                      didSelect(sender, indexPath, data) {
                        loading.start("window");
                        det(
                          $cache.get("history")[indexPath.row].href,
                          $cache.get("history")[indexPath.row].image.src
                        );
                      }
                    }
                  },
                  {
                    type: "button",
                    props: {
                      id: "ckqb",
                      title: "查看全部",
                      hidden:
                        typeof $cache.get("history")[0] == "undefined"
                          ? true
                          : false,
                      bgcolor: $color("clear"),
                      titleColor: $color("gray"),
                      font: $font(14)
                    },
                    layout: function(make, view) {
                      make.height.equalTo(25);
                      make.bottom.inset(0);
                      make.right.inset(15);
                    },
                    events: {
                      tapped: function() {
                        history();
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            title: "最新更新",
            rows: [
              {
                type: "matrix",
                props: {
                  id: "m2",
                  scrollEnabled: false,
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
                  data: []
                },
                layout: $layout.fill,
                events: {
                  didSelect(sender, indexPath, data) {
                    loading.start("window");
                    det(iml[indexPath.row].href, iml[indexPath.row].image.src);
                  }
                }
              }
            ]
          },
          {
            title: "更新表",
            rows: [
              {
                type: "view",
                layout: $layout.fill,
                views: [
                  {
                    type: "menu",
                    props: {
                      id: "sjbmenu",
                      items: [
                        "周日",
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六"
                      ]
                    },
                    layout: function(make) {
                      make.left.top.right.inset(0);
                      make.height.equalTo(40);
                    },
                    events: {
                      changed: function(sender) {
                        switch (parseInt(sender.index)) {
                          case 0:
                            $("sjblist").data = date0;
                            break;
                          case 1:
                            $("sjblist").data = date1;
                            break;
                          case 2:
                            $("sjblist").data = date2;
                            break;
                          case 3:
                            $("sjblist").data = date3;
                            break;
                          case 4:
                            $("sjblist").data = date4;
                            break;
                          case 5:
                            $("sjblist").data = date5;
                            break;
                          case 6:
                            $("sjblist").data = date6;
                            break;
                        }
                      }
                    }
                  },
                  {
                    type: "list",
                    props: {
                      id: "sjblist",
                      template: [
                        {
                          type: "label",
                          props: {
                            id: "l1",
                            font: $font(16)
                          },
                          layout: function(make, view) {
                            make.left.inset(15);
                            make.centerY.equalTo(view.super);
                          }
                        },
                        {
                          type: "label",
                          props: {
                            id: "l2",
                            font: $font(16),
                            textColor: $color("gray")
                          },
                          layout: function(make, view) {
                            make.right.inset(15);
                            make.centerY.equalTo(view.super);
                          }
                        }
                      ]
                    },
                    layout: function(make) {
                      make.top.inset(40);
                      make.left.bottom.right.inset(0);
                    },
                    events: {
                      didSelect: function(sender, indexPath, data) {
                        loading.start("window");
                        $http.get({
                          url:
                            "http://www.imomoe.in/" +
                            sender.data[indexPath.row].h,
                          handler: function(resp) {
                            var data = resp.data
                              .replace(/\s/g, "")
                              .match(/<imgsrc=\".*?alt=/)[0]
                              .replace('<imgsrc="', "")
                              .replace("alt=", "")
                              .replace('"', "");
                            det(
                              "http://www.imomoe.in/" +
                                sender.data[indexPath.row].h,
                              data
                            );
                          }
                        });
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      layout: function(make) {
        make.right.left.top.inset(0);
        make.bottom.inset($device.isIphoneX == true ? 20 : 0);
      },
      events: {
        rowHeight: function(sender, indexPath) {
          switch (indexPath.section) {
            case 0:
              return 42;
              break;
            case 1:
              return $device.isIpad == true ? 225 : 195;
              break;
            case 2:
              return $device.isIpad == true ? 200 * 2 + 5 : 170 * 2 + 5;
              break;
            case 3:
              return 300;
              break;
          }
        }
      }
    }
  ]
};

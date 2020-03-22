function downloadVideo(url, name) {
  var data = $cache.get("download");
  var jjjd = 0;
  for (i in data) {
    if (data[i].title.text == name) {
      customTosat("此任务已存在", true);
      var jjjd = 1;
    }
  }
  if (jjjd == 0) {
    data.unshift({
      title: {
        text: name
      },
      progress: {
        value: 0
      },
      filetj: {
        text: "0/0MB"
      },
      jindu: {
        text: "0%"
      },
      total: 0
    });
    $cache.set("download", data);
    $http.download({
      url: url,
      showsProgress: false,
      progress: function(write, total) {
        var precent = ((write / total) * 100).toFixed(1);
        var totalSize = change(total);
        var writeSize = change(write);
        var data = $cache.get("download");
        var jjd = 0;
        for (i in data) {
          if (data[i].total == total) {
            data[i].progress.value = precent / 100;
            data[i].filetj.text = `${writeSize}/${totalSize}`;
            data[i].jindu.text = `${precent}%`;
            var jjd = 1;
          }
          $cache.set("download", data);
        }
        if (jjd == 0) $cache.set("nowTotal", total);
      },
      handler: function(resp) {
        var data = $cache.get("download");
        for (i in data) {
          if (data[i].total == resp.data.info.size) {
            $file.mkdir(
              `shared://SakuraAnime/download/${data[i].title.text.replace(
                /第[0-9]+集/,
                ""
              )}/`
            );
            $file.write({
              data: resp.data,
              path: `shared://SakuraAnime/download/${data[i].title.text.replace(
                /第[0-9]+集/,
                ""
              )}/${data[i].title.text}.mp4`
            });
            data.splice(i, 1);
            $cache.set("download", data);
            if ($("wancheng")) {
              $("wancheng").data = $file.list("shared://SakuraAnime/download/");
            }
          }
        }
      }
    });
    var ttimer = $timer.schedule({
      interval: 0.5,
      handler: function() {
        if ($cache.get("nowTotal")) {
          var data = $cache.get("download");
          data[0].total = $cache.get("nowTotal");
          $cache.set("download", data);
          $cache.remove("nowTotal");
          customTosat("已将任务添加至下载管理");
          loading.stop();
          ttimer.invalidate();
        }
      }
    });
  }
}

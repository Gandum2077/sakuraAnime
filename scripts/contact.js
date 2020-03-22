function contact() {
  $ui.push({
    props: {
      title: "联系作者 / 反馈问题"
    },
    views: [{
      type: "markdown",
      props: {
        content: `邮箱
---------------------
hehedahhd@icloud.com

QQ
---------------------
1350855271

微信
---------------------
qq1350855271`
      },
      layout: $layout.fill
    }]
  });
}

function load() {
      var a= setTimeout("loading.style.transition='opacity 0.3s'",0)   
      //设置透明度改变的过渡时间为0.3秒
      var b= setTimeout("loading.style.opacity=0",500)
      //0.5秒后加载动画开始变为透明
      var c= setTimeout("loading.style.display='none'",800)
      //当透明度为0的时候，隐藏掉它
}

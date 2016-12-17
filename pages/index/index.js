//index.js
//获取应用实例
var app = getApp()
var order = ['green', 'red', 'yellow', 'blue', 'green']
var bccolor = ['bc_green','bc_blue']
var phoneNumber=15520441096
Page({
  data: {
    motto: '约一发',
    modalHidden:false,//弹出提示窗口
    userInfo: {},
    phone:0,
    if_insert:0,
    name:'zjq',
    toView: 'green',
    match_type_trans:['学习','跑步','狼人杀','???','????'],
    bccolor:['bc_green','bc_blue','bc_red','bc_wrapper'],
    items: [
      { name: '图书馆', date: '2016-12-7', startTime: '9:00', endTime: '10:00', num: '3' },
      { name: '操场', date: '2016-12-7', startTime: '9:00', endTime: '10:00', num: '10' }
    ],//约到的项目
    result:[]
    //bccolor: [{'bc_green'},{'bc_blue'}]
  },



  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  modalChange: function() {
    this.setData({
      modalHidden: !this.modalHidden
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
     wx.request({ //先查找有没有个人信息,然后再查找预约活动
     url: 'http://127.0.0.1/info.php',
     data: {name:this.data.name,phone:this.data.phone,if_insert:this.data.if_insert},
     header: {'content-type': 'application/x-www-form-urlencoded'},  //添加头部才能传输
     method: 'POST',
     success:function(res) {
       if(res.data.phone){
         that.setData({
      modalHidden:true
   })
       }
       that.setData({
          phone:res.data.phone , 
       })
      
     }
   })  


  
   wx.request({
     url: 'http://127.0.0.1/onload.php',
     method: 'POST',
     success:function(res) {
       that.setData({
         result: res.data.results
       })
     }
   })

  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  scrollToTop: function (e) {
    this.setAction({
      scrollTop: 0
    })

  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1],
          scrollTop: (i + 1) * 200
        })
        break
      }
    }
  },
  doSearch: function () {
    //检查电话是否设置
   /* if (phoneNumber) {
      wx.navigateTo({
        url: '../../info/info'
      })
    }
    else {  */
      wx.navigateTo({
        url: '../search/search'
      })
   // }
  },
  addNumber: function (e) {
      wx.navigateTo({
        url: '../addNumber/addNumber'
      })
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})






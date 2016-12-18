Page({
    data: {
        inputShowed: false,
        showTopTips: false,
        name:"",
        gender:"",
        phone:0,
        if_insert:1,
        date: "2016-09-01",//约开始日期

    },
     userNameInput: function (e) {
         this.setData({
      name:e.detail.value
    })
    },
     userGenderInput: function (e) {
         this.setData({
      gender:e.detail.value
    })
    },
     userPhoneInput: function (e) {
         this.setData({
      phone:e.detail.value
    })
    },
    //改约日期的函数
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    //改约时间的函数
    bindStartTimeChange: function (e) {
        this.setData({
            startTime: e.detail.value
        })
    },
     bindEndTimeChange: function (e) {
        this.setData({
            endTime: e.detail.value
        })
    },
    //跳转到显示约成功的页面
    forSubmit: function(){
        wx.request({ //先查找有没有个人信息,然后再查找预约活动
     url: 'http://kanjin5sui.cn/userinfo.php',
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

        wx.navigateTo({
            url: '../addNumberMsg/addNumberMsg'
        })
    },

});
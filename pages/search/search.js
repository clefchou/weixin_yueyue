Page({
    data: {
        inputShowed: false,
        showTopTips: false,
        //inputVal: "",
        date: "2016-09-01",//约开始日期
        startTime: "08:01",//约开始时间
        endTime: "09:01",
       num:"24",
       match_type:"4",
        radioItems: [
            {name: '学习', value: '0'},
            {name: '跑步', value: '1'},
            {name: '狼人杀',value: '2'}
        ]//所有可以约的项目
    },

    //改人数的函数
    userNumInput: function (e) {
         this.setData({
      num:e.detail.value
    })
    },
    //改约日期的函数
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    //改约时间的函数
    bindTimeChange: function (e) {
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
    forSubmit: function(e){
        var _this = this
        wx.request({
            url: 'http://127.0.0.1/test.php',
            data: {num:this.data.num,date:this.data.date,match_type:this.data.match_type},
            header: {'content-type': 'application/x-www-form-urlencoded'},  //添加头部才能传输
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT

        success: function(res){
        var err = res.data.error
        if(err) {
          _this.setData({
             error:err
          })
        }
        }
        })
        wx.navigateTo({
            url: '../searchMsg/searchMsg'
        })
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);
       
        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
            
        }
     this.data.match_type = e.detail.value;
        this.setData({
            radioItems: radioItems
        });
    }
});
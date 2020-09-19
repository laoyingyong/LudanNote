// miniprogram/pages/look/look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:"",
    shijian:"",
    _id:""
  },

  gotoedit:function(){
    wx.navigateTo({
      url: '../edit/edit?_id='+this.data._id+'&title='+this.data.title+'&content='+this.data.content,
    })

  },


  dateFormat:function(fmt,date){
    var ret;
        var opt =
         {
            "y+": date.getFullYear().toString(),        // 年
            "M+": (date.getMonth() + 1).toString(),     // 月
            "d+": date.getDate().toString(),            // 日
            "H+": date.getHours().toString(),           // 时
            "m+": date.getMinutes().toString(),         // 分
            "s+": date.getSeconds().toString()          // 秒
            // 有其他格式化字符需求可以继续添加，必须转化成字符串
        };
        for (var k in opt)
        {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret)
            {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
            };
        };
        return fmt;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _id=options._id;
    this.setData({_id:_id});
   

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this=this;
    const db=wx.cloud.database();
    const jishiben=db.collection("jishiben");
    jishiben.where({
      _id:this.data._id,
    }).get({
      success:function(res){
        console.log("查询成功"+res.data);
        var arr=res.data;
        console.log("数组的长度是："+arr.length);
        var first=arr[0];
        var ti=first.title;
        var con=first.content;
        var tim=first.time;
        console.log("返回的时间是："+tim);
        _this.setData({title:ti});
        _this.setData({content:con});
        _this.setData({shijian:_this.dateFormat("yyyy-MM-dd HH:mm:ss",tim)});
      },
      fail:function(err){
        console.log("没有对应的记录！");
      }
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
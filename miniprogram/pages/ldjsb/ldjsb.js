// miniprogram/pages/ldjsb/ldjsb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
  },

  delete:function(v){
    var _this=this;
    var _id=v.currentTarget.dataset._id;
    console.log('要删除项的id是：'+_id);
    var tit=v.currentTarget.dataset.name;
    wx.showModal({
      title: '警告！',
      content: '您确定要删除标题为“'+tit+'”的记录吗？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.cloud.callFunction({
            // 云函数名称
            name: 'delete',
            // 传给云函数的参数
            data: {
              _id: _id
            },
            success: function (res) {
              console.log("删除成功！");
              const db=wx.cloud.database();
              const jishiben=db.collection("jishiben");
              jishiben.get({//再重新查询数据库，刷新数据
                success:function(r){
                  var array=r.data;
                  var myList=new Array();
                  for(var i=0;i<array.length;i++){
                    var ite=array[i];
                    var tt=ite.title;
                    var id=ite._id;
                    var ss=ite.time;
                    var tStr=_this.dateFormat("yyyy-MM-dd HH:mm:ss",ss);
                    var oneItem={
                      title:tt,
                      _id:id,
                      time:tStr
                    };
                    myList.push(oneItem);
                  }
                  _this.setData({//重新查询数据库更新数据
                    list:myList
                  });
                }
              });
            },
            fail: console.error
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
   
   
  },

  add:function(){
    wx.navigateTo({
      url: '../add/add',
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
  },

  lookdetail:function(e){
    var _id=e.currentTarget.dataset._id;
    wx.navigateTo({
      url: '../look/look?_id='+_id,
    })
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
    this.setData({list:[]});//清空数组
    let _this=this;
    let _list=this.data.list;
    const db=wx.cloud.database();
    const jishiben=db.collection("jishiben");
    jishiben.get({
      success:function(res){
        var array=res.data;
        for(var i=0;i<array.length;i++){
          var item=array[i];
          var title=item.title;
          var time=item.time;
          var _id=item._id;
          var len=_list.length;
          _list.push({title:title,_id:_id,time:_this.dateFormat("yyyy-MM-dd HH:mm:ss",time)});
        }
        console.log(_list);
        _this.setData({list:_list});
        console.log(res);
      },
      fail:function(err){
        console.log(err)
      }
    });
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
// miniprogram/pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id:"",
    title:"",
    content:""

  },
  settitle:function(v){
    var ti=v.detail.value;
    this.setData({title:ti});
  },
  setcontent:function(v){
    var con=v.detail.value;
    this.setData({content:con});
  },

  save:function(){
   wx.cloud.callFunction({
     name:'update',
     data:{
       _id:this.data._id,
       title:this.data.title,
       content:this.data.content
     },
     success:function(res){
       wx.showToast({
         title: '修改成功！',
         duration:2000
       })
     },
     fail:function(err){
       console.log(err);
      wx.showToast({
        title: '修改失败！',
        icon:'none',
        duration:2000
      })
    }

   });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _id=options._id;
    var title=options.title;
    var content=options.content;
    this.setData({_id:_id});
    this.setData({title:title});
    this.setData({content:content});
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
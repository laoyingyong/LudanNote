// miniprogram/pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    content:""

  },

  setTitle:function(v){
    this.setData({title:v.detail.value});
  },
  setContent:function(v){
    this.setData({content:v.detail.value});
  },

  save:function(){
    let _this=this;
    if(this.data.title===""||this.data.content===""){
      wx.showToast({
        title: '标题或正文不能为空！',
        icon:'none',
        duration:2000
      })
      return;
    }
    const db=wx.cloud.database();
    const jishiben=db.collection("jishiben");
    jishiben.add({
      data:{
        title:_this.data.title,
        content:_this.data.content,
        time:new Date()
      },
      success:function(res){
        wx.showToast({
          title: '保存成功！',
          icon:'success',
          duration:2000
        });
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
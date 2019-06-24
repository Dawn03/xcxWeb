// pages/searchPage/searchPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder: '搜电影、搜影院',
    inputValue: '',
    searchmovies: [],
    total: 0, // 共xx影院或影视剧
    searchcinemas: []
  },
  // 点击取消
  clickCancel() {

  },
  clearSearch() {
    console.log(55)
    this.setData({
      inputValue: '',
      searchmovies: [],
      searchcinemas: [],
      total: 0,
      stype: -1,
    })
  },
  //搜索的input事件
  getSearch(e) {
    let val = e.detail.value
    this.setData({
      inputValue: val
    })
    /**
    * stype -1 代表搜电影、影院 其他代表搜影院
    *cityId 动态获取需要结合定位功能， 否则会报错，这里直接写死
    **/
    if (val) {
      wx.request({
        url: `http://m.maoyan.com/ajax/search?kw=${val}&cityId=59&stype=-1`,
        success: (res) => {
          console.log(16, res)
          let movies = res.data.movies ? res.data.movies.list : []
          movies = movies.map(item => {
            item.img = item.img.replace('w.h', '128.180');
            item.nm = item.nm.length > 21 ? item.nm.slice(0, 21) + '...' : item.nm
            return item
          })
          this.setData({
            total: res.data.movies.total,
            searchmovies: movies,
            searchcinemas: res.data.cinemas ? res.data.cinemas.list : []
          })
        }
      })
    }
  },
  // 获取全部影视剧
  searchAll(e) {
    console.log(e)
    console.log(55, this.data.inputValue)
    wx.navigateTo({
      url: `../allmovies/allmovies?&keyword=${this.data.inputValue}`
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.stype == -1) {
      this.setData({
        stype: options.stype,
        placeholder: '搜电影、搜影院',
      })
    } else {
      this.setData({
        stype: -2,
        placeholder: '搜影院',
      })
    }
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
// pages/allmovies/allmovies.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: '',
    allmovies: [],
    offset: 20,
    total: 0,
    pageTotal: 0,
    curPage: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      keyword: options.keyword
    })
    this.initPage(this.data)
  },
  // 下拉到底部加载更多 // 有bug  要再次滚动触底才行
  onScrolltolower() {
    console.log('有bug  要再次滚动触底才行')
    if (this.data.curPage <= this.data.pageTotal) {
      this.initPage(this.data);
      this.data.curPage += 1;
    }
  },
  // 加载页面
  initPage(data) {
    wx.request({
      url: `http://m.maoyan.com/searchlist/movies?keyword=${data.keyword}&ci=59&offset=${data.offset * data.curPage}&limit=20`,
      success: (res) => {
        console.log(37, res.data.movies)
        this.data.allmovies = [...this.data.allmovies, ...res.data.movies.map(item => {
          item.img = item.img.replace('w.h', '128.180');
          item.nm = item.nm.length > 21 ? item.nm.slice(0, 16) + '...' : item.nm
          return item
        })]
        console.log(42, this.data.allmovies.length)
        let hasShow = Math.ceil(res.data.total / this.data.offset)
        this.setData({
          allmovies: this.data.allmovies,
          total: res.data.total,
          pageTotal: hasShow
        })
      }
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
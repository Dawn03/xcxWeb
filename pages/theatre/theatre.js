// pages/theatre/theatre.js
const {
  formatImgUrl
} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '2',
    navSection: [{
      name: '热映',
      typeId: '1'
    }, {
      name: '待映',
      typeId: '2'
    }],
    hotList: [{
      id: "id123",
      nm: "海伦娜之路",
      dType: "3D",
      avator: "xx xx  xx",
      img: '../images/豆瓣电影/p2358700489海伦娜之路.jpg'
    }],
    hotListIds: [],
    hotComplete: false,
    wishList: [{
      comingTitle: "2020年1月25日",
      id: 1217023,
      nm: "唐人街探案3",
      wish: 495752,
      wishst: 0,
      img: '../images/豆瓣电影/p2358700489海伦娜之路.jpg',
    }
  ]

  },
  handleClick1(e) {
    console.log(333, e.currentTarget.dataset.index)
    let currentTab = e.currentTarget.dataset.index
    this.setData({
      currentTab
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initHot()
  },
  // nav 切换
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
    }
  },
  // 搜索 跳转到搜索页
  searchBtn() {
    wx.navigateTo({
      url: '../searchPage/searchPage?stype=-1'
    })

  },
  // 获取电影 热映列表
  initHot() {
    const _this = this
    wx.showLoading({
      title: '正在加载...'
    })
    wx.request({
      url: 'https://m.maoyan.com/ajax/movieOnInfoList?token=',
      success(res) {
        wx.hideLoading();
        _this.hotListIds = res.data.movieIds
        for (let i = 0, len = res.data.movieList.length; i < len; i++) {
          if (res.data.movieList[i].version != '') {
            res.data.movieList[i].dType = res.data.movieList[i].version.split(' ')[0].slice(1, 3);
            res.data.movieList[i].maxType = res.data.movieList[i].version.split(' ')[1];
          } else {
            res.data.movieList[i].dType = false
            res.data.movieList[i].maxType = false
          }
        }
        _this.setData({
          hotList: formatImgUrl(res.data.movieList)
        })
      }
    })
  },
  onScrolltolower() {
    this.ReachBottom(this.data.hotList, this.hotListIds, this.hotComplete)
  },
  //上拉触底刷新的加载函数
  ReachBottom(list, ids, complete) {
    const _this = this
    if (complete) {
      return
    }
    const length = list.length
    if (length + 10 >= ids.length) {
      this.setData({
        'hotComplete': true
      })
    }
    let query = ids.slice(length, length + 10).join('%2C')
    const url = `https://m.maoyan.com/ajax/moreComingList?token=&movieIds=${query}`
    wx.request({
      url,
      success(res) {
        for (let i = 0, len = res.data.coming.length; i < len; i++) {
          if (res.data.coming[i].version != '') {
            res.data.coming[i].dType = res.data.coming[i].version.split(' ')[0].slice(1, 3);
            res.data.coming[i].maxType = res.data.coming[i].version.split(' ')[1];
          } else {
            res.data.coming[i].dType = false
            res.data.coming[i].maxType = false
          }
        }
        const arr = list.concat(formatImgUrl(res.data.coming))
        _this.setData({
          'hotList': arr,
        })
      }
    })
  },


  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  // checkCurrent: function (e) {
  //   const that = this;
  //   if (that.data.currentData === e.target.dataset.current) {
  //     return false;
  //   } else {
  //     that.setData({
  //       currentData: e.target.dataset.current
  //     })
  //   }
  // },
  // 热映  购票
  gouPiao: function (e) {
    wx.navigateTo({
      url: `../purchase/purchase?movieName=${e.currentTarget.id}`,
    })
  },
  goDetail: function (e) {
    console.log(e, 35)
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.id}&movieName=${e.currentTarget.dataset.moviename}&rt=${e.currentTarget.dataset.rt}`,
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
    console.log(323)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
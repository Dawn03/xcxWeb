// pages/detail/detail.js
const {
  formatImgUrl,
  formatTime
} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailMovie: {}, // 顶部详情数据， showst 1想看 3购票  4 预售
    cinemas: [
      {
        addr: "锦江区大业路6号财富广场4层D区",
        distance: "600m",
        id: 1550,
        mark: 0,
        nm: "万达影城（财富广场店）",
        promotion: { cardPromotionTag: "限时¥19.9促销开卡，首单更优惠" }, // 是否显示卡
        sellPrice: "39.9",
        showTimes: "次日00:05",
        tag: { // 1显示（支持） ，0 不显示（不支持）
          allowRefund: 0, // 退
          buyout: 0,
          cityCardTag: 0,
          deal: 0,
          endorse: 0, // 改签
          hallType: [], //["杜比全景声厅", "DTS:X 临境音厅"]
          sell: 0,
          snack: 0, // 小吃
          vipTag: "",//折扣卡
        }
      }
    ],
    movieDate: [
      {
        day: '今天',
        datetime: '2019-06-06',
        date: ' 06月06日'
      },
      {
        day: '明天',
        datetime: '2019-06-07',
        date: ' 06月07日'
      },
      {
        day: '后天',
        datetime: '2019-06-08',
        date: ' 06月08日'
      },
      {
        day: '周日',
        datetime: '2019-06-09',
        date: ' 06月09日'
      },
    ],
    fixed: false, // 是否固定日期
    activeindex: 0, // 当前激活
    currentDay: null, // 当前日期
    hasMore: true, //下拉刷新 是否还有数据
    num: 0, //下拉刷新请求更多的数据
    params: { //影院搜索条件
      movieId: null, // 当前的电影id
      day: '', // 当前日期
      offset: 0,
      limit: 20,
      districtId: -1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId: -1,
      stationId: -1,
      item: '',
      updateShowDay: true, // 是否返回预售日期
      // reqId: Date.parse(new Date()), //当前时间毫秒
      cityId: 59 // 城市id ,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    wx.setNavigationBarTitle({
      title: options.movieName
    })
    let t = new Date();
    this.setData({
      "params.movieId": options.id,
      "params.day": options.rt,
      // "params.day": formatTime(t).split(' ')[0]
    })
    this.getCinema(this.data.params);
    wx.request({
      url: `https://m.maoyan.com/ajax/detailmovie?movieId=${options.id}`,
      success: (res) => {
        res.data.detailMovie.img = res.data.detailMovie.img.replace('w.h', '128.180')
        _this.setData({
          "detailMovie": res.data.detailMovie,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //到该电影对应的媒体库
  gomedia(e) {
    // 
    wx.navigationTo({
      url: `../detialMedia/detailMedia?movieId=${e.currentTarget.id}`
    })
    console.log(116, e.currentTarget.id)
  },
  // 获取影院列表
  getCinema(params) {
    wx.request({
      url: `https://m.maoyan.com/ajax/movie?forceUpdate=${Date.now()}`,
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded" }, // 设置以formData的方式提交数据
      data: params,
      success: (res) => {
        //movieDate  处理电影日期显示格式
        let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        let todayTmorrow = ['今天', '明天', '后天']
        let t = new Date();
        let w = t.getDay();
        this.data.cinemas = [...this.data.cinemas, ...res.data.cinemas.map((item) => {
          return {
            addr: item.addr.lenth < 21 ? item.addr : item.addr.slice(0, 20) + '...',
            distance: item.distance,
            id: item.id,
            mark: item.mark,
            nm: item.nm,
            promotion: item.promotion, // 是否显示卡
            sellPrice: item.sellPrice,
            showTimes: item.showTimes,
            tag: item.tag
          }
        })]
        this.data.movieDate = {
          ...this.data.movieDate, ...res.data.showDays.dates.map((item, index) => {
            return {
              date: item.date.slice(5).replace('-', '月') + '日',
              day: index <= 2 ? todayTmorrow[index] : week[(w + index ) % 7],
              datetime: item.date
            }
          })
        }
        this.setData(this.data)
      }
    })
  },
  // 日期切换 1561334400000  1561089462715
  chooseDate(e) {
    this.setData({
      'cinemas': []
    })
    this.data.num = 0
    this.data.params.day = e.currentTarget.dataset.datetime
    this.data.params.updateShowDay = false
    this.data.activeindex = e.currentTarget.dataset.activeindex
    console.log(152, this.data.fixed)
    this.unpdateCinema(this.data.params)

  },
  unpdateCinema(params) {
    let day = new Date()
    wx.showLoading({
      title: '数据加载中'
    })
    this.data.params.offset = this.data.num * 20
    wx.request({
      url: `http://m.maoyan.com/ajax/movie?forceUpdate=${Date.parse(day)}`,
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded" }, // 设置以formData的方式提交数据
      data: params,
      success: (res) => {
        this.data.hasMore = res.data.paging.hasMore
        this.data.cinemas = [...this.data.cinemas, ...res.data.cinemas]
        this.setData(this.data)
        wx.hideLoading()
      }
    })
  },
  //监听页面滚动
  onPageScroll(e) {
    if (parseInt(e.scrollTop) < 188) {
      this.data.fixed = false
    } else {
      this.data.fixed = true
    }
    this.setData({
      'fixed': this.data.fixed
    })
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
    if (this.data.hasMore) {
      this.data.num += 1
      this.unpdateCinema(this.data.params)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
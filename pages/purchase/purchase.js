// pages/purchase/purchase.js
Page({
  data: {
    // flag:true,
    currentM: '1',
    dateTime: [ //Dates
      {
        title: '今天03月15日',
        flag: true,
      }, {
        title: '明天03月16日',
        flag: false,
      }
    ],
    cinemaDetailModel: {
      nm: '万达影城（财富广场）',
      addr: '锦江区大业路6号财富广场4层D区',
    },
    currentMovie: {
      nm: '黑衣人',
      sc: '9.8分',
      ver: '110分钟 | 爱情 | xxx、xx 、xx',
    },
    DateShow: [{
      tm: 'tm',
      end: 'end',
      lang: 'lang',
      tp: 'tp',
      th: 'th',
      dt: 'dt',
      showId: 'showId',
    }],
    bgImg: '../images/豆瓣电影/p2408893200.jpg',
    movies: [ //movies

      {
        pic: './../images/avatar/197604b046aae66.jpg',
        id: '1',
      }, {
        pic: './../images/avatar/2d9802327d98ca7.jpg',
        id: '2',
      }, {
        pic: './../images/avatar/93637cbe48f123f.jpg',
        id: '3',
      }, {
        pic: './../images/avatar/9e38c40a0876647.jpg',
        id: '4',
      }, {
        pic: './../images/avatar/197604b046aae66.jpg',
        id: '5',
      }, {
        pic: './../images/avatar/197604b046aae66.jpg',
        id: '6',
      }, {
        pic: './../images/avatar/2d9802327d98ca7.jpg',
        id: '7',
      }, {
        pic: './../images/avatar/93637cbe48f123f.jpg',
        id: '8',
      }, {
        pic: './../images/avatar/9e38c40a0876647.jpg',
        id: '9',
      }, {
        pic: './../images/avatar/197604b046aae66.jpg',
        id: '10',
      },

    ],
    currentTab: 0,
    taskList: [{
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, {
      name: '有趣好玩'
    }, ]

  },
  handleClick1(e) {
    console.log(4444, e.currentTarget.dataset.index)
    let currentTab = e.currentTarget.dataset.index
    this.setData({
      currentTab
    })
  },
  onLoad: function (options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.movieName
    })
  },
  scrolltolower(e) {

  },
  chooseM(e) {
    console.log(109, e)
    let currentTab =
      this.setData({
        'currentM': e.currentTarget.id,
        'bgImg': e.currentTarget.dataset.imgsrc
      })
    // e.currentTarget.offsetLeft = 125
    console.log(this.data.currentM)
  },
  getTeather(cinemaID, movieID) {
    wx.request({
      url: `http://m.maoyan.com/showtime/wrap.json?cinemaid=${cinemaID}&movieid=${movieID}`,
      header: {
        'content-type': 'application/xml'
      },
      success: (res) => {
        this.initTeater(res.data.data)
      }
    })
  },
  initTeater(data) {
    console.log(data)
    this.data.dateTime = data.Dates.map((date) => {
      return {
        title: date.text,
        slug: date.slug,
        // flag:true
      }
    })
    var baseDate = [];
    /*滤出数据库中的数组*/
    for (var date in data.DateShow) {
      for (var i = 0; i < this.data.dateTime.length; i++) {
        if (this.data.dateTime[i].slug == date) {
          baseDate.push(data.DateShow[date])
        }
      }
    }
    this.data.DateShow = baseDate.map((item) => {
      return {
        date: item
      }
    })
    this.data.cinemaDetailModel.nm = data.cinemaDetailModel.nm
    this.data.cinemaDetailModel.addr = data.cinemaDetailModel.addr
    this.data.cinemaDetailModel.id = data.cinemaDetailModel.id
    this.data.currentMovie.nm = data.currentMovie.nm
    this.data.currentMovie.sc = data.currentMovie.sc
    this.data.currentMovie.ver = data.currentMovie.ver
    this.data.currentMovie.id = data.currentMovie.id
    this.data.currentMovie.img = data.currentMovie.img
    this.data.movies = data.movies.map((movies) => {
      return {
        id: movies.id,
        img: movies.img,
        nm: movies.nm
      }
    })
    this.setData(this.data)
  },

  imgPosition(e) {
    /*160 230*/
    // console.log(e.detail)
    // console.log(e.changedTouches)
  },
  goSeats(e) {
    console.log(e)

    wx.navigateTo({
      url: `/pages/being-movies/seats/seats?showid=${e.currentTarget.id}&showDate=${e.currentTarget.dataset.showdate}`
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
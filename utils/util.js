const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//处理图片url
const formatImgUrl = (arr, cutTitle = false) => {
  //小程序不能在{{}}调用函数，所以我们只能在获取API的数据时处理，而不能在wx:for的每一项中处理
  if (!Array.isArray(arr)) {
    return
  }
  let newArr = []
  arr.forEach(item => {
    let title = item.comingTitle
    if (cutTitle) {
      title = item.comingTitle.split(' ')[0]
    }
    let imgUrl = item.img.replace('w.h', '128.180')
    newArr.push({
      ...item,
      comingTitle: title,
      img: imgUrl
    })
  })
  return newArr
}
module.exports = {
  formatTime,
  formatImgUrl

}
// 图片路径处理函数



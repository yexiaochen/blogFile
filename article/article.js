const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const now = `${year}-${month+1}-${day}`;
const fromDate = `${year}-01-01`;
const toDate = `${year+1}-01-01`;

//Page Object
Page({
  data: {
    fromDate: fromDate,
    toDate: toDate,
    // change tab
    activedIndex: 0,
    targetType: [
      {
        type: 'year',
        text: 'year'
      },
      {
        type: 'month',
        text: 'month'
      },
      {
        type: 'day',
        text: 'day'
      }
    ],
    totalTips: '',
    exhaustedTips: '',
    leavedTips: '',
  },
  computeDays(){
    let fromTime = Date.parse(this.data.fromDate);
    let toTime = Date.parse(this.data.toDate);
    let nowTime = Date.parse(now);
    let Conversion = (time) => Math.round((time)/(24*60*60*1000));
    let totalTime = toTime - fromTime; 
    let exhaustedTime = nowTime - fromTime;
    let leavedTime = toTime - nowTime;
    let totalTips = exhaustedTime >= 0 ? `我这一生也就 ${Conversion(totalTime)} 天` : `你怕不是地球人吧`;
    let exhaustedTips = exhaustedTime >= 0 ? `过去了 ${Conversion(exhaustedTime)} 天` : `你回到未来时，捎上我`;
    let leavedTips = leavedTime >= 0 ? `还剩下 ${Conversion(leavedTime)} 天` : `你回到过去时，捎上我`;

    console.log('reserved', totalTips, exhaustedTips, leavedTips);
  },
  bindFromDateChange(event){
    let value = event.detail.value;
    this.setData({
      fromDate: value || fromDate
    })
    this.computeDays();
    console.log('from', value)
  },
  bindToDateChange(event){
    let value = event.detail.value;
    this.setData({
      toDate: value || toDate
    })
    this.computeDays();
    console.log('to', value)
  },
  selectedType(event){
    let data = event.currentTarget.dataset;
    let {index, type} = data;
    this.setData({
      activedIndex: index
    })
    console.log('index:type', index, type, this.data)
  },
  //options(Object)
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});
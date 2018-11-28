let getDay = {
  interval: 3600 * 1000,
  formatConfig:{day: '%H:%M'},
  func:function(dateStr){
    let date = new Date();
    return Date.UTC(date.getFullYear(),date.getMonth(),date.getDate(),parseInt(dateStr))
  }
};
let getMonthAndDay = {
  interval: 24 * 3600 * 1000,
  formatConfig:{day: '%m-%d'},
  func:function(dateStr){
    let dates = dateStr.split('-');
    let date = new Date();
    return Date.UTC(date.getFullYear(),date.getMonth(),parseInt(dates[1]));
  }
};
let getYearAndMonth = {
  interval: 31 * 24 * 3600 * 1000,
  formatConfig:{month: '%y-%m'},
  func:function(dateStr){
    let dates = dateStr.split('-');
    let date = new Date();
    return Date.UTC(date.getFullYear(),parseInt(dates[1]));
  }
};
let chartDateFunc = {
  'today':getDay,
  'yesterday':getDay,
  'currentWeek':getMonthAndDay,
  'lastWeek':getMonthAndDay,
  'currentMonth': getMonthAndDay,
  'lastMoth': getMonthAndDay,
  'currentSeason': getYearAndMonth,
  'currentYear': getYearAndMonth
}

export default chartDateFunc

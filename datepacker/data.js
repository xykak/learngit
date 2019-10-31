window.addEventListener('load',function(){
    (function(){
        var datepicker = {};
        datepicker.getMonthData = function(year, month) {
            var ret = []
            if(!year||!month) {
                var today = new Date();
                year = today.getFullYear();
                month = today.getMonth() + 1;
                day = today.getDate();
            }

            var firstDay = new Date(year, month - 1, 1)
            //return
            var year = firstDay.getFullYear();
            var month = firstDay.getMonth() + 1;

            var firstDayWeekDay = firstDay.getDay();
            if(firstDayWeekDay === 0){
                firstDayWeekDay = 7;
            }
            var lastDayOfLastMonth = new Date(year, month - 1, 0);
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
            //上个月还有几天
            var perMonthDayCount = firstDayWeekDay - 1;
            var lastDay = new Date(year, month, 0);
            var lastDate = lastDay.getDate();

            for(var i = 0;i < 6 * 7;i++) {
                var date = i + 1 - perMonthDayCount;
                var showDate = date;
                var thisMonth = month;
                var isThisMonth = true
                if(date <= 0) {
                    thisMonth = month - 1;
                    showDate = lastDateOfLastMonth + date;
                    isThisMonth = false;
                } else if(date > lastDate) {
                    thisMonth = month + 1;
                    showDate = date - lastDate;
                    isThisMonth = false;
                }
                if (thisMonth === 0) {
                    thisMonth = 12
                }
                if (thisMonth === 13) {
                    thisMonth = 1
                }
                ret.push({
                    month: thisMonth,
                    date: date,
                    showDate: showDate,
                    isThisMonth: isThisMonth
                })
            }
            return {
                year: year,
                month: month,
                day: day,
                days: ret
            }
        }
        window.datepicker = datepicker
    })()
})


function test() {
    var arr = [];
    for (var i = 0; i < 10; i++) {
        (function(j) {
            arr[j] = function(){
                document.write(j + " ");
            }
        }(i))
    }
    return arr;
}

var myarr = test();
for (var i = 0; i < myarr.length; i++) {
    myarr[i]();
}

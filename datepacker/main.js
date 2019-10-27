window.addEventListener('load', function(){
    var datepicker = window.datepicker;
    var monthData;

    datepicker.biuldUi = function(year, month){
        monthData =  datepicker.getMonthData(year, month);
        var html = `
        <div class="ui-datepicker-header">
        <a href="#" class="ui-datepicker-btn ui-datepicker-perv">&lt;</a>
        <a href="#" class="ui-datepicker-btn ui-datepicker-next">&gt;</a>
        <span class="ui-datepicker-month">${monthData.year}-${monthData.month}</span>
    </div>
    <div class="ui-datepicker-body">
        <table>
            <thead>
                <tr>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                    <td>日</td>
                </tr>
            </thead>
            <tbody>`

                for(var i = 0; i<monthData.days.length;i++) {
                    if (i%7 === 0) {
                        html += '<tr>'
                    }
                    html += '<td data-date='+monthData.days[i].date+'>' + monthData.days[i].showDate + '</td>' 
                    if (i%7 === 6) {
                        html += '</tr>'
                    }
                }

            html +=`</tbody>
        </table>
    </div>`;
    return html
    }

    datepicker.init = function() {
        var html = datepicker.biuldUi();
        var wrapper = document.createElement('div');
        wrapper.className = 'ui-datepicker-wrapper';
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper);
        //点击input显示
        var input = document.querySelector('.datepicker');
        var isOpen = false;
        input.addEventListener('click', function(){
            if (isOpen) {
                wrapper.classList.remove('ui-datepicker-wrapper-show')
                isOpen = false;
            } else {
                wrapper.classList.add('ui-datepicker-wrapper-show')
                isOpen = true;
                var top = input.offsetTop;
                var left = input.offsetLeft;
                var height = input.offsetHeight;
                wrapper.style.top = top + height + 'px';
                wrapper.style.left = left + 'px';
                // wrapper.style.cssText += "top:"+(top+height)+"px;"+"left:"+left+"px;"+"background-color:"+"red";           

            }
            
        })

        //切换月份
        wrapper.addEventListener('click', function(e){
            if (e.target.classList.contains('ui-datepicker-perv')) {
                toggle('perv')
            } else if (e.target.classList.contains('ui-datepicker-next')) {
                toggle('next')
            }
        })

        function toggle(btnName){
            var year = monthData.year;
            var month = monthData.month
            if (btnName == 'perv') {
                month--;
            } else if (btnName == 'next') {
                month++;
            }
            html = datepicker.biuldUi(year, month);
            wrapper.innerHTML = html;
            showClickInput()
        }

        //点击日期显示到input中
        function showClickInput(){
            var tbody = document.querySelector('.ui-datepicker-body tbody');
            tbody.addEventListener('click', function(e){
                // input.setAttribute('value',monthData.year+'-'+monthData.month+'-'+e.target.innerHTML)   
                if (e.target.tagName.toLowerCase() !== 'td') {
                    return false;
                }
                var date = new Date(monthData.year, monthData.month - 1, e.target.dataset.date)
                input.value = format(date);
            })

            function format(date){
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                function padding(num){
                    if (num<=9) {
                        return '0' + num
                    }
                    return num
                }
                return '' + year + '-' + padding(month) + '-' + day
            }
        }
        showClickInput()

    }
    
    datepicker.init()

})
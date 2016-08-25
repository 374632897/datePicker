/*
* @Author: Jiang Guoxi
* @Date:   2016-07-12 06:05:12
* @Last Modified by:   Jiang Guoxi
* @Last Modified time: 2016-08-25 09:45:53
*/
{
  const header = '<ul class = "datePicker-header">' + '日一二三四五六'.split('').map((item, index) => `<li class = '${(index === 0 || index === 6) ? 'weekends' : ''}'>${item}</li>`).join('') + '</ul>';
  window.DatePicker = class {
    constructor () {
      console.time('渲染组件 ');
      this.init();

      // this.getEle();
      console.timeEnd('渲染组件 ');
    }
    init () {
      const datePicker = this.el = document.createElement('div');
      datePicker.className = 'datePicker';
      this.renderBody();
    }
    getEle () {

    }
    renderBody (_year, _month) {
      const _date = new Date(),
        year = _year || _date.getFullYear(),
        month = typeof _month === 'undefined' ? _date.getMonth() : _month; // 避免月份为0的时候判断出错

      const dates = new Date(year, month + 2, 0).getDate(), firstDay = new Date(year, month, 1).getDay();
      const body  = this.initMonth(dates, firstDay);
      this.el.innerHTML = header + body;
    }
    /**
     * 在知道第一天是周几的情况下， 找不到一个适合的为每个月设置周末的算法
     */
    initMonth (dates, firstDay) {
      let _f = firstDay, sat = 6 - firstDay;
      if (firstDay === 0) {
        _f = 0;
        sat = 6;
      }
      let i = 1, html = `<ul class = "datePicker-body"><li style = 'margin-left: ${firstDay * 40}px;' class = ${firstDay === 0 ? 'weekends' : ''}>${1}</li>`;

      while (i < dates) {
        const _t = i % 7 - sat;
        if (_t === 1 || _t === 0 || (sat === 6 && _t === -6)) {
          html += `<li class = 'weekends'>${++i}</li>`;
        } else {
          html += `<li>${++i}</li>`;
        }
      }
      html += '</ul>';
      return html;
    }
  }
}

const ts = require('timestampconvertjs');

function ConvertTime(timestamp) {

    const t = ts.convertToLocalTime(timestamp, true); 

    if(t.minutes === 0){
        t.minutes = "00";
    }

    return `${t.monthName} ${t.day}, ${t.year} • ${t.hours}:${t.minutes} ${t.period}` ;
  }

  export default ConvertTime;
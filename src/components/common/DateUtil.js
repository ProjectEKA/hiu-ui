import moment from "moment";

const compareDateStrings = function(dStr1, dStr2) {
    if (dStr1 === dStr2) {
      return 0;
    }
    if (dStr1 === '-' && dStr2 != '-') {
      return 1;
    }

    if (dStr1 != '-' && dStr2 === '-') {
      return -1;
    }

    var d1 = moment(dStr1, 'DD/MM/YYYY HH:mm', true).toDate();
    var d2 = moment(dStr2, 'DD/MM/YYYY HH:mm', true).toDate();

    return (d1 < d2) ? -1 :  (d1.getTime() == d2.getTime() ? 0 : 1); 
};

export { compareDateStrings };


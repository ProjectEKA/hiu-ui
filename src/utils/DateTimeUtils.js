const toIndiaDate = function (utcDate) {
    let date = new Date(utcDate);
    const month = date.toLocaleString('default', { month: 'short' });
    return date.getDate() + " " + month + " " + date.getFullYear();
};

export default toIndiaDate;

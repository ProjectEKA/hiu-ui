const getNextDay = (currentDate = new Date()) =>
  currentDate.setDate(currentDate.getDate() + 1);

export default getNextDay;

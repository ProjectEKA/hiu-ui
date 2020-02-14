function getNextDay() {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate;
}

export default getNextDay;

const today = new Date();
const daysToAdd = 1;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const weekData = [];

for (let i = 0; i < 7; i++) {
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + i * daysToAdd);

  const dayOfWeekIndex = newDate.getDay();
  const dayName = daysOfWeek[dayOfWeekIndex];
  weekData.push({ date: newDate, dayName });
}

export default weekData;

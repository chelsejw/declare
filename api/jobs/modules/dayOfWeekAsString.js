module.exports = function dayOfWeekAsString(dayIndex) {
  return (
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][dayIndex] || ''
  )
}

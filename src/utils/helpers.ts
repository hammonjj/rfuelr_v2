export function formatDate(date: Date) {
  const dt = new Date(date);

  var day = String(dt.getDate()).padStart(2, '0');
  var month = String(dt.getMonth() + 1).padStart(2, '0');
  var year = dt.getFullYear();

  return month + '/' + day + '/' + year;
}
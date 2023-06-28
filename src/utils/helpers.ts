export function formatDate(date: Date) {
  const dt = new Date(date);

  var day = String(dt.getDate()).padStart(2, '0');
  var month = String(dt.getMonth() + 1).padStart(2, '0');
  var year = dt.getFullYear();

  return month + '/' + day + '/' + year;
}

export function getPreviousDate(months: number, ytd?: boolean) {
  if(ytd) {
    return new Date(new Date().getFullYear(), 0, 1);
  }

  const dt = new Date();
  dt.setMonth(dt.getMonth() - months);
  return dt;
}
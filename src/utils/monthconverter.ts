type MonthMap = { [key: number]: string };

export function numericToWordMonth(numericMonth: number): string {
  const months: MonthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sept",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  // Check if the numeric month is valid
  if (numericMonth >= 1 && numericMonth <= 12) {
    return months[numericMonth];
  } else {
    return "Invalid month";
  }
}

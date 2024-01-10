export const tableRow = (windowSize: any) => {
  let maxRowsToShow;

  if (windowSize.height < 750) {
    maxRowsToShow = 7;
  } else if (windowSize.height >= 750 && windowSize.height < 800) {
    maxRowsToShow = 8;
  } else if (windowSize.height >= 800 && windowSize.height < 850) {
    maxRowsToShow = 9;
  } else if (windowSize.height >= 850 && windowSize.height < 900) {
    maxRowsToShow = 10;
  } else if (windowSize.height >= 900 && windowSize.height < 950) {
    maxRowsToShow = 11;
  } else if (windowSize.height >= 950 && windowSize.height < 1000) {
    maxRowsToShow = 12;
  } else if (windowSize.height >= 1000 && windowSize.height < 1050) {
    maxRowsToShow = 13;
  } else if (windowSize.height >= 1050 && windowSize.height < 1100) {
    maxRowsToShow = 12;
  } else if (windowSize.height >= 1100 && windowSize.height < 1150) {
    maxRowsToShow = 13;
  } else if (windowSize.height >= 1150 && windowSize.height < 1200) {
    maxRowsToShow = 14;
  } else {
    maxRowsToShow = 15;
  }

  return maxRowsToShow;
};

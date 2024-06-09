export const CalcData = (date) => {
    const currentDate = new Date();
    const givenDate = new Date(date);
    const timeDifference = currentDate - givenDate;
  
    // Convert milliseconds to seconds
    const secondsPassed = Math.floor(timeDifference / 1000);
  
    // Convert milliseconds to minutes
    const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  
    // Convert milliseconds to hours
    const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60));
  
    // Convert milliseconds to days
    const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  
    // Calculate the difference in years
    const yearsPassed = currentDate.getFullYear() - givenDate.getFullYear();
    const fullYearGivenDate = new Date(givenDate);
    fullYearGivenDate.setFullYear(currentDate.getFullYear());
    const adjustedYearsPassed = currentDate < fullYearGivenDate ? yearsPassed - 1 : yearsPassed;
  
    if (adjustedYearsPassed > 0) {
      return adjustedYearsPassed + 'y';
    } else if (daysPassed > 0) {
      return daysPassed + 'd';
    } else if (hoursPassed > 0) {
      return hoursPassed + 'h';
    } else if (minutesPassed > 0) {
      return minutesPassed + 'm';
    } else {
        if(secondsPassed <= 1)
        {
            return 'now';
        }
      return secondsPassed + 's';
    }
  };
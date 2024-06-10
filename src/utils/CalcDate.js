export const CalcData = (date,add=false) => {
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
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return givenDate.toLocaleDateString('en-US', options);
    } else if (daysPassed > 0) {
      if(daysPassed > 7)
      {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return givenDate.toLocaleDateString('en-US', options);
      }
      return daysPassed + (add ? ' days ago' :'d');
    } else if (hoursPassed > 0) {
      return hoursPassed + (add ? ' hours ago' :'h');
    } else if (minutesPassed > 0) {
      return minutesPassed + (add ? ' minutes ago' :'m');
    } else {
        if(secondsPassed <= 1)
        {
            return 'now';
        }
      return secondsPassed +(add ? ' seconds ago' :'s');
    }
  };
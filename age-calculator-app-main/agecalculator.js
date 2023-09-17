document.addEventListener("DOMContentLoaded", function () {
  const calculateButton = document.querySelector(".equator img");
  const dayInput = document.querySelector(".day");
  const monthInput = document.querySelector(".month");
  const yearInput = document.querySelector(".year");
  const errorTextD = document.querySelector('.error-textD');
  const errorTextM = document.querySelector('.error-textM');
  const errorTextY = document.querySelector('.error-textY');
  
  calculateButton.addEventListener("click", function () {
    // Get the input values
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
  
    // Get the current date
    const currentDate = new Date();
    const birthDate = new Date(year, month - 1, day);
  
    const ageInMilliseconds = currentDate - birthDate;
    const ageInYears = Math.floor(ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000));
  
    // Calculate months and days
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    const daysInMonth = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    const ageInMonths = Math.floor((ageInMilliseconds % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
    const ageInDays = Math.floor((ageInMilliseconds % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
  
    // Check for validation errors
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    if (!day && !month && !year) {
      document.querySelector('.paragraphD').style.color = 'red';
      document.querySelector('.paragraphM').style.color = 'red';
      document.querySelector('.paragraphY').style.color = 'red';
      errorTextD.innerHTML = 'This Field is Required';
      errorTextD.style.color = 'red';
      errorTextM.innerHTML = 'This Field is Required';
      errorTextM.style.color = 'red';
      errorTextY.innerHTML = 'This Field is Required';
      errorTextY.style.color = 'red';
    } else if (!day || day < 1 || day > 31) {
      document.querySelector('.paragraphD').style.color = 'red';
      errorTextD.innerHTML = 'Day must be between 1 and 31';
      errorTextD.style.color = 'red';
    } else if (!month || month < 1 || month > 12) {
      document.querySelector('.paragraphM').style.color = 'red';
      errorTextM.innerHTML = 'Month must be between 1 and 12';
      errorTextM.style.color = 'red';
    } else if (!year || year > currentDate.getFullYear()) {
      document.querySelector('.paragraphY').style.color = 'red';
      errorTextY.innerHTML = 'Year cannot be in the future';
      errorTextY.style.color = 'red';
    } else if (day > daysInMonth[month - 1]) {
      document.querySelector('.paragraphD').style.color = 'red';
      errorTextD.innerHTML = `Invalid date for ${monthNames[month - 1]}`;
      errorTextD.style.color = 'red';
    } else {
      document.querySelector('.paragraphD').style.color = '';
      document.querySelector('.paragraphM').style.color = '';
      document.querySelector('.paragraphY').style.color = '';
      errorTextD.innerHTML = '';
      errorTextM.innerHTML = '';
      errorTextY.innerHTML = '';
  
      //Animate result
      document.querySelector('.ageInYears').innerHTML = '0 ';
      document.querySelector('.ageInMonths').innerHTML = '0 ';
      document.querySelector('.ageInDays').innerHTML = '0 ';
  
      const animationDuration = 6000; // in milliseconds
      const stepValueYears = ageInYears / (animationDuration / 500);
      const stepValueMonths = ageInMonths / (animationDuration / 500);
      const stepValueDays = ageInDays / (animationDuration / 500); 
  
      let currentAgeYears = 0;
      let currentAgeMonths = 0;
      let currentAgeDays = 0;
  
      const interval = setInterval(function () {
        if (currentAgeYears < ageInYears) {
          currentAgeYears += stepValueYears;
          document.querySelector('.ageInYears').innerHTML = `${Math.floor(currentAgeYears)} `;
        }
        if (currentAgeMonths < ageInMonths) {
          currentAgeMonths += stepValueMonths;
          document.querySelector('.ageInMonths').innerHTML = `${Math.floor(currentAgeMonths)} `;
        }
        if (currentAgeDays < ageInDays) {
          currentAgeDays += stepValueDays;
          document.querySelector('.ageInDays').innerHTML = `${Math.floor(currentAgeDays)} `;
        }
  
        if (currentAgeYears >= ageInYears && currentAgeMonths >= ageInMonths && currentAgeDays >= ageInDays) {
          clearInterval(interval);
        }
      }, 50);
    }
  });
});
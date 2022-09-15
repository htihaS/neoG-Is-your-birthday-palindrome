function reverseString(str) {
    return str.split('').reverse().join('');
  }
  
  function isPalindrome(str) {
    var reversestring = reverseString(str);
    return reversestring === str;
  }
  
  function dateToString(date) {
    var dateString = { day: '', month: '', year: '' };
    var day = date.day;
    var month = date.month;
    var year = date.year;
  
    if (day < 10) {
      dateString.day = '0' + day;
    } else {
      dateString.day = day.toString();
    }
  
    if (month < 10) {
      dateString.month = '0' + month;
    } else {
      dateString.month = month.toString();
    }
  
    dateString.year = year.toString();
  
    return dateString;
  }
  
  function getAllFromats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yymmdd = date.year.slice(-2) + date.month + date.day
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }
  
  function isLeapYear(year) {
    if (year % 4 === 0) {
      return true;
    }
    if (year % 400 === 0) {
      return true;
    }
    if (year % 100 === 0) {
      return false;
    }
  
    return false;
  }
  
  function getNextDay(date) {
    var nextDate = { day: '', month: '', year: '' };
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInaMonth = [];
  
    if (isLeapYear(year)) {
      daysInaMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
  
    if (day > daysInaMonth[month - 1]) {
      day = 01;
      if (month === 12) {
        month = 01;
        year = year + 1;
      } else {
        month = month + 1;
      }
    }
  
    nextDate.day = day;
    nextDate.month = month;
    nextDate.year = year;
  
    return nextDate;
  }
  
  function getPreviousDay(date) {
    if (isLeapYear(date.year)) {
      daysInaMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
      daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
     var previousdate = {
       day:'',
       month:'',
       year:''
     }
    
    if (date.day === 01) {
      if (date.month === 01) {
        previousdate.day = 31;
        previousdate.month = 12;
        previousdate.year = date.year - 1
      } else {
        previousdate.month = date.month - 1;
        previousdate.day = daysInaMonth[date.month - 1];
        previousdate.year=date.year;
      }
    }else{
      previousdate.day=date.day -1 ;
      previousdate.month=date.month;
      previousdate.year=date.year;
      }
    return previousdate;
  }
  
  //function to find closest palindrome
  function findClosestPalindrome(date) {
    var countfuture = 0;
    var countpast = 0;
  
    //this while block will find palindromes in future
    var nextdate = getNextDay(date);
    var flag = false;
    while (flag!=true) {
      countfuture++;
      var allformats = getAllFromats(dateToString(nextdate));
      for (var i = 0; i < 6; i++) {
        console.log("Next: ",allformats[i]);
        console.log(isPalindrome(allformats[i]));
        if (isPalindrome(allformats[i])) {
          var futurePalindrome = [countfuture, allformats[i]];
          flag = true
          break;
        }
      }
      nextdate = getNextDay(nextdate);
    }
  
    //this while block will find palindromes in past
    var previousday = getPreviousDay(date);
    while (flag!=false) {
      countpast++;
      if(countpast>countfuture){
        return futurePalindrome;
      }
      var allformats = getAllFromats(dateToString(previousday));
      for (var i = 0; i < 6; i++) {
        console.log("Past: ",allformats[i],i);
        console.log(isPalindrome(allformats[i]));
        if (isPalindrome(allformats[i])) {
          var pastPalindrome = [countpast, allformats[i]];
          flag = false;
          break;
        }
      }
      previousday = getPreviousDay(previousday);
    }
  
    if (countfuture < countpast) {
      return futurePalindrome;
    }
    else {
      return pastPalindrome;
    }
  }
  
  // function findPastPalindrome(date){
  //     var pastdate = getPreviousDay(date);
  //     var countpast = 0;
  
  //     while(1){
  //       console.log(pastdate);
  //         countpast++;
  //         var allpastformats = getAllFromats(dateToString(pastdate));
  //         for(var j=0;j<6;j++){
  //             if(isPalindrome(allpastformats[j])){
  //                 return [countpast,allpastformats[j]];
  //             }
  //         }
  //       pastdate = getPreviousDay(pastdate);
  //     }
  //   }

  var dob = document.querySelector(".userdob");
  var button = document.querySelector(".submit");
  var output = document.querySelector(".output");
  var loader = document.querySelector(".loader");


button.addEventListener("click",()=>{
  var bdayString = dob.value;

  if (bdayString !== '') {
    var date = bdayString.split('-');
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];
  }
    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy)
    };

    loader.style.display = "inline";
    


    var datetostring = dateToString(date);
    var allformats = getAllFromats(datetostring);
    for(var i=0;i<5;i++){
        if(isPalindrome(allformats[i])){
          
            output.innerText = "Your birthday is palindrome!"
            break;
        }
    }
    if(i===5){
        var closestpalindrome = findClosestPalindrome(date);
        var plural = closestpalindrome[0]===1?"day":"days";
        output.innerText = "Closest palindrome to your birth day is "+closestpalindrome[1]+" you missed it by "+closestpalindrome[0]+" "+ plural ;
    }

})
  
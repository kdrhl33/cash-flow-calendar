let startingBalance = 819.35;


let recurringTransactions = [

  {
    day: 12,
    amount: 3200,
    type: "income",
    name: "Salary"
  },

  {
    day: 25,
    amount: 244.15,
    type: "expense",
    name: "Great Eastern"
  }

];



function getTransactionsForMonth(year, month){

  return recurringTransactions.map(item => {

    return {

      date:
      `${year}-${String(month + 1).padStart(2,"0")}-${String(item.day).padStart(2,"0")}`,

      amount: item.amount,

      type: item.type,

      name: item.name

    };

  });

}




function getDaysInMonth(year, month){

  return new Date(year, month + 1, 0).getDate();

}




function buildCalendar(year, month){


  const calendar = document.getElementById("calendar");

  calendar.innerHTML = "";


  const transactions = getTransactionsForMonth(year, month);


  let balance = startingBalance;



  for(let day = 1; day <= getDaysInMonth(year, month); day++){


    const dateString =
    `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;



    let dailyItems = "";



    transactions.forEach(item => {


      if(item.date === dateString){


        if(item.type === "income"){

          balance += item.amount;


          dailyItems +=
          `
          <div class="income">
          +${item.name}<br>
          S$${item.amount.toFixed(2)}
          </div>
          `;

        }



        if(item.type === "expense"){

          balance -= item.amount;


          dailyItems +=
          `
          <div class="expense">
          ${item.name}<br>
          -S$${item.amount.toFixed(2)}
          </div>
          `;

        }


      }


    });



    const box = document.createElement("div");


    box.className = "day";



    box.innerHTML =

    `
    <strong>${day}</strong>

    ${dailyItems}

    <div class="balance">
    Balance<br>
    S$${balance.toFixed(2)}
    </div>

    `;



    calendar.appendChild(box);


  }


  updateBalance(balance);

}





function updateBalance(balance){

  document.getElementById("balance").innerHTML =
  "S$" + balance.toFixed(2);

}





let currentYear = 2026;

let currentMonth = 6;




function updateMonthTitle(){

  document.getElementById("monthTitle").innerHTML =

  new Date(currentYear,currentMonth)

  .toLocaleString("default",
  {
    month:"long",
    year:"numeric"
  });

}





document.getElementById("prevMonth").onclick = function(){


  currentMonth--;


  if(currentMonth < 0){

    currentMonth = 11;

    currentYear--;

  }


  updateMonthTitle();

  buildCalendar(currentYear,currentMonth);


};






document.getElementById("nextMonth").onclick = function(){


  currentMonth++;


  if(currentMonth > 11){

    currentMonth = 0;

    currentYear++;

  }


  updateMonthTitle();

  buildCalendar(currentYear,currentMonth);


};






document.getElementById("addTransaction").onclick = function(){


  const name =
  document.getElementById("transactionName").value;


  const amount =
  Number(document.getElementById("transactionAmount").value);


  const type =
  document.getElementById("transactionType").value;


  const day =
  Number(document.getElementById("transactionDay").value);



  if(!name || !amount || !day){

    alert("Please fill in all fields");

    return;

  }



  recurringTransactions.push({

    day: day,

    amount: amount,

    type: type,

    name: name

  });



  buildCalendar(currentYear,currentMonth);



  alert("Transaction added");


};






updateMonthTitle();

buildCalendar(currentYear,currentMonth);

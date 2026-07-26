const startingBalance = 819.35;

const transactions = [
  {
    date: "2026-07-12",
    amount: 3200,
    type: "income",
    name: "Salary"
  },
  {
    date: "2026-07-25",
    amount: 26.48,
    type: "expense",
    name: "Bill"
  }
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function buildCalendar(year, month) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  let balance = startingBalance;

  for (let day = 1; day <= getDaysInMonth(year, month); day++) {

    const dateString = `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    let dailyItems = "";

    transactions.forEach(item => {
      if(item.date === dateString){

        if(item.type === "income"){
          balance += item.amount;
          dailyItems += `<div class="income">+${item.name}<br>S$${item.amount}</div>`;
        }

        if(item.type === "expense"){
          balance -= item.amount;
          dailyItems += `<div class="expense">${item.name}<br>-S$${item.amount}</div>`;
        }

      }
    });


    const box = document.createElement("div");
    box.className = "day";

    box.innerHTML = `
  <strong>${day}</strong>

  ${dailyItems}

  <div class="balance">
    S$${balance.toFixed(2)}
  </div>
`;

    calendar.appendChild(box);
  }
}

buildCalendar(2026,6);

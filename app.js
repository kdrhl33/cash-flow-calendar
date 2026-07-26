let transactions = JSON.parse(
    localStorage.getItem("cashflowTransactions")
) || [];


let startingBalance = Number(
    localStorage.getItem("cashflowBalance")
) || 0;


let currentDate = new Date();



function saveAll(){

    localStorage.setItem(
        "cashflowTransactions",
        JSON.stringify(transactions)
    );

    localStorage.setItem(
        "cashflowBalance",
        startingBalance
    );

}



function money(value){

    return "S$" + Number(value).toFixed(2);

}



function render(){

    renderCalendar();

    renderTransactions();

    updateSummary();

    updateNextBill();

    document.getElementById("balance").innerHTML =
    money(calculateBalance());

}



function calculateBalance(){

    let balance = startingBalance;


    transactions.forEach(t=>{

        if(t.type === "income"){

            balance += Number(t.amount);

        }else{

            balance -= Number(t.amount);

        }

    });


    return balance;

}






function renderCalendar(){

    const calendar =
    document.getElementById("calendar");

    calendar.innerHTML="";


    let year=currentDate.getFullYear();

    let month=currentDate.getMonth();


    document.getElementById("monthTitle").innerHTML =
    currentDate.toLocaleString(
        "default",
        {
            month:"long",
            year:"numeric"
        }
    );



    let days =
    new Date(year,month+1,0).getDate();



    let balance = startingBalance;



    for(let day=1; day<=days; day++){


        let date =
        `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;


        let items="";


        transactions.forEach(t=>{


            let transactionDate =
            new Date(t.date);


            let match=false;


            if(t.repeat){

                match =
                transactionDate.getDate() === day;

            }else{

                match =
                t.date === date;

            }



            if(match){


                if(t.type==="income"){

                    balance += Number(t.amount);


                    items +=
                    `
                    <div class="income">
                    +${t.name}<br>
                    ${money(t.amount)}
                    </div>
                    `;


                }else{


                    balance -= Number(t.amount);


                    items +=
                    `
                    <div class="expense">
                    ${t.name}<br>
                    -${money(t.amount)}
                    </div>
                    `;

                }

            }


        });



        let box=document.createElement("div");

        box.className="day";


        box.innerHTML =
        `
        <strong>${day}</strong>

        ${items}

        <div class="balance">
        ${money(balance)}
        </div>
        `;


        calendar.appendChild(box);


    }


}







function renderTransactions(){

    let list =
    document.getElementById("transactionList");


    list.innerHTML="";



    if(transactions.length===0){

        list.innerHTML =
        `
        <p class="empty">
        No transactions yet
        </p>
        `;

        return;

    }



    transactions.forEach(t=>{


        let row=document.createElement("div");

        row.className="transaction";


        row.innerHTML =
        `
        <div>

        <b>${t.name}</b>

        <br>

        ${t.type==="income" ? "+" : "-"}
        ${money(t.amount)}

        </div>


        <div>

        <button onclick="editTransaction(${t.id})">
        ✏️
        </button>

        <button onclick="deleteTransaction(${t.id})">
        🗑️
        </button>

        </div>
        `;


        list.appendChild(row);


    });


}








function updateSummary(){

    let income=0;

    let expense=0;



    transactions.forEach(t=>{

        if(t.type==="income"){

            income += Number(t.amount);

        }else{

            expense += Number(t.amount);

        }

    });



    document.getElementById("incomeTotal")
    .innerHTML=money(income);



    document.getElementById("expenseTotal")
    .innerHTML=money(expense);


}







function updateNextBill(){


    let bills =
    transactions.filter(
        t=>t.type==="expense"
    );


    if(bills.length===0){

        document.getElementById("nextBillName")
        .innerHTML="No bills yet";


        document.getElementById("nextBillAmount")
        .innerHTML="S$0.00";


        document.getElementById("afterBill")
        .innerHTML=money(startingBalance);


        return;

    }



    let bill=bills[0];


    document.getElementById("nextBillName")
    .innerHTML=bill.name;


    document.getElementById("nextBillAmount")
    .innerHTML="-"+money(bill.amount);


    document.getElementById("afterBill")
    .innerHTML=
    money(startingBalance-bill.amount);


}








document.getElementById("saveBalance").onclick=function(){

    startingBalance =
    Number(
        document.getElementById("startingBalanceInput").value
    );


    saveAll();


    render();


    alert("Balance saved");

};








document.getElementById("saveTransaction").onclick=function(){


    let name =
    document.getElementById("nameInput").value;


    let amount =
    Number(
        document.getElementById("amountInput").value
    );


    let type =
    document.getElementById("typeInput").value;


    let date =
    document.getElementById("dateInput").value;


    let repeat =
    document.getElementById("repeatInput").checked;



    if(!name || !amount || !date){

        alert("Please fill everything");

        return;

    }



    transactions.push({

        id:Date.now(),

        name,

        amount,

        type,

        date,

        repeat

    });



    saveAll();

    render();


    document.getElementById("modal")
    .style.display="none";


};







function editTransaction(id){

    let t =
    transactions.find(
        x=>x.id===id
    );


    let name =
    prompt("Name",t.name);


    let amount =
    prompt("Amount",t.amount);



    if(name){

        t.name=name;

    }


    if(amount){

        t.amount=Number(amount);

    }


    saveAll();

    render();


}






function deleteTransaction(id){

    transactions =
    transactions.filter(
        t=>t.id!==id
    );


    saveAll();

    render();

}








document.getElementById("openForm")
.onclick=function(){

    document.getElementById("modal")
    .style.display="flex";

};




document.getElementById("closeForm")
.onclick=function(){

    document.getElementById("modal")
    .style.display="none";

};






document.getElementById("prevMonth")
.onclick=function(){

    currentDate.setMonth(
        currentDate.getMonth()-1
    );

    render();

};





document.getElementById("nextMonth")
.onclick=function(){

    currentDate.setMonth(
        currentDate.getMonth()+1
    );

    render();

};







document.getElementById("darkToggle")
.onclick=function(){

    document.body.classList.toggle("dark");


    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark")
    );

};





if(localStorage.getItem("darkMode")==="true"){

    document.body.classList.add("dark");

}





document.getElementById("startingBalanceInput")
.value = startingBalance;



render();

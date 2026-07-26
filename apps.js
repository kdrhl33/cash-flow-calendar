const currentBalance = 819.35;

const bills = [
    { date: 1, name: "iCloud", amount: 14.37 },
    { date: 5, name: "Netflix", amount: 29.98 },
    { date: 7, name: "Amazon Prime", amount: 4.99 },
    { date: 8, name: "IRAS", amount: 181.70 },
    { date: 15, name: "Spotify", amount: 11.98 },
    { date: 20, name: "House Bills", amount: 300.00 },
    { date: 21, name: "Prudential", amount: 299.98 },
    { date: 22, name: "Disney+", amount: 23.62 },
    { date: 23, name: "StarHub Phone", amount: 35.50 },
    { date: 26, name: "Great Eastern", amount: 244.15 },
    { date: 29, name: "HDB Parking", amount: 17.00 },
    { date: 31, name: "PSN", amount: 15.90 }
];

const today = new Date().getDate();
const billList = document.getElementById("billList");

billList.innerHTML = "";

const upcomingBills = bills.filter(bill => bill.date >= today);

upcomingBills.forEach(bill => {

    const div = document.createElement("div");

    div.className = "bill";

    if (bill.date === today) {
        div.style.background = "#334155";
        div.style.borderRadius = "10px";
    }

    div.innerHTML = `
        <span>
            <strong>${bill.date}</strong> • ${bill.name}
        </span>

        <strong>-S$${bill.amount.toFixed(2)}</strong>
    `;

    billList.appendChild(div);

});


// ======================================
// SPENDWISE INTERACTIVE BUDGET TRACKER
// ======================================


// 1. VARIABLES AND ARRAYS

let monthlyBudget = 0;

// Array to store multiple expense records
let expenses = [];


// 2. SELECT HTML ELEMENTS USING DOM

const budgetForm = document.getElementById("budgetForm");

const expenseForm = document.getElementById("expenseForm");

const budgetInput = document.getElementById("budgetInput");

const expenseName = document.getElementById("expenseName");

const expenseCategory = document.getElementById("expenseCategory");

const expenseAmount = document.getElementById("expenseAmount");

const budgetDisplay = document.getElementById("budgetDisplay");

const expensesDisplay = document.getElementById("expensesDisplay");

const balanceDisplay = document.getElementById("balanceDisplay");

const budgetMessage = document.getElementById("budgetMessage");

const expenseList = document.getElementById("expenseList");


// 3. FUNCTION TO CALCULATE TOTAL EXPENSES

function calculateTotalExpenses() {

    let total = 0;

    // Loop through every expense record
    for (let i = 0; i < expenses.length; i++) {

        total += expenses[i].amount;

    }

    return total;
}


// 4. FUNCTION TO CALCULATE REMAINING BALANCE

function calculateRemainingBalance() {

    let totalExpenses = calculateTotalExpenses();

    return monthlyBudget - totalExpenses;

}


// 5. FUNCTION TO DISPLAY BUDGET STATUS

function displayBudgetStatus() {

    let balance = calculateRemainingBalance();

    let total = calculateTotalExpenses();

    // Decision making using conditional statements

    if (monthlyBudget <= 0) {

        budgetMessage.textContent =
            "Please set your monthly budget first.";

        budgetMessage.className = "";

    } else if (total > monthlyBudget) {

        budgetMessage.textContent =
            "Warning! You have exceeded your budget.";

        budgetMessage.className = "status-danger";

    } else if (balance === 0) {

        budgetMessage.textContent =
            "You have used your entire budget.";

        budgetMessage.className = "status-warning";

    } else {

        budgetMessage.textContent =
            "Great! You are within your budget.";

        budgetMessage.className = "status-good";

    }

}


// 6. FUNCTION TO UPDATE THE DASHBOARD

function updateDashboard() {

    let total = calculateTotalExpenses();

    let balance = calculateRemainingBalance();

    // Update dashboard information dynamically

    budgetDisplay.textContent =
        "KES " + monthlyBudget.toLocaleString();

    expensesDisplay.textContent =
        "KES " + total.toLocaleString();

    balanceDisplay.textContent =
        "KES " + balance.toLocaleString();

    displayBudgetStatus();

    displayExpenses();

}


// 7. FUNCTION TO DISPLAY EXPENSE RECORDS

function displayExpenses() {

    // Clear previous records
    expenseList.innerHTML = "";

    // Check whether the array is empty
    if (expenses.length === 0) {

        expenseList.innerHTML =
            '<tr><td colspan="4">No expenses added yet.</td></tr>';

        return;

    }

    // Loop through all expense records
    for (let i = 0; i < expenses.length; i++) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = expenses[i].name;

        let categoryCell = document.createElement("td");
        categoryCell.textContent = expenses[i].category;

        let amountCell = document.createElement("td");
        amountCell.textContent =
            "KES " + expenses[i].amount.toLocaleString();

        let actionCell = document.createElement("td");

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        // Store the expense record index
        deleteButton.dataset.index = i;

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);

        expenseList.appendChild(row);

    }

}


// 8. EVENT LISTENER TO SET MONTHLY BUDGET

budgetForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let enteredBudget = Number(budgetInput.value);

    if (!Number.isFinite(enteredBudget) || enteredBudget <= 0) {

        alert("Please enter a valid monthly budget.");

        return;

    }

    monthlyBudget = enteredBudget;

    updateDashboard();

    alert("Your monthly budget has been saved successfully!");

    budgetForm.reset();

});


// 9. EVENT LISTENER TO ADD EXPENSES

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = expenseName.value.trim();

    let category = expenseCategory.value;

    let amount = Number(expenseAmount.value);

    // Validate expense information
    if (
        name === "" ||
        category === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        alert("Please enter valid expense information.");

        return;

    }

    // Create an expense object
    let newExpense = {

        name: name,

        category: category,

        amount: amount

    };

    // Store the new expense in the array
    expenses.push(newExpense);

    // Update the dashboard
    updateDashboard();

    // Clear the form
    expenseForm.reset();

    console.log("New expense added:", newExpense);

});


// 10. EVENT LISTENER TO DELETE EXPENSES

expenseList.addEventListener("click", function(event) {

    if (event.target.classList.contains("delete-btn")) {

        let index = Number(event.target.dataset.index);

        // Remove selected expense from the array
        expenses.splice(index, 1);

        // Update the dashboard
        updateDashboard();

        console.log("Expense deleted successfully.");

    }

});


// 11. INITIAL DASHBOARD DISPLAY

updateDashboard();

console.log("SpendWise Interactive Application Loaded Successfully!");


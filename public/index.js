'use strict';



// retrieves revenue actions available to user
function revenueForm() {
    console.log('in revenue form');
    $('#revenueOptions').removeClass("hidden");
    $('#introduction').addClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#revenueSelect').click(event => {
        event.preventDefault();
        let option = $('input[name="whichrevoption"]:checked').val();
        if (option === "0") {
            getRevenue();
        } else if (option === "1") {
            addRevenue();
        }
    })
}

function getRevenue() {
    console.log('in revenue get form');
    $('#revenueDisplayOptions').removeClass("hidden");
    $('#revenueOptions').addClass("hidden");
    $('#revenueDisplay').addClass("hidden");
    $('#revenueUpdate').addClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#revenueDisplaySelect').click(event => {
        event.preventDefault();
        let option = $('input[name="whichrevdisoption"]:checked').val();
        if (option === "0") {
            fetch(`/revenue/all`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "1") {
            fetch(`/revenue/lodgedonations`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "2") {
            fetch(`/revenue/chardonations`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "3") {
            fetch(`/revenue/merchpayments`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "4") {
            fetch(`/revenue/foodpayments`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(response.statusText);
                })
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });            
        }
    })    
}

function displayRevenue(showRevenue) {
    $('#revenueDisplay').removeClass('hidden');
    $('#revenueDisplay').html("<h2>Here are the requested revenues</h2>");
    showRevenue.forEach((revenue, index) => {
        $('#revenueDisplay').append(
            `<div class="row item">
                <p class="col-3">${moment(revenue.createdAt).format('MMMM DD YYYY')}</p> <!--16.67% -->
                <p class="col-2">${revenue.lastName}</p> <!-- 25% -->
                <p class="col-1">${revenue.firstName}</p> <!-- 25% -->
                <p class="col-2">${revenue.type}</p> <!-- 33.33% -->
                <p class="col-1">${revenue.amount}</p> <!-- 16.67% -->
                <button class="updateRevForm" value="${revenue._id}"> Update </button>
                <button class="deleteRevForm" value="${revenue._id}"> Delete </button> 
            </div>`
        )
    })
    $('body').on('click', '.updateRevForm', (event) => {
        updateRevenue(event.currentTarget.value);
    })
    $('body').on('click', '.deleteRevForm', (event) => {
        deleteRevenue(event.currentTarget.value, event.currentTarget);
    })
}

function addRevenue() {
    console.log('in revenue add form');
    $('#revenueInput').removeClass("hidden");
    $('#revenueOptions').addClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#revenueSubmit').click(event => {
        event.preventDefault();
        let fName = $('input[name="firstName"]').val();
        let lName = $('input[name="lastName"]').val();
        let amt = $('input[name="amount"]').val();
        let option = $('input[name="whichRevType"]:checked').val();
        let revType
        if (option === "0") {
            revType = "LODGEDONATION"; 
        } else if (option === "1") {
            revType = "CHARDONATION";
        } else if (option === "2") {
            revType = "MERCHPAYMENT";
        } else if (option = "3") {
            revType = "FOODPAYMENT";
        }
        let revInput = {firstName: fName, lastName: lName, amount: amt, type: revType};
        console.log(revInput);
        fetch(`/revenue/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(revInput),
        })
            .then(response => response.json());
    })
}

function deleteRevenue(deleteRevID, target) {
    console.log('in delete revenue');
    fetch(`/revenue/${deleteRevID}`, {
        method: 'DELETE',
    })
        .then(response => {
            $(target).parent().remove()
        })
}

function updateRevenue(updateRevID) {
    console.log('in revenue update form');
    $('#revenueUpdate').removeClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#updateRevSubmit').click(event => {
        event.preventDefault();
        let fName = $('input[name="firstUpName"]').val();
        let lName = $('input[name="lastUpName"]').val();
        let amt = $('input[name="upAmount"]').val();
        let option = $('input[name="whichUpRevType"]:checked').val();
        let revType
        if (option === "0") {
            revType = "LODGEDONATION"; 
        } else if (option === "1") {
            revType = "CHARDONATION";
        } else if (option === "2") {
            revType = "MERCHPAYMENT";
        } else if (option = "3") {
            revType = "FOODPAYMENT";
        }
        let revInput = {firstName: fName, lastName: lName, amount: amt, type: revType};
        console.log(revInput);
        fetch(`/revenue/${updateRevID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(revInput),
        })
        .then(response => {
            getRevenue();
        })        
    })
}


//retrieves expenses actions available to user
function expensesForm() {
    console.log('in expenses form');
    $('#expensesOptions').removeClass("hidden");
    $('#introduction').addClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#expenseSelect').click(event => {
        event.preventDefault();
        let option = $('input[name="whichexpoption"]:checked').val();
        if (option === "0") {
            getExpenses();
        } else if (option === "1") {
            addExpense();
        }
    })
}

function getExpenses() {
    console.log('in expenses get form');
    $('#expensesDisplay').html("<h2>Here are the expenses</h2>");
    $('#expensesDisplay').removeClass("hidden");
    $('#expenseUpdate').addClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    fetch(`/expenses`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            console.log('going to display form');
            displayExpenses(responseJson.payload);
    })
}

function displayExpenses(showExpenses) {
    console.log('in expenses display form');
    $('#expenseInput').addClass('hidden');
    $('#expenseUpdate').addClass('hidden');

    showExpenses.forEach((expense, index) => {
        $('#expensesDisplay').append(
            `<div class="row item">
                <p class="col-3">${moment(expense.createdAt).format('MMMM DD YYYY')}</p> <!--16.67% -->
                <p class="col-4">${expense.payeeName}</p> <!-- 25% -->
                <p class="col-1">${expense.amount}</p> <!-- 16.67% -->
                <button class="updateExpForm" value="${expense._id}"> Update </button>
                <button class="deleteExpForm" value="${expense._id}"> Delete </button> 
            </div>`
        )
    })
    $('body').on('click', '.updateExpForm', (event) => {
        updateExpense(event.currentTarget.value);
    })
    $('body').on('click', '.deleteExpForm', (event) => {
        deleteExpense(event.currentTarget.value, event.currentTarget);
    })
}

function addExpense() {
    console.log('in expense add form');
    $('#expenseInput').removeClass("hidden");
    $('#expenseOptions').addClass("hidden");
    $('#expensesDisplay').addClass('hidden');
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#expenseSubmit').click(event => {
        event.preventDefault();
        let pName = $('input[name="payeeName"]').val();
        let amt = $('input[name="expAmount"]').val();
        let option = $('input[name="whichRevType"]:checked').val();
        let expInput = {payeeName: pName, amount: amt};
        console.log(expInput);
        fetch(`/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(expInput),
        })
            .then(response => response.json());
    })
}

function deleteExpense(deleteExpID, target) {
    console.log('in delete expense');
    fetch(`/expenses/${deleteExpID}`, {
        method: 'DELETE',
    })
        .then(response => {
            $(target).parent().remove()
        })
};

function updateExpense(updateExpID) {
    console.log('in expense update form');
    $('#expenseUpdate').removeClass("hidden");
    $('#backToIntro').click(event => {
        event.preventDefault();
        startOver();
    });
    $('#updateExpSubmit').click(event => {
        event.preventDefault();
        let pName = $('input[name="payeeUpName"]').val();
        let amt = $('input[name="expUpAmount"]').val();
        let expInput = {payeeName: pName, amount: amt};
        console.log(expInput);
        fetch(`/expenses/${updateExpID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(expInput),
        })
        .then(response => {
            getExpenses();
        })     
    })
};

function startOver() {
    console.log('in start over');
	$('#introduction').removeClass("hidden");
	$('#revenueOptions').addClass("hidden");
    $('#revenueDisplayOptions').addClass("hidden");
	$('#revenueDisplay').addClass("hidden");
    $('#revenueInput').addClass("hidden");
    $('#expensesOptions').addClass("hidden");
    $('#expensesDisplay').addClass("hidden");
    $('#expenseInput').addClass("hidden");
}

// landing page for America Lodge Finances, offering options to manage revenue 
// and expenses associated with Lodge
function watchForm() {
    $('#initialSelect').click(event => {
        event.preventDefault();
        let option = $('input[name="whichoption"]:checked').val();
        if (option === "0") {
            revenueForm();
        } else if (option === "1") {
            expensesForm();
        }
    })
}


$(function() {
    console.log('Finance App loaded. Waiting for submit!');
    watchForm();
})
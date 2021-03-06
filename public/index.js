'use strict';

$('#logout').unbind("click").bind("click", function(event) {
    console.log('in logout');
    event.preventDefault();
    localStorage.removeItem('token');
    $('#landing').removeClass("hidden");
    document.getElementById('userName').value='';
    document.getElementById('password').value='';
    $('#createuser').addClass("hidden");
    $('#introduction').addClass("hidden");
    $('#revenueOptions').addClass("hidden");
    $('#revenueDisplayOptions').addClass("hidden");
    $('#revenueDisplay').addClass("hidden");
    $('#revenueInput').addClass("hidden");
    $('#expensesOptions').addClass("hidden");
    $('#expensesDisplay').addClass("hidden");
    $('#expenseInput').addClass("hidden");
    watchForm();
})

function loginUser(uname, pw) {
    console.log('in login user');
    let loginUser = {email: uname, password: pw};
    console.log(loginUser);
    fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(loginUser),
        })
        .then(response => {
            return response.json();
        })
        .then(responseJson => {
            console.log('logged in new user');
            console.log(responseJson);
            if (responseJson.data) {
                localStorage.setItem('token', responseJson.data.token);
                financeApp();
            }
            else {
                alert(responseJson.message);
            }
        });
}

function createUser() {
    console.log('in create user');
    $('#landing').addClass("hidden");
    $('#createuser').removeClass("hidden");
    document.getElementById('userNameCrt').value='';
    document.getElementById('fstNameCrt').value='';
    document.getElementById('lstNameCrt').value='';
    document.getElementById('passwordCrt').value='';

    $('#createnlogin').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let uName = $("#userNameCrt").val();
        let fName = $("#fstNameCrt").val();
        let lName = $("#lstNameCrt").val();
        let pword = $("#passwordCrt").val();
        if ((fName === '') || (lName === '') || (uName === '') || (pword === '')) {
            alert('entries are required for all fields to create a user account')
        }
        else if (!(validate(uName))) {
            console.log('in validate username format');
            alert('username must be an email address.');
        }
// add code to check if user already exists.  need to user get and find()
        else {
            let newUser = {email: uName, firstName: fName, lastName: lName, password: pword};
            console.log(newUser);
            fetch(`/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(newUser),
                })
                .then(responseJson => {
                    if (responseJson.status === 404) {
                        alert('This user already exists.');
                    } 
                    else {
                        alert('New user created.');
                        loginUser(uName, pword);
                    }
                });
            }
        });
}

function validate(userNameFormat) {
    var re = /\S+@\S+\.\S+/;
    return re.test(userNameFormat);
}

// after successful login, run the finance app
function financeApp() {
    $('#introduction').removeClass("hidden");
    $('#landing').addClass("hidden");
    $('#createuser').addClass("hidden");
    $('#initialSelect').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let option = $('input[name="whichoption"]:checked').val();
        if (option === "0") {
            revenueForm();
        } else if (option === "1") {
            expensesForm();
        }
    })
}

// retrieves revenue actions available to user
function revenueForm() {
    console.log('in revenue form');
    $('#revenueOptions').removeClass("hidden");
    $('#introduction').addClass("hidden");

    $('#backToIntroRO').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('#revenueSelect').unbind("click").bind("click", function(event) {
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

    $('#backToIntroRDO').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });    

    $('#revenueDisplaySelect').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let option = $('input[name="whichrevdisoption"]:checked').val();
        if (option === "0") {
            fetch(`/revenue/all`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(responseJson => {
                    console.log(responseJson.payload);
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "1") {
            fetch(`/revenue/lodgedonations`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "2") {
            fetch(`/revenue/chardonations`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                     }
                })
                .then(response => response.json())
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "3") {
            fetch(`/revenue/merchpayments`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });
        } else if (option === "4") {
            fetch(`/revenue/foodpayments`, {
                headers: {
                    'authorization': localStorage.getItem('token')
                    }
                })
                .then(response => response.json())
                .then(responseJson => {
                    displayRevenue(responseJson.payload);
                });            
        }
    })    
}

function displayRevenue(showRevenue) {
    $('#revenueDisplay').removeClass('hidden');
    document.getElementById('revenueDisplay').reset();
    $('#revenueDisplay').html("<h2>Here are the requested revenues</h2>");
    
    showRevenue.forEach((revenue, index) => {
        $('#revenueDisplay').append(
            `<div class="row item">
                <p class="col-2">${moment(revenue.createdAt).format('MMMM DD YYYY')}</p> 
                <p class="col-3">${revenue.lastName}</p> 
                <p class="col-2">${revenue.firstName}</p> 
                <p class="col-2">${revenue.type}</p> 
                <p class="col-1">${revenue.amount}</p> 
                <button class="updateRevForm" value="${revenue._id}"> Update </button>
                <button class="deleteRevForm" value="${revenue._id}"> Delete </button> 
            </div>`
        )
    })
    $('body').on('click', '.updateRevForm', (event) => {
        event.preventDefault();
        const info = $(event.currentTarget).parent().children("p");
        const data = {
            createdAt: $(info[0]).text(),
            lName: $(info[1]).text(),
            fName: $(info[2]).text(),
            revType: $(info[3]).text(),
            amt: $(info[4]).text()
        }
        updateRevenue(event.currentTarget.value, data);
    })
    $('body').on('click', '.deleteRevForm', (event) => {
        event.preventDefault();
        deleteRevenue(event.currentTarget.value, event.currentTarget);
    })
}

function addRevenue() {
    console.log('in revenue add form');
    $('#revenueInput').removeClass("hidden");
    $('#revenueOptions').addClass("hidden");

    $('#backToIntroRI').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('#revenueSubmit').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let fName = $('input[name="firstName"]').val();
        let lName = $('input[name="lastName"]').val();
        let amt = $('input[name="amount"]').val();
        let option = $('input[name="whichRevType"]:checked').val();
        let revType
        if (option === "0") {
            revType = "LODGE DONATION"; 
        } else if (option === "1") {
            revType = "CHAR DONATION";
        } else if (option === "2") {
            revType = "MERCH PAYMENT";
        } else if (option = "3") {
            revType = "FOOD PAYMENT";
        }
        if ((fName === '') || (lName === '') || (amt === '') || (option === '')) {
            alert('entries are required in all fields to add a revenue entry');
        }
        else {
            let revInput = {firstName: fName, lastName: lName, amount: amt, type: revType};
            console.log(revInput);
            fetch(`/revenue`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(revInput),
            })
                .then(response => response.json())
                .then(responseJson => {
                    document.getElementById('revenueInput').reset();
                });
        }
    })
}

function deleteRevenue(deleteRevID, target) {
    console.log('in delete revenue');
    fetch(`/revenue/${deleteRevID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
        },
    })
        .then(response => {
            $(target).parent().remove()
        })
}

function updateRevenue(updateRevID, revPreFill) {
    console.log('in revenue update form');
    $('#revenueUpdate').removeClass("hidden");

    $('#backToIntroRU').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('input[name="firstUpName"]').val(revPreFill.fName);
    $('input[name="lastUpName"]').val(revPreFill.lName);
    $('input[name="upAmount"]').val(revPreFill.amt);
    if (revPreFill.revType === "LODGE DONATION") {
        $($('input[name="whichUpRevType"]')[0]).prop('checked', true);
    } else if (revPreFill.revType === "CHAR DONATION") {
        $($('input[name="whichUpRevType"]')[1]).prop('checked', true);
    } else if (revPreFill.revType === "MERCH PAYMENT") {
        $($('input[name="whichUpRevType"]')[2]).prop('checked', true);
    } else if (revPreFill.revType === "FOOD PAYMENT") {
        $($('input[name="whichUpRevType"]')[3]).prop('checked', true);
    }

    $('#updateRevSubmit').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let fName = $('input[name="firstUpName"]').val();
        let lName = $('input[name="lastUpName"]').val();
        let amt = $('input[name="upAmount"]').val();
        let option = $('input[name="whichUpRevType"]:checked').val();
        let revType
        if (option === "0") {
            revType = "LODGE DONATION"; 
        } else if (option === "1") {
            revType = "CHAR DONATION";
        } else if (option === "2") {
            revType = "MERCH PAYMENT";
        } else if (option = "3") {
            revType = "FOOD PAYMENT";
        }
        let revInput = {firstName: fName, lastName: lName, amount: amt, type: revType};
        console.log(revInput);
        fetch(`/revenue/${updateRevID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('token')
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

    $('#backToIntroEO').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('#expenseSelect').unbind("click").bind("click", function(event) {
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
    $('#expenseUpdate').addClass("hidden");

    $('#backToIntroED').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    fetch(`/expenses`, {
        headers: {
            'authorization': localStorage.getItem('token')
            }
        })
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
    $('#expensesDisplay').removeClass('hidden');
    document.getElementById('expensesDisplay').reset();
    $('#expensesDisplay').html("<h2>Here are the expenses</h2>");
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
        event.preventDefault();
        const info = $(event.currentTarget).parent().children("p");
        const data = {
            createdAt: $(info[0]).text(),
            pName: $(info[1]).text(),
            amt: $(info[2]).text()
        }
        updateExpense(event.currentTarget.value, data);
    })
    $('body').on('click', '.deleteExpForm', (event) => {
        event.preventDefault();
        deleteExpense(event.currentTarget.value, event.currentTarget);
    })
}

function addExpense() {
    console.log('in expense add form');
    $('#expenseInput').removeClass("hidden");
    $('#expenseOptions').addClass("hidden");
    $('#expensesDisplay').addClass('hidden');

    $('#backToIntroEI').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('#expenseSubmit').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let pName = $('input[name="payeeName"]').val();
        let amt = $('input[name="expAmount"]').val();
        let expInput = {payeeName: pName, amount: amt};
        console.log(expInput);
        if ((pName === '') || (amt === '')) {
            alert('entries are required in both fields to add an expense entry');
        }
        else {
            fetch(`/expenses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'authorization': localStorage.getItem('token')
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(expInput),
            })
                .then(response => response.json())
                .then(responseJson => {
                    document.getElementById('expenseInput').reset();
                });
            }
    })
}

function deleteExpense(deleteExpID, target) {
    console.log('in delete expense');
    fetch(`/expenses/${deleteExpID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'authorization': localStorage.getItem('token')
        }
    })
        .then(response => {
            $(target).parent().remove()
        })
};

function updateExpense(updateExpID, expPreFill) {
    console.log('in expense update form');
    $('#expenseUpdate').removeClass("hidden");

    $('#backToIntroEU').unbind("click").bind("click", function(event) {
        event.preventDefault();
        startOver();
    });

    $('input[name="payeeUpName"]').val(expPreFill.pName);
    $('input[name="expUpAmount"]').val(expPreFill.amt);

    $('#updateExpSubmit').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let pName = $('input[name="payeeUpName"]').val();
        let amt = $('input[name="expUpAmount"]').val();
        let expInput = {payeeName: pName, amount: amt};
        console.log(expInput);
        fetch(`/expenses/${updateExpID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 'authorization': localStorage.getItem('token')
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
    $('#landing').addClass("hidden");
    $('#createuser').addClass("hidden");
	$('#introduction').removeClass("hidden");
    document.getElementById('introduction').reset();
	$('#revenueOptions').addClass("hidden");
    document.getElementById('revenueOptions').reset();
    $('#revenueDisplayOptions').addClass("hidden");
    document.getElementById('revenueDisplayOptions').reset();
	$('#revenueDisplay').addClass("hidden");
    document.getElementById('revenueDisplay').reset();
    $('#revenueInput').addClass("hidden");
    document.getElementById('revenueInput').reset();
    $('#revenueUpdate').addClass("hidden");
    document.getElementById('revenueUpdate').reset();
    $('#expensesOptions').addClass("hidden");
    document.getElementById('expensesOptions').reset();
    $('#expensesDisplay').addClass("hidden");
    document.getElementById('expensesDisplay').reset();
    $('#expenseInput').addClass("hidden");
    document.getElementById('expenseInput').reset();
    $('#expenseUpdate').addClass("hidden");
    document.getElementById('expenseUpdate').reset();
}

// landing page for America Lodge Finances, offering options to login as a user or 
// create a new user
function watchForm() {
    $('#login').unbind("click").bind("click", function(event) {
        event.preventDefault();
        let uName = $("#userName").val();
        let pword = $("#password").val();
        if ((uName === '') || (pword === '')) {
            alert('username and password are required to login')
        }
        else {
            loginUser(uName, pword);
        }
    })
    $('#create').unbind("click").bind("click", function(event) {
        event.preventDefault();
        createUser();
    })
}

$(function() {
    console.log('Finance App loaded. Waiting for submit!');
    watchForm();
})
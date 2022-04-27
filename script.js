const billInput = document.querySelector("#bill");
const billError = document.querySelector(".bill-error");
const tipOption = document.querySelectorAll("input[type='radio']");
const customTip = document.querySelector("#custom-tip");
const paxInput = document.querySelector("#paxnum");
const paxError = document.querySelector(".pax-error");
const tipPerPax = document.querySelector(".tipperpax");
const billPerPax = document.querySelector(".totalsum");
const resetBtn = document.querySelector(".reset");

let billValue;
let tipValue;
let customTipValue;
let numOfPax;

billInput.addEventListener("input", () => {
    billValue = +billInput.value;
    resetBtn.disabled = false;

    if (billValue) {
        removeInputErr(billError, billInput);
        uncheckRadioTip();
        resetCustomValue();
        resetPaxValue();
        resetSumDisplay();
    } else {
        showInputErr(billError, billInput);
    }
})

function uncheckRadioTip() {
    for (let i = 0; i < tipOption.length; i++) {
        tipOption[i].checked = false;
        tipOption[i].parentElement.style.backgroundColor = "var(--secondary-color)";
        tipOption[i].parentElement.style.color = "#c5e4e7";
        tipValue = "";
    }
}

function resetCustomValue() {
    customTip.value = "";
    customTipValue = "";
}

function resetPaxValue() {
    paxInput.value = "";
    numOfPax = "";
}

function resetSumDisplay() {
    tipPerPax.textContent = "$0.00";
    billPerPax.textContent = "$0.00";
}

function removeInputErr(errMsg, errDisplay) {
    errMsg.style.display = "none";
    errDisplay.style.border = "none";
}

function showInputErr(errMsg, errDisplay) {
    errMsg.style.display = "block";
    errDisplay.style.border = "2px solid red";
}

for (let i = 0; i < tipOption.length; i++) {
    tipOption[i].addEventListener("click", () => {
        if (!billValue) {
            showInputErr(billError, billInput);
        }

        let checkedTip = document.querySelector("input[type='radio']:checked");
        tipValue = +checkedTip.value;

        checkedTip.parentElement.style.backgroundColor = "var(--primary-color)";
        checkedTip.parentElement.style.color = "var(--secondary-color)";
        resetCustomValue();
        resetPaxValue();
        resetSumDisplay();

        for (let i = 0; i < tipOption.length; i++) {
            if (tipOption[i].checked === false) {
                tipOption[i].parentElement.style.backgroundColor = "var(--secondary-color)";
                tipOption[i].parentElement.style.color = "#c5e4e7";
            }
        }
    })
}

customTip.addEventListener("input", () => {
    if (!billValue) {
        showInputErr(billError, billInput);
    }

    uncheckRadioTip();
    resetPaxValue();
    resetSumDisplay();

    customTipValue = +customTip.value;
})

paxInput.addEventListener("input", () => {
    numOfPax = +paxInput.value;

    if (numOfPax) {
        removeInputErr(paxError, paxInput);
        calculate();
    } else {
        showInputErr(paxError, paxInput);
    }
})

function calculate() {
    if (tipValue) {
        let tipDisplay = (billValue * tipValue / 100) / numOfPax;
        displaySum(tipDisplay);
    } else if (customTipValue) {
        let tipDisplay = (billValue * customTipValue / 100) / numOfPax;
        displaySum(tipDisplay);
    }
}

function displaySum(sums) {
    tipPerPax.textContent = "$" + sums.toFixed(2);
    billPerPax.textContent = "$" + ((billValue / numOfPax) + sums).toFixed(2);
}

resetBtn.addEventListener("click", resetAll);

function resetAll() {
    billInput.value = "";
    billValue = "";
    uncheckRadioTip();
    resetCustomValue();
    resetPaxValue();
    resetSumDisplay();

    removeInputErr(billError, billInput);
    removeInputErr(paxError, paxInput);

    resetBtn.disabled = true;
}











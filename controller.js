const inputLeft = document.querySelector("#amount");
const selectFrom  = document.querySelector("#from");
const selectTo  = document.querySelector("#to");
const inputRight  = document.querySelectorAll("#amount")[1];
const currSer = new CurrencyService("RUB", "USD");
init();
function init() {
  document.addEventListener("DOMContentLoaded", () => {
    currSer.exchange();
  });
  inputLeft.addEventListener("input", performCurrencyExchange);
  selectFrom .addEventListener("click", updateExchangeFrom);
  selectTo .addEventListener("click", updateExchangeTo);
  inputLeft.addEventListener("keyup", handleComma);
  inputRight .addEventListener("keyup", handleComma);
}

function handleComma(e) {
  if (e.target.value.includes(",")) {
    let newFilterComma = e.target.value.replace(",", ".");
    e.target.value = newFilterComma;
  }
}

function performCurrencyExchange() {
  inputLeft.value = inputLeft.value.replace(/ /g, "");

  if (
    (inputLeft.value.indexOf(",") == -1 ||
      inputLeft.value.indexOf(".") == -1) &&
    inputLeft.value.match(/[a-z&\/\\_^#@+()$~%'"`!|:*?<>{}-]/g)
  ) {
    currSer.alert("Siz yalnız rəqəmli dəyərləri daxil edə bilərsiniz...");
    inputLeft.value = "";
    inputRight .value = "";
  } else {
    if (
      inputLeft.value.indexOf(",") == -1 &&
      inputLeft.value.indexOf(".") == -1
    ) {
      let _new = Number(inputLeft.value);
      if (isNaN(_new)) {
        inputLeft.value = "";
      } else {
        inputLeft.value = _new;
      }

      currSer.changeAmount(_new);
    } else {
      if (inputLeft.value.indexOf(",")) {
        let _new = inputLeft.value.replace(",", ".");
        currSer.changeAmount(_new);
      }
    }
    currSer.exchange().then((result) => {
      if (inputLeft.value == 0) {
        inputRight .value = "";
      } else {
        inputRight .value = result;
      }
    });
  }
}

function updateExchangeFrom(e) {
  currSer.changeFirstCurrency(e.target.textContent);

  currSer
    .exchange()
    .then((result) => {
      if (inputLeft.value == 0) {
        inputRight .value = "";
      } else {
        inputRight .value = result;
      }
    })
    .catch((err) => console.log(err));
}

function updateExchangeTo(e) {
  currSer.changeSecondCurrency(e.target.textContent);

  currSer
    .exchange()
    .then((result) => {
      if (inputLeft.value == 0) {
        inputRight .value = "";
      } else {
        inputRight .value = result;
      }
    })
    .catch((err) => console.log(err));
}

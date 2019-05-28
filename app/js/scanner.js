var dbgJson;

(function () {
  var clientID = "NASAPP@AMER.OAUTHAP";
  var redirectURI = "http://localhost";
  var authCode = "";
  var inputClientID;
  var inputRedirectURI;
  var inputAuthCode;
  var buttonGetAuthCode;
  var buttonGetToken;
  var buttonRefreshToken;
  var sectionList;

  function init() {
    inputClientID = document.getElementById("clientIDInput");
    inputClientID.value = clientID;
    inputClientID.addEventListener("input", processInputClientIDInput);

    inputRedirectURI = document.getElementById("redirectURIInput");
    inputRedirectURI.value = redirectURI;
    inputRedirectURI.addEventListener("input", processInputRedirectURIInput);

    inputAuthCode = document.getElementById("authCodeInput");
    inputAuthCode.value = authCode;
    inputAuthCode.addEventListener("input", processInputAuthCodeInput);

    buttonGetAuthCode = document.getElementById("getAuthCodeButton");
    buttonGetAuthCode.addEventListener("click", processButtonGetAuthCodeClick);

    buttonGetToken = document.getElementById("getTokenButton");
    buttonGetToken.addEventListener("click", processButtonGetTokenClick);

    buttonRefreshToken = document.getElementById("refreshTokenButton");
    buttonRefreshToken.addEventListener("click", processButtonRefreshTokenClick);

    sectionList = document.getElementById("listSection");

    if (localStorage.watchlist)
    {
      localStorage.watchlist.split(",").forEach(loadSymbol);
    }
  }

  function getAuthCodeURI() {
    return "https://auth.tdameritrade.com/auth?" +
      "response_type=code" +
      "&redirect_uri=" + encodeURIComponent(redirectURI) +
      "&client_id=" + encodeURIComponent(clientID);
  }

  function getToken() {
    var uri = "https://api.tdameritrade.com/v1/oauth2/token";
    var body = "grant_type=authorization_code" +
      "&access_type=offline" +
      "&code=" + encodeURIComponent(authCode) +
      "&client_id=" + encodeURIComponent(clientID) +
      "&redirect_uri=" + encodeURIComponent(redirectURI);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processGetTokenResponse;
    xhr.open("POST", uri);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(body);
    console.log("getToken body: " + body);
  }

  function refreshToken() {
    var uri = "https://api.tdameritrade.com/v1/oauth2/token";
    var body = "grant_type=refresh_token" +
      "&refresh_token=" + encodeURIComponent(localStorage.refreshToken) +
      "&access_type=offline" +
      "&client_id=" + encodeURIComponent(clientID);
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processRefreshTokenResponse;
    xhr.open("POST", uri);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(body);
    console.log("refreshToken body: " + body);
  }

  function loadSymbol(symbol, index) {
    if (symbol != "SPY") {
      return;
    }

    var listRowDiv = document.createElement("div");
    listRowDiv.id = "listRow" + index + "Div";
    listRowDiv.className = "listRow";

    var underlyingDiv = document.createElement("div");
    underlyingDiv.id = "underlying" + index + "Div";
    underlyingDiv.className = "panelGrid underlying";
    listRowDiv.appendChild(underlyingDiv);

    var elt = document.createElement("label");
    elt.id = "symbol" + index + "Label";
    elt.className = "symbolValue";
    elt.innerHTML = symbol;
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "last" + index + "Label";
    elt.className = "last";
    elt.innerHTML = "Last";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "lastValue" + index + "Div";
    elt.className = "lastValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "volm" + index + "Label";
    elt.className = "volm";
    elt.innerHTML = "Volume";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "volmValue" + index + "Div";
    elt.className = "volmValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "exp" + index + "Label";
    elt.className = "exp";
    elt.innerHTML = "Expiration";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "expValue" + index + "Div";
    elt.className = "expValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    optionDiv = document.createElement("div");
    optionDiv.id = "option" + index + "Div";
    optionDiv.className = "panelGrid option";
    listRowDiv.appendChild(optionDiv);

    sectionList.appendChild(listRowDiv);

    getOptionChain(symbol, '2019-06-20', '2019-06-22', index);
  }

  function getOptionChain(symbol, fromDate, toDate, index) {
    var uri = "https://api.tdameritrade.com/v1/marketdata/chains?" +
      "symbol=" + symbol +
      "&includeQuotes=TRUE" +
      "&fromDate=" + fromDate +
      "&toDate=" + toDate;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      processGetOptionChainResponse(xhr, index);
    };
    xhr.open("GET", uri);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.accessToken);
    xhr.send();
  }

  function processInputClientIDInput() {
    clientID = decodeURIComponent(this.value);
  }

  function processInputRedirectURIInput() {
    redirectURI = decodeURIComponent(this.value);
  }

  function processInputAuthCodeInput() {
    authCode = decodeURIComponent(this.value);
  }

  function processButtonGetAuthCodeClick() {
    window.open(getAuthCodeURI());
  }

  function processButtonGetTokenClick() {
    getToken();
  }

  function processButtonRefreshTokenClick() {
    refreshToken();
  }

  function processGetTokenResponse() {
    if(this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      localStorage.accessToken = json.access_token;
      localStorage.refreshToken = json.refresh_token;
      console.log("processGetTokenResponse: " + this.responseText);
    } else {
      console.log("processGetTokenResponse: readyState=" + this.readyState + " status=" + this.status);
    }
  }

  function processRefreshTokenResponse() {
    if(this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      localStorage.accessToken = json.access_token;
      localStorage.refreshToken = json.refresh_token;
      console.log("processRefreshTokenResponse: " + this.responseText);
    } else {
      console.log("processRefreshTokenResponse: readyState=" + this.readyState + " status=" + this.status);
    }
  }

  function processGetOptionChainResponse(xhr, index) {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var json = JSON.parse(xhr.responseText);

      var last = (json.underlying.last != null ? json.underlying.last : json.underlyingPrice).toLocaleString();
      var volm = json.underlying.last != null ? json.underlying.totalVolume.toLocaleString() : "N/A";
      document.getElementById("lastValue" + index + "Div").innerHTML = last;
      document.getElementById("volmValue" + index + "Div").innerHTML = volm;

      dbgJson = json;

      var exp = Object.keys(json.callExpDateMap)[0];
      var chain = json.callExpDateMap[exp];
      exp = new Date(exp.split(":")[0] + " 00:00:00").toLocaleDateString(
        "en-US",
        { month: "short", day: "numeric", year: "numeric" });
      document.getElementById("expValue" + index + "Div").innerHTML = exp;

      var optionDiv = document.getElementById("option" + index + "Div");
      var elt;
      var iv;
      var shortStrike;
      var longStrike;
      var fShortStrike;
      var fLongStrike;

      for (shortStrike in chain) {
        fShortStrike = parseFloat(shortStrike);

        if (fShortStrike <= last) {
          iv = chain[shortStrike][0].volatility;
        }
        else {
          break;
        }
      }

      for (shortStrike in chain) {
        fShortStrike = parseFloat(shortStrike);

        if (fShortStrike > last) {
          for (longStrike in chain) {
            fLongStrike = parseFloat(longStrike);

            if (fLongStrike > fShortStrike && fLongStrike - fShortStrike <= 5) {
              elt = document.createElement("Div");
              elt.id = "stratValue" + index + "Div";
              elt.className = "stratValue";
              elt.innerHTML = "Call Credit Spread";
              optionDiv.appendChild(elt);

              elt = document.createElement("Div");
              elt.id = "strikeValue" + index + "Div";
              elt.className = "text strikeValue";
              elt.innerHTML = (Number.isInteger(fShortStrike) ? parseInt(fShortStrike) : fShortStrike.toFixed(2))
                + "/" + (Number.isInteger(fLongStrike) ? parseInt(fLongStrike) : fLongStrike.toFixed(2));
              optionDiv.appendChild(elt);

              var width = fLongStrike - fShortStrike;
              elt = document.createElement("Div");
              elt.id = "widthValue" + index + "Div";
              elt.className = "numeric widthValue";
              elt.innerHTML = width;
              optionDiv.appendChild(elt);

              var shortBid = chain[shortStrike][0].bid;
              var shortAsk = chain[shortStrike][0].ask;
              var longBid = chain[longStrike][0].bid;
              var longAsk = chain[longStrike][0].ask;
              var shortSpread = shortAsk - shortBid;
              var longSpread = longAsk - longBid;
              var shortMid = (shortBid + shortAsk) / 2;
              var longMid = (longBid + longAsk) / 2;
              var shortOpenInt = chain[shortStrike][0].openInterest;
              var shortVolm = chain[shortStrike][0].totalVolume;
              var longOpenInt = chain[longStrike][0].openInterest;
              var longVolm = chain[longStrike][0].totalVolume;
              var liq = ((shortBid != 0 && longBid != 0
                ? 1.01 - (((shortSpread / shortMid) + (longSpread / longMid)) / 2)
                : 0)
                + Math.min((shortOpenInt + longOpenInt) / 10000, 1)
                + Math.min((shortVolm + longVolm) / 4000, 1)
                + Math.min(Object.keys(chain).length / 40, 1)).toFixed(2);
              elt = document.createElement("Div");
              elt.id = "liqValue" + index + "Div";
              elt.className = "text liqValue";
              elt.innerHTML = liq;
              optionDiv.appendChild(elt);

              // var sd = iv  * Math.sqrt(dte / 365) * last;
              elt = document.createElement("Div");
              elt.id = "zDistValue" + index + "Div";
              elt.className = "numeric zDistValue";
              elt.innerHTML = "TBD";
              optionDiv.appendChild(elt);

              elt = document.createElement("Div");
              elt.id = "expValue" + index + "Div";
              elt.className = "numeric expValue";
              elt.innerHTML = "TBD";
              optionDiv.appendChild(elt);

              var credit = shortMid - longMid;
              elt = document.createElement("Div");
              elt.id = "profitValue" + index + "Div";
              elt.className = "numeric profitValue";
              elt.innerHTML = (credit * 100).toFixed(2).toLocaleString();
              optionDiv.appendChild(elt);

              elt = document.createElement("Div");
              elt.id = "lossValue" + index + "Div";
              elt.className = "numeric lossValue";
              elt.innerHTML = ((width - credit) * 100).toFixed(2).toLocaleString();
              optionDiv.appendChild(elt);
            }
          }
        }
      }
    } else {
      console.log("processGetOptionChainResponse: readyState=" + xhr.readyState + " status=" + xhr.status);
    }
  }

  window.addEventListener("load", init);
})();
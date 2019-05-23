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
    // var rowDiv = document.createElement("div");
    // rowDiv.id = "row" + index + "Div";
    // rowDiv.className = "panelGrid listRow";

    // var div = document.createElement("div");
    // div.id = "symbol" + index + "Div";
    // div.className = "listItem symbol";
    // div.innerHTML = symbol;
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "last" + index + "Div";
    // div.className = "listItem numeric last";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "volm" + index + "Div";
    // div.className = "listItem numeric last";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "callVertExp" + index + "Div";
    // div.className = "listItem numeric vertExp";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "callDelta" + index + "Div";
    // div.className = "listItem numeric delta";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "callBid" + index + "Div";
    // div.className = "listItem numeric bid";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "callAsk" + index + "Div";
    // div.className = "listItem numeric ask";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "strike" + index + "Div";
    // div.className = "listItem numeric strike";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "putBid" + index + "Div";
    // div.className = "listItem numeric bid";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "putAsk" + index + "Div";
    // div.className = "listItem numeric ask";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "putDelta" + index + "Div";
    // div.className = "listItem numeric delta";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // div = document.createElement("div");
    // div.id = "putVertExp" + index + "Div";
    // div.className = "listItem numeric vertExp";
    // div.innerHTML = "NULL";
    // rowDiv.appendChild(div);

    // sectionList.appendChild(rowDiv);

    // getOptionChain(rowDiv, symbol, '2019-06-20', '2019-06-22');
  }

  function getOptionChain(elt, symbol, fromDate, toDate) {
    var uri = "https://api.tdameritrade.com/v1/marketdata/chains?" +
      "symbol=" + symbol +
      "&includeQuotes=TRUE" +
      "&fromDate=" + fromDate +
      "&toDate=" + toDate;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      processGetOptionChainResponse(xhr, elt);
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

  function processGetOptionChainResponse(xhr, elt) {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var json = JSON.parse(xhr.responseText);
      var last = (json.underlying.last != null ? json.underlying.last : json.underlyingPrice).toLocaleString();
      var volm = json.underlying.last != null ? json.underlying.totalVolume.toLocaleString() : "N/A";

      child = elt.firstElementChild.nextElementSibling;
      child.innerHTML = last;
      child = child.nextElementSibling;
      child.innerHTML = volm;
    } else {
      console.log("processGetOptionChainResponse: readyState=" + xhr.readyState + " status=" + xhr.status);
    }
  }

  window.addEventListener("load", init);
})();
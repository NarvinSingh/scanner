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
  var buttonScan;
  var responseGetToken;
  var responseRefreshToken;
  var responseGetOptionChain;

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

    buttonScan = document.getElementById("getOptionChainButton");
    buttonScan.addEventListener("click", processButtonScanClick);
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

  function getOptionChain(symbol, fromDate, toDate) {
    var uri = "https://api.tdameritrade.com/v1/marketdata/chains?" +
      "symbol=" + symbol +
      "&fromDate=" + fromDate +
      "&toDate=" + toDate;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = processGetOptionChainResponse;
    xhr.open("GET", uri);
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.accessToken);
    xhr.send();
    console.log("getOptionChain URI: " + uri);
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

  function processButtonScanClick() {
    getOptionChain('SPY', '2019-06-20', '2019-06-22');
  }

  function processGetTokenResponse() {
    if(this.readyState == 4 && this.status == 200) {
      responseGetToken = JSON.parse(this.responseText);
      localStorage.accessToken = responseGetToken.access_token;
      localStorage.refreshToken = responseGetToken.refresh_token;
      console.log("processGetTokenResponse: " + this.responseText);
    } else {
      console.log("processGetTokenResponse: readyState=" + this.readyState + " status=" + this.status);
    }
  }

  function processRefreshTokenResponse() {
    if(this.readyState == 4 && this.status == 200) {
      responseRefreshToken = JSON.parse(this.responseText);
      localStorage.accessToken = responseRefreshToken.access_token;
      localStorage.refreshToken = responseRefreshToken.refresh_token;
      console.log("processRefreshTokenResponse: " + this.responseText);
    } else {
      console.log("processRefreshTokenResponse: readyState=" + this.readyState + " status=" + this.status);
    }
  }

  function processGetOptionChainResponse() {
    if(this.readyState == 4 && this.status == 200) {
      responseGetOptionChain = JSON.parse(this.responseText);
      console.log("processGetOptionChainResponse: " + this.responseText);
    } else {
      console.log("processGetOptionChainResponse: readyState=" + this.readyState + " status=" + this.status);
    }
  }

  window.addEventListener("load", init);
})();
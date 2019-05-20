(function () {
  var clientID = "NARVIN@AMER.OAUTHAP";
  var redirectURI = "http://localhost";
  var authCode;
  var inputClientID;
  var inputRedirectURI;
  var anchorAuthCodeURI;
  var inputAuthCode;
  var buttonGetToken;
  var buttonRefreshToken;
  var buttonGetOptionChain;
  var responseGetToken;
  var responseRefreshToken;
  var responseGetOptionChain;

  function init() {
    inputClientID = document.getElementsByName("clientID")[0];
    inputClientID.value = clientID;
    inputClientID.addEventListener("input", processInputClientIDInput);

    inputRedirectURI = document.getElementsByName("redirectURI")[0];
    inputRedirectURI.value = redirectURI;
    inputRedirectURI.addEventListener("input", processInputRedirectURIInput);

    anchorAuthCodeURI = document.getElementsByName("authCodeURI")[0];
    updateAnchorAuthCodeURI();

    inputAuthCode = document.getElementsByName("authCode")[0];
    inputAuthCode.value = authCode;
    inputAuthCode.addEventListener("input", processInputAuthCodeInput);

    buttonGetToken = document.getElementsByName("getToken")[0];
    buttonGetToken.addEventListener("click", processButtonGetTokenClick);

    buttonRefreshToken = document.getElementsByName("refreshToken")[0];
    buttonRefreshToken.addEventListener("click", processButtonRefreshTokenClick);

    buttonGetOptionChain = document.getElementsByName("getOptionChain")[0];
    buttonGetOptionChain.addEventListener("click", processButtonGetOptionChainClick);
  }

  function getAuthCodeURI() {
    return "https://auth.tdameritrade.com/auth?" +
      "response_type=code" +
      "&redirect_uri=" + encodeURIComponent(redirectURI) + 
      "&client_id=" + encodeURIComponent(clientID);
  }

  function updateAnchorAuthCodeURI() {
    var authCodeURI = getAuthCodeURI();
    anchorAuthCodeURI.href = authCodeURI;
    anchorAuthCodeURI.innerHTML = authCodeURI;
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

  function processButtonGetTokenClick() {
    getToken();
  }

  function processButtonRefreshTokenClick() {
    refreshToken();
  }

  function processButtonGetOptionChainClick() {
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
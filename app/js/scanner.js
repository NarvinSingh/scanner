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
  var zScores = [0.50000, 0.50399, 0.50798, 0.51197, 0.51595, 0.51994, 0.52392, 0.52790, 0.53188, 0.53586, 0.53983, 0.54380, 0.54776, 0.55172, 0.55567, 0.55962, 0.56356, 0.56749, 0.57142, 0.57535, 0.57926, 0.58317, 0.58706, 0.59095, 0.59483, 0.59871, 0.60257, 0.60642, 0.61026, 0.61409, 0.61791, 0.62172, 0.62552, 0.62930, 0.63307, 0.63683, 0.64058, 0.64431, 0.64803, 0.65173, 0.65542, 0.65910, 0.66276, 0.66640, 0.67003, 0.67364, 0.67724, 0.68082, 0.68439, 0.68793, 0.69146, 0.69497, 0.69847, 0.70194, 0.70540, 0.70884, 0.71226, 0.71566, 0.71904, 0.72240, 0.72575, 0.72907, 0.73237, 0.73565, 0.73891, 0.74215, 0.74537, 0.74857, 0.75175, 0.75490, 0.75804, 0.76115, 0.76424, 0.76730, 0.77035, 0.77337, 0.77637, 0.77935, 0.78230, 0.78524, 0.78814, 0.79103, 0.79389, 0.79673, 0.79955, 0.80234, 0.80511, 0.80785, 0.81057, 0.81327, 0.81594, 0.81859, 0.82121, 0.82381, 0.82639, 0.82894, 0.83147, 0.83398, 0.83646, 0.83891, 0.84134, 0.84375, 0.84614, 0.84849, 0.85083, 0.85314, 0.85543, 0.85769, 0.85993, 0.86214, 0.86433, 0.86650, 0.86864, 0.87076, 0.87286, 0.87493, 0.87698, 0.87900, 0.88100, 0.88298, 0.88493, 0.88686, 0.88877, 0.89065, 0.89251, 0.89435, 0.89617, 0.89796, 0.89973, 0.90147, 0.90320, 0.90490, 0.90658, 0.90824, 0.90988, 0.91149, 0.91309, 0.91466, 0.91621, 0.91774, 0.91924, 0.92073, 0.92220, 0.92364, 0.92507, 0.92647, 0.92785, 0.92922, 0.93056, 0.93189, 0.93319, 0.93448, 0.93574, 0.93699, 0.93822, 0.93943, 0.94062, 0.94179, 0.94295, 0.94408, 0.94520, 0.94630, 0.94738, 0.94845, 0.94950, 0.95053, 0.95154, 0.95254, 0.95352, 0.95449, 0.95543, 0.95637, 0.95728, 0.95818, 0.95907, 0.95994, 0.96080, 0.96164, 0.96246, 0.96327, 0.96407, 0.96485, 0.96562, 0.96638, 0.96712, 0.96784, 0.96856, 0.96926, 0.96995, 0.97062, 0.97128, 0.97193, 0.97257, 0.97320, 0.97381, 0.97441, 0.97500, 0.97558, 0.97615, 0.97670, 0.97725, 0.97778, 0.97831, 0.97882, 0.97932, 0.97982, 0.98030, 0.98077, 0.98124, 0.98169, 0.98214, 0.98257, 0.98300, 0.98341, 0.98382, 0.98422, 0.98461, 0.98500, 0.98537, 0.98574, 0.98610, 0.98645, 0.98679, 0.98713, 0.98745, 0.98778, 0.98809, 0.98840, 0.98870, 0.98899, 0.98928, 0.98956, 0.98983, 0.99010, 0.99036, 0.99061, 0.99086, 0.99111, 0.99134, 0.99158, 0.99180, 0.99202, 0.99224, 0.99245, 0.99266, 0.99286, 0.99305, 0.99324, 0.99343, 0.99361, 0.99379, 0.99396, 0.99413, 0.99430, 0.99446, 0.99461, 0.99477, 0.99492, 0.99506, 0.99520, 0.99534, 0.99547, 0.99560, 0.99573, 0.99585, 0.99598, 0.99609, 0.99621, 0.99632, 0.99643, 0.99653, 0.99664, 0.99674, 0.99683, 0.99693, 0.99702, 0.99711, 0.99720, 0.99728, 0.99736, 0.99744, 0.99752, 0.99760, 0.99767, 0.99774, 0.99781, 0.99788, 0.99795, 0.99801, 0.99807, 0.99813, 0.99819, 0.99825, 0.99831, 0.99836, 0.99841, 0.99846, 0.99851, 0.99856, 0.99861, 0.99865, 0.99869, 0.99874, 0.99878, 0.99882, 0.99886, 0.99889, 0.99893, 0.99896, 0.99900, 0.99903, 0.99906, 0.99910, 0.99913, 0.99916, 0.99918, 0.99921, 0.99924, 0.99926, 0.99929, 0.99931, 0.99934, 0.99936, 0.99938, 0.99940, 0.99942, 0.99944, 0.99946, 0.99948, 0.99950, 0.99952, 0.99953, 0.99955, 0.99957, 0.99958, 0.99960, 0.99961, 0.99962, 0.99964, 0.99965, 0.99966, 0.99968, 0.99969, 0.99970, 0.99971, 0.99972, 0.99973, 0.99974, 0.99975, 0.99976, 0.99977, 0.99978, 0.99978, 0.99979, 0.99980, 0.99981, 0.99981, 0.99982, 0.99983, 0.99983, 0.99984, 0.99985, 0.99985, 0.99986, 0.99986, 0.99987, 0.99987, 0.99988, 0.99988, 0.99989, 0.99989, 0.99990, 0.99990, 0.99990, 0.99991, 0.99991, 0.99992, 0.99992, 0.99992, 0.99992, 0.99993, 0.99993, 0.99993, 0.99994, 0.99994, 0.99994, 0.99994, 0.99995, 0.99995, 0.99995, 0.99995, 0.99995, 0.99996, 0.99996, 0.99996, 0.99996, 0.99996, 0.99996, 0.99997, 0.99997];

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

  function getCumStdNorm(z) {
    return z < 3.995 ? zScores[Math.round(z * 100)] : 1;
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

    var elt = document.createElement("div");
    elt.id = "symbol" + index + "Div";
    elt.className = "redacted3 symbolValue";
    elt.innerHTML = symbol;
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "last" + index + "Label";
    elt.className = "redacted3 last";
    elt.innerHTML = "Last";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "lastValue" + index + "Div";
    elt.className = "lastValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "sd" + index + "Label";
    elt.className = "redacted3 sd";
    elt.innerHTML = "Std Dev";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "sdValue" + index + "Div";
    elt.className = "sdValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "volm" + index + "Label";
    elt.className = "redacted3 volm";
    elt.innerHTML = "Volume";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("div");
    elt.id = "volmValue" + index + "Div";
    elt.className = "volmValue";
    elt.innerHTML = "NULL";
    underlyingDiv.appendChild(elt);

    elt = document.createElement("label");
    elt.id = "exp" + index + "Label";
    elt.className = "redacted3 exp";
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
      dbgJson = json;

      var last = (json.underlying.last != null ? json.underlying.last : json.underlyingPrice).toLocaleString();
      var volm = json.underlying.last != null ? json.underlying.totalVolume.toLocaleString() : "N/A";
      var expKey = Object.keys(json.callExpDateMap)[0];
      var callChain = json.callExpDateMap[expKey];
      var putChain = json.putExpDateMap[expKey];
      var keyParts = expKey.split(":");
      var dtExp = new Date(keyParts[0] + " 00:00:00");
      var dte = keyParts[1];
      var exp = dtExp.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      var atmStrike = 0;
      var atmIv;
      var shortStrike;
      var longStrike;
      var optionDiv = document.getElementById("option" + index + "Div");
      var elt;
      var oddEven = "odd";

      document.getElementById("lastValue" + index + "Div").innerHTML = last;
      document.getElementById("volmValue" + index + "Div").innerHTML = volm;
      document.getElementById("expValue" + index + "Div").innerHTML = exp + " (" + dte + ")";

      for (shortStrike in callChain) {
        var fShortStrike = parseFloat(shortStrike);
        var shortOption = callChain[shortStrike][0];
        var shortBid = shortOption.bid;
        var shortAsk = shortOption.ask;
        var shortSpread = shortAsk - shortBid;
        var shortMid = (shortBid + shortAsk) / 2;

        if (shortOption.bid > 0 && fShortStrike > last) {
          if (Math.abs(fShortStrike - last) < Math.abs(atmStrike - last)) {
            atmStrike = fShortStrike;
            atmIv = (shortOption.volatility + putChain[shortStrike][0].volatility) / 2;
          }

          var iSpread = 1;

          for (longStrike in callChain) {
            var fLongStrike = parseFloat(longStrike);
            var longOption = callChain[longStrike][0];
            var longBid = longOption.bid;
            var longAsk = longOption.ask;
            var longSpread = longAsk - longBid;
            var longMid = (longBid + longAsk) / 2;
            var credit = shortMid - longMid;

            if (longOption.bid > 0 && credit > 0 && fLongStrike > fShortStrike && fLongStrike - fShortStrike <= 5) {
              elt = document.createElement("Div");
              elt.id = "stratValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " stratValue redacted";
              elt.innerHTML = "Call Credit Spread";
              optionDiv.appendChild(elt);

              elt = document.createElement("Div");
              elt.id = "strikeValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " text strikeValue";
              elt.innerHTML = (Number.isInteger(fShortStrike) ? parseInt(fShortStrike) : fShortStrike.toFixed(2))
                + "/" + (Number.isInteger(fLongStrike) ? parseInt(fLongStrike) : fLongStrike.toFixed(2));
              optionDiv.appendChild(elt);

              var width = fLongStrike - fShortStrike;
              elt = document.createElement("Div");
              elt.id = "widthValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric widthValue";
              elt.innerHTML = width;
              optionDiv.appendChild(elt);

              var shortOpenInt = shortOption.openInterest;
              var shortVolm = shortOption.totalVolume;
              var longOpenInt = longOption.openInterest;
              var longVolm = longOption.totalVolume;
              var liq = ((shortBid != 0 && longBid != 0
                ? Math.max(1 - (
                  ((shortBid > 0 ? (shortSpread / shortMid) : 1)
                  + (longBid > 0 ? (longSpread / longMid) : 1))
                  / 2), 0)
                : 0)
                + Math.min((shortOpenInt + longOpenInt) / 10000, 1)
                + Math.min((shortVolm + longVolm) / 4000, 1)
                + Math.min(Object.keys(callChain).length / 40, 1)).toFixed(2);
              elt = document.createElement("Div");
              elt.id = "liqValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " text liqValue";
              elt.innerHTML = liq;
              optionDiv.appendChild(elt);

              var pct = (fShortStrike - last) / last;
              elt = document.createElement("Div");
              elt.id = "pctDistValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric pctDistValue";
              elt.innerHTML = (pct * 100).toFixed(2) + "%";
              optionDiv.appendChild(elt);

              var iv = shortOption.volatility;
              var sd = (iv / 100) * Math.sqrt(dte / 365) * last;
              var z = (fShortStrike - last) / sd;
              elt = document.createElement("Div");
              elt.id = "zDistValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric zDistValue";
              elt.innerHTML = z.toFixed(2);
              optionDiv.appendChild(elt);

              var probItm = getCumStdNorm(z);
              elt = document.createElement("Div");
              elt.id = "probItmValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric probItm";
              elt.innerHTML = (probItm * 100).toFixed(2) + "%";
              optionDiv.appendChild(elt);

              var expVal = credit - (width * probItm);
              elt = document.createElement("Div");
              elt.id = "expValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric expValue";
              elt.innerHTML = (expVal * 100).toFixed(2);
              optionDiv.appendChild(elt);

              elt = document.createElement("Div");
              elt.id = "profitValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric profitValue";
              elt.innerHTML = (credit * 100).toFixed(2).toLocaleString();
              optionDiv.appendChild(elt);

              var risk = width - credit;
              elt = document.createElement("Div");
              elt.id = "lossValue-" + index + "-" + iSpread + "-Div";
              elt.className = oddEven + " numeric lossValue";
              elt.innerHTML = (risk * 100).toFixed(2).toLocaleString();
              optionDiv.appendChild(elt);

              iSpread++;
            }
          }

          oddEven = oddEven === "odd" ? "even" : "odd";
        }
      }

      sd = (atmIv / 100) * Math.sqrt(dte / 365) * last;
      document.getElementById("sdValue" + index + "Div").innerHTML = "±" + sd.toFixed(2).toLocaleString();
      console.log("ATM Strike: " + atmStrike + " ATM IV: " + atmIv);
    } else {
      console.log("processGetOptionChainResponse: readyState=" + xhr.readyState + " status=" + xhr.status);
    }
  }

  window.addEventListener("load", init);
})();
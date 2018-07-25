export function getCards() {
    return new Promise(function (resolve, reject) {

      var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://localhost:3000/cards",
        "method": "GET",
        "headers": {
          "Cache-Control": "no-cache"
        }
      }
      $.ajax(settings).done(function (response) {
        resolve(response);
      });

    })
  }

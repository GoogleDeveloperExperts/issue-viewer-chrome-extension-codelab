(function (namespace) {
  'use strict';

  namespace.GitHub = {
    getMe: function(token) {
      var uri = '/user';
      var method = 'GET';

      return this._request(method, uri, token, false);
    },
    getMyIssues: function(token) {
      var uri = '/user/issues';
      var method = 'GET';

      return this._request(method, uri, token, false);
    },
    _request: function(method, uri, token, data) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        if (uri === '') {
          reject('Hey, you need a URI!');
        }

        var api_base = 'https://api.github.com';
        var path = api_base + uri;

        request.open(method, path, true);
        request.setRequestHeader('Accept','application/vnd.github.v3.raw+json');
        request.setRequestHeader('Content-Type','application/json;charset=UTF-8');
        request.setRequestHeader('Authorization', 'token ' + token);

        request.onreadystatechange = function stateChange() {
          if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300 || request.status === 304) {
              resolve(JSON.parse(request.responseText));
            } else {
              reject(request.status);
            }
          }
        };

        if (data) {
          request.send(JSON.stringify(data));
        }
        else {
          request.send();
        }
      });
    }
  };

})(window);
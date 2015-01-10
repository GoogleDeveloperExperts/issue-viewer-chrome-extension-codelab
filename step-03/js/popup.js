var username = document.getElementById('username');
var issueList = document.getElementById('issues');

chrome.storage.local.get(['user', 'issues'], function(data) {
  username.textContent = data.user.login;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', data.user.avatar_url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.response);
    document.getElementById('avatar').appendChild(img);
  };
  xhr.send();  

  (data.issues).forEach(function(issue) {
    var li = document.createElement('li');
    li.innerText = '#' + issue.number + ' - ' + issue.title;

    issueList.appendChild(li);
  });
});
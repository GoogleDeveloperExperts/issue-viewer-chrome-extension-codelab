var username = document.getElementById('username');
var issueList = document.getElementById('issues');

// Get one: https://github.com/settings/applications
var myToken = 'YOUR_PERSONAL_TOKEN';

GitHub.getMyIssues(myToken).then(function (issues) {

  (issues).forEach(function(issue) {
    var li = document.createElement('li');
    li.innerText = '#' + issue.number + ' - ' + issue.title;

    issueList.appendChild(li);
  });

});

GitHub.getMe(myToken).then(function (me) {

  username.textContent = me.login;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', me.avatar_url, true);
  xhr.responseType = 'blob';
  xhr.onload = function(e) {
    var img = document.createElement('img');
    img.src = window.URL.createObjectURL(this.response);
    document.getElementById('avatar').appendChild(img);
  };
  xhr.send();

});
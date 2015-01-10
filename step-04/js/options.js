var githubToken = document.getElementById('githubToken');
var saveButton = document.getElementById('save');

// save our Github token
saveButton.addEventListener('click', function() {
  chrome.storage.local.set({
    githubToken: githubToken.value
  }, function() {
    // force background page to reload data
    chrome.extension.getBackgroundPage().updateUser();
    chrome.extension.getBackgroundPage().updateIssues();
  });
});

// get our Github token
chrome.storage.local.get('githubToken', function(data) {
  if(data && data.githubToken) {
    githubToken.value = data.githubToken;
  }
});
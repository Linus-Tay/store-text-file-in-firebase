const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const owner = core.getInput('owner');
  console.log(`Hello ${owner}!`);
  const repoName = core.getInput('repoName');
  console.log(`Hello ${repoName}!`);
  const fileName = core.getInput('fileName');
  console.log(`Hello ${fileName}!`);

  var textFileURL = "https://raw.githubusercontent.com/" + owner + "/" + repoName + "/master/" + fileName
  console.log(textFileURL)
  //   fetch(textFileURL)
//     .then( response => response.text() )
//     .then( text => {
//         var data = text.split('\n')
//         console.log(data[0])
//     })
} catch (error) {
  core.setFailed(error.message);
}
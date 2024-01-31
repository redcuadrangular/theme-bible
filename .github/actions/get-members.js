const { Octokit } = require("@octokit/action");
const YAML = require('yaml')
const fs = require('node:fs');
const doc = new YAML.Document();

const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

octokit.request('GET /orgs/{org}/members', {
  org: owner,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}).then(( data )=>{
  doc.contents = data;
  let result = doc.toString();
  fs.writeFile('./public/members.yml', result, err => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
});


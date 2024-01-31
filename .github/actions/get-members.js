const { Octokit } = require("@octokit/action");
const YAML = require('yaml')
const doc = new YAML.Document();
import * as fs from 'fs';


const octokit = new Octokit();
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

octokit.request('GET /orgs/{org}/members', {
  org: owner,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
}).then(( data )=>{
  doc.contents = data;
  console.log(doc.toString());
});


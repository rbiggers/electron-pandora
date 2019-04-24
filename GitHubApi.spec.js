const { describe, it } = require('mocha');
const assert = require('assert');
const GitHubApi = require('./GitHubApi');

describe('GitHubApi', () => {
  describe('Request Github for latest release', () => {
    it('Should return status code 200 OK', () => new Promise((resolve, reject) => {
      GitHubApi.getLatestRelease()
        .then((response) => {
          assert.equal(200, response.statusCode);
          resolve();
        })
        .catch(error => reject(error));
    }));
  });
  describe('Request Github for latest version number', () => {
    it('Should return the latest version number', () => new Promise((resolve, reject) => {
      GitHubApi.getLatestVersion()
        .then((response) => {
          assert.equal('v0.1.3', response);
          resolve();
        })
        .catch(error => reject(error));
    }));
  });
});


const request = require('request-promise');

const GitHubApi = () => {
  const options = {
    url: 'https://api.github.com/repos/rbiggers/electron-pandora/releases/latest',
    headers: {
      'User-Agent': 'request',
    },
    resolveWithFullResponse: true,
  };

  const doRequest = () => new Promise((resolve, reject) => {
    request(options)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

  const getLatestRelease = () => new Promise((resolve, reject) => {
    options.method = 'GET';

    doRequest(options)
      .then((response) => { resolve(response); })
      .catch((error) => { reject(error); });
  });

  const getLatestVersion = () => new Promise((resolve, reject) => {
    options.method = 'GET';

    doRequest(options)
      .then((response) => {
        const version = JSON.parse(response.body).name;
        resolve(version);
      })
      .catch((error) => { reject(error); });
  });

  return {
    getLatestRelease,
    getLatestVersion,
  };
};

module.exports = GitHubApi();

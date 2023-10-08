console.log('Before');

getUser(1, function(user) {
    console.log('User', user);

    getRepositories(user.gitHubUsername, function(repo) {
        console.log('Repos', repo);
    })
});

console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from database....");

        callback({ id: id, gitHubUsername: "Kelvin"});
    }, 2000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('calling Github API.....');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');
const userContainer = document.querySelector('.user-profile');
const avatar = document.querySelector('.avatar');
const userRepoList = document.querySelector('.user-repo-list');

let user;
//get user from search field 
searchButton.addEventListener('click', () => {
    user = searchBar.value;

    //input validation
    if(!user){
        alert ("Please enter a username");
        return;
    }

    //calling both user and repo data from the api
    const getUserData = fetch(`https://api.github.com/users/${user}`)
    const getRepoData = fetch(`https://api.github.com/users/${user}/repos`)

    //fetch data from both api calls 
    Promise.all([getUserData, getRepoData]).then((values) => {
        return Promise.all(values.map((value) => value.json()));
    }).then(values => {

        //get user data
        userContainer.innerHTML = `
        <li>Name: ${values[0].name}</li>
        <li>Username: ${values[0].login}</li>
        <li>Email: ${values[0].email}</li>
        <li>Location ${values[0].location}</li>
        <li>Number of Repos: ${values[1].length}</li> `

        //get repo related Data
        values[1].forEach((repo) => {
            let userRepoObj = document.createElement('li');
            userRepoObj.innerHTML = `Name: ${repo.name} <br> Description: ${repo.description}`;
            userRepoList.appendChild(userRepoObj);
        })
        // Get picture of user
        avatar.src = values[0].avatar_url;

    })

 
});

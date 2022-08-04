document.addEventListener('DOMContentLoaded', function() {
    let searchForm = document.querySelector('form')
    searchForm.addEventListener('submit', handleSubmit);
})

function handleSubmit(e) {
    e.preventDefault();
    let search = e.target.children[0].value;
    let userList = document.querySelector('#user-list')
    fetch(`https://api.github.com/search/users?q=${search}`).then(resp => resp.json())
    .then(data => {
        let user = data.items[0];

        let username = document.createElement('h1')
        username.textContent = user.login;
        username.addEventListener('click', renderRepos);

        let avatar = document.createElement('img')
        avatar.src = user.avatar_url;
        avatar.style.width = '300px'
        avatar.style.height = 'auto'

        let profile = user.html_url;
        let profileLink = document.createElement('a');
        profileLink.href = profile;
        profileLink.textContent = profile;

        let userDiv = document.createElement('div');
        userDiv.append(username);
        userDiv.append(profileLink);
        userDiv.append(avatar);

        let listItem = document.createElement('li');
        listItem.append(userDiv);
        console.log(userDiv);

        userList.append(listItem);

    })
    
}

function renderRepos(e) {
    let reposList = document.querySelector('#repos-list');
    fetch(`https://api.github.com/users/${e.target.textContent}/repos`).then(resp => resp.json())
    .then(repos => {
        repos.forEach(repo => {
            let link = repo.html_url;
            let repoLink = document.createElement('a');
            repoLink.href = link;
            repoLink.textContent = link;
            repoItem = document.createElement('li');
            repoItem.append(repoLink);
            reposList.append(repoItem);
        })
    })
}
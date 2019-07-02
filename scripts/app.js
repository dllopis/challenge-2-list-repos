// Variables holding html references
const changeButton = document.querySelector(".btn-primary");    //button that submit username
var inputValue = document.querySelector(".input-lg");           //username input value
var navbarTitle = document.querySelector(".navbar-brand");      //navbar title on top of page
var repoOwner = document.querySelector("div.container h1");     //GitHub username and href link to main-profile
var repoMessage1 = document.querySelector(".intro-p1")          // Message underneath full name
var repoMessage2 = document.querySelector(".intro-p2")          // Message underneath full name      
var repoInfo = document.querySelector("section.container h2");  //h2 element that display GitHub username and href to profile page
var input = document.getElementById("userInput");               // this is for the eventlistner when user presses enter on form to submit

// Peronalized Tokens to access GitHub-API
const client_id = "Iv1.2b9b3a65936719ac";
const client_secret = "5e014d6e1709a03bb5730943187ce87386bc1f51";

// --- COMPLETED FUNCTIONS ---

const repoData = () =>  {
    fetchUsers(inputValue.value).then((result) =>  {

        //Debug helper to see result from fetch
        //console.log(result);
        
        document.getElementById("userInput").value = "";
        document.getElementById("userInput").placeholder = "Search for another GitHub user";

        // display GitHub user's full name
        repoOwner.innerHTML= `${result.data.name}`;

        //display Message under user's name
        repoMessage1.innerHTML=  "Browse through my repositories below!";
        repoMessage2.style.display="none";

        // display GitHub username with hyperlink to main-profile
        repoInfo.innerHTML = `Showing repos from: <a href=${result.data.html_url}> ${result.data.login} </a>`;

        // Render each repository to UI
        fetchRepos(result.data.repos_url);
        });
};

// fetches user-input by making API call to github using our personalized tokens to get access
const fetchUsers = async (user) =>  {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();

    return  {data}
};

// fetches each repository from github user-url provided using promises
const fetchRepos = (data) =>    {
    fetch(data)
        .then(response => response.json())
        .then(data => {
            // Debug helper to see all repositories
            console.log(data);
            
            //holds each repo's info
            var repo = document.querySelector("main.repo-list");
            // reset innerHTML from previously shown User
            repo.innerHTML = "";
            // iterate throuch each repo
            data.forEach(element => {
                if(repo) {
                    // Now render each repo to UI
                    repo.innerHTML += `
                    <div class="row repo">
                        <h3> <a href="${element.html_url}">${element.name}</a> </h3>
                        <p><strong>Description</strong>: <span>${element.description}</span> </p>
                        <p><strong>Owner</strong>: <span><a href="${element.owner.html_url}"> ${element.owner.login} </a> </span></p>
                    
                        <div class="stats">
                            <div class="col-sm-1 stars">
                                <svg class="icon" aria-hidden="true" height="16" version="1.1" viewBox="0 0 14 16" width="14">
                                    <use xlink:href="./svg/sprites.svg#star"></use>
                                </svg>
                                <span>${element.stargazers_count}</span>
                            </div>
                            
                            <div class="col-sm-1 forks">
                                <svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 10 16" width="10">
                                    <use xlink:href="./svg/sprites.svg#fork"></use>
                                </svg>
                                <span>${element.forks}</span>
                            </div>
                        </div>
                    </div>`
                }
            }); // end of forEach / styling of repo's                
        })  // end of fetch
};  // end of fetchRepos

// user clicks on button to start fetching repo
changeButton.addEventListener("click", () => {
    event.preventDefault();
    repoData();
});

document.addEventListener("DOMContentLoaded", function() {
    console.log('document ready');
});

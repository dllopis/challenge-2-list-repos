/* Listed functions in order of exection:
    1.      Button press fires runApp()
    2.a      fetchUser() is fired within runApp()
    2.b      fetchRepos() is fired within fetchUser()
    3.a     .sort(compareValue) will sort our repo-list by recency within fetchRepos()
    3.b     renderRepoContent is fired after sort is complete and within fetchRepos()

    Used this basis to help solve challenge
*/

// Variables holding html references
const changeButton = document.querySelector(".btn-primary");    // button that submit username
var userInputField = document.querySelector(".input-lg");           // username input value for form
var repoOwner = document.querySelector("div.container h1");     // GitHub username and href link to main-profile
var repoMessage1 = document.querySelector(".intro-p1")          // Message underneath full name
var repoMessage2 = document.querySelector(".intro-p2")          // Message underneath full name      
var repoInfo = document.querySelector("section.container h2");  // h2 element that display GitHub username and href to profile page
var repoList = document.querySelector("main.repo-list");

// Peronalized Tokens to access GitHub-API
const client_id = "Iv1.2b9b3a65936719ac";
const client_secret = "5e014d6e1709a03bb5730943187ce87386bc1f51";

// user clicks on button to start fetching repo
changeButton.addEventListener("click", () => {
    event.preventDefault();
    runApp();
});

const runApp = () =>  {
    if (userInputField.value == "") {
        userInputField.placeholder = "Invalid input! Try your search again."; 
        return false;
      }
    fetchUser(userInputField.value).then((result) =>  {
        // Some error handling for Input form -- Need to implement Regex solution
        if(result.data.login === undefined) {
            userInputField.value = "";
            repoInfo.innerHTML = "";
            repoList.innerHTML = "";
            userInputField.placeholder = "Invalid input! Try your search again."; 
            return false;
        }
        // Apply changes to HTML content when user is fetched
        userInputField.value = "";
        userInputField.placeholder = "Search for another GitHub user";        
        repoOwner.innerHTML= result.data.name;
        repoMessage1.innerHTML=  "Browse through my recently worked on repositories below!"; 
        repoMessage2.style.display="none";
        repoInfo.innerHTML = `Showing repos from: <a href=${result.data.html_url}> ${result.data.login} </a>`;

        // Render each repository to UI
        fetchRepos(result.data.repos_url);
    }).catch(err => alert(err));
};

// fetches user-input by making API call to github using our personalized tokens to get access
const fetchUser = async (user) =>  {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    const data = await api_call.json();

    return  {data}
};

// Fetch repo list / sort by recency / render call
const fetchRepos = (data) =>    {
    fetch(data)
        .then(response => response.json())
        .then(data => {
            data.sort(compareValues('updated_at','desc'));  //  Sort our fetched data by recency
            renderRepoContent(data);                        //  Output user repositories to window
        });
};

/*  CREDIT TO THIS SITE FOR HELPING ME FIND A SOLUTION TO SORTING REPO'S BY RECENCY USING COMPARATORS
    https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/ */
function compareValues(key, order='asc') {
    return function(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) { return 0; }
        
        // This checks for strings and UpperCase() is called to avoid complications when comparing.
        const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        let comparison = 0;

        // some comparator action going on here
        if (varA > varB) 
            comparison = 1;
        else if (varA < varB) 
            comparison = -1;
        return ((order == 'desc') ? (comparison * -1) : comparison );   // check argument and return accordingly
    };
}

// Output each repository from user to the window
function renderRepoContent(data)    {
    //holds each repo's info
    var repo = document.querySelector("main.repo-list");

    // reset innerHTML from previously shown User
    repo.innerHTML = "";
    
// iterate throuch each repo
data.forEach(element => {
    console.log(element.updated_at);
    if(repo) {
        // Now render each repo to UI and inject values as needed
        repo.innerHTML += `
    <div class="row repo">
        <h3> <a href="${element.html_url}">${element.name}</a> </h3>
        <p><strong>Description</strong>: <span>${(element.description === null) ? "No description": element.description}</span> </p>
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
};

// This was already here 
// Not completely sure what it does besides telling me that I was good to go =)
  document.addEventListener("DOMContentLoaded", function() {
    console.log('document ready');
});
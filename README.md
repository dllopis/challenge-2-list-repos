# Codecorgi-Challenge-2-List-Repos
This site displays the github repos for a given user
sorted by recency.

# My working Proto-type
https://codecorgi-challenge-2-list-repos.netlify.com/

# Issues:
* #1 use my own html format instead of the boiler-plate provided
* #2 display repos by recency - Fixed
* #3 Need a regex solution for validating input - Temporary Fixed
* #4 refactor app.js - Fixed
* #5 Repo content is updating and keeping previous user repos - Fixed
* #6 keydown spams submit form (caused a rate-limit issue for API) - Temporary Fix
* #7 Improvement to reduce API calls - store previous users in a map -only during browser session-
* #8 Error handling for promises that fail
* #9 pushed_at and updated_at are returning results that don't seem valid.
     
# Fixes: 
* Issue #2 - Fixed            - Users Repo's displayed be recency
* Issue #3 - Temporary Fix    - used conditionals to check user input
* Issue #4 - Fixed            - Refactored app.js - more readable now
* issue #5 - Fixed            - Repo's displaying properly now
* Issue #6 - Temporary Fix    - Disabled Enter for submissions

# Random Fixes on the spot
* Description of repo's updated if undefined
* Refactored all functions to arrow functions for consistency


Feel free to update this list, so that I can fix any issues.
For more information about the challenge, visit
[codecorgi.co](http://codecorgi.co/challenge/2/list-repos).

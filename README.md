Individual Project - Set E
==========================


**You are required to complete this project individually. We will be checking for plagiarism. All parties involved in plagiarizing or cheating will receive an automatic 0 for the whole project and will be referred to the SCCR for an Honor Code violation.**

**Each section of this documentation has important information to help you complete this project successfully. Please read the entire document thoroughly.**

## General Instructions
*   You are allowed to reuse code, you have previously written for, or that has been provided by, this class curriculum.
*   To complete this project you are allowed access to all resources. However, the labs and homeworks you have completed for this course should suffice.
*   While you can use online resources to help you complete the project, you are NOT permitted to reuse any code found online, except from official documentation resources.
*   Please follow the submission instructions very carefully.
*   If there are errors in submission, we will not be allowing regrades. The code/work submitted will be evaluated and your scores will be assigned accordingly.
*   NO LATE SUBMISSIONS WILL BE PERMITTED ON THIS ASSIGNMENT



## Part 1: Directory Structure

**Note: You have the freedom to rename the files to suit the naming convention for your project. However, it is advisable for you to follow the below directory structure. If you feel the need to add more files - to be able to work with docker, you may do so. Make sure to add them at the appropriate location in your directory.**

          |-- IndividualProjects_SetE
              |-- views
                    |-- pages
                          |-- main.ejs
                          |-- reviews.ejs (extra credit)
                    |-- partials
                          |-- header.ejs
                          |-- menu.ejs
                          |-- footer.ejs
                          |-- message.ejs
              |-- resources 
                    |--css (optional)
                          |-- style.css
                    |--js (extra credit)
                          |-- script.js
              |-- server.js
              |-- package.json
              |-- init_data (extra credit)
                    |-- create.sql
                    |-- insert.sql (optional)
              |-- .env (extra credit)
              |-- docker-compose.yaml
        

You could alternatively use the directory structure from Lab 9. 

## Part 2: API documentation and Guidelines

*   For this project you will be using the Meal DB API. Here is the link: [TheMealDB](https://www.themealdb.com/api.php)

Some things to note when using the API:

*   This is an open API. You are not required to make any keys to access the data provided by this API.
*   When making AJAX requests from your localhost you will use the `http://` protocol in your url. However, when you host your application to Heroku, you will be using the `https://` protocol.
*   You will be using the `/search` endpoint. You will be searching for meals by their names. Please use the appropriate parameter to make the request. The API documentation has the required information for the different parameters.
*   Sample test data - \[meals\]: Arrabiata, pancakes

## Part 3: Implementation

We'll provide succint instructions for you to accomplish all the tasks in the coding activity. You have the creative freedom to design your website as long as you include all the components requested for each feature. 

### 1. Home Page

Files modified here: _main.ejs, menu.ejs, header.ejs, footer.ejs, server.js_

#### To Do:

*   Include the bootstrap library for this website.
*   Add a navigation/menu bar at the top of the page to link to the Home page and Reviews page (if you implement the extra credit).
*   A textbox that takes the search text as input. Here, it would be the name of a dish.
*   A search button that when clicked makes an axios call from the server to the API.
*   A route will be created on the node server that will render this page.

### 2. Search Feature

Files modified here: _server.js, main.ejs_

#### To Do:

Upon entering some text in the textbox and clicking on the search button you created in the previous step:

*   Create a div to hold the search results when populated.
*   An axios call is made to the API (server.js)
*   Part 2 has guidelines about the API call.
*   Upon receiving the JSON response from the API, you will populate the div on the webpage that include the following information about the meal:
    *   Name
    *   Instructions
    *   Tags (if they exist)
    *   Link to the source website
    *   Link to YouTube
*   You will also contain a button called "Add Review". (extra credit)
*   Note: If the API returns more than one result, render the first result. If any of the data points do not have the expected data, label those field values as '-' or 'Link unavailable'
*   If there is an error in the API call or the route, render message.ejs with the appropriate error message.

### 3. Add Review Modal - Extra Credit

Files modified here: _script.js, main.ejs, server.js, create.sql_

#### To Do:

When the "Add review" button of a card is clicked, the following should happen:

*   A bootstrap modal appears.
*   The modal has a title, 2 labels, 2 text fields and a submit button.
*   The text field for the name of the dish should be autopopulated and should be readonly.
*   When the submit button is clicked, the data from this form should be stored in the database and the user should be redirected to the reviews page (see more details in the Review Page section).
*   To accomplish the above task you need to:
    *   Create routes on the node server to receive and store the data in the table and return the appropriate page and data.
    *   Create a database in postgres.
    *   Create a table within the database that has `id, recipe, review, review_date` columns

### 4. Review Page - Extra Credit

Files modified here: _server.js, reviews.ejs_

#### To Do:

*   When the submit button on the Add review modal or the Reviews link on the nav bar is clicked, the reviews page should be rendered.
*   Create appropriate route(s) on the node server to fulfill these requests.
*   The review page should have the following:
    *   A table with the information about the name of the recipe, the review and the date the review was stored in the database.

## Part 4: Submission Guidelines

You will be turning in your work on `GitHub` into this repository. Make sure the submission on the GitHub includes:

*   The entire directory mentioned above (and any additional files you may have added). Make sure to include all the files you are using to run your website.
*   When grading we should be able to run your application on the localhost.
*   Include a brief video(~30s-1min) demonstrating the different features of your application that have been implemented. We should be able to see the timestamp on the computer in the videos.


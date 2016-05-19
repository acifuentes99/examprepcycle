# Exam Prep App Cycle

### Page

http://examprepcycle.herokuapp.com

For now, the app isn't working well on Heroku. That's because the server (for free accounts) doesn't allow script that take more than 2000 milliseconds to work. The Google Api scripts takes more than that, so the page launches an "application error".

But this can be fixed by making the script work as a background process. When I learn more about it, I'm going to fix the bug, and make the app work better!.

For now, you can download the source code (here), and run nodejs. See instructions.

### Instructions

#### The App

* You need an "Exam Calendar", where are all your exams.
* Click in the authorize button, you'll be redirected to Google Authentication.
* Then, follow the instructions in the Page: Select your Exams Calendar.
* Next, introduce a name for your Exam Prep Calendar
* Click Submit
* A "done" screen it's going to appear. That means, the calendar are ready!.

#### Installing Locally

* Install NodeJs and NPM in your computer
* Open a Terminal. Go to the code directory
* Run "npm install", to install all the requiered node modules
* Run "node server.js"
* Go to "localhost:8080" in your web browser



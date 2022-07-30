# E-valuation
Repository for the project code "E-valuation" for the course "Human Computer Interaction", A.Y. 2020/2021. \
E-valuation is a web application that helps high school teachers send homework to their students and interact with them.
<p float="left">
  <img src="https://github.com/polito-hci-2020/e-valuation-code/blob/main/gifs/gif1.gif" width="270">
 <img src="https://github.com/polito-hci-2020/e-valuation-code/blob/main/gifs/gif2.gif" width="270">
 <img src="https://github.com/polito-hci-2020/e-valuation-code/blob/main/gifs/gif3.gif" width="270">
 </p>


# Project Structure

```
.

|-- gifs
|-- public
|-- src
|   |-- components
|   |   |-- audio-recorder
|   |   |-- courses
|   |   |-- dialogs
|   |   |-- footers
|   |   |-- headers
|   |   |-- snackbars
|   |-- firebase
|   |-- helpers
|   |-- hooks
|   |-- routes
|   |-- screens
|   |   |-- comments
|   |   |-- course
|   |   |-- courses
|   |   |-- help
|   |   |-- homework-forms
|   |   |-- page-not-found
|   |   |-- solutions
|   |   |-- student-solution
|   |-- style
```
* <b> Gifs:</b> gifs used for the documentations;
* <b> Public:</b> general information about the application: logo, name etc;
* <b> Components</b> contains all the custom components used in the application:
  * audio-recorder: component to manage the permissions and recording of audio files;
  * courses: components to manage the homeoage containg the courses of the teacher;
  * dialogs: custom dialog used to confirm various actions (save, delete etc);
  * footer: custom footer used as buttom navigation in the homework page;
  * headers: custom headers with different possible icons and subheader;
  * snackbar: custon snackbar to give the user feedbacks about successful tasks or warnings.
* <b> Firebase:</b> connection to the Firebase database.
* <b> Helpers:</b> helper functions frequently used.
* <b> Hooks:</b> hook to manage course data loading and errors.
* <b> Routes:</b> definition of paths (url structure).
* <b> Screens</b> contains all the pages structure:
  * comments: chat including the management of message sending and text and audio messages visualization;
  * course: single course page containing all the homework;
  * courses: homepage, it shows the courses of the teacher;
  * help: FAQ page;
  * homework-forms: create, edit, show forms of a single homework;
  * page-not-found: error page to handle wrong paths as url;
  * solutions: page containing all the possible solutions provided by every student of the course;
  * student-solution: page showing the homework solution of a single student;
  
* <b> Style:</b> definition of the theme palette used in the entire app.

# Tools used
For developing we have used [`React`](https://it.reactjs.org/) for the front-end and [`Firebase`](https://firebase.google.com/) for the back-end.

Our app follow the [`Material Design Guidelines`](https://material.io/design/guidelines-overview) and we mainly used [`Material UI React Components`](https://material-ui.com/).

# Get started
* Download the project
* Install packages: run `npm install`
* Run project: run `npm start` 
* Open it in you browser: go [`here`](http://localhost:3000). The app has been tested in Google Chrome.

# Milestone 2: Low-Fi Prototyping - E-valuation

## Storyboards
<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M2/storyboard.jpg"> \
a. We chose this storyboard because of its ability to represent the set of actions done by the teacher at home while he/she is selecting homework, uploading them on our platform, and then receiving feedback and solutions from students. In this way, teachers can track which students have sent back their homework solutions. The main used device is a smartphone. 

b. Strengths and weaknesses
* Strengths: in this storyboard is clear that the user is a teacher. The location of the story is the teacher's home, we can notice the interaction with the system takes place in different rooms and timings of the day. Furthermore, the user's needs for the project are satisfied.
* Weakness: the way students and teacher interact are not well defined, for this aspect we can refer to the paper prototypes reported below. 

c. The goals of the project are satisfied: 
* Teacher can send his/her students homework in a suitable way for the homework itself: in this case, for example, Math teacher creates new exercises writing on a notebook and then he takes a picture of them. 
* Teacher can read comments written by students about homework whenever he can and clarify students' doubts. He is satisfied seeing students can complete their homework after his hint. 

## Paper Prototypes
Now we start analyzing two paper prototypes to satisfy the project description. Both prototypes are in a smaller format compared to a smartphone's screen to make them fit in an A4 sheet paper.

### Prototype 1
<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M2/prototype_1.jpg">

Every screen of the prototype has a header: in which there is a title, the name of the page the user is in. Next to the title, there is a back button except for the homepage.
* 1.1 Homepage: an overview of classes and related subjects: these elements are preloaded in the system and the user cannot modify them. Clicking on an item on the list, we can move to screen 1.2. 
* 1.2 Class and subject page: an overview of homework assigned. They are represented with a box with their characteristics: a little preview, the title, and the Expiry date. Each homework can be edited (a screen similar to 1.3 with the title "Edit homework" will be shown) or deleted with the icons reported on the box. On the bottom of the page, there is a fab for creating the homework, which leads to screen 1.3. Furthermore clicking on the homework, we move to screen 1.5.
* 1.3 Homework creation: the homework can be uploaded as a picture by clicking on the camera icon on the right. On the left of this icon, we have one text field for the "Title" and a date field for the "Expiry Date". At the bottom of the page, there are two buttons for confirming (left) and canceling (right) the action.
* 1.4 Comments section related to homework: in the sub-header, we can see some information about the homework: title, Expiry date, preview. All the students supposed to send their solution can interact in the homework chat with a text or voice message. The bottom navigation allows switching between this section and the list of solutions provided by students (screen 1.5). The name of the selected section is highlighted.
* 1.5 List of students’ solutions related to homework: the sub-header and the button navigation is equivalent to the previous screen (1.4). It’s possible to visualize the list of solutions provided by the students. Each solution is represented as a box containing the student's name, sending date, and a short preview. Clicking on a solution it's possible to move to screen 1.6.
* 1.6 Individual homework view: in the header, we can see the homework title and the name of the student who sent it, then we have a box showing the homework and an icon to the bottom right to download it.


### Prototype 2
<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M2/prototype_2.jpg">

 * 2.1 Homepage: an overview of last messages in the private chats as a scrolling list. The student's photo, the object of the question and possibly a badge are shown. By clicking on an item, we can move to screen 2.2. On the left side, a hidden sidebar can be clicked to move to screen 2.3. 
 * 2.2 Chat: on the top, the same information of screen 2.1 is presented (student's photo and object of the question) and the whole student's question is readable. At the bottom right, a microphone icon allows the teacher to reply with an audio note. By clicking on the back button we move to 2.1.
 * 2.3 Sidebar containing classes and subjects: list of all the preloaded classes and relative subjects. By clicking an item, we move to screen 2.4. The back button brings you back to screen 2.1.
 * 2.4 Individual class and subject page: an overview of homework assigned. The header contains information about the class and subject. Homework is shown as a list and identified with their title. At the bottom right of the page, there is an icon for creating the homework, which leads to screen 2.6, while clicking on the homework, we move to screen 2.5. The back button brings you back to screen 2.1.
 * 2.5 List of students: list of all the students enrolled in a class/subject. The header contains information about the class and subject. A the top the title of the homework is shown, while the list of students is presented as a table with the student's name and an icon highlighting if the student sent the homework or not. By clicking the row of a student who sent the homework, we move to screen 2.7, while the back button leads to 2.4.
 * 2.6 Homework creation: the header contains information about the class and subject. The homework can be uploaded both as a file (top box) or as a picture (bottom box). The back button leads to screen 2.4. 
 * 2.7 Individual homework view: in the header, we can see the information about the class and subject, while at the top is shown the name of the student who sent the homework. The page contains the homework sent and the back button brings you back to screen 2.5.

Both prototypes are linked to the storyboard in the following ways: 
 * In pictures 1.3 and 2.6, the teacher can create homework handed into students, math homework could be created following the actions reported in the storyboard.
 * In pictures 1.4 and 2.2, the teacher can communicate with students to help them, like in the last two sketches of the storyboard.
 * In pictures 1.5 and 2.7, the teacher can check the solutions published by the students.
 
To satisfy the project goals, both prototypes follow different ways: 
* Interaction between the teacher and the students:
  * global interaction with all students dealing with the same homework in prototype 1;
  * single interaction student-teacher not related to a single homework in prototype 2.
 
* Solution check:
  * focus on the ascendant chronological order of the solutions in prototype 1;
  * focus on the whole class, highlight who has and who has not delivered the homework in prototype 2.
 

## Selection Rationale
Prototype 1:
* PROs:
    * Intuitive navigation respecting the material design guidelines;
    * Tree organization of the homework (Subject and Class, Homeworks, List of solutions);
    * The homework can be uploaded with a title and an expiry date.
    * A single solution can be downloaded locally;
    * Each homework can be modified or deleted;
    * The public chat is useful when several students have the same doubt.


* CONs:
    * The only format permitted for the homework is a single picture;
    * Global interaction between all students, questions overtime can be repeated because people do not read all the past messages;
    * If the teacher wants to check who has not sent a solution, he/she has to do it manually because the student list of a specific class is missing.

Prototype 2:
* PROs:
    * Tree organization of the homework;
    * The homework could be a file or a photo taken with the camera;
    * Teacher can easily check who has sent the homework and who has not, thanks to a list of the students attending the class;
    * Private chat with each student and the possibility to give explanations through vocal messages to have a direct interaction;
    * A good organization for the questions related to the chance to insert an object and a corpus.  

* CONs:
    * Private chats are not grouped by class and subject as the homework;
    * A single solution cannot be downloaded;
    * The title is given by the document name uploaded and there is no possibility to choose the expiry date.

Final changes: \
As a baseline, we choose prototype 1. After analyzing both PROs and CONs of both prototypes, prototype 1 has more PROs and the good features present in prototype 2 can be integrated. Starting from propototype 1, we include the following features:
* Possibility to upload a file (prototype 2) or more than one picture (new feature based on prototype 1 and prototype 2).
* Student table related to a single homework, there is a compact list containing the name of the students, an indicator if the homework was sent (prototype 2), and possible the date sent. 
* A button in the header to go back to the homepage.
* A tag for a specific topic to label questions in the chat in order to avoid repetitions (new feature).  

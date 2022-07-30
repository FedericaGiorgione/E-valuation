# Milestone 3: Wireframe and Heuristic Evaluation - E-valuation

## Wireframe
<!-- [Add here the link to the PDF documents, or embed the images, that represent your wireframe. Briefly explain which tool you used to create the wireframe, any relevant decision you took starting from the outcome of M2, and describe in short the navigation among pages (with a picture or in text).] -->

### Objective of the milestone

In this Milestone we'll analyze the creation and the evaluations of our wireframe, starting from the final version of our paper prototype explained in Milestone 2. Our wireframe has been developed using an apposite tool called Figma which is a collaborative platform to create wireframes and prototypes starting from scratch.  
The actions allowed can be divided in two big groups:
* *Design*: let you create different frames to define the suitable UI element for your interface;
* *Prototype*: allows you to create the flows between the frames you created in the previous passage, adding costumazible animations. 

### Revise the outcome of milestone 2

Starting from the final changes reported in milestone 2, we have not introduced any new relevant features during the development of the wireframe.

### Wireframe description
To analyze our wireframe deeply, we've splitted it into five parts, according to the tasks used in the evaluation phase (next section). A global overview of the wireframe would be too confusing. Moreover, we've redrawn the flows to have more flexibility and a nice visualization.

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/tasks/task1.png">

Task 1: Open *homework 1* in the class *Physics 3F* and visualize the students who send their solutions. Visualize the solution of one student and download it.   
To fullfill this task, the user should click *Physics 3F* button, then *Homework 1* one. This will lead him/her to a new screen where the list of the students is shown with the delivery date of the homework; the user now can visualize single student's solution clicking on the entire row, if the delivery date and the icon are present, and can download it clicking on the download button.  
To improve the readability, the links to the homepage (first page) are never shown, but they all are possible clicking on the home icon on the top right. Note that the pages on the right are the equivalent of the previous page where you were but with a temporary snackbar. On Figma we had to duplicate the page adding the snackbar, this explains why we disabled all the links of the last pages.

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/tasks/task2.png">

Task 2: Check the messages related to a single topic inside  *homework 1* in the class *Physics 3F*.  
After accessing to *Homework 1* in the *Physics 3F* section in the way that's explained in task 1, user can click on the bottom-right corner to get into "Comment" section. Here a message with istructions on how to use the topics filter is given. After reading it, user can click on the *Topics* icon and visualize a list of all the topics (#) of the single homework he/she's dealing with. Selecting one of this topics, user can visualize all the messages related to the topic itself.  
To improve the readability of the flows, orange and green arrows are used to highlight, respectively, the links to the homework page (third page) and the comments page (fourth page). Homepage links are omitted too.

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/tasks/task3.png">

Task 3: Delete *homework 1* in the class *Physics 3F*.  
After accessing to *Homework 1* in the *Physics 3F* section in the way that's explained in task 1, user should click on the trashbin icon. After that, a message in which confirmation for deleting is required. User can select "Cancel" or "Delete" button. If the former is selected, user will be lead to the previous screen, otherwise, if the latter is selected, the homework is deleted and a list of all  *Physics 3F* homework without Homework 1 is shown.  
The last page is the equivalent of the second one, but without the deleted homework and with a temporary snackbar that advises the removal has been successfully completed.


<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/tasks/task4.png">

Task 4: Create a new homework in the class *Physics 3F*.  
From the *Physics 3F* page, user can click to the "+" icon to create a new assignment. A screen where he/she is supposed to insert all the necessary information is shown. Orange arrows are used to highlight the link to the cancel page. The *No* in the cancel page allows you to come back to the previous page, the one from which you clicked the cancel button (the arrows are omitted to make it readable). Because of the huge number of different screens we had already designed, the background of the cancel page shows the fields empty, but in the final project, the already filled fields will be shown. Moreover, in the final implementation, you will be allowed to fill the fields in the order you prefer. The page on the right is the equivalent of the second on the left but with the homework preview changed. The temporary snackbar advises you of the successful uploading.  
When you try to confirm the homework creation but not all the fields are filled, an error screen is generated. These arrows are highlighted with a different color (pink). In order to avoid the creation of a screen for each of the possible combinations of mistakes (eg, confirm without an expiry date, confirm without a title and an attachment) on Figma, we are using a single page that deletes all the filled in fields. In the final implementation, we'll consider all the possible errors and no field will be deleted.

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/tasks/task5.png">

Task 5: Delete the attachment in the homework you've just created and add a new one.  
Delete the attachment in the homework you've just created and add a new one. To make evident how this process is done, not all the flows are shown. For examples, the link from the cancel button is never shown, such as the homepage link. Moreover, the third page of the central row is duplicated on the top because we are considering the case in which you decide to attach a new file/photo and then delete the first attachment. In this way the flow is linear and easy to understand from the picture. The last page on the right is the equivalent of the second one, with the homework preview changed and a temporary snackbar.




## Heuristic Evaluation
<!-- [Describe here the heuristic evaluation you received. In particular, report your preparation of the heuristic evaluation: which material you used (with links and/or pictures). Then, briefly summarize how the heuristic evaluation was conducted by the facilitator, by including 1-2 photos/screenshots from those taken by the facilitator for each evaluation. Include the evaluation result from the evaluators (please mention which group helped you), for example as a link to the on-line spreadsheet.
Finally, write a non-trivial list of potential changes that your team plans to implement and justify each change by explaining which piece of feedback generates it.] -->

### Preparation of the heuristic evaluation

Before the evaluation phase, our group has written down a brief description of the application and a set of tasks. These tasks are the ones we've given to the evaluators to let them explore the functionalities of our system fully. 

We report here the list of the tasks explained in the previous section.
* Task 0: We give you a few minutes to explore the application.
* Task 1: Open *homework 1* in the class *Physics 3F* and visualize the students who send their solutions. Visualize the solution of one solution e download it. 
* Task 2: Check the messages related to a single topic inside  *homework 1* in the class *Physics 3F*.
* Task 3: Delete *homework 1* in the class *Physics 3F*.
* Task 4: Create a new homework in the class *Physics 3F*. 
* Task 5: Delete the attachment in the homework previously created and add a new one. 

The material used for the preporation is the figma prototype and the google sheet to collect the evaluations. These links are reported and explained in the next section.

### Description of the evaluation process
<!-- descrivere come sono andate le evaluation e aggiungere foto/screens -->

Once we have defined the tasks for the evaluators, we are ready to receive the heuristic evaluations. We have sent the link of our interactive wireframe and a google sheet to fill in with the issues to our evaluators. The file structure and the link are reported in the next section. \
The interactive wireframe is automatically generated by Figma after the creation of all the pages and flows, it can be found [`here`](https://www.figma.com/proto/Suzje5PL87PZelo5VrHe1Q/wireframe?node-id=1%3A5&scaling=scale-down). This tool let our evaluators test the wireframe as it was a real application, the pointer simulate a natural interaction with a touch screen. \
Some screenshoots showing how it works are reported below.
<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/prototype_evaluation.png">
In the end,two members of the group **My district** and two from **Festogether** evalueted our wireframe. All the evaluations took place on videoconference. We've asked the evaluator to open our wireframe and to share the screen to see all the actions performed in order to achieve the tasks.

Brief descriptions of how the evaluations were performed are provided below.

The facilitator greets the evaluator and provides her/him the links needed to perform the evaluation: the prototype and the sheet to fill with the issues found. Then a brief introduction to our project is given. After few minutes of free exploration of our application, the facilitator reads the tasks one by one and the observer takes notes of how the evaluator fulfills them.

The different roles (facilitator, observer, evaluator) were divided in the following way among the team members:
* Evaluations received by the group My district:
  * Evaluation 1: Daniele Salaris as Facilitator, Silvia Giammarinaro as Observer;
  * Evaluation 2: Daniele Salaris as Facialitator, Silvia Giammarinaro as Observer.

* Evaluations performed to the project My district: Federica Giorgione and Valerio Zingarelli as evaluators.

* Evaluations received by the group Festogether. Both evaluations were recorded and we asked for the permission to both evaluators.
  * Evaluation 3: Daniele Salaris as Facilitator, Federica Giorgione as observer;
  * Evaluation 4: Silvia Giammarinaro as Facilitator, Valerio Zingarelli as observer.
  

* Evaluations performed to the project Festogether: Federica Giorgione and Daniele Salaris as evaluators.

Here we report some photos taken from the evaluations: they are ordered from Evaluator 1 to Evaluator 4.

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/evaluators_screen/evaluator1.png">

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/evaluators_screen/evaluator2.png">

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/evaluators_screen/evaluator3.png">

<img src="https://github.com/polito-hci-2020/e-valuation/blob/main/M3/evaluators_screen/evaluator4.png">



### Evaluation results
We collected the evaluations from both teams in a google sheet file, which is located [`here`](https://github.com/polito-hci-2020/e-valuation/blob/main/M3/heuristics_evaluation.xlsx).
 
In the file we created the following tabs:
* Tab *overview*: reference to the Nielsen's Heuristics;
* Tabs *Evaluator 1, Evaluator 2, Joint Evaluation 1-2*: single and joint evaluations collected from group *My district*;
* Tabs *Evaluator 3, Evaluator 4, Joint Evaluation 3-4*: single and joint evaluations collected from group *Festogether*.

### Potential changes to the project
<!-- aggiungere considerazioni finali -->

In the end, we identified some changes to implement. Basing on received feedbacks, we decided to make the following changes:
* Based on issue 4 from joint evaluation 3-4 and on the other two observations with tester 1 and tester 2, we noticed the topic feature of the chat was misleading. So we decided to remove the topics from the messages because it is not a fundamental part of our project. In addition to this, we want to underline this feature is not an answer to the project goals we defined in milestone 1, it is just an additional function.
* Based on issues 2 from joint evaluation 1-2, we decided to redesign attachments in the creation/edit homework form. Furthermore, the observers noted the other two evaluators were confused by the design of the attachment box. We decided to remove such a box and to substitute it with a fab containing a paper clip icon at the bottom of the page. This button allows the user adding new photos from the camera, gallery, or files from the file system. Furthermore, when a new attachment is uploaded, the preview gets largerand the page becomes scrollable. So we agreed to remove the side arrows too, which misled the evaluators.
* Based on issues 7, 8 from joint evaluation 1-2 and issue 6 from joint evaluation 3-4, we will add a documentation page where user can access using an help icon on the homepage.
* Based on issue 5 from joint evaluation 1-2, the section "Homework" in the bottom navigation inside the single homework will be renamed "Papers". 

Some little navigation issues (issue 4 from joint evaluation 1-2, issue 1 from joint evaluation 3-4) were related to our wireframe flow: for every possible action, we reported one example. Anyway, we plan to include all the possible actions available in our final project. 

The issue 3 from joint evaluation 3-4 was related to the creation of the classes. We think this part can be managed by the school administration.

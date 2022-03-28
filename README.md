In my final project for the Practicum program, I have created a web application for searching news items and a collection for storing the items you liked.


The client side application was written in React and used Routes, Context for managing states, protected routes, auth via jwt token and local storage for storing this token.
Only a registered user can save the items he searched, and the user can see a summery of his collection (Wich search key words were used the most among his saved items)
The user auth and all the saved items data is stored and manipulated on a Rest API that I have built, while the searching for news is done with a third party API.

The Rest API was written in Node.js (express.js) and used MongoDB as the database. This Rest API contains middlewares, controllers. custom validators, auth via jwt token and error handlers.

The project was deployed to a virtual machine On azure microsoft cloud.

link to the deployed project - https://iliyaa7-final-project.students.nomoreparties.sbs/

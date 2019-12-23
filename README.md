# Code challenge

## Description

This is a test to asses your competence in JavaScript.

## 1. Coding exercise

Implement, using plain ES5 JavaScript (ES6+ not allowed) or jQuery, a very simple TODOs list application that runs in the browser without any backend. 

The UI will be a simple form composed of one text field and one “submit button” and a list of DIVs each of which will contain a todo.

Here are the main use cases:

1. The user can fill in the form and press “Submit”. As a result the new TODO will be added to the list.
2. If the user submit an empty TODO an error message will appear.
3. The user can click on each TODO and hence toggle its state (done VS not done). This should be reflected in a visual clue.
4. The user can delete a TODO by pressing some icon contained in the TODO element.
5. *Bonus use case*: the application should have some form of state enforced using the browser modern capabilities.
6. *Bonus use case*: the application should be able to offer some form of pagination for the TODOs.
7. *Bonus use case*: the application should offer some free text filtering of the TODOs.

## 2. Testing exercise

Please set up a unit testing infrastructure that allows to test the code you have created during step 1.

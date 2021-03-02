# projects-notebook [Live](https://hootdunk.github.io/projects-notebook/)

## Demo
![Todo-App](https://user-images.githubusercontent.com/58009556/109590198-27d5ab00-7ad1-11eb-99e4-a3c56c7cf80b.gif)

## About
Tools used: HTML, CSS, JavaScript, Webpack, Date-fns

When making this app, I tried to focus on seperation of concerns and the single responsibility principle.  Webpack allowed me to create modules and further separate the code based on the function it provided. render.js is where, you guessed it, functions that affect the visual display of the DOM live.  logic.js houses all functions that manage and affect the applications data.  events.js is where the two come together.  As an example, when a user clicks a button, the event listener triggers a function to change the data, and when the data is changed a re-render is triggred which now reflects this change. 

This app was a really great learning experience.  I'm really grateful that The Odin Project introduced the SOLID design principles and demonstrated the application of these principles in a JavaScript context.  Had I not been exposed to them, the code would not have been as easy to work with or as organized.








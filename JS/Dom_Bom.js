// The DOM (Document Object Model) is a programming interface provided by browsers that represents the structure of an HTML or XML document as a tree of objects.
// It allows JavaScript (and other languages) to read, manipulate, and modify the content, structure, and style of a webpage dynamically.

// E.g 

// HTML Representation

// <!DOCTYPE html>
// <html>
//   <head><title>Page Title</title></head>
//   <body>
//     <h1 id="main-heading">Hello DOM</h1>
//     <p class="text">This is a paragraph.</p>
//   </body>
// </html>

// DOM Representation

// Document
// └── html
//     ├── head
//     │   └── title
//     └── body
//         ├── h1#main-heading
//         └── p.text

// Each element is a node in this tree

// Types of node - 
// 1) Element Node
// 2) Text Node
// 3) Attribute Node
// 4) Comment Node

// What can we do by using DOM

// 1) We can access Element
// 2) We can set new attributes
// 3) We can modify the Content
// 4) Add and remove element
// 5) Change css styles dynamically
// 6) Add remove event listeners

// E.g 1) 
const heading = document.getElementById('main-heading');

// E.g 2)
heading.textContent = "new content"

// E.g 3)
heading.style.color = "blue"

// E.g 4)
heading.addEventListener('click', ()=>{
    alert("event clicked")
})

// 1. Parent / Child / Sibling
const container = document.getElementById('container');

console.log(container.parentElement); // <body>
console.log(container.children);      // [h1, p]
console.log(container.firstElementChild); // <h1>
console.log(container.lastElementChild);  // <p>

// -----------------------------------------------------  BOM -------------------------------------------------------

// The BOM (Browser Object Model) is a set of objects provided by the browser to interact with the browser window and environment, outside the content of the webpage (DOM).
// Objects provided by BOM

// 1) Window
console.log(window.innerWidth); // Width of the viewport

// 2) Browser History
history.back();   // Go back one page
history.forward(); // Go forward

// 3) Location
console.log(location.href);   // Get current URL

// 4) Navigator
console.log(navigator.userAgent);   // Info about browser & OS

// 5) Screen Details
console.log(screen.width, screen.height); // Screen resolution

// 6) Set time out and set interval - They are the part of the browser not native js.

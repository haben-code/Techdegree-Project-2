/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


//Creates an element
function createElement(elementName, property1, property2, value1, value2) {
   const element = document.createElement(elementName);  
   element[property1] = value1;
   if (property2) {
      element[property2] = value2;
   }
   return element;
}

//Adds element to choosen node
function appendThis(element, toThisNode) {
   toThisNode.appendChild(element);
   return element;
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const itemsPerPage = 9;
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = (page * itemsPerPage);
   const studentList_UL = document.querySelector('.student-list');
   studentList_UL.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
	if (i >= startIndex && i < endIndex) {
		const student = list[i];
		const li = createElement('li', 'className', null, 'student-item cf', null);

		//Adds students detials to the student-details div element
		const studentDetails_DIV = appendThis(createElement('div', 'className', 'student-details'), li);
		appendThis(createElement('img', 'className', 'src', 'avatar', `${student.picture.large}`), studentDetails_DIV);
		appendThis(createElement('h3', 'textContent', null, `${student.name.first} ${student.name.last}`, null), studentDetails_DIV);
		appendThis(createElement('span', 'className', 'textContent', 'email', `${student.email}`), studentDetails_DIV);

		//Adds student detials to the joined-details div 
		const joinedDetails_DIV = appendThis(createElement('div', 'className', null, 'joined-details', null), li);
		appendThis(createElement('span', 'className', 'textContent', 'date', `${student.registered.date}`), joinedDetails_DIV);

		studentList_UL.insertAdjacentElement("beforeend", li);
	}
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   const buttons = list.length / 9;
   const linkList_UL = document.querySelector('.link-list');
   linkList_UL.innerHTML = '';
   for (let i = 0; i < buttons; i++) {
      const li = document.createElement('li');
      appendThis(createElement('button', 'type', 'textContent', 'button', `${[i+1]}`), li);
      linkList_UL.insertAdjacentElement('beforeend', li);
   }
   linkList_UL.querySelectorAll('button')[0].className = 'active';
   linkList_UL.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         const pageNumber = e.target.textContent;
         showPage(list, pageNumber)
			//Changes each buttons className to a empty string
			//and changes the current button being clicked className to 'active'
         for (let i = 0; i < buttons; i++) {
           e.target.className = 'active';
           linkList_UL.querySelectorAll('button')[i].className = '';
         }
      }
   });
}


/*
Creates a search box to dynamically seach for students by
individual letters, group of letters, or first name
and displays a no result message for students that do not
exist within the directory
*/
const label = createElement('label', 'for', 'className', 'search', 'student-search');
appendThis(createElement('span', 'textContent', null, 'Search by name', null), label);
appendThis(createElement('input', 'id', 'placeholder', 'search', 'search by name...'), label);

const button = createElement('button', 'type', null, 'button', null);
appendThis(createElement('img', 'src', 'alt', 'img/icn-search.svg', 'Search icon'), button);
appendThis(button, label);

document.querySelector('h2').insertAdjacentElement('afterend', label);

label.addEventListener('keyup', (e) => {  
   const matchedStudents = [];
   for (let i = 0; i < data.length; i++) {
      const student = data[i];
      const studentsName = student.name.first.toUpperCase() + ' ' + student.name.last.toUpperCase();
      const whatIsBeingTypedIn = e.target.value.toUpperCase();
      if (studentsName.includes(whatIsBeingTypedIn)) {
            matchedStudents.push(student);
            showPage(matchedStudents, 1)
            addPagination(matchedStudents);
      } else if (!matchedStudents.length){
         const noResults_UL = document.querySelector('.student-list');
         const clearLinklist_UL = document.querySelector('.link-list')
         noResults_UL.innerHTML = 'No Results';
         clearLinklist_UL.innerHTML = '';
    }
   }
});

//Call functions
showPage(data, 1);
addPagination(data);

/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

//Creates a element
function createElement(elementName, property1, property2, value1, value2) {
   const element = document.createElement(elementName);  
   element[property1] = value1;
   if (property2) {
      element[property2] = value2;
   }
   return element;
}

//Appends a element to desired node
function appendThis(element, toThisNode) {
   toThisNode.appendChild(element);
   return element;
}

/* 
	Retrieves student data and creates a list of students
	and then displays those student's detials
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
         showPage(data, pageNumber)
			//Changes each buttons className to a empty string
			//and changes the current button being clicked className to 'active'
         for (let i = 0; i < buttons; i++) {
           e.target.className = 'active';
           linkList_UL.querySelectorAll('button')[i].className = '';
         }
      }
   });
}

// Call functions
showPage(data, 1);
addPagination(data);

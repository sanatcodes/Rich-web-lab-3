const contactName = document.querySelector('.contact-name');
const mobileNumber = document.querySelector('.mobile-number');
const email = document.querySelector('.email');
const addContactBtn = document.querySelector('.add-contact-btn');

const searchBar = document.querySelector('.search-bar');
const table = document.querySelector('.contacts-table')
const errorBox = document.querySelector('.error');
const warningBox = document.querySelector('.warning');


const nameBtn = document.querySelector('.name-btn');

let contacts = [];
let id = 0;
let toggle = true;

function Contact(id, name, mobile, email) {
    this.id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
}

//display contacts contacts
document.addEventListener('DOMContentLoaded', () => {
    contacts = localStorage.getItem('contacts') === null ? 
    [] : JSON.parse(localStorage.getItem('contacts'));
    displayContacts();
})

function displayContacts(array = contacts) {
    table.innerHTML = '';
    array.forEach(function(singleContact){
        displayList(singleContact);
    });
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toString();
    const filteredList = contacts.filter((contact) => {
        let numberAsString = contact.mobile.toString();
        return contact && numberAsString.indexOf(searchString) !== -1;
    })
    filteredList.length !== 0 ? (displayContacts(filteredList), warningBox.style.display = 'none'): warningBox.style.display = 'block';
    
    
})


nameBtn.addEventListener('click', () => {
    const unSortedList = [...contacts];
    if(toggle === true){
        contacts.sort((a, b) => {
            if(a.name > b.name){
                return 1;
            } else {
                return -1;
            }
        });
        table.innerHTML = '';
        displayContacts();
        toggle = false;
    } else {
        contacts.sort((a, b) => {
            if(a.name < b.name){
                return 1;
            } else {
                return -1;
            }
        });
        table.innerHTML = '';
        displayContacts();
        toggle = true;
    }
    
})

function sortList(){
    contacts.sort((a, b) => {
        if(a.name > b.name){
            return 1;
        } else {
            return -1;
        }
    });
    table.innerHTML = '';
    displayContacts();
}


addContactBtn.addEventListener('click',()=>{
    const name = contactName.value;
    const number = mobileNumber.value;
    const emailId = email.value;

    if(nameValidation(name) && numberValidation(number) && emailValidation(emailId)){
        errorBox.style.display = 'none';
        id++;
        const contact = new Contact(id, name, number, emailId);
        console.log(contact);
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        contactName.value = "";
        email.value = "";
        mobileNumber.value = "";
        displayList(contact);
        
    } else {
        errorBox.style.display = "block";
    }
})

function displayList(contact) {
    const newContact = document.createElement('tr');
    newContact.classList.add('contact-element');
    newContact.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.mobile}</td>
        <td>${contact.email}</td>
    `
    table.appendChild(newContact);
}

// Input field validation
function nameValidation(inputArr){
    if(inputArr.length > 20){
        return false;
    } 
    isValidName = /^[a-zA-Z\s]*$/g;
    return isValidName.test(inputArr);
}

function numberValidation(inputArr){
    if(inputArr.length > 10){
        return false;
    } 
   isValidNumber = /\d+/g
   return isValidNumber.test(inputArr);
}

function emailValidation(inputArr){
    if(inputArr.length > 40){
        return false;
    }

    isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return isValidEmail.test(inputArr);

}

// function getContacts() {
//     return JSON.parse(localStorage.getItem('contacts') || "[]");
// }

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

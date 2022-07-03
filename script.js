const tableBody = document.querySelector(".table-body")
const submitBtn = document.querySelector(".submit-btn")
const notiSec = document.querySelector(".noti-sec")
const deleteBtnContainer = document.querySelector(".delete-btn-container")
const table = document.querySelector(".table")

// variables
// to check if the data has added to local storage or not needed for notification function
isAdded = false

// Function to render the table rows first time as the script loads
function render(){
    if(localStorage.length != 0){
        let localData = JSON.parse(localStorage.getItem("data"))
        for(i=0; i< localData.length; i++){
            let tableRow = `<tr class="data-row" id="${i}">
                <td>${localData[i].name}</td>
                <td>${localData[i].contact}</td>
                <td>${localData[i].email}</td>
                <td><button class="del-btn">Delete</button></td>
                </tr>`
                tableBody.innerHTML += tableRow
        }
    }
}

// rendering the table rows
render()

// checking if deleting
deleteTableRow()

// making the local storage a list
if(localStorage.length === 0){
    localStorage.setItem("data", "[]")
}

// adding event listener to submit button
submitBtn.addEventListener("click", function(e){
    e.preventDefault()
    // input elements
    const nameData = document.querySelector("#name")
    const contactData = document.querySelector("#contact")
    const emailData = document.querySelector("#email")
    const localStorageData = JSON.parse(localStorage.getItem("data"))
    // Checking whether the values of the input is there
    if(nameData.value.length != 0 && contactData.value.length != 0 && emailData.value.length != 0){
            const dataToStore = {
                "name":nameData.value,
                "contact":contactData.value,
                "email":emailData.value
            }
            // adding the input values to local storage list
            localStorageData.push(dataToStore)
            // adding the local storage list to local storage
            localStorage.setItem("data", JSON.stringify(localStorageData))
            // successfully added data to local storage
            isAdded = true
            // adding/rendering the input values in table rows
            addData()
            // notification
            notification()
            // delete row
            deleteTableRow()
            // clear input fields
            clearInput(nameData, contactData, emailData)
    }else{
        isAdded = false
        notification()
    }
})

// Add function to add input values into table rows
function addData(){
    // Getting the list from the local storage
    let localData = JSON.parse(localStorage.getItem("data"))
    // making table row
    // Using localData.length-1 as index to pull the last element in the local storage list
        let tableRow = `<tr class="data-row" id="${localData.length-1}">
            <td>${localData[localData.length-1].name}</td>
            <td>${localData[localData.length-1].contact}</td>
            <td>${localData[localData.length-1].email}</td>
            <td><button class="del-btn">Delete</button></td>
            </tr>`
            // finally rendering the row
            tableBody.innerHTML += tableRow
    }


// popup message function whether the data has been added successfully or not
function notification(){
    if(isAdded){
        notiSec.innerHTML = "Added successfully!"
        notiSec.style.backgroundColor = "green"
    }else{
        notiSec.innerHTML = "All fields required"
        notiSec.style.backgroundColor = "red"
    }
    // disappear the notification after 1 sec
    setTimeout(function(){
        notiSec.innerHTML = ''
        notiSec.style.backgroundColor = null
    }, 1000)
}

// clearing the input fields after the data added successfully
// the arguments are there to pass the input elment to remove value from
function clearInput(name, contact, email){
    name.value = ''
    contact.value = ''
    email.value = ''
}

// delete function 
// adding event listener to the table 
// not adding to the button itself because the button is dynamically generated and cannot be listened
function deleteTableRow(){
    table.addEventListener("click", function(e){
        // we want to get event form only the element where there is del-btn class
        if(e.target.classList.contains('del-btn')){
            // e.target is button because it has del-btn class only delete button has this class
            const btn = e.target

            // row id of the element to be deleted
             let rowId = btn.closest("tr").id

            // finding the closest table row or parent row and removing it from the render only not from the local storage
            btn.closest("tr").remove()

            // ******** DELETING FROM LOCAL STORAGE SECTION ********
            // getting the local storage list
            const localStorageData = JSON.parse(localStorage.getItem("data"))
            // removing data from list using rowId as index because the rowid and localstorage index are same value
            localStorageData.splice(rowId, 1)
            // adding the data list back to local storage after removing the object we wanted
            localStorage.setItem("data",JSON.stringify(localStorageData))
        }
    })
}

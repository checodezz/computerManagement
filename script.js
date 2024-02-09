const inputForm = document.querySelector('#inputForm');
const apiUrl = "https://computer-backend-student-neog.replit.app/computers";
const alertMsg = document.querySelector('#alertMsg');

inputForm.addEventListener('submit', function (event) {
    event.preventDefault()
    // console.log("clicked me");
    alertMsg.style.display = 'block';
    alertMsg.className = 'alert alert-primary';
    alertMsg.textContent = "Adding Data...."

    const nameInput = document.querySelector('#nameInput');
    const quantityInput = document.querySelector('#quantityInput');
    const categoryInput = document.querySelector('#categoryInput');
    const dateInput = document.querySelector('#dateInput');

    const newComputerObj = {
        name: nameInput.value,
        quantity: quantityInput.value,
        category: categoryInput.value,
        manufactureDate: dateInput.value
    }
    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newComputerObj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            inputForm.reset();
            console.log(data);
            alertMsg.style.display = 'block';
            alertMsg.className = 'alert alert-success';
            alertMsg.textContent = "Computer added successfully....";
        })
        .catch(function (error) {
            console.log("Error", error);
            alertMsg.style.display = 'block';
            alertMsg.className = 'alert alert-danger';
            alertMsg.textContent = "Oops unable to add data, Please try again!....";
        })

})
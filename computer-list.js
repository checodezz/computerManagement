const unorderedList = document.querySelector('#unorderedList');
const apiUrl = "https://computer-backend-student-neog.replit.app/computers";
const dataStatus = document.querySelector('#dataStatus');
const alertMsg = document.querySelector('#alertMsg');
const categoryFilter = document.querySelector('#categoryFilter');

function getComputersData() {
    unorderedList.innerHTML = '';

    alertMsg.style.display = 'block'
    alertMsg.textContent = "Loading data...";

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data) {
                alertMsg.style.display = 'none';
                generateListItems(data);
                applyCategoryFilter(data);
                deleteButton();

            }
        })
        .catch(function (error) {
            console.log("Error", error);
            alertMsg.style.display = 'block';
            alertMsg.className = 'alert alert-danger'
            alertMsg.textContent = "Unable to fetch data...";
        })
}

getComputersData()

function generateListItems(data) {

    unorderedList.textContent = '';

    for (let i = 0; i < data.length; i++) {
        const listElement = document.createElement('li');
        listElement.className = 'list-group-item';
        listElement.innerHTML = `${data[i].name} - Quantity: ${data[i].quantity} - Category: ${data[i].category} - Manufacture Date: ${data[i].manufactureDate} <button class="btn btn-danger d-flex float-end" data-id="${data[i]._id}" id="deleteBtn">Delete</button>`
        unorderedList.appendChild(listElement)
    }
}


function deleteButton() {

    const deleteBtn = document.querySelectorAll('#deleteBtn');

    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function (event) {
            deleteElementId = event.target.getAttribute('data-id');
            console.log(deleteElementId);

            const deleteBtnUrl = `${apiUrl}/${deleteElementId}`
            // console.log(deleteBtnUrl);

            fetch(deleteBtnUrl, {
                method: "DELETE"
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    getComputersData();
                })
                .catch(function (error) {
                    console.log('Error', error);
                })
        })

    }
}



function applyCategoryFilter(data) {

    categoryFilter.addEventListener('change', function () {

        const selectedValue = categoryFilter.value;
        const filteredData = [];
        console.log(selectedValue);

        if (selectedValue === 'all') {
            getComputersData();
        } else {
            for (let i = 0; i < data.length; i++) {
                if (selectedValue === data[i].category.toLowerCase()) {
                    filteredData.push(data[i])
                }
            }
        }
        unorderedList.innerHTML = '';
        generateListItems(filteredData)
    })
}
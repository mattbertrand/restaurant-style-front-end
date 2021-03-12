let restaurants = []
const baseUrl = 'http://localhost:3000'

function main() {
    return document.getElementById("main")
}

function nameInput() {
    return document.getElementById("name")
}

function cityInput() {
    return document.getElementById("city")
}

function form() {
    return document.getElementById("form")
}

function formLink() {
    return document.getElementById("form-link")
}

function restaurantsLink() {
    return document.getElementById("restaurants-link")
}

function getRestaurants() {
    fetch(baseUrl + '/restaurants')
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        restaurants = data
    })

    renderRestaurants()
}

function resetInputs() {
    nameInput().innerHTML = ""
    cityInput().innerHTML = ""
}

function resetMain() {
    main().innerHTML = ""
}

function formTemplate() {
    return `
    <h3>Add A Restaurant</h3>
        <form id="form">
            <div class="input-field">
                <label for="name">Name</label>
                <input type="text" name="name" id="name">
            </div>
            <div class="input-field">
                <label for="city">City</label>
                <input type="text" name="city" id="city">
            </div>
            <input type="submit" value="Add Restaurant">
        </form>
    `
}

function restaurantsTemplate() {
    return `
    <h3>List of Restaurants</h3>
       <div id="restaurants"></div>
    `
}

function renderRestaurant(restaurant) {
    let div = document.createElement("div")
    let h3 = document.createElement("h3")
    let h4 = document.createElement("h4")
    let editLink = document.createElement("a")
    let deleteLink = document.createElement("a")
    let restaurantsDiv = document.getElementById("restaurants")
    
    editLink.dataset.id = restaurant.id
    editLink.setAttribute("href", "#")
    editLink.innerText = "Edit"
    
    deleteLink.dataset.id = restaurant.id
    deleteLink.setAttribute("href", "#")
    deleteLink.innerText = "Delete"

    deleteLink.addEventListener("click", deleteRestaurant)

    h3.innerText = restaurant.name
    h4.innerText = restaurant.city

    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(editLink)
    div.appendChild(deleteLink)

    restaurantsDiv.appendChild(div)
}

function deleteRestaurant(e) {
    e.preventDefault()

    let id = e.target.dataset.id

    fetch(baseUrl + '/restaurants/' + id, {
        method: "DELETE"
    })
    .then(function(resp) {
        return resp.json()
    })
    .then(function(data) {
        
        restaurants = restaurants.filter(function(restaurant) {
            return restaurant.id !== data.id
        })
        renderRestaurants()
    })

}

function renderForm() {
    resetMain()
    main().innerHTML = formTemplate()
    form().addEventListener("submit", submitForm)
}

function renderRestaurants() {
    resetMain()
    main().innerHTML = restaurantsTemplate()

    restaurants.forEach(function(restaurant) {
        renderRestaurant(restaurant)
    })
}

function submitForm(e) {
    e.preventDefault()

    let strongParams = {
        restaurant: {
            name: nameInput().value,
            city: cityInput().value
        }
    }

    fetch(baseUrl + '/restaurants', {
        body: JSON.stringify(strongParams),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST"
    })
    .then(function(resp) {
        return resp.json()
    })
    .then(function(restaurant) {
        restaurants.push(restaurant)
        renderRestaurants()
    })

}

function formLinkEvent() {
    formLink().addEventListener("click", function(e) {
        e.preventDefault()

        renderForm()
    })
}

function restaurantsLinkEvent() {
    restaurantsLink().addEventListener("click", function(e) {
        e.preventDefault()

        renderRestaurants()
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getRestaurants()
    formLinkEvent()
    restaurantsLinkEvent()
})
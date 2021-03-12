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

async function getRestaurants() {

    const resp = await fetch(baseUrl + '/restaurants')
    const data = await resp.json()
    
    restaurants = data
    
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

function editFormTemplate(restaurant) {
    return `
    <h3>Edit Restaurant</h3>
        <form id="form" data-id="${restaurant.id}">
            <div class="input-field">
                <label for="name">Name</label>
                <input type="text" name="name" id="name" value="${restaurant.name}">
            </div>
            <div class="input-field">
                <label for="city">City</label>
                <input type="text" name="city" id="city" value="${restaurant.city}">
            </div>
            <input type="submit" value="Edit Restaurant">
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

    editLink.addEventListener("click", editRestaurant)
    deleteLink.addEventListener("click", deleteRestaurant)

    h3.innerText = restaurant.name
    h4.innerText = restaurant.city

    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(editLink)
    div.appendChild(deleteLink)

    restaurantsDiv.appendChild(div)
}

async function deleteRestaurant(e) {
    e.preventDefault()

    let id = e.target.dataset.id

    const resp = await fetch(baseUrl + '/restaurants/' + id, {
        method: "DELETE"
    })

    const data = await resp.json()
    
    restaurants = restaurants.filter(function(restaurant) {
        return restaurant.id !== data.id
    })
    
    renderRestaurants()
}

function editRestaurant(e) {
    e.preventDefault()

    const id = e.target.dataset.id

    const restaurant = restaurants.find(function(restaurant) {
        return restaurant.id == id
    })

    renderEditForm(restaurant)
}

function renderForm() {
    resetMain()
    main().innerHTML = formTemplate()
    form().addEventListener("submit", submitForm)
}

function renderEditForm(restaurant) {
    resetMain()
    main().innerHTML = editFormTemplate(restaurant)
    form().addEventListener("submit", submitEditForm)
}

function submitEditForm(e) {
    e.preventDefault()

    let strongParams = {
        restaurant: {
            name: nameInput().value,
            city: cityInput().value
        }
    }

    const id = e.target.dataset.id
    
    fetch(baseUrl + '/restaurants/' + id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(function(resp) {
        return resp.json()
    })
    .then(function(restaurant) {
        let r = restaurants.find(function(r) {
            return r.id == restaurant.id
        })
        
        let idx = restaurants.indexOf(r)

        restaurants[idx] = restaurant

        renderRestaurants()
    })
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
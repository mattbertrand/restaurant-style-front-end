async function getRestaurants() {

    const resp = await fetch(baseUrl + '/restaurants')
    const data = await resp.json()
    
    Restaurant.createFromCollection(data)
    Restaurant.renderRestaurants()
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
            <div class="input-field">
                <label for="style">Style</label>
                <input type="text" name="style" id="style">
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
            <div class="input-field">
                <label for="style">Style</label>
                <input type="text" name="style" id="style" value="${restaurant.style.title}">
            </div>
            <input type="submit" value="Edit Restaurant">
        </form>
    `
}

function renderRestaurant(restaurant) {
    let div = document.createElement("div")
    let h3 = document.createElement("h3")
    let h4 = document.createElement("h4")
    let showStyle = document.createElement('p')
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
    showStyle.innerText = `Style: ${restaurant.style.title}`

    div.appendChild(h3)
    div.appendChild(h4)
    div.appendChild(showStyle)
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
    
    Restaurant.all = Restaurant.all.filter(function(restaurant) {
        return restaurant.id !== data.id
    })
    
    Restaurant.renderRestaurants()
}

function editRestaurant(e) {
    e.preventDefault()

    const id = e.target.dataset.id

    const restaurant = Restaurant.all.find(function(restaurant) {
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
            city: cityInput().value, 
            style_attributes: styleInput().value
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
        let r = Restaurant.all.find(function(r) {
            return r.id == restaurant.id
        })
        
        let idx = Restaurant.all.indexOf(r)

        Restaurant.all[idx] = restaurant

        Restaurant.renderRestaurants()
    })
}

function submitForm(e) {
    e.preventDefault()

    let strongParams = {
        restaurant: {
            name: nameInput().value,
            city: cityInput().value,
            style_attributes: styleInput().value
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
        Restaurant.all.push(restaurant)
        Restaurant.renderRestaurants()
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

        Restaurant.renderRestaurants()
    })
}

document.addEventListener('DOMContentLoaded', function() {
    getRestaurants()
    formLinkEvent()
    restaurantsLinkEvent()
})
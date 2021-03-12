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

function formLinkEvent() {
    formLink().addEventListener("click", function(e) {
        e.preventDefault()

        Restaurant.renderForm()
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
async function getRestaurants() {

    const data = await Api.get("/restaurants")
    
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
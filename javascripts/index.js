function resetInputs() {
    nameInput().innerHTML = ""
    cityInput().innerHTML = ""
    imageInput().value = ""
    debugger
    urlInput().value = ""
    styleInput().value = ""
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
    Restaurant.getRestaurants()
    formLinkEvent()
    restaurantsLinkEvent()
})
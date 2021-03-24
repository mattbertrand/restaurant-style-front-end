function resetInputs() {
    nameInput().innerHTML = ""
    cityInput().innerHTML = ""
    imageInput().value = ""
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

function searchByStyleEvent() {
    searchByStyle().addEventListener("keyup", function(e) {
        e.preventDefault()

        Restaurant.handleSearch()
    })
}

document.addEventListener('DOMContentLoaded', function() {
    Restaurant.getRestaurants()
    formLinkEvent()
    restaurantsLinkEvent()
    searchByStyleEvent()
})
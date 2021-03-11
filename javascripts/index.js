let restaurants = [
    {name: "Crave", city: "Novato"},
    {name: "Barrel House Tavern", city: "Sausalito"},
    {name: "Buckeye Roadhouse", city: "Mill Valley"},
    {name: "Brewster", city: "Petaluma"}
]

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
       <div id="restaurants">
           <div>
               <h3>Name:</h3>
               <h4>City:</h4>
           </div>
       </div>
    `
}

function renderForm() {
    resetMain()
    main().innerHTML = formTemplate()
    form().addEventListener("submit", submitForm)
}

function renderRestaurants() {
    resetMain()
    main().innerHTML = restaurantsTemplate()
}

function submitForm(e) {
    e.preventDefault()

    restaurants.push({
        name: nameInput().value,
        city: cityInput().value
    })

    resetInputs()
}

document.addEventListener('DOMContentLoaded', function() {
    // renderForm()
    renderRestaurants()
})
class Restaurant {
    static all = []
    
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.city = data.city
        this.style = data.style
    }

    render() {
        let div = document.createElement("div")
        let h3 = document.createElement("h3")
        let h4 = document.createElement("h4")
        let showStyle = document.createElement('p')
        let editLink = document.createElement("a")
        let deleteLink = document.createElement("a")
        let restaurantsDiv = document.getElementById("restaurants")
        
        editLink.dataset.id = this.id
        editLink.setAttribute("href", "#")
        editLink.innerText = "Edit"
        
        deleteLink.dataset.id = this.id
        deleteLink.setAttribute("href", "#")
        deleteLink.innerText = "Delete"
    
        editLink.addEventListener("click", editRestaurant)
        deleteLink.addEventListener("click", deleteRestaurant)
    
        h3.innerText = this.name
        h4.innerText = this.city
        showStyle.innerText = `Style: ${this.style.title}`
    
        div.appendChild(h3)
        div.appendChild(h4)
        div.appendChild(showStyle)
        div.appendChild(editLink)
        div.appendChild(deleteLink)
    
        restaurantsDiv.appendChild(div)
    }

    save() {
        Restaurant.all.push(this)
    }

    static create(data) {
        let restaurant = new Restaurant(data)
        restaurant.save()
        return restaurant
    }

    static createFromCollection(collection) {
        collection.forEach(attr => Restaurant.create(attr))
    }

    static restaurantsTemplate() {
        return `
        <h3>List of Restaurants</h3>
           <div id="restaurants"></div>
        `
    }

    static formTemplate() {
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

    static renderForm() {
        resetMain()
        main().innerHTML = Restaurant.formTemplate()
        form().addEventListener("submit", Restaurant.submitForm)
    }
    
    static renderRestaurants() {
        resetMain()
        main().innerHTML = Restaurant.restaurantsTemplate()
    
        Restaurant.all.forEach(restaurant => restaurant.render())
    }

    static submitForm(e) {
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
        .then(function(data) {
            Restaurant.create(data)
            Restaurant.renderRestaurants()
        })
    
    }
}
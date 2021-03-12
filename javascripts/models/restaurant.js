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
    
        editLink.addEventListener("click", Restaurant.editRestaurant)
        deleteLink.addEventListener("click", Restaurant.deleteRestaurant)
    
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

    static editFormTemplate(restaurant) {
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

    static renderForm() {
        resetMain()
        main().innerHTML = Restaurant.formTemplate()
        form().addEventListener("submit", Restaurant.submitForm)
    }

    static renderEditForm(restaurant) {
        resetMain()
        main().innerHTML = Restaurant.editFormTemplate(restaurant)
        form().addEventListener("submit", Restaurant.submitEditForm)
    }
    
    static renderRestaurants() {
        resetMain()
        main().innerHTML = Restaurant.restaurantsTemplate()
    
        Restaurant.all.forEach(restaurant => restaurant.render())
    }

    static editRestaurant(e) {
        e.preventDefault()
    
        const id = e.target.dataset.id
    
        const restaurant = Restaurant.all.find(function(restaurant) {
            return restaurant.id == id
        })
    
        Restaurant.renderEditForm(restaurant)
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
    
        Api.post('/restaurants', strongParams)
            .then(function(data) {
                Restaurant.create(data)
                Restaurant.renderRestaurants()
            })
    }

    static submitEditForm(e) {
        e.preventDefault()
    
        let strongParams = {
            restaurant: {
                name: nameInput().value,
                city: cityInput().value, 
                style_attributes: styleInput().value
            }
        }
    
        const id = e.target.dataset.id
        
        fetch(Api.baseUrl + '/restaurants/' + id, {
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
        .then(function(data) {
            let r = Restaurant.all.find(function(r) {
                return r.id == data.id
            })
            
            let idx = Restaurant.all.indexOf(r)
    
            Restaurant.all[idx] = new Restaurant(data)
    
            Restaurant.renderRestaurants()
        })
    }

    static async getRestaurants() {

        const data = await Api.get("/restaurants")
        
        Restaurant.createFromCollection(data)
        Restaurant.renderRestaurants()
    }

    static async deleteRestaurant(e) {
        e.preventDefault()
    
        let id = e.target.dataset.id
    
        const resp = await fetch(Api.baseUrl + '/restaurants/' + id, {
            method: "DELETE"
        })
    
        const data = await resp.json()
        
        Restaurant.all = Restaurant.all.filter(function(restaurant) {
            return restaurant.id !== data.id
        })
        
        Restaurant.renderRestaurants()
    }
}


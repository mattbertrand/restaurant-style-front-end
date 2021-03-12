class Restaurant {
    static all = []
    
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.city = data.city
        this.style = data.style
    }

    static create(data) {
        let restaurant = new Restaurant(data)
        restaurant.save()
        return restaurant
    }

    save() {
        Restaurant.all.push(this)
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
    
    static renderRestaurants() {
        resetMain()
        main().innerHTML = Restaurant.restaurantsTemplate()
    
        Restaurant.all.forEach(function(restaurant) {
            renderRestaurant(restaurant)
        })
    }
}
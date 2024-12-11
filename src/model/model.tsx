
export type User = {
    username: string,
    password: string,
    email: string,
    numOfRecipes: number,
    registrationDate: Date
}

export type Profile = {
    username: string,
    email: string,
    numOfRecipes: number
}

export enum RecipeCategory {
    DISH = "Dish",
    TAKEAWAY = "Takeaway",
    SOUP = "Soup",
    DESSERT = "Dessert",
    BEVERAGE = "Beverage",
    FESTIVE = "Festive",
}

export enum RecipeTime {
    FASTEST = "5-15min",
    FAST = "15-30min",
    AVERAGE = "30-60min",
    SLOW = "1h+",
}

export type Recipe = {
    name: string,
    creator: string, //email of user
    category: RecipeCategory,
    time: RecipeTime,
    ingredients: string[],
    rating: [number, number, number, number, number]
}

/**
 * Routes to a specified page by changing the URL and notifying the router.
 * Reloads the page after routing.
 * 
 * @param page: The page to navigate to (e.g., "home", "account").
 */
export const routeToPage = (page: string) => {
    window.history.pushState(null, '', `/${page}`); // Change URL
    window.dispatchEvent(new Event('popstate'));   // Notify router
    window.location.reload();
}
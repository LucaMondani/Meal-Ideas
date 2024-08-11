import express from "express"
import axios from "axios"

const app = express();
const port = 3000;

const config = {"api-key": "1"};

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", );
});

app.get("/random", async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php", config);
        const result = response.data;
        const path = result["meals"][0];
        let name = path["strMeal"];
        let origin = path["strArea"];
        let category = path["strCategory"];
        let instructions = path["strInstructions"];
        let image = path["strMealThumb"];
        let tutorial = path["strYoutube"];
        let recipe = path["strSource"];
        res.render("index.ejs", {name: name, origin: origin, category: category, instructions: instructions, image: image, tutorial:tutorial, recipe:recipe});
    } catch (error) {
        console.log(error)
        res.render("index.ejs", {content: error});
    }
});

app.get("/vegetarian", async (req, res) => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian", config);
        const result = response.data;
        let meals = result["meals"];
        let randomMeal = meals[Math.floor(Math.random() * meals.length)];
        let randomMealName = randomMeal["strMeal"];
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${randomMealName}`, config);
            const result = response.data;
            const path = result["meals"][0];
            let name = path["strMeal"];
            let origin = path["strArea"];
            let category = path["strCategory"];
            let instructions = path["strInstructions"];
            let image = path["strMealThumb"];
            let tutorial = path["strYoutube"];
            let recipe = path["strSource"];
            res.render("index.ejs", {name: name, origin: origin, category: category, instructions: instructions, image: image, tutorial:tutorial, recipe:recipe});
        } catch (error) {
            console.log(error)
            res.render("index.ejs", {content: error});
        }
    } catch (error) {
        console.log(error)
        res.render("index.ejs", {content: error});
    }
    
});

app.get("/dessert", (req, res) => {
    res.render("index.ejs", {content: "Ne"});
}); 

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});
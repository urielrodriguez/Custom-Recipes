let gender, active, goal, recipes
let diets = new Array();
let api_call = 'https://api.edamam.com/search?q=&app_id=f49d55d1&app_key=f4a318b1872a680a0893cdabff670d7d&health=alcohol-free';

document.getElementById('submit').onclick = function() {
    let gender_options = document.getElementsByName('gender');
    let height_feet = document.getElementById('height-feet');
    let height_inches = document.getElementById('height-inches');
    let weight = document.getElementById('weight');
    let active_options = document.getElementsByName('active');
    let goal_options = document.getElementsByName('goal');
    let vegan = document.getElementsByName('vegan');
    let vegetarian = document.getElementsByName('vegetarian');
    let pescatarian = document.getElementsByName('pescatarian');
    for (let gender_option of gender_options) {
        if (gender_option.checked) {
            gender = gender_option.id;
        }
    }
    for (let active_option of active_options) {
        if (active_option.checked) {
            active = active_option.id;
        }
    }
    for (let goal_option of goal_options) {
        if (goal_option.checked) {
            goal = goal_option.id;
        }
    }
    for (let v of vegan) {
        if (v.checked) {
            diets.push(v.id);
        }
    }
    for (let v of vegetarian) {
        if (v.checked) {
            diets.push(v.id);
        }
    }
    for (let p of pescatarian) {
        if (p.checked) {
            diets.push(p.id);
        }
    }
    for (let diet of diets) {
        api_call = api_call + '&health=' + diet;
    }

    recipes_title = document.querySelector('.recipes-title');
    let rt = document.createElement('h2');
    rt.innerHTML = 'Recipes';
    recipes_title.appendChild(rt);

    async function getData() {
        const response = await fetch(api_call)
        const data = response.json();
        return data;
    }
    rec = document.querySelector('.recipes');
    getData().then(data => {
        for (let i=0; i<data.hits.length; i++) {
            console.log(data.hits[i].recipe);
            let card = document.createElement('div');
            card.className = 'card'
            card.style = 'width: 15rem;'

            let card_front = document.createElement('div');
            card_front.className = 'card-front';
            let title = document.createElement('h3');
            title.className = 'card-title';
            title.innerHTML = data.hits[i].recipe.label;
            let photo = document.createElement('img');
            photo.src = data.hits[i].recipe.image;

            let card_back = document.createElement('div');
            card_back.className = 'card-back';
            let ingredients_title = document.createElement('h3');
            ingredients_title.innerHTML = 'Ingredients';
            card_back.appendChild(ingredients_title);
            let ingredients = data.hits[i].recipe.ingredientLines;
            for (let i=0; i<ingredients.length; i++) {
                let ingredient = document.createElement('li');
                ingredient.innerHTML = ingredients[i];
                card_back.appendChild(ingredient);
            }

            card_front.appendChild(photo);
            card_front.appendChild(title);
            card.appendChild(card_front);
            card.appendChild(card_back);
            rec.appendChild(card);
        }
    })
}

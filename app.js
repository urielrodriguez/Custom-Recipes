let gender, active, goal
let diets = new Array();
let api_call = 'https://api.edamam.com/search?q=chicken&app_id=$f49d55d1&app_key=$f4a318b1872a680a0893cdabff670d7d';

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
    const response = fetch(api_call, {mode: "no-cors"});
    response
        .then(data => data.json())
        .then(data => {
            console.log(data);
        })
}
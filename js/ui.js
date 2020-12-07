const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

// render recipe data
const renderRecipe = (data, id) => {
  const html = `
    <div class="card-panel recipe white row" data-id="${id}">
      <img src="/img/dish.png" alt="recipe thumb">
      <div class="recipe-details">
        <div class="recipe-title" data-id="${id}">${data.title}</div>
        <div class="recipe-ingredients" data-id="${id}">${data.ingredients}</div>
      </div>
      <div class="recipe-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  recipes.innerHTML += html;
};

// remove recipe from DOM
const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);
  recipe.remove();
};

// modify recipe from DOM
const modifyRecipe = (data, id) => {
  // console.log("[modifyRecipe] ", data, id);
  const title = document.querySelector(`.recipe-title[data-id=${id}]`);
  const ingredients = document.querySelector(`.recipe-ingredients[data-id=${id}]`);
  // console.log("[modifyRecipe] title=", title);
  // console.log("[modifyRecipe] ingredients=", ingredients);
  title.innerHTML = data.title;
  ingredients.innerHTML = data.ingredients;
};


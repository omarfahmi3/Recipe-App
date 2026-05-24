const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-btn");
const recipeContainer = document.querySelector(".recipe-container");

async function fetchRcipes(query) {
  recipeContainer.innerHTML = `<h3> Just a moment...</h3>`;
  const data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
  );
  const response = await data.json();
  if (!response.meals) {
    recipeContainer.innerHTML = "No recipe matched";
    return;
  }

  recipeContainer.innerHTML = "";
  response.meals.forEach((meal) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <h2>${meal.strMeal}</h2>
    <p>${meal.strArea} Dish</p> 
    <p><span> Category</span> ${meal.strCategory}</p> `;
    const viewBtn = document.createElement("button");
    viewBtn.textContent = "show recipe";
    viewBtn.classList.add("show-recipe");
    recipeDiv.appendChild(viewBtn);
    const recipeDetails = document.createElement("div");
    recipeDetails.classList.add("recipe-details");
    //fetch Ingeratiens and measures
    function fetchIngredients(meal) {
      let ingredientsList = "";
      for (let i = 1; i <= 50; i++) {
        let ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
          const measure = meal[`strMeasure${i}`];
          ingredientsList += `
        <li>${measure} ${ingredient}</li>
      `;
        } else {
          break;
        }
      }
      return ingredientsList;
    }
    recipeDetails.innerHTML = `<h2>Ingredients</h2>
    <ul>${fetchIngredients(meal)}
    </ul>
    <p>- ${meal.strInstructions}</p>`;
    viewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (viewBtn.textContent == "show recipe") {
        viewBtn.textContent = "Hide Recipe";
        recipeDetails.style.display = "block";
      } else {
        viewBtn.textContent = "show recipe";
        recipeDetails.style.display = "none";
      }
    });

    recipeDiv.appendChild(recipeDetails);
    recipeContainer.appendChild(recipeDiv);
  });
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchValue = searchBox.value.trim();
  fetchRcipes(searchValue);
});

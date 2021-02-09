
import React, {useEffect, useState} from "react";
import Recipe from './Recipe';


import './App.css';


const App = () => {

  const APP_ID = '4a8ae59b';
  const APP_KEY = "641e211495e8637c7bc84d2135d1c826";

  const [recipes, setRecipes] = useState ([]);
  const [Search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken')

  

  


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updatesearch = e => {
    setSearch(e.target.value);
    

  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(Search);
    setSearch('');
  }
  
  const updateSearch = e => {
    setSearch(e.target.value);
  }


  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text"  value={Search} onChange={updateSearch} />
        <button  className="search-button" type="submit"> search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}            
      </div>
    </div>
  );
};


export default App;

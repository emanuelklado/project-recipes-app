import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  console.log(doneRecipes);
  const [foods, setFoods] = useState();
  const [drinks, setDrinks] = useState();
  const [rendering, setRendering] = useState(doneRecipes);
  const [shared, setShared] = useState(false);

  const sortingTypes = () => {
    setFoods(doneRecipes.filter((recipe) => recipe.type === 'food'));
    setDrinks(doneRecipes.filter((recipe) => recipe.type === 'drink'));
  };

  useEffect(() => {
    sortingTypes();
  }, []);

  return (
    <>
      <HeaderNoSearch />
      <section>
        <button
          type="button"
          onClick={ () => setRendering(doneRecipes) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ () => setRendering(foods) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          onClick={ () => setRendering(drinks) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </section>
      <section>
        {rendering.map((recipe, index) => (
          <Card
            key={ recipe.id }
            className="mt-3"
            style={ { width: '21rem' } }
          >
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                width="120px"
                data-testid={ `${index}-horizontal-image` }
              />
              <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
            </Link>

            <button
              data-testid={ `${index}-horizontal-share-btn` }
              type="button"
              src={ shareIcon }
              onClick={ () => {
                setShared(true);
                navigator.clipboard.writeText(
                  `${window.location.origin}/${recipe.type}s/${recipe.id}`,
                );
              } }
            >
              <img src={ shareIcon } alt="share" />
            </button>
            { shared && <p>Link copied!</p> }

            { recipe.type === 'food' && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.nationality} - ${recipe.category}` }
              </p>)}
            { recipe.type === 'drink' && (
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${recipe.alcoholicOrNot} - ${recipe.category}` }
              </p>)}

            <p>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {recipe.doneDate}
            </p>

            {recipe.tags.map((tag) => (
              <span
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </span>
            ))}

          </Card>))}
      </section>
    </>
  );
}

export default DoneRecipes;

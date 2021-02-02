import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AuthSceen from './Screens/Auth/AuthScreen'
import IngredientsScreen from './Screens/Ingredients/IngredientsScreen'
import RecipesScreen from './Screens/Recipes/RecipesScreen'
import HomeScreen from './Screens/Home/HomeScreen'

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/ingredients">Ingredients</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/auth">Auth</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/ingredients">
            <IngredientsScreen />
          </Route>
          <Route path="/recipes">
            <RecipesScreen />
          </Route>
          <Route path="/recipes">
            <AuthSceen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

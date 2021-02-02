import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import AuthSceen from './Screens/Auth/AuthScreen'
import IngredientsScreen from './Screens/Ingredients/IngredientsScreen'
import RecipesScreen from './Screens/Recipes/RecipesScreen'
import HomeScreen from './Screens/Home/HomeScreen'
import Navigation from './Helpers/Navigation/Navigation'

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

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

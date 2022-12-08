import Main from './components/main'
import Categories from './components/Categories/Categories'
import Partners from './components/Partners/Partners'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
export default function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/categories" element={<Categories/>} />
          <Route exact path="/partners" element={<Partners/>} />
        </Routes>
      </Router>
    </div>
  );
}

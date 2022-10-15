import { Routes, Route } from 'react-router-dom';
import Home from "./routes/Home/home";
import Navigation from "./routes/Navigation/navigation";
import Authentication from './routes/Authentication/authentication';
import Shop from './routes/Shop/shop';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
}

export default App;

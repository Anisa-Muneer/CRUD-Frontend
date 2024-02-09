

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import AdminRoutes from './Routes/AdminRoutes'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/*' element={<UserRoutes/>} />
        <Route path='/admin/*' element={<AdminRoutes/>} />

       
      </Routes>

      </BrowserRouter>
    
     
    </div>
  );
}

export default App;

import { Routes, Route, BrowserRouter, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Production from './pages/Production';
import Dashboard from './pages/Dashboard';
import Chart from './pages/Chart';


function App() {
  const paths = ["/", "/home"];

  return (
      <BrowserRouter>
        <div>
            <Routes>
            {paths.map((p) => (
              <Route key={p} path={p} element={<Home />} />
            ))}

            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/chart' element={<Chart/>}/>
            <Route path='*' element={<Production/>}/>
            
            
            </Routes> 


        </div>
    </BrowserRouter>
  );
}

export default App;


// ref
 {/* <Route path="/home" element={<Home />} />
                <Route path="/room/:roomID" element={<Room />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/lobby/:roomID/:userID/:role"
                  element={<LobbyWithSocket />}
                />
                <Route path="*" element={<div>Error 404</div>} />
              </Routes> */}
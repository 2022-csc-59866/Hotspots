import './App.css';
import NavBar from './components/NavBar/NavBar';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import About from './pages/about/about';
import Create from './pages/create/create';
import Events from './pages/events/events';
import Manage from './pages/manage/manage';
import {Route, Routes} from "react-router-dom";


function App() {
  // return (
  //   <>
  //   <NavBar path={"Events"}></NavBar>
  //   {/* <Login></Login> */}
  //   {/* <Signup></Signup> */}
  //   {/* <About></About> */}
  //   {/* <Create></Create> */}
  //   </>
  // );
  return <Routes>
    <Route path="/" element={<>
      <NavBar></NavBar>
      <Events></Events>
    </>
    }></Route>
    <Route path="/manage" element={<>
      <NavBar path={"Manage Events"}></NavBar>
      <Manage></Manage>
    </>
    }></Route>
    <Route path="/create" element={<>
      <NavBar path={"Create Event"}></NavBar>
      <Create></Create>
    </>
    }></Route>
    <Route path="/login" element={<>
      <NavBar path={"Login"}></NavBar>
      <Login></Login>
    </>
    }></Route>

    <Route path="/signup" element={<>
      <NavBar path={"Sign Up"}></NavBar>
      <Signup></Signup>
    </>
    }></Route>

    <Route path="/about" element={<>
      <NavBar path={"About"}></NavBar>
      <About></About>
    </>
    }></Route>

  </Routes>
}

export default App;

import {BrowserRouter, Route, Routes} from "react-router";
import Home from "./Pages/Home.tsx";
import Detail from "./Pages/Detail.tsx";


function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path={"/detail/:id"} element={<Detail />} />
            <Route path={"/"} element={<Home />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App

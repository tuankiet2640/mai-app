import './App.css';

import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Chat from "./components/chat/Chat";


const Layout = () => {
    return (
        <div>
            <Header/>
            <Chat />
            <Footer/>
        </div>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>

            </Route>
        </Route>
    ),
);

function App() {
    return (
        <div className="font-bodyFont">
            <RouterProvider router={router}/>
        </div>
    );
}


export default App;

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
import ChatContainer from "./components/chat/Chat";
import ErrorBoundary from './components/error/ErrorBoundary';
import About from './components/header/About';

const Layout = () => {
    return (
        <div>
            <Header/>
            <ErrorBoundary>
            <div className="flex-1 flex justify-center items-center ">
                    <ChatContainer />
                </div>
            </ErrorBoundary>
            <Footer/>
        </div>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                <Route path="/about" element={<About/>}></Route>
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

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
import ErrorBoundary from './components/error/ErrorBoundary';

const Layout = () => {
    return (
        <div>
            <Header/>
            <ErrorBoundary>
                <Chat />
            </ErrorBoundary>
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

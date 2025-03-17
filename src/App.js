import './App.css';
import ChatPage from './components/chat/ChatPage';

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
import About from './components/header/About';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <main className="flex-1 overflow-hidden">
                <Outlet/>
            </main>
            {/* <Footer/> */}
        </div>
    );
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Layout/>}>
                <Route path="/about" element={<About/>}></Route>
                <Route path="/chat" element={<ChatPage/>}></Route>
            </Route>
        </Route>
    ),
);

function App() {
    return (
        <div className="font-bodyFont h-screen">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;

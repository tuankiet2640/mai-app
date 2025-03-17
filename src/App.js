import './App.css';
import ChatPage from './components/chat/ChatPage';
import { ThemeProvider } from './utils/ThemeContext';

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
            <main className="flex-1 overflow-hidden relative z-0">
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
        <ThemeProvider>
            <div className="font-bodyFont h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <RouterProvider router={router}/>
            </div>
        </ThemeProvider>
    );
}
export default App;

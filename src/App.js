import './App.css';
import ChatPage from './components/chat/ChatPage';
import { ThemeProvider } from './utils/ThemeContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    createRoutesFromElements,
    Route,
    ScrollRestoration,
    Navigate,
} from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import About from './components/header/About';
import HomePage from './components/home/HomePage';
import SignIn from './components/auth/SignIn';
import { AuthProvider } from './utils/AuthContext';

// Import learning pages
import LearningHome from './components/learning/LearningHome';
import LearningCourses from './components/learning/LearningCourses';
import LearningTutorials from './components/learning/LearningTutorials';
import LearningDocs from './components/learning/LearningDocs';
import LearningTech from './components/learning/LearningTech';

// Import agents pages
import AgentsHome from './components/agents/AgentsHome';
import AgentsClaude from './components/agents/AgentsClaude';
import AgentsGPT from './components/agents/AgentsGPT';
import AgentsCustom from './components/agents/AgentsCustom';
import Minion from './components/agents/Minion';

// Import services pages
import ServicesHome from './components/services/ServicesHome';
import ServicesChat from './components/services/ServicesChat';
import ServicesCode from './components/services/ServicesCode';
import ServicesImages from './components/services/ServicesImages';

// Import admin pages
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import UsersPage from './components/admin/UsersPage';
import AgentsPage from './components/admin/AgentsPage';
import ServicesPage from './components/admin/ServicesPage';
import SettingsPage from './components/admin/SettingsPage';
import AnalyticsDashboard from './components/admin/AnalyticsDashboard';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header/>
            <main className="flex-1 overflow-auto relative z-0">
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
                <Route index element={<HomePage />} />
                <Route path="/about" element={<About/>} />
                <Route path="/chat" element={<ChatPage/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/login" element={<Navigate to="/signin" replace />} />
                
                {/* Learning routes */}
                <Route path="/learning" element={<LearningHome />} />
                <Route path="/learning/courses" element={<LearningCourses />} />
                <Route path="/learning/tutorials" element={<LearningTutorials />} />
                <Route path="/learning/docs" element={<LearningDocs />} />
                <Route path="/learning/tech" element={<LearningTech />} />
                
                {/* Agents routes */}
                <Route path="/agents" element={<AgentsHome />} />
                <Route path="/agents/claude" element={<AgentsClaude />} />
                <Route path="/agents/gpt" element={<AgentsGPT />} />
                <Route path="/agents/custom" element={<AgentsCustom />} />
                <Route path="/agents/minion" element={<Minion />} />
                
                {/* Services routes */}
                <Route path="/services" element={<ServicesHome />} />
                <Route path="/services/chat" element={<ServicesChat />} />
                <Route path="/services/code" element={<ServicesCode />} />
                <Route path="/services/images" element={<ServicesImages />} />
                
                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="agents" element={<AgentsPage />} />
                    <Route path="services" element={<ServicesPage />} />
                    <Route path="analytics" element={<AnalyticsDashboard />} />
                    <Route path="tokens" element={<SettingsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
            </Route>
        </Route>
    ),
);

function App() {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider>
                <AuthProvider>
                    <div className="font-bodyFont h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        <RouterProvider router={router}/>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
}
export default App;

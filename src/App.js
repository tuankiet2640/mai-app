import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                {/* Main content goes here */}
                <h1 className="text-3xl font-bold underline">
                    Hello world!
                </h1>            
            </main>
            <Footer />
        </div>
    );
}


export default App;

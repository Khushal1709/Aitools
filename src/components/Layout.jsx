// Layout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout() {
    return (
        <>
        <Navbar />
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
      
        <Footer />
        </>
    );
}

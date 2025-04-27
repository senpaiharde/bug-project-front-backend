
import { NavLink, Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppFooter } from "./AppFooter";



export function DashboardLayout({user, setUser}) {
    console.log('Current user:', user)   
    return(
        <div className="dashBoard">
            <aside className="dashBoard_sideBar">
                <h2 className="dashBoard_logo">MissBug Pro</h2>
                <nav className="dashBoard_nav">
                    <NavLink to='/' end classNam='dashBoard_link'>
                    OverView
                    </NavLink>
                    <NavLink to='/tracker/bug' end classNam='dashBoard_link'>
                    Bug Tracker
                    </NavLink>
                    <NavLink to='/about' end classNam='dashBoard_link'>
                    About
                    </NavLink>
                    <NavLink to='/settings' end classNam='dashBoard_link'>
                    Settings
                    </NavLink>
                </nav>
            </aside>
            <div className="dashBoard_main">
                <header className="dashBoard_header">
                    <AppHeader/>
                </header>
                <section className="dashboard__content">
          {/* Renders nested pages */}
          <Outlet />
        </section>
            </div>
            <footer className="dashboard__footer">
         <AppFooter/>
        </footer>
        </div>
    )
}
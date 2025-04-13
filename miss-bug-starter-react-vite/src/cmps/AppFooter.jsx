import { useEffect } from 'react';
import { showSuccessMsg } from '../services/event-bus.service';
import { Link } from 'react-router-dom';

export function AppFooter() {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, []);

  return (
    <footer className="container-footer">
      <ul className="container-footer-ul">
      <li className="container-footer-li">
          <a className="container-a" href="#">
            Blog
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="#">
          Support
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="#">
          Privacy
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="#">
          About
          </a>
        </li>
        <li className="container-footer-li">
            
          <Link className="container-a" to="/signup">
          Sign In
          </Link >
        </li>
        
      </ul>
    </footer>
  );
}

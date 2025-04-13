import { useEffect } from 'react';
import { showSuccessMsg } from '../services/event-bus.service';

export function AppFooter() {
  useEffect(() => {
    // component did mount when dependancy array is empty
  }, []);

  return (
    <footer className="container-footer">
      <ul className="container-footer-ul">
      <li className="container-footer-li">
          <a className="container-a" href="https://blog.studybugs.com/">
            Blog
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="#">
          Support
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="https://studybugs.com/privacy">
          Privacy
          </a>
        </li>
        <li className="container-footer-li">
          <a className="container-a" href="https://studybugs.com/about">
          About
          </a>
        </li>
        <li className="container-footer-li">
            
          <a className="container-a" href="https://blog.studybugs.com/">
          Sign In
          </a>
        </li>
        
      </ul>
    </footer>
  );
}

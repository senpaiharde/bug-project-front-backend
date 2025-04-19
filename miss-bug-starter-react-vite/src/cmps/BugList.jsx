import { Link } from 'react-router-dom';
import { BugPreview } from './BugPreview';

export function BugList({ bugs = [],user, onRemoveBug, onEditBug }) {
  if (!Array.isArray(bugs)) {
    console.log('Current user:', user)   
    console.error('BugList expected array but got:', bugs);
    return <p>bugs not available</p>;
  }
  return (
    <ul className="bug-list">
      {bugs.map((bug) =>  {
        console.log('BUG CHECK:', { 
          title: bug.title, 
          ownerId: bug.ownerId, 
          userId: user?._id, 
          userRole: user?.role 
        })
      return(
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} user={user} />
          {
          (user.role === 'admin' || bug.ownerId === user._id)&& (
          <div>
            <button
              className="headerbutton"
              onClick={() => {
                onRemoveBug(bug._id);
              }}>
              Delete
            </button>
            <button
              className="headerbutton"
              onClick={() => {
                onEditBug(bug);
              }}>
              Edit
            </button>
          </div>)}
          
          <Link bugs={bug} to={`/tracker/bug/${bug._id}`}>
            Details
          </Link>
        </li>
      )})}
    </ul>
  );
}

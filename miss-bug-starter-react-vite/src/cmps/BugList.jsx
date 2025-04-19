import { Link } from 'react-router-dom';
import { BugPreview } from './BugPreview';

export function BugList({ bugs = [], onRemoveBug, onEditBug }) {
  if (!Array.isArray(bugs)) {
    console.error('BugList expected array but got:', bugs);
    return <p>bugs not available</p>;
  }
  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
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
          </div>
          <Link bugs={bug} to={`/tracker/bug/${bug._id}`}>
            Details
          </Link>
        </li>
      ))}
    </ul>
  );
}

import { Link } from 'react-router-dom';
import { BugPreview } from './BugPreview';
import { useState } from 'react';
import EditBugModal from '../cmps/EditBugModal';
export function BugList({ bugs = [],user ={}, onRemoveBug, onEditBug }) {
    
    const [editingBug, setEditingBug] = useState(null);
    function onStartEditing(bug) {
        setEditingBug(bug);
      }
      

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

        const canModify =
        user?.role === 'admin' ||
        bug.ownerId === user?._id
      return(
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} user={user} />
          {
          canModify && (
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
              onClick={() => onStartEditing(bug)}>
              Edit
            </button>
          </div>)}
          
          <Link bugs={bug} to={`/tracker/bug/${bug._id}`}>
            Details
          </Link>
          <EditBugModal
      isOpen={editingBug} 
      onClose={() => setEditingBug(null)}
      bug={editingBug}
      onSubmit={(updatedfields) => {
        onEditBug({...editingBug, ...updatedfields})
        setEditingBug(null)
      }}/>
        </li>
        
      )})}
      
    </ul>
  );
}

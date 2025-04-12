
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'

export function BugList({ bugs =[] , onRemoveBug, onEditBug }) {
    if(!Array.isArray(bugs)) {
        console.error('BugList expected array but got:', bugs)
        return <p>bugs not available</p>
    }
    return (
        <ul className="bug-list">
            {bugs.map((bug) => (
                <li className="bug-preview" key={bug._id}>
                    <BugPreview bug={bug} />
                    <div>
                        <button
                            onClick={() => {
                                onRemoveBug(bug._id)
                            }}
                        >
                            x
                        </button>
                        <button
                            onClick={() => {
                                onEditBug(bug)
                            }}
                        >
                            Edit
                        </button>
                    </div>
                    <Link bugs={bugs} to={`/bug/${bug._id}`}>Details</Link>
                </li>
            ))}
        </ul>
    )
}

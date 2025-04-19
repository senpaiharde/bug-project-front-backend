

export function BugPreview({ bug ,user}) {

    return <article >
        <h1 className="bug-details-p" style={{fontSize:'15px'}}>Owner: { bug.ownerName||'login to see owner'}</h1>
        <h4 className="bug-details-p">{bug.title || 'No Title'}</h4>
        <h1>🐛🐛</h1>
        <p className="bug-details-p"> Severity: <span>{bug.severity}</span></p>
    </article>
}
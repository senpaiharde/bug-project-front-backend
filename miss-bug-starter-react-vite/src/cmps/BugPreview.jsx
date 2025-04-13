

export function BugPreview({ bug }) {

    return <article >
        <h4 className="bug-details-p">{bug.title}</h4>
        <h1>🐛</h1>
        <p className="bug-details-p"> Severity: <span>{bug.severity}</span></p>
    </article>
}
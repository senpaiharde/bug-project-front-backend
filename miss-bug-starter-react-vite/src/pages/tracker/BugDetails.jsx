import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBugsById } from '../../services/bug.service.js';
import { getMsgs, saveMsg }    from '../../services/msg.service.js';
import { showErrorMsg }         from '../../services/event-bus.service.js';

export function BugDetails() {
  const [bug,  setBug]  = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const { bugId } = useParams();
  const navigate = useNavigate();

  // Load bug and messages on mount or when bugId changes
  useEffect(() => {
    async function loadData() {
      try {
        const bugData = await getBugsById(bugId);
        setBug(bugData);
      } catch (err) {
        showErrorMsg(err.response?.data?.err || 'Cannot load bug');
        navigate('/tracker/bug', { replace: true });
        return;
      }
      await loadMsgs();
    }
    loadData();
  }, [bugId, navigate]);

  // Function to load messages
  async function loadMsgs() {
    try {
      const msgsData = await getMsgs({ aboutBugId: bugId });
      setMsgs(msgsData);
    } catch (err) {
      showErrorMsg(err.response?.data?.err || 'Failed to load messages');
    }
  }

  // Add a new message
  async function addMsg(ev) {
    ev.preventDefault();
    if (!newMsg.trim()) return;
    setSaving(true);
    try {
      await saveMsg({ txt: newMsg, aboutBugId: bugId });
      setNewMsg('');
      await loadMsgs();           
    } catch (err) {
      showErrorMsg(err.response?.data?.err || 'Failed to save message');
    } finally {
      setSaving(false);
    }
  }

  if (!bug) return <h1>Loading...</h1>;

  return (
    <div className="bug-details-main-layout">
      <h3>🐛 Bug Details 🐛</h3>
      <h4>🐛 Name: {bug.title} 🐛</h4>
      <p>
        🐛 Severity: <span>{bug.severity} 🐛</span>
      </p>
      <p>
        🐛 description: <span>{bug.description} 🐛</span>
      </p>
      <Link style={{ color: 'black' }} to="/tracker/bug">
        🐛 Back to List 🐛
      </Link>
      <section >
        <h4>comments</h4>
        {msgs.length === 0 ? (
          <p>No messages yet. Be the first to add one!</p>
        )
        : msgs.map((m, idx) => (
            <div  key={m._id || idx} className="message-card">
                
                {m.byUser && (
                    <small>
                  <strong>{m.byUser.fullname} - {m.txt}  </strong>
                    </small>
                )}
            </div>
        ))}
        <form onSubmit={addMsg}>
            <textarea 
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            rows={3}
            required/>
            <button type='submit' disabled={saving}>
                {saving ? "saving...": 'Add Message'}
            </button>
        </form>

      </section>
    </div>
  );
}

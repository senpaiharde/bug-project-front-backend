import { useState } from 'react';
import { getBugs, getBugsById } from '../../services/bug.service.js';
import {showErrorMsg} from '../../services/event-bus.service.js';
import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMsgs, saveMsg } from '../../services/msg.service.js';

export function BugDetails() {
  const [bug, setBug] = useState(null);
  const { bugId } = useParams();
  const [msg, setMsgs] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const Navigate = useNavigate()
  useEffect(() => {
    async function load() {
      try {
        const data = await getBugsById(bugId);
        setBug(data);
      } catch (err) {
        showErrorMsg(err.response?.data?.err || 'Cannot load bug');
      }
    }
    load();
  }, [bugId]);
    useEffect(() => {
        if (!bug) return;
        async function load() {
          try {
            // If your service supports filtering:
            const data = await getMsgs({ aboutBugId: bugId });
            setMsgs(data);
          } catch (err) {
            showErrorMsg('Failed to load messages');
          } 
        }
        load();
      }, [bug, bugId])

  async function addMsg (ev) {
     ev.preventDefault()
     if(!newMsg.trim())return;
     setSaving(true)
     try{
        const saved = await saveMsg({txt: newMsg, aboutBugId: bugId})
        setMsgs(curr => [...curr, saved])
        setNewMsg('')
     }catch(err){
        showErrorMsg('Failed to load messages');
     }finally {
        setSaving(false);
      }
  }

  if (!bug) return <h1>loadings....</h1>;
  if (!bug)       return <Navigate to="/tracker/bug" replace />;
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
      <section>
        <h4>Messages</h4>
        {msg.length === 0 ? (<><p>no messages yet</p>
        <p>Add description </p>
    </>)
        : msg.map((m, idx) => (
            <div key={m._id || idx} className="message-card">
                <p>{m.txt}</p>
                <small>by<strong>{m.byUser}</strong></small>
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

import { deleteBug, getBugs, saveBug } from '../../services/bug.service.js';
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js';
import { BugList } from '../../cmps/BugList.jsx';
import { useState } from 'react';
import { useEffect } from 'react';

import AddBugModal from '../../cmps/AddBugModal.jsx';
import { getLoggedinUser } from '../../services/auth.service.js';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export function BugIndex({ user }) {
  console.log('Current user:', user);
  const [bugs, setBugs] = useState([]);
  const [filterBy, setFilterBy] = useState({ txt: '', severity: '' });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const loggedInUser = user || getLoggedinUser();
  const Navigate = useNavigate()
  

  const filterBugs = bugs.filter((bug) => {
    const title = bug.title || '';
    const matchesTxt = title.toLowerCase().includes(filterBy.txt.toLowerCase());
    const matchesSeverity = filterBy.severity ? bug.severity >= +filterBy.severity : true;
    return matchesTxt && matchesSeverity;
  });

  useEffect(() => {
    loadBugs();
  }, []);
  if(!user){  return <Navigate to="/login" replace />;}
  function onDownloadPDF() {
    window.open('http://localhost:3030/api/bug/export/pdf', '_blank');
  }
  async function loadBugs() {
    try {
      const bugs = await getBugs();

      setBugs(bugs);
    } catch (err) {
      showErrorMsg('Failed to load bugs from server');
    }
  }

  async function onRemoveBug(bugId) {
    try {
      await deleteBug(bugId);

      setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== bugId));
      showSuccessMsg('Bug removed');
    } catch (err) {
      showErrorMsg('Cannot remove bug');
    }
  }

  async function onAddBug(bug) {
    try {
      const savedBug = await saveBug(bug);

      setBugs((prevBugs) => [...prevBugs, savedBug]);
      showSuccessMsg('Bug added');
      setIsAddOpen(false);
    } catch (err) {
      showErrorMsg('Cannot add bug');
    }
  }

  async function onEditBug(bug) {
    try {
      const savedBug = await saveBug(bug);

      setBugs((prevBugs) =>
        prevBugs.map((currBug) => (currBug._id === savedBug._id ? savedBug : currBug))
      );
      showSuccessMsg('Bug updated');
    } catch (err) {
      showErrorMsg('Cannot update bug');
    }
  }

  return (
    <section className="bug-area">
      <h1>Bugs Area</h1>

      <main className="bugsection">
        <section>
          <input
            className="buginput"
            style={{ width: '15%' }}
            type="text"
            placeholder="Search By title"
            value={filterBy.txt}
            onChange={(ev) => setFilterBy({ ...filterBy, txt: ev.target.value })}
          />
          <input
            style={{ width: '15%', marginBottom: '15px' }}
            className="buginput"
            type="number"
            placeholder="min siverity"
            value={filterBy.severity}
            onChange={(ev) => setFilterBy({ ...filterBy, severity: ev.target.value })}
          />
        </section>
        {loggedInUser?.role === 'admin' && <Link to="/admin/users" >User Management</Link>}
        <button className="bugbutton" onClick={onDownloadPDF}>
          Download PDF Report
        </button>
        <button className="bugbutton" onClick={() => setIsAddOpen(true)}>
          Add Bug
        </button>
        <BugList user={user} bugs={filterBugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />

        <AddBugModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={onAddBug} />
      </main>
    </section>
  );
}

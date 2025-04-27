import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBugs } from '../services/bug.service';

import { BugList } from '../cmps/BugList';
import { getLoggedinUser } from '../services/auth.service';
import { showErrorMsg } from '../services/event-bus.service';

export default function Userdetails({ user, setUser }) {
  const loggedInUser = user || getLoggedinUser();
  const userId = loggedInUser?._id;

  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    loadBugs();
  }, []);

  async function loadBugs() {
    try {
      const allBugs = await getBugs();
      // only those you own
      const myBugs = allBugs.filter((bug) => bug.ownerId === userId);
      setBugs(myBugs);
    } catch (err) {
      showErrorMsg('Failed to load bugs from server');
    }
  }
  if (!Array.isArray(bugs)) {
    console.log('Current user:', user);
    console.error('BugList expected array but got:', bugs);
    return <p>bugs not available</p>;
  }

  if (!loggedInUser || loggedInUser._id !== userId) {
    return <div>Access denied. Please log in to view your profile.</div>;
  }

  return (
    <section className="userDetails">
      <h2>{loggedInUser.fullname}’s Profile</h2>
      <p>Email: {loggedInUser.email}</p>
      <BugList bugs={bugs} user={loggedInUser} />
    </section>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getBugs} from '../services/bug.service';

import{ BugList} from '../cmps/BugList';
import { getLoggedinUser } from '../services/auth.service';

export default function Userdetails({ user, setUser }) {
  const { userId } = useParams();

  const [bug, setBug] = useState([]);

  useEffect(() => {
    if (user === userId) {
      getBugs({ ownerId: userId }).then(setBug);
    }
  },[]);
  if (!user) {
    return <div>Access denied. Please log in to view your profile.</div>;
  }

  return (
    <section className="userDetails">
      <h2>{user.fullname}’s Profile</h2>
      <p>Email : {user.email}</p>
      <h2>My Bugs</h2>
      <BugList bug={bug}></BugList>
    </section>
  );
}

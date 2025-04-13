import axios from 'axios';

export async function getBugs() {
  try {
    const res = await axios.get('http://localhost:3030/api/bug');
    console.log('Fetched bugs:', res.data);
    return res.data;
  } catch (err) {
    console.error(' Failed to fetch bugs:', err.message);
    return [];
  }
}

export async function getBugsById(id) {
  const res = await axios.get(`/bug/${id}`);
  return res.data;
}

export async function saveBug(bug) {
  try {
    const res = bug._id ? await axios.put('/bug', bug) : await axios.post('/bug', bug);
    return res.data;
  } catch (err) {
    if (err.response?.status === 401) alert('you most log in to add an bug');
    throw err;
  }
}

export async function deleteBug(id) {
  try {
    await axios.delete(`bug/${id}`);
  } catch (err) {
    if (err.response?.status === 401) alert('you most log in to delete a bug.');
  }
}

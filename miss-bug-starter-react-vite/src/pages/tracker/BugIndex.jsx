import {  deleteBug, getBugs, saveBug } from '../../services/bug.service.js';
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js';
import {BugList} from '../../cmps/BugList.jsx';
import { useState } from 'react'
import { useEffect } from 'react'


export function BugIndex({user}) {
    console.log('Current user:', user)   
    const [bugs, setBugs] = useState([])
    const [filterBy,setFilterBy] = useState({
        txt:'', severity: '',
    })
    function onDownloadPDF() {
        window.open('http://localhost:3030/api/bug/export/pdf', '_blank')
    }


    const filterBugs = bugs.filter(bug => {
        const title = bug.title || ''
        const matchesTxt = title.toLowerCase().includes(filterBy.txt.toLowerCase())
        const matchesSeverity = filterBy.severity ? bug.severity >= + filterBy.severity : true
        return matchesTxt && matchesSeverity
    })

    useEffect(() => {
        loadBugs()
    }, [])

    async function loadBugs() {
        try {
            const bugs = await getBugs()
            console.log(' Loaded bugs:', bugs)
            setBugs(bugs)
        } catch (err) {
            console.error(' Failed to load bugs:', err)
            showErrorMsg('Failed to load bugs from server')
        }
    }
    

    async function onRemoveBug(bugId) {
        try {
            await deleteBug(bugId)
            
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?') || 'Untitled Bug',
            severity: +prompt('Bug severity?') || 1,
            description: prompt('Bug description?') || 'No description'
        }
        console.log(' Sending bug:', bug)
        try {
            const savedBug = await saveBug(bug)
            console.log('Added Bug', savedBug)
            setBugs(prevBugs => [...prevBugs, savedBug])
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {

            const savedBug = await saveBug(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    return (
        <section className='bug-area'>
            <h1>Bugs Area</h1>
            
            <main className='bugsection'>
            <section >
                <input className='buginput'
                type='text'
                placeholder='Search By title'
                value={filterBy.txt}
                onChange={(ev) => setFilterBy({...filterBy, txt: ev.target.value})}
                />
                <input
                className='buginput'
                type='number'
                placeholder='min siverity'
                value={filterBy.severity}
                onChange={(ev) => setFilterBy({...filterBy, severity: ev.target.value})}
                />
            </section>
                <button className='bugbutton' onClick={onDownloadPDF}>Download PDF Report</button>
                <button className='bugbutton' onClick={() => onAddBug()}>Add Bug </button>
                <BugList 
                user={user}
                bugs={filterBugs} 
                onRemoveBug={onRemoveBug} 
                onEditBug={onEditBug} />
            </main>
        </section>
    )
}

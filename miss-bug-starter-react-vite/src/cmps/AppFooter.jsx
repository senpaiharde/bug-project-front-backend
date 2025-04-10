import { useEffect } from 'react'
import { showSuccessMsg } from '../services/event-bus.service'

export function AppFooter () {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <footer className='container'>
            <p>
                coffeerights to all
            </p>
        </footer>
    )

}
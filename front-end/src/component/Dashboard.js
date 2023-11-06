import { React } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='container'>
            <p>Dashboard container</p>
            <Link to='/register'>
                <button>Register</button>
            </Link>
        </div>
    )
}

export default Dashboard
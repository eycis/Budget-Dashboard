import { HomeIcon, ChartBarIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className="w-min h-screen bg-[#141414] p-4 flex flex-col items-start">
        <div className="nav-icons">
        <Link to="/">
            <button>
                <HomeIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
        <Link to="/Input">
            <button>
                <PlusCircleIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
            <ChartBarIcon className="h-10 w-10" />
        </div>
  </div>
  )
}

export default Nav
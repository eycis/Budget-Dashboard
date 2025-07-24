import { HomeIcon, ChartBarIcon, PlusCircleIcon, BellIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Link from "next/link";

const Nav = () => {

  return (
    <div className="w-min min-h-screen bg-[#141414] p-4 items-start">
        <div className="nav-icons">
        <Link href="/">
            <button>
                <HomeIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
        <Link href="/Input">
            <button>
                <PlusCircleIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
        <Link href="/Statistics">
            <button>
            <ChartBarIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
        <Link href="/Notifications">
          <button>
            <BellIcon className="h-10 w-10" />
          </button>
        </Link>
      </div>
      <div className="nav-icons absolute bottom-5">
        <Link href="/Login">
          <button>
          <UserCircleIcon className="h-10 w-10" />
          </button>
        </Link>
      </div>
  </div>
  )
}

export default Nav
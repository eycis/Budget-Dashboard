import { HomeIcon, ChartBarIcon, PlusCircleIcon, BellIcon, ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import Link from "next/link";

type LoginProps = {
  loginState : boolean;
}

//const Nav = ({loginState} : LoginProps) => {
const Nav = () => {

  //TODO: přes props předat bool, zda je uživatel připojen/není, na základě toho zobrazíme tlačítko. 
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
        {/* <Link to="/Input"> */}
            <button>
                <PlusCircleIcon className="h-10 w-10" />
            </button>
        {/* </Link> */}
        </div>
        {/* <div className="nav-icons">
        <Link to="/Statistics">
            <button>
            <ChartBarIcon className="h-10 w-10" />
            </button>
        </Link>
        </div>
        <div className="nav-icons">
        <Link to="/Notifications">
          <button>
            <BellIcon className="h-10 w-10" />
          </button>
        </Link>
      </div>
      <div className="nav-icons">
        <Link to="/Login">
          <button>
          <UserCircleIcon className="h-10 w-10" />
          </button>
        </Link>
      </div> */}
  </div>
  )
}

export default Nav
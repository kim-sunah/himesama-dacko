
import { Link } from "react-router-dom"
import { NavigationMenuLink, NavigationMenuItem, NavigationMenuList, NavigationMenu } from "./navigation-menu"
import { HeaderButton } from "./Headerbutton"
import { SheetTrigger, SheetContent, Sheet } from "./sheet"
import { CollapsibleTrigger, CollapsibleContent, Collapsible } from "./collapsible"
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react"
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "../../../styles/header.css"
import Login, { useLoginModal } from "../../login/Login"



export function Mainheader() {
  const [HeaderToggle, SetHeaderToggle] = useState<boolean>(true);

  const { Loginopen, handleLoginOpen, handleLoginClose } = useLoginModal();

  const ToggleHandler = () => {
    SetHeaderToggle(!HeaderToggle);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-8 md:px-16 main-header" >
      <div>
        <NavigationMenu className="flex justify-center mt-3 md:flex " >
          <NavigationMenuList >
            <NavigationMenuLink >
              <Link to="/" className="  group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">홈</Link>
            </NavigationMenuLink>
            {/* <NavigationMenuLink >
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                ABOUT
              </Link>
            </NavigationMenuLink>

            <NavigationMenuItem>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Feature
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}><Link
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  to="#"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">Analytics</div>
                  <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                    Upgrade your reporting with advanced analytics.
                  </div>
                </Link></MenuItem>
                <MenuItem onClick={handleClose}><Link
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  to="#"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">Analytics</div>
                  <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                    Upgrade your reporting with advanced analytics.
                  </div>
                </Link></MenuItem>
                <MenuItem onClick={handleClose}><Link
                  className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                  to="#"
                >
                  <div className="text-sm font-medium leading-none group-hover:underline">Analytics</div>
                  <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                    Upgrade your reporting with advanced analytics.
                  </div>
                </Link></MenuItem>
              </Menu>
            </NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="#"
              >
                PRICING
              </Link>
            </NavigationMenuLink> */}
            <NavigationMenuLink asChild>
              <Link
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                to="/Introduction"
              >
                홈페이지 소개
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>

        </NavigationMenu>
        


      </div>
  
      <div className="flex items-center gap-4 ml-auto" style={{alignItems:"end"}}>
        <Button
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          style={{ color: "white" }}
          onClick={handleLoginOpen}
        >
          Login
        </Button>
      </div>
      <Login open={Loginopen} handleClose={handleLoginClose}></Login>
    </header>
  )
}




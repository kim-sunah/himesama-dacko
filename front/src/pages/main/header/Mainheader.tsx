
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



export function Mainheader() {
  const [HeaderToggle, SetHeaderToggle] = useState<boolean>(true);

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
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Link to="#" className="mr-6 hidden lg:flex">
        <AiOutlineMenu className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <HeaderButton onClick={ToggleHandler} variant="outline" size="icon" className="lg:hidden">
            <AiOutlineMenu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </HeaderButton>
        </SheetTrigger>
        <SheetContent side="left">
          <Link to="#">
            <AiOutlineMenu />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link to="/" className="flex w-full items-center py-2 text-lg font-semibold text-black">
              Youtube Search
            </Link>
            <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold text-black">
              About
            </Link>
            <Collapsible className="grid gap-4">
              <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 text-black">
                Features
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="-mx-6 grid gap-6 bg-gray-100 p-6 dark:bg-gray-800">
                  <Link to="#" className="group grid h-auto w-full justify-start gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">Analytics</div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Upgrade your reporting with advanced analytics.
                    </div>
                  </Link>
                  <Link to="#" className="group grid h-auto w-full justify-start gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">Developer Tools</div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Extend your application with our developer tools.
                    </div>
                  </Link>
                  <Link to="#" className="group grid h-auto w-full justify-start gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">
                      Security &amp; Compliance
                    </div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Keep your data secure with our security features.
                    </div>
                  </Link>
                  <Link to="#" className="group grid h-auto w-full justify-start gap-1">
                    <div className="text-sm font-medium leading-none group-hover:underline">Scalability</div>
                    <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                      Scale your application with our infrastructure.
                    </div>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
            <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold text-black">
              Pricing
            </Link>
            <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold text-black">
              Contact
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      <div className="hidden-mobile">
      <NavigationMenu className="flex justify-center mt-3 sm:hidden md:flex " >
        <NavigationMenuList >
          <NavigationMenuLink >
            <Link to="/" className="  group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50">Youtube Search</Link>
          </NavigationMenuLink>
          <NavigationMenuLink >
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
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              to="#"
            >
              CONTACT
            </Link>
          </NavigationMenuLink>


        </NavigationMenuList>
      </NavigationMenu>

      </div>
      




    </header>
  )
}

interface IconProps {
  className?: string;
  // 다른 prop들도 여기에 추가할 수 있습니다.
}

const ChevronRightIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

const MenuIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

const MountainIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

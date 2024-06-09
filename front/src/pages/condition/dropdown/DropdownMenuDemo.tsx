import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "../../../component/v0/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "../../../component/v0/dropdown-menu"
import { InputWithLabel } from "../../../component/input/InputWithLabel"
import { InputWithoutLabel } from "../../../component/input/InputWithoutLabel"
  
  export function DropdownMenuDemo() {
    return (
      <DropdownMenu >
        <DropdownMenuTrigger asChild >
          <Button variant="outline">Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-120 ">
          <DropdownMenuLabel  className=" text-center">조건 검색</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="flex gap-5">
      
          <InputWithoutLabel></InputWithoutLabel>
          </div>
          <div className="flex gap-5">
     
          <InputWithoutLabel></InputWithoutLabel>
          </div>
          <div className="flex gap-5">
     
          <InputWithoutLabel></InputWithoutLabel>
          </div>
       
        
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  
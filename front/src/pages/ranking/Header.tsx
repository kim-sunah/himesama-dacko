import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../../component/v0/dropdown-menu"
import { Button } from "../../component/v0/button"
import { Input } from "../../component/v0/input"
import { useLocation, useNavigate } from "react-router-dom"

export default function Header(){
  const navigate = useNavigate()
  const location = useLocation();
  console.log(location.search.substring(1))
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 mt-8 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Rankings</h1>
            <div>
              <Tabs defaultValue={location.search ? location.search.substring(1) : "today"}>
                <TabsList>
                  <TabsTrigger value="today" onClick={() => navigate("?today")}>Today</TabsTrigger>
                  <TabsTrigger value="week" onClick={() => navigate("?week")}>This Week</TabsTrigger>
                  <TabsTrigger value="month" onClick={() => navigate("?month")}>This Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </header>
      )

}
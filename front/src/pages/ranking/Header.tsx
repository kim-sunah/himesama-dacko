import { Tabs, TabsList, TabsTrigger } from "../../component/v0/tabs"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../../component/v0/dropdown-menu"
import { Button } from "../../component/v0/button"
import { Input } from "../../component/v0/input"

export default function Header(){
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6 mt-8 mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Rankings</h1>
            <div className="hidden sm:flex">
              <Tabs defaultValue="today" >
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {/* <ArrowUpDownIcon className="h-4 w-4" /> */}
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value="popular">
                  <DropdownMenuRadioItem value="popular">Asc</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Desc</DropdownMenuRadioItem>
                  
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      )

}
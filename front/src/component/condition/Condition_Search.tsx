import { DropdownMenu } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function ConditionSearch(){
    return(
        <section className="container px-4 md:px-6 grid gap-10 items-start py-8">
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
          <div className="text-sm font-semibold pl-4 sm:pl-0">Filter: </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2"
            type="button"
            id="radix-:r61:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            Category{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2"
            type="button"
            id="radix-:r63:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            Price Range{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2"
            type="button"
            id="radix-:r65:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            Rating{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 ml-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 sm:ml-auto shrink-0"
            type="button"
            id="radix-:r67:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-4 h-4 mr-2"
            >
              <path d="m21 16-4 4-4-4"></path>
              <path d="M17 20V4"></path>
              <path d="m3 8 4-4 4 4"></path>
              <path d="M7 4v16"></path>
            </svg>
            Sort by
          </button>
        </div>
        <div className="grid gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">Search Results</h1>
              <p className="text-gray-500 dark:text-gray-400">Showing 24 of 1,234 results</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
         
            
        
        
       
           
           
            
          </div>
          
        </div>
      </section>
    )
}
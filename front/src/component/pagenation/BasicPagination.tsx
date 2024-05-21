import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicPagination() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const Path = currentPath.split('/')[1];
    console.log(Path)
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
      const query = window.location.search;
  
      if(currentPath.includes("Condition_Search")){
        if(query.includes("Min") && query.includes("Max")){
       
          navigate(`/Condition_Search/${page}${query}`)
        }
        else{
          navigate(`/Condition_Search/${page}`)
        }
   
      }
      else{
        if(Path === "Ranking"){
          if(select){
            navigate(`/${Path+"/"+page}?select=${select}`)
          }
          else{
            navigate(`/${Path+"/"+page}`)
          }
            
        }

      }
     
       
    }
  return (
    <Stack spacing={2}>
        <Pagination count={100} variant="outlined" size="large" onChange={handleChange} />
    
    </Stack>
  );
}
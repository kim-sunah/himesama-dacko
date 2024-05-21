import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicPagination() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const Path = currentPath.split('/')[2];
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');

    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
      const query = window.location.search;
      console.log(query)
      if(currentPath.includes("Condition_Search")){
        if(select && query){
          navigate(`/Condition_Search/${page}?${query}?select=${select}`)
        }
        else if(select){
          navigate(`/Condition_Search/${page}?select=${select}`)
        }
        navigate(`/Condition_Search/${page}?${query}`)
        
      
      }
      else{
        if(Path === "Subscriber_Rankings" || Path === "View_Rankings"){
          if(select){
            navigate(`/Ranking/${Path+"/"+page}?select=${select}`)
          }
          else{
            navigate(`/Ranking/${Path+"/"+page}`)
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
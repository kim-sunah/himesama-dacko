import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicPagination() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const RankingPath = currentPath.split('/')[1];
    const Path = currentPath.split('/')[2];
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
      
      const query = window.location.search;
  
      if(currentPath.includes("Condition_Search")){
        navigate(`/Condition_Search/${Path}/${page}${query}`)
   
      }
      else{
        if(currentPath.includes("Ranking")){
          if(select){
            navigate(`/${RankingPath+"/"+page}?select=${select}`)
          }
          else{
            navigate(`/${RankingPath+"/"+page}`)
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
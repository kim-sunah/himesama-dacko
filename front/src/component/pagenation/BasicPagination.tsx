import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicPagination() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const rankingPath = currentPath.split('/')[2];
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');
   
  
    const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
        if(rankingPath === "Subscriber_Rankings" || rankingPath === "View_Rankings"){
          if(select){
        
            navigate(`/Ranking/${rankingPath+"/"+page}?select=${select}`)
          }
          else{
            navigate(`/Ranking/${rankingPath+"/"+page}`)
          }
            
        }
       
    }
  return (
    <Stack spacing={2}>
        <Pagination count={100} variant="outlined" size="large" onChange={handleChange} />
    
    </Stack>
  );
}
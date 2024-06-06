import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicPagination() {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const RankingPath = currentPath.split('/')[1];
    const Path = currentPath.split('/')[2];
    const queryParams = new URLSearchParams(location.search);
    const select = queryParams.get('select');

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 600) {
          setSize('small');
        } else if (window.innerWidth < 960) {
          setSize('medium');
        } else {
          setSize('large');
        }
      };
  
      handleResize(); // 초기 사이즈 설정
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
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
    <Stack spacing={3}>
        <Pagination count={100} variant="outlined" size={size} onChange={handleChange} />
    
    </Stack>
  );
}
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function YoutubeBasicPagenation(props: { nextPageToken?: string, prevPageToken?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const queryParams = new URLSearchParams(location.search);

    if (value > page && props.nextPageToken) {
      queryParams.set('PageToken', props.nextPageToken);
    } else if (value < page && props.prevPageToken) {
      queryParams.set('PageToken', props.prevPageToken);
    }

    navigate(`${currentPath}?${queryParams.toString()}`);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={100}
        variant="outlined"
        size="large"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Cookies} from 'react-cookie';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RootModal() {
    const cookies = new Cookies();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    cookies.set("START_MODAL", false, { path: '/', maxAge: 3600 }); 
    setOpen(false)
};

  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     
           
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            소개란.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            현재 취미로 개발중인 학생입니다.<br></br>현재 개발상태입니다. 만약 사용해주시고 이런게 있다면 좋겠다. 이런건 없어도 될꺼같다. 하는 의견을 주시면 적극 반영하겠습니다. <br></br>감사합니다.
          </Typography>
          <Button variant="contained" style={{float:"right"}} onClick={handleClose}>창 닫기</Button>
        </Box>

       
        
      </Modal>
    </div>
  );
}
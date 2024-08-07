import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Label } from "../../component/v0/label"
import { Input } from "../../component/v0/input"
import { Button } from "../../component/v0/button"
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import kakao from "../../assets/free-icon-kakao-talk-3669973.png"
import Google from "../../assets/web_light_rd_na@1x.png"


interface FadeProps {
    children: React.ReactElement;
    in?: boolean;
    onClick?: any;
    onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
    onExited?: (node: HTMLElement, isAppearing: boolean) => void;
    ownerState?: any;
}
const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null as any, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null as any, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

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

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}
export default function Login({ open, handleClose }: LoginModalProps) {

    const KakaoLogin = () => {
        const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`
      
        window.location.href = KAKAO_URL
    }
    return (
        <div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="bg-gray-100 flex items-center justify-center">
                            <div className="max-w-sm rounded-lg shadow-lg bg-white p-6 space-y-6 border border-gray-200 dark:border-gray-700">
                                <div className="space-y-2 text-center">
                                    <h1 className="text-2xl font-bold">간편 로그인</h1>
                                   
                                </div>
                                <div className="space-y-4 w-80">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" placeholder="m@example.com" required type="email" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                                        <span className="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
                                        <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                                    </div>
                                    <div className='flex justify-center gap-8'>
                                        
                                    <img src={kakao} style={{ width: "50px", height: "50px", cursor: "pointer" }} onClick={KakaoLogin}></img>
                                        <img src={Google} style={{ width: "50px", height: "50px" }} ></img>


                                    </div>
                                  
                                </div>
                                <div className="flex items-center space-x-2">
                                        <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                                        <span className="text-zinc-400 dark:text-zinc-300 text-sm">OR</span>
                                        <hr className="flex-grow border-zinc-200 dark:border-zinc-700" />
                                    </div>
                                    <Button className="w-full text-black " variant="outline">
                                            회원가입
                                    </Button>
                                   
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
export function useLoginModal() {
    const [Loginopen, setLoginOpen] = React.useState(false);
    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);

    return {
        Loginopen,
        handleLoginOpen,
        handleLoginClose,
    };
}
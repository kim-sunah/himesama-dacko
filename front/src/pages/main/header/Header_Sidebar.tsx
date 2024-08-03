import { Link, Outlet, useLocation } from "react-router-dom"
import { Input } from "../../../component/v0/input"
import { Avatar, AvatarImage, AvatarFallback } from "../../../component/v0/avatar"

import { FormEvent, useRef } from "react";
import Image from "../../../assets/icon.png"
import Login, { useLoginModal } from "../../login/Login";
import { Button } from "../../../component/v0/button";

export default function Header_SideBar() {

    const ChannelId = useRef<HTMLInputElement>(null);
    const loaction = useLocation();

    const { Loginopen, handleLoginOpen, handleLoginClose } = useLoginModal();

    const getYouTubeChannelId = async (event: FormEvent<HTMLFormElement>): Promise<any> => {
        event.preventDefault();
        if (ChannelId.current?.value) {
            if (ChannelId.current?.value && /^[^\\~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(ChannelId.current?.value)) {
                if (ChannelId.current!.value) {

                    window.location.href = `/seachlist/${ChannelId.current!.value}`;
                    (event.target as HTMLFormElement).reset();
                }
            }
            else {
                alert("특수문자가 포함되어있습니다.");
            }
        }
    }
    return (

        <div className="flex min-h-screen w-full">
            <aside className="bg-background border-r px-10 py-10 hidden md:flex flex-col gap-4 w-60">
                <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-black">
                    {/* <LogInIcon className="w-6 h-6 text-primary" /> */}
                    <span className="whitespace-nowrap ">메인메뉴</span>
                </Link>
                <nav className="flex flex-col gap-4">

                    <Link
                        to="/Ranking/subscribers/0"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-black"

                    >
                        {/* <LayoutGridIcon className="w-5 h-5" /> */}
                        <span className="whitespace-nowrap">카테고리 자세히</span>
                    </Link>
                    <Link
                        to="/YoutubeCondition"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-black"

                    >
                        {/* <ClipboardIcon className="w-5 h-5" /> */}
                        <span className="whitespace-nowrap ">유투브 조건 검색</span>
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground  text-black "

                    >
                        {/* <UsersIcon className="w-5 h-5" /> */}
                        <span className="whitespace-nowrap">공지사항 & 문의</span>
                    </Link>
                    <Link
                        to="/Introduction"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground  text-black "

                    >
                        {/* <UsersIcon className="w-5 h-5" /> */}
                        <span className="whitespace-nowrap">홈페이지 소개</span>
                    </Link>
                </nav>
            </aside>
            <div className="flex flex-col w-full">
                <header className="bg-background border-b px-4 py-3 flex items-center gap-4 mb-4">





                    <form onSubmit={getYouTubeChannelId} className="flex-1 flex justify-center relative">
                        <Input type="search" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-full w-full max-w-md" ref={ChannelId} />
                    </form>
                    {/* <Avatar className="border">
                        <AvatarImage src="/placeholder-user.jpg" alt="User avatar" style={{ width: "20%" }} />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar> */}
                    <Button
                        variant="destructive"
                        className="text-black"
                       
                        onClick={handleLoginOpen}
                    >
                         로그인
                    </Button>
                    <Login open={Loginopen} handleClose={handleLoginClose}></Login>
                </header>

                <main>
                    <Outlet></Outlet>
                </main>
            </div>
        </div>


    )
}


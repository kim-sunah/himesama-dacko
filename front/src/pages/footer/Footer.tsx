import { Link } from "react-router-dom";
import test from "../../assets/test.png"

import classes from "../../styles/footer.module.css"
export default function Footer() {
  return (
    <footer className={`bg-gray-900 text-white py-6 px-4 md:px-6 ${classes.footer}`}>
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm">&copy; 2024</p>
        <div className="flex items-center gap-7">
          <p className="text-sm hover:underline whitespace-nowrap">사업자등록번호: 568-25-01702</p>
          <p className="text-sm hover:underline whitespace-nowrap">대표: 김선아</p>
          <p className="text-sm hover:underline whitespace-nowrap">주소: 경기도 이천시 마장면 ~</p>
          <p className="text-sm hover:underline whitespace-nowrap">이메일: chlxodud04@naver.com</p>
        </div>
      </div>
    </footer>

  )
}
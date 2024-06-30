export  function ScrollDown (number:  number)  {
    window.scrollBy({
        top: number, // 스크롤할 픽셀 수 (원하는 만큼 조절 가능)
        left: 0,
        behavior: 'smooth' // 부드러운 스크롤 효과
    });
};

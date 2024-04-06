
interface Info{
    subscriberCount  : string
    videoCount : string
    viewCount : string
}
export default function Body(){
    
    return (
        <section className="mt-10 bg-white rounded-lg max-w-6xl shadow px-6 py-4 " style={{textAlign:"center", margin:"0px auto" ,marginTop:"2rem"}}>
            <div style={{textAlign:"center"}}>asdasd</div>
            <div className="grid grid-cols-2 gap-8 mt-6">
              <div>
                <h3 className="text-lg font-semibold">구독자 수</h3>
                <p className="text-3xl font-bold text-[#1e0a3c]">249,000,000</p>
              </div>
              {/* <div>
                <h3 className="text-lg font-semibold">예상 수익(월평균, 최근 1개월)</h3>
                <p className="text-3xl font-bold text-[#1e0a3c]">₩ 7,049,535,235</p>
                <p className="text-sm">CPM: ₩ 1,812.54 ~ ₩ 5,610.23</p>
              </div> */}
              <div>
                <h3 className="text-lg font-semibold">총 조회수</h3>
                <p className="text-3xl font-bold text-[#1e0a3c]">₩ 4,668,809,085</p>
                <p className="text-sm">CPM: ₩ 26.972,25 ~ ₩ 31,287.81</p>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <div>
                <p className="text-sm">영상 별 평균 조회수 : 61055679</p>
              </div>
            </div>
          </section>
        
    )
}


import InputDropdown from '../dropdown/InputDropdown';


export default function ConditionSearch() {


  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">DB 조건 검색</h1>
        <div style={{textAlign:"right", display:"flex"}}>
        <InputDropdown title="Influencer Filter"></InputDropdown>
        <InputDropdown title="Video Filter"></InputDropdown>
        </div>
      </div>
    </section>

  )
}
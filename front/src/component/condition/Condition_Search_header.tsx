

import { NavDropdown } from 'react-bootstrap';
import InfluencerFilterDropdown from '../dropdown/InfluencerFilterDropdown';
import VideoFilterDropdown from '../dropdown/VideoFilterDropdown';
import { Link, useLocation } from 'react-router-dom';


export default function ConditionSearch() {
  const location = useLocation();
  const currentPath = location.pathname;
  const Path = currentPath.split('/')[2];


  return (
    <section className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-4">
        <NavDropdown title="DB 조건 검색" id="collapsible-nav-dropdown" style={{ fontWeight: "bold", fontSize: "2rem" }}>
          <NavDropdown.Item  href="/Condition_Search/InfluencerFilter/1"style={{ fontWeight: "bold", fontSize: "1rem" }}> influencer Filter</NavDropdown.Item>
          <NavDropdown.Item  href="/Condition_Search/VideoFilter/1" style={{ fontWeight: "bold", fontSize: "1rem" }}>Video Filter</NavDropdown.Item>

        </NavDropdown>
        <div style={{ textAlign: "right", display: "flex" }}>

          {Path === "InfluencerFilter" && <InfluencerFilterDropdown title="Influencer Filter"></InfluencerFilterDropdown>}
          {Path === "VideoFilter" && <VideoFilterDropdown title="Video Filter"></VideoFilterDropdown>}
        </div>
      </div>
    </section>

  )
}
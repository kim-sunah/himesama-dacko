import { useRef, useState, useEffect } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Postmethod from "../../http/Post_method";
import { BsFilterLeft } from "react-icons/bs";

interface InputDropdownProps {
  title: string;
}

const InfluencerFilterDropdown : React.FC<InputDropdownProps> = ({title}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [subscriberMin, setSubscriberMin] = useState("");
  const [subscriberMax, setSubscriberMax] = useState("");
  const [viewMin, setViewMin] = useState("");
  const [viewMax, setViewMax] = useState("");
  const [videoMin, setVideoMin] = useState("");
  const [videoMax, setVideoMax] = useState("");

  const formhandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const queryParams: Record<string, string> = {};

    if (subscriberMin && subscriberMax) {
      queryParams.SubscriberMin = subscriberMin;
      queryParams.SubscriberMax = subscriberMax;
    }
    if (viewMin && viewMax) {
      queryParams.ViewMin = viewMin;
      queryParams.ViewMax = viewMax;
    }
   
    if (videoMin &&  videoMax) {
      queryParams.VideoMin = videoMin;
      queryParams.VideoMax = videoMax;
    }
   
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`${location.pathname}?${queryString}`);
  };

  return (
    <Nav className="me-auto" style={{display:"flex"}}>
    
      <NavDropdown title={title} id="collapsible-nav-dropdown" >
        <form onSubmit={formhandler} className="px-4 py-2">
          <div className="flex items-center gap-2" style={{ marginBottom: "5%", marginTop: "5%" }}>
            <label htmlFor="subscriber-min">Subscriber</label>
            <input
              className="flex-1 w-40"
              id="subscriber-min"
              min="1"
              placeholder="Min"
              type="number"
              value={subscriberMin}

              onChange={(e) => setSubscriberMin(e.target.value)}
            />
            <span>-</span>
            <input
              className="flex-1 w-40"
              id="subscriber-max"
              min="1"
              placeholder="Max"
              type="number"
              value={subscriberMax}
              onChange={(e) => setSubscriberMax(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2" style={{ marginBottom: "5%" }}>
            <label htmlFor="view-min" style={{ paddingRight: "9%" }}>View</label>
            <input
              className="flex-1 w-40"
              id="view-min"
              min="1"
              placeholder="Min"
              type="number"
              value={viewMin}
              onChange={(e) => setViewMin(e.target.value)}
            />
            <span>-</span>
            <input
              className="flex-1 w-40"
              id="view-max"
              min="1"
              placeholder="Max"
              type="number"
              value={viewMax}
              onChange={(e) => setViewMax(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2" style={{ marginBottom: "5%" }}>
            <label htmlFor="video-min" style={{ paddingRight: "8%" }}>Video</label>
            <input
              className="flex-1 w-40"
              id="video-min"
              min="1"
              placeholder="Min"
              type="number"
              value={videoMin}
              onChange={(e) => setVideoMin(e.target.value)}
            />
            <span>-</span>
            <input
              className="flex-1 w-40"
              id="video-max"
              min="1"
              placeholder="Max"
              type="number"
              value={videoMax}
              onChange={(e) => setVideoMax(e.target.value)}
            />
          </div>
          <div className="px-4 py-2">
            <Button className="w-full" type="submit" style={{ border: "1px solid gray" }}>Submit</Button>
          </div>
        </form>
      </NavDropdown>
    </Nav>
  );
};

export default InfluencerFilterDropdown;

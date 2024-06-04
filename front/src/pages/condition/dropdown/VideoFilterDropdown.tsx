import {  useState,  } from "react";
import { Nav,  } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "react-datepicker/dist/react-datepicker.css";
import { BsFilterLeft } from "react-icons/bs";
import React from "react";
import "../../../styles/Condition.css"

interface InputDropdownProps {
    title: string;
}

const VideoFilterDropdown: React.FC<InputDropdownProps> = ({ title }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [LikeMin, setLikeMin] = useState("");
    const [LikeMax, setLikeMax] = useState("");
    const [viewMin, setViewMin] = useState("");
    const [viewMax, setViewMax] = useState("");
    const [commentMin, setcommentMin] = useState("");
    const [commentMax, setcommentMax] = useState("");
    const [StartselectedDate, StartsetSelectedDate] = useState<Date | null>(null);
    const [EndelectedDate, EndsetSelectedDate] = useState<Date | null>(null);

    const formhandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const queryParams: Record<string, string> = {};

        if (LikeMin && LikeMax) {
            queryParams.LikeMin = LikeMin;
            queryParams.LikeMax = LikeMax;
        }
        if (viewMin && viewMax) {
            queryParams.ViewMin = viewMin;
            queryParams.ViewMax = viewMax;
        }

        if (commentMin && commentMax) {
            queryParams.commentMin = commentMin;
            queryParams.commentMax = commentMax;
        }
        if (StartselectedDate && EndelectedDate) {
            queryParams.StartselectedDate = StartselectedDate.toISOString();
            queryParams.EndselectedDate = EndelectedDate.toISOString();
        }

        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`${location.pathname}?${queryString}`);
    };

    const StarthandleDateChange = (date: Date | null) => {
        StartsetSelectedDate(date);
        if (date) {
            console.log("Selected date:", date.toISOString());
        }
    };
    const EndhandleDateChange = (date: Date | null) => {
        EndsetSelectedDate(date);
        if (date) {
            console.log("Selected date:", date.toISOString());
        }
    };

    const [Video, setVideo] = React.useState(false);

    const toggleInfluencer = () => {
        setVideo(prevState => !prevState);
    };

    return (
        <div>
        <BsFilterLeft
            className="dropbtn"
            size="40"
            title="Influencer Filter"
            onClick={toggleInfluencer}
        />
        {Video && (
            <Nav className="dropdown-content" style={{
                position: 'absolute',
                top: '60px',
                right: '10px',
                width: '500px',
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid gray',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                borderRadius: '4%',
                zIndex: 1000, // ensure it's on top
                overflow: 'hidden'
            }}>
                <form onSubmit={formhandler}>
                    <div className="flex items-center gap-2" style={{ marginBottom: "5%", marginTop: "5%" }}>
                        <label htmlFor="subscriber-min">Like</label>
                        <input
                            className="flex-1 w-40"
                            id="subscriber-min"
                            min="1"
                            placeholder="Min"
                            type="number"
                            value={LikeMin}
                          
                            onChange={(e) => setLikeMin(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            className="flex-1 w-40"
                            id="subscriber-max"
                            min="1"
                            placeholder="Max"
                            type="number"
                            value={LikeMax}
                            onChange={(e) => setLikeMax(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2" style={{ marginBottom: "5%" }}>
                        <label htmlFor="view-min">View</label>
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
                        <label htmlFor="video-min">Comment</label>
                        <input
                            className="flex-1 w-40"
                            id="video-min"
                            min="1"
                            placeholder="Min"
                            type="number"
                            value={commentMin}
                            onChange={(e) => setcommentMin(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            className="flex-1 w-40"
                            id="video-max"
                            min="1"
                            placeholder="Max"
                            type="number"
                            value={commentMax}
                            onChange={(e) => setcommentMax(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2" style={{ marginBottom: "5%" }}>
                        <label htmlFor="video-min">UploadDay</label>
                        <div>
                            <input type="date"></input>
                            {/* <DatePicker
                                selected={StartselectedDate}
                                onChange={(date) => StarthandleDateChange(date)}
                                dateFormat="yyyy/MM/dd"
                            /> */}
                        </div>
                        <span>-</span>
                        <div>
                        <input type="date"></input>
                            {/* <DatePicker
                                selected={EndelectedDate}
                                onChange={(date) => EndhandleDateChange(date)}
                                dateFormat="yyyy/MM/dd"
                            /> */}
                        </div>
                    </div>
                    <div className="px-4 py-2">
                        <Button className="w-full" type="submit" style={{ border: "1px solid gray" }}>Submit</Button>
                    </div>
                </form>
            </Nav>
        )}
    </div>
    );
};

export default VideoFilterDropdown;

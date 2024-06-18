import React, { useState, useRef, Children } from "react";
import classes from "../../styles/Live.module.css";
import { LiveVideo } from "../../enum/Live";
import { PopularVideo } from "../../enum/Popular";

type VideoId = { videoId: string };

interface LiveModalProps {
  handleCloseModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  selectedVideo: LiveVideo | PopularVideo | null;
  children: React.ReactNode;
  videolist: PopularVideo[];
}

const formatDuration = (duration: string): string => {
  let hours = 0, minutes = 0, seconds = 0;
  duration.match(/(\d+)(?=[HMS])/g)?.forEach((part, index, parts) => {
    if (duration.includes('H')) hours = parseInt(parts[index]);
    if (duration.includes('M')) minutes = parseInt(parts[index]);
    if (duration.includes('S')) seconds = parseInt(parts[index]);
  });
  return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');
};

const LiveModal: React.FC<LiveModalProps> = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - modalPosition.x,
      y: event.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const x = event.clientX - dragOffset.x;
      const y = event.clientY - dragOffset.y;
      setModalPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = event.deltaY;
    const container = containerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollTop + delta,
      behavior: "smooth",
    });
  };

  const getVideoSrc = () => {
    const { selectedVideo } = props;

    if (!selectedVideo) return "";

    if (typeof selectedVideo.id === "string") {
      return `https://www.youtube.com/embed/${selectedVideo.id}`;
    } else if (isVideoId(selectedVideo.id)) {
      return `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;
    }

    return "";
  };

  const isVideoId = (obj: any): obj is VideoId => {
    return typeof obj === "object" && obj !== null && "videoId" in obj;
  };

  return ( 
    <div
      className="fixed z-50 inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60"    onClick={(e) => {if (e.target === e.currentTarget) { props.handleCloseModal(e)}}}>
      <div
        id="modal-content"
        className={`${classes.modal}`}
        style={{
          transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
          maxHeight: "80vh", // 최대 높이 설정
          overflowY: "auto", // 스크롤 활성화
          scrollbarWidth: "none", // Firefox용 스크롤바 제거
          msOverflowStyle: "none", // IE/Edge용 스크롤바 제거
       
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
        ref={containerRef} // ref 추가
      >
        <div>
          <div>
         
          </div>
          <div>
            <div
              style={{
                minHeight: "275px",
                width: "100%",
                margin: "0 auto",
                position: "relative",
                paddingBottom: "56.25%",
                overflowY: "hidden",
              }}
            >
              <iframe
                className={`${classes.aspectVideoItem}`}
                src={getVideoSrc()}
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
                {props.children}
        </div>
      </div>
    </div>
  );
};

export default LiveModal;

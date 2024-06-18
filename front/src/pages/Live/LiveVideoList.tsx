// VideoList.tsx - 메인 컴포넌트
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Getmethod from '../../http/Get_method';


interface Video {
  id: string;
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchVideos = async (pageToken: string | null = null) => {
    setLoading(true);
    try {
      if(pageToken){
        const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=liveStreamingDetails&maxResults=50&pageToken=${pageToken}&chart=mostPopular&videoCategoryId=1&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
        console.log(123)
        console.log(response)
        setVideos(prevVideos => {
            const existingVideoIds = prevVideos.map(video => video.id);
            const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
            return [...prevVideos, ...filteredNewVideos];
        });
        setNextPageToken(response.nextPageToken);
      }
      else if(!pageToken){
        const response = await Getmethod(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=liveStreamingDetails&maxResults=50&chart=mostPopular&videoCategoryId=1&regionCode=KR&key=${process.env.REACT_APP_Youtube_API}`)
        console.log(234)
        console.log(response)
        setVideos(prevVideos => {
            const existingVideoIds = prevVideos.map(video => video.id);
            const filteredNewVideos = response.items.filter((video: { id: string; }) => !existingVideoIds.includes(video.id));
            return [...prevVideos, ...filteredNewVideos];
        });
        setNextPageToken(response.nextPageToken);
      }
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // 초기 로드 시 비디오를 가져옵니다.
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 10 && !loading && nextPageToken) {
          fetchVideos(nextPageToken);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [nextPageToken, loading]);

  return (
   
    <div ref={containerRef} style={{ height: '80vh', overflowY: 'auto' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
        {videos.map(video => (
          <div key={video.id} className="relative group">
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="object-cover w-full aspect-video rounded-lg"
            />
            <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-lg">
              <h3 className="font-semibold line-clamp-2" style={{ fontSize: '1rem' }}>
                {video.snippet.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default VideoList;

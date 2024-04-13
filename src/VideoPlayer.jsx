
import { useEffect, useState } from "react";
import vidoe from "./videoplayback (1).mp4";
import vidoe2 from "./videoplayback (2).mp4";
import { useRef } from 'react';
export default function VideoPlayer() {

    const [currentVideoNum, setcurrentVideoNum] = useState(0)
    const videoRef = useRef();
    let videos = [vidoe, vidoe2]


    const videoEndFun = () => {
        if (currentVideoNum < videos.length) {
            videoRef.current.src = videos[currentVideoNum]
        } else {
            setcurrentVideoNum(0)
            videoRef.current.src = videos[0]
        }
    }


    const videoPlayFun = () => {
        videoRef.current.classList.add("videoPlayAnimation")
        videoRef.current.classList.remove("videoEndAnimation")
    }

    const videoEndAnimation = () => {
        let currentTime = (videoRef.current.currentTime / 60).toFixed(2)
        let duration = (videoRef.current.duration / 60).toFixed(1)
        let playAniDuration = duration - 0.15
        console.log(currentTime, playAniDuration)
        if (currentTime > playAniDuration) {
            videoRef.current.classList.add("videoEndAnimation")
        }

    }

    useEffect(() => {
        currentVideoNum > 0 && videoEndFun()
    }, [currentVideoNum]);



    return (
        <div className="App">
            <div className="videoContainer">
                {/* overlay */}
                <video
                    width="420"
                    height="340"
                    ref={videoRef}
                    autoPlay
                    onPlay={videoPlayFun}
                    onTimeUpdate={videoEndAnimation}
                    onEnded={() => { videoEndFun(), setcurrentVideoNum((pre) => pre + 1) }}
                    controls
                >
                    <source src={videos[0]} type="video/mp4" />
                </video>
            </div>
        </div>
    );

}

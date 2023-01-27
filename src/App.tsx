import { useState, useRef } from "react";
import { audios } from "./Api";

interface AudioRef {
  [key: string]: HTMLAudioElement;
}

const App = () => {
  //current State
  const [screen, setScreen] = useState<string>("");
  const audioRefs = useRef<AudioRef>({});
  const [vol, setVol] = useState<string>("1");
  const [power, setPower] = useState<boolean>(false);

  const createRef = (padId: string) => {
    return (audioEl: HTMLAudioElement) => {
      audioRefs.current[padId] = audioEl;
    };
  };

  const playAudio = (id: string, name: string) => {
    if (power) {
      setScreen(name);
      audioRefs.current[id].volume = Number(vol);
      audioRefs.current[id].play();
    }
  };

  return (
    <div
      id="container"
      className="max-w-2xl  flex w-9/12 border-2 h-2/5 flex-row-reverse rounded-md z-10"
    >
      <h2 className="text-center font-bold font-serif  text-lime-100 absolute top-10 left-2/4 -translate-x-2/4 text-xl">
        Created By <br /> CodeMode365{" "}
        <span className="text-blue-300">(Pabin)</span>
      </h2>
      <div
        id="display"
        className="h-full w-5/12 bg-slate-500 flex flex-col items-center justify-center text-center text-lg "
      >
        <button
          id="power"
          className=" text-center flex items-center justify-center"
        >
          Power &nbsp;
          <input
            type="checkbox"
            onChange={() => setPower(!power)}
            name=""
            id=""
            className="outline-none border-none w-5 h-5 bg-slate-500 text-yellow-200"
          />
        </button>
        <div
          id="current"
          className="w-5/6 h-16 my-4 bg-slate-400 flex items-center justify-center text-blue-700 font-mono text-xl text-center"
        >
          {screen}
        </div>
        <input
          type="range"
          id="volume"
          min={0}
          max={1}
          value={vol}
          onChange={(e) => {
            setVol(e.target.value);
            setScreen(`volume: ${Math.round(Number(e.target.value) * 100)}`);
          }}
          step={0.01}
          className=" w-5/6 text-red-600 bg-red-500 outline-none"
        />
      </div>
      <div
        id="pads"
        className="w-2/3 border-1 border-yellow-100 h-full my-auto bg-gray-400 grid p-4 grid-cols-3 grid-rows-3"
        // onClick={() => play()}
      >
        {["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].map((ele, ind) => (
          <button
            className={`${ele}_Btn drum-pad border-2 m-2 bg-slate-800 font-serif text-md active:shadow-md active:shadow-amber-100 hover:bg-slate-600 outline-none`}
            id={audios[ind].name}
            key={ele}
            onClick={() => playAudio(ele, audios[ind].name)}
          >
            {ele}
            <audio
              className="clip"
              src={audios[ind].src}
              id={ele.toUpperCase()}
              ref={createRef(ele)}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;

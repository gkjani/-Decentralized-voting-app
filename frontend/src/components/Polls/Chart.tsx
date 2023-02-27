import React from "react";
import axios from "../../axios";

interface ChartProps {
  votes: any;
  enableVote?: boolean;
  userId?: number;
  userName?: string;
}

const Chart = (props: ChartProps) => {
  const votes = props.votes;

  const getButtons = () => {
    const names = [];

    const vote = (candidate: string) => {
      axios
        .post("/polls/vote", {
          id: props.userId?.toString(),
          name: props.userName,
          candidate,
        })
        .then((_) => window.location.reload())
        .catch((err) => console.log({ err }));
    };

    for (const name in votes) {
      names.push(
        <button
          onClick={() => vote(name)}
          key={name}
          className="button-wrapper text-normal"
        >

          vote
        </button>
      );
    }

    return names;
  };

  const getNames = () => {
    const names = [];

    for (const name in votes) {
      names.push(
        <div key={name} className="name-wrapper text-normal">
          {name}
        </div>
      );
    }
    return names;
  };
  const getInfo = () => {
    const infos = [];

    for (const info in votes) {
      infos.push(
        <div key={info} className="name-wrapper text-normal">
          {info}
        </div>
      );
    }
    return infos;
  };

  const getTotal = () => {
    let total = 0;

    for (const name in votes) {
      total += parseInt(votes[name]);
    }

    return total;
  };

  const getBars = () => {
    const bars = [];
    const total = getTotal();

    for (const name in votes) {
      const count = votes[name];
      bars.push(
        <div key={name} className="bar-wrapper">
          <div
            style={{
              height: count != 0 ? `${(count * 100) / total}%` : "auto",
              border: "2px solid #004985",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              color: "white",
              backgroundColor: "#004985",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            {votes[name]}
          </div>
        </div>
      );
    }

    return bars;
  };

  return (
    <div>
      <div className="bars-container">{getBars()}</div>

      {props.enableVote ? (
        <div  className="names-wrapper">{getNames()}</div>
       ):(
        <div  className="names-wrapper notEnabled">{getNames()}</div>
       )}
               {/* <div  className="names-wrapper">{getInfo()}</div> */}

      {props.enableVote ? (
        <div className="buttons-wrapper">{getButtons()}</div>
      ) : (<div className="voter_msg">You have already voted.</div>)}
    </div>
  );
};

export default Chart;

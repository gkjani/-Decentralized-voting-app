import React, { useContext, useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Finished from "../../components/Polls/Finished";
import Panel from "../../components/Polls/Panel";
import Running from "../../components/Polls/Running";
import Waiting from "../../components/Waiting";
import { AuthContext } from "../../contexts/Auth";

const User = () => {
  
  const [voteState, setVoteStatus] = useState<
    "finished" | "running" | "not-started" | "checking"
  >("checking");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", time: "", votes: {} });
  const [votable, setVotable] = useState("");
  const [count, setCount] = useState({ hour: 0, min: 0, sec: 0 });

  const authContext = useContext(AuthContext);

  useEffect(() => {

    axios
      .get("/polls/status")
      .then((res) => {
        setVoteStatus(res.data.status);
        setLoading(false);
      })
      .catch((error) => console.log({ error }));
  }, []);
  
  useEffect(() => {
    if (voteState !== "checking") {
      axios.get("/polls/").then((res) => {
        setData(res.data);
        if(voteState == "running"){
          let  vt = Number(res.data.time);
          let nt = new Date().getTime();
          if(vt <= nt){
           endElection();
          }else{
            var timeleft = vt - nt;
            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            setCount({
              hour: hours,
              min: minutes,
              sec: seconds
            })
          }
        }
       
        setLoading(false);
      });
      if(voteState == "running"){
      axios
        .post("/polls/check-voteability", {
          id: authContext.id.toString(),
        })
        .then((res) => {
          setVotable(res.data);
        })
        .catch((err) => console.log(err));
      }
      
    }
  });

  const endElection = () => {
    axios
      .post("/polls/end")
      .then((_) => window.location.reload())
      .catch((err) => console.log({ err }));
  };

  if (loading || voteState === "checking") return <div></div>;

  if (voteState === "not-started") return <Waiting />;

  return (
    <div className="user_vote_page">
      <div className="timeLeft">Election ends in {count.hour}:{count.min}:{count.sec}</div>
    <Panel name={data.name} description={data.description}>
      
      <>
        {voteState === "running" ? <Running /> : <Finished />}
        <Chart
          enableVote={votable === "not-voted"}
          userId={authContext.id}
          userName={authContext.name}
          votes={data.votes}
        />
        
      </>
    </Panel>
    </div>
  );
};

export default User;

import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Chart from "../../components/Polls/Chart";
import Panel from "../../components/Polls/Panel";
import CountDownTimer from "../../components/CountDownTimer";

const Polls = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "",time: "", votes: {} });

  useEffect(() => {
    axios.get("/polls/").then((res) => {
      setData(res.data);
      let  vt = Number(res.data.time);
      let tt = new Date(res.data.time);
      console.log(tt);
       let nt = new Date().getTime();
       if(vt <= nt){
        endElection();
       }else{
        console.log("wait");
        console.log(vt, nt);
       }
      setLoading(false);
    });
  }, []);

  const endElection = () => {
    axios
      .post("/polls/end")
      .then((_) => window.location.reload())
      .catch((err) => console.log({ err }));
  };

  if (loading) return <div></div>;

  return (
    <Panel name={data.name} description={data.description}>
      <>
        <Chart votes={data.votes} />
        {/* <div className="countDown">
        <CountDownTimer hours={5} minutes={6} seconds={3}/>
        </div> */}
    
        {/* <button
          onClick={endElection}
          className="end-election-button button-primary"
        >
         End Election
        </button> */}
      </>
    </Panel>
  );
};

export default Polls;

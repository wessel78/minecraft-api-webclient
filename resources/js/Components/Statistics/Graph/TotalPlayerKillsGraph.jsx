import {useEffect} from "react";
import {loadGraph} from "./util"

export default function TotalPlayerKillsGraph() {
    const graphId = "totalPlayerKillsGraph";
    const graphTitle = "Total player kills";
    const graphDescription = "Player kills";

    useEffect(() => {
        loadGraphData()
    }, []);

    const loadGraphData = () => {
        axios.get(`/api/stats/getTotalPlayerKillsGraph`).then(response => {
            loadGraph(response.data, graphId, graphTitle, graphDescription);
            console.log(response.data);
        })
    }

    return (
        <div className="basis-0 grow w-[50%]">
            <div id={graphId} className="h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]"></div>
        </div>
    );
}

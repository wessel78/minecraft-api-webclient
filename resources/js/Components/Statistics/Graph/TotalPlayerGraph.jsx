import {useEffect} from "react";
import {loadGraph} from "./util"

export default function TotalPlayerGraph() {
    const graphId = "totalPlayerGraph";
    const graphTitle = "Total players";
    const graphDescription = "Players";

    useEffect(() => {
        loadGraphData()
    }, []);

    const loadGraphData = () => {
        axios.get(`/api/stats/getTotalPlayersGraph`).then(response => {
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

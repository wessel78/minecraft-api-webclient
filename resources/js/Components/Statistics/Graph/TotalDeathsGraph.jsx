import {useEffect} from "react";
import {loadGraph} from "./util"

export default function TotalDeathsGraph() {
    const graphId = "totalDeathsGraph";
    const graphTitle = "Total deaths";
    const graphDescription = "Deaths";

    useEffect(() => {
        loadGraphData()
    }, []);

    const loadGraphData = () => {
        axios.get(`/api/stats/getTotalDeathsGraph`).then(response => {
            loadGraph(response.data, graphId, graphTitle, graphDescription);
        })
    }

    return (
        <div className="basis-0 grow w-[50%]">
            <div id={graphId} className="h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]"></div>
        </div>
    );
}

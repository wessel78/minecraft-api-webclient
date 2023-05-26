import {useEffect, useState} from "react";

export default function TotalDeaths() {
    const [deaths, setDeaths] = useState(0);
    const totalDeaths = () => {
        axios.get('/api/stats/getTotalDeaths').then(response => setDeaths(response.data))
    }

    useEffect(() => {
        totalDeaths()
    })

    return (
        <div className="basis-0 grow">
            <div className="bg-[#69fff0] h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]">
                <p className="font-bold">Total deaths: {deaths}</p>
            </div>
        </div>
    );
}
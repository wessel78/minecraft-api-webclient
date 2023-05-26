import {useEffect, useState} from "react";

export default function TotalEntityDeaths() {
    const [entityKills, setEntityKills] = useState(0);
    const totalDeaths = () => {
        axios.get('/api/stats/getTotalEntityKills').then(response => setEntityKills(response.data))
    }

    useEffect(() => {
        totalDeaths()
    })

    return (
        <div className="basis-0 grow">
            <div className="bg-[#ff6878] h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]">
                <p className="font-bold">Total entity kills: {entityKills}</p>
            </div>
        </div>
    );
}
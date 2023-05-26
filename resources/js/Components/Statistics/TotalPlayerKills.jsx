import {useEffect, useState} from "react";

export default function TotalPlayerKills() {
    const [playerKills, setPlayerKills] = useState(0);
    const totalKills = () => {
        axios.get('/api/stats/getTotalPlayerKills').then(response => setPlayerKills(response.data))
    }

    useEffect(() => {
        totalKills()
    })

    return (
        <div className="basis-0 grow">
            <div className="bg-[#FF6978] h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]">
                <p className="font-bold">Total player kills: {playerKills}</p>
            </div>
        </div>
    );
}
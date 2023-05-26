import {useEffect, useState} from "react";

export default function TotalPlayers() {
    const [players, setPlayers] = useState(0);
    const totalKills = () => {
        axios.get('/api/stats/getTotalPlayers').then(response => setPlayers(response.data))
    }

    useEffect(() => {
        totalKills()
    })

    return (
        <div className="basis-0 grow">
            <div className="bg-[#ff69a3] h-44 rounded-sm flex items-center justify-center p-4 min-w-[150px]">
                <p className="font-bold">Total players: {players}</p>
            </div>
        </div>
    );
}
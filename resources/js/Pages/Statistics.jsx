import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

//Skeleton loading
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

//Components
import TotalDeaths from "@/Components/Statistics/TotalDeaths";
import TotalPlayerKills from "@/Components/Statistics/TotalPlayerKills";
import TotalEntityDeaths from "@/Components/Statistics/TotalEntityDeaths";
import TotalPlayers from "@/Components/Statistics/TotalPlayers";

//Graph
import TotalPlayerGraph from "@/Components/Statistics/Graph/TotalPlayerGraph";
import TotalDeathsGraph from "@/Components/Statistics/Graph/TotalDeathsGraph";
import TotalEntityKillsGraph from "@/Components/Statistics/Graph/TotalEntityKillsGraph";
import TotalPlayerKillsGraph from "@/Components/Statistics/Graph/TotalPlayerKillsGraph";

//css
import "../../css/components/statistics/statisticDashboard.scss"

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Minecraft players</h2>}
        >
            <Head title="Dashboard" />

            <section className="container mx-auto p-3 sm:p-5">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <div className="flex flex-row flex-wrap justify-between w-full gap-4 p-4">
                            <TotalPlayers />
                            <TotalEntityDeaths />
                            <TotalPlayerKills />
                            <TotalDeaths />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <div className="flex flex-row flex-wrap justify-between w-full gap-4 p-4">
                            <TotalPlayerGraph />
                            <TotalDeathsGraph />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mt-4">
                    <div className="overflow-x-auto">
                        <div className="flex flex-row flex-wrap justify-between w-full gap-4 p-4">
                            <TotalEntityKillsGraph />
                            <TotalPlayerKillsGraph />
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

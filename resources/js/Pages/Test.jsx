import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Head } from '@inertiajs/react';
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard(props) {
    const [data, setData] = useState([]);
    const [kickMessage, setKickMessage] = useState("")

    const getTestData = () => {
        axios.get(`/api/data/getOnlinePlayers`)
            .then(res => {
                const parsedData = JSON.parse(res.data);
                const playerData = parsedData.response;
                setData(playerData !== undefined ? playerData : []);
            })
    }

    useEffect(() => {
        getTestData();
    }, []);

    const openKickModal = (playerData) => {
        Swal.fire({
            title: `Kick ${playerData.playerName}`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Kick!',
            text: `Kick ${playerData.playerName}`,
            html:
            '<div class="flex flex-col items-start">' +
                '<label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kick message</label>\n' +
                '<input id="kick-message" type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type a kick message.." required>' +
            '</div>',
        })
        .then((result) => {
            if (result.isConfirmed) {
                const kickMessage = document.querySelector('#kick-message').value
                kickPlayerRequest(playerData.playerUuid, kickMessage)
                console.log(kickMessage)
                Swal.fire(
                    `${playerData.playerName} is kicked!`,
                )
            }
        })
    }

    const kickPlayerRequest = (uuid, kickMessage) => {
        const json = JSON.stringify({"uuid":uuid,"kickMessage":kickMessage})
        axios.put('http://localhost:7070/kickOnlinePlayer', json, {
            'Content-Type': 'application/json'
        })
        .then(res => {
            console.log(res)
        })
    }

    const openSpawnEntityModal = (playerData) => {
        Swal.fire({
            title: `Spawn entity on ${playerData.playerName}`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Spawn entity',
            text: `Kick ${playerData.playerName}`,
            html:
                '<div class="grid gap-6 mb-6 md:grid-row-2">' +
                    '<div>' +
                        '<label htmlFor="entity_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Entity name </label>' +
                        '<input type="text" id="entity_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required>' +
                    '</div>'+
                    '<div>' +
                        '<label htmlFor="entity_amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Amount of entities </label>' +
                        '<input type="number" id="entity_amount" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="1" max="100" value="1" placeholder="Amount" required>' +
                    '</div>'+
                '</div>',
        })
        .then((result) => {
            if (result.isConfirmed) {
                const entityName = document.querySelector('#entity_name').value
                const entityAmount = parseInt(document.querySelector('#entity_amount').value)
                spawnEntityRequest(playerData.playerUuid, entityName, entityAmount)
                Swal.fire(
                    `${entityAmount} entities are spawned on ${playerData.playerName}`,
                )
            }
        })
    }

    const spawnEntityRequest = (uuid, name, amount) => {
        const json = JSON.stringify({"uuid": uuid, "name" : name, "amount" : amount})
        axios.put('http://localhost:7070/spawnEntityOnPlayer', json, {
            'Content-Type': 'application/json'
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Minecraft players</h2>}
        >
            <Head title="Dashboard" />

            <section className="p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Skin</th>
                                    <th scope="col" className="px-4 py-3">Player name</th>
                                    <th scope="col" className="px-4 py-3">Uuid</th>
                                    <th scope="col" className="px-4 py-3">Health</th>
                                    <th scope="col" className="px-4 py-3">World</th>
                                    <th scope="col" className="px-4 py-3">Kick</th>
                                    <th scope="col" className="px-4 py-3">Spawn entity</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((player) => {
                                    return (
                                    <tr className="border-b dark:border-gray-700" key={player.playerUuid}>
                                         <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                             <img className="h-auto max-w-lg rounded-lg" src={`https://minotar.net/helm/${player.playerName}/100.png`} alt="image description" />
                                         </th>
                                        <td className="px-4 py-3">{player.playerName}</td>
                                        <td className="px-4 py-3">{player.playerUuid}</td>
                                        <td className="px-4 py-3">{player.playerHealth}</td>
                                        <td className="px-4 py-3">{player.playerWorld}</td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => openKickModal(player)} type="button"
                                                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900">Kick
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => openSpawnEntityModal(player)} type="button"
                                                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Spawn entity
                                            </button>
                                        </td>



                                        {/*<td className="px-4 py-3">*/}
                                        {/*    {person.active === 1 ?*/}
                                        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">\n' +*/}
                                        {/*        '  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />\n' +*/}
                                        {/*        '</svg>*/}
                                        {/*        :*/}
                                        {/*        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">*/}
                                        {/*        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />*/}
                                        {/*        </svg>*/}
                                        {/*    }*/}
                                        {/*</td>*/}
                                    </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}

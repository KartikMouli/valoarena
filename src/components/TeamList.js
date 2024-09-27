// components/TeamList.js
"use client"; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeamList = ({ teams }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Team List</h2>
            {teams.length === 0 ? (
                <p>No teams found.</p>
            ) : (
                <ul className="space-y-4">
                    {teams.map((team) => (
                        <li key={team.id} className="p-4 border rounded">
                            <h3 className="text-lg font-bold">{team.name}</h3>
                            <p><strong>Owner:</strong> {team.owner?.username || 'Unknown'}</p>
                            <div>
                                <strong>Members:</strong>
                                {team.members.length === 0 ? (
                                    <p>No members.</p>
                                ) : (
                                    <ul className="list-disc list-inside">
                                        {team.members.map((member) => (
                                            <li key={member.id}>{member.user?.username || 'Unknown'}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TeamList;

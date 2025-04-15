"use client" 
import pfp from '@/public/images/pfp.jpg'
import Image from "next/image";
import UserModal from './userModal';
import { useEffect, useState } from "react";

interface User {
    _id: string;
    username: string;
    hashEmail: string;
    description?: string;
    // can add other fields later.
}


const UsersDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const res = await fetch("/api/user");
            const data = await res.json();
            setUsers(data);
          } catch (error) {
            console.error("Failed to fetch users:", error);
          }
        };
    
        fetchUsers();

      }, []);

    const openModal = (index: number) => {
        setSelectedUserIndex(index);
        setIsModalOpen(true);
      };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUserIndex(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            
            <div className="text-center mb-12 py-6">
                <h1 className="text-3xl font-bold text-black">
                Thank you for completing your entry survey!
                </h1>
                <p className="text-lg text-black mt-4">
                Below you will find students who are most compatible with you based on your survey responses.
                </p>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {users.map((user, index) => (
            <div key={user._id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                    <Image
                        src={`https://gravatar.com/avatar/${user.hashEmail}`}
                        alt={`${user.username} headshot`}
                        width={64}
                        height={64}
                        style={{ objectFit: "cover" }}
                        className="object-cover w-full h-full"
                    />
                </div>
                <p className="text-black font-semibold">{user.username}</p>
                <p className="text-red-500 font-semibold">
                {Math.floor(Math.random() * 21) + 80}% Compatible
                </p>
                <button onClick={() => openModal(index)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Learn More
                </button>
            </div>
            ))}
            </div>
            <UserModal
              isOpen={isModalOpen}
              user={selectedUserIndex !== null ? users[selectedUserIndex] : null}
              compatibility={selectedUserIndex !== null ? Math.floor(Math.random() * 21) + 80 : null}
              onClose={closeModal}
            />
      </div>
    )
};

export default UsersDashboard;
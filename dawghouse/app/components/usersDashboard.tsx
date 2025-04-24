"use client" 
import pfp from '@/public/images/pfp.jpg'
import Image from "next/image";
import UserModal from './userModal';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

interface User {
  _id: string;
  username: string;
  hashEmail: string;
  description?: string;
  answers?: string[];
  scores?: {
    age: number;
    gender: number;
    genderPreference: number;
    living: number;
    personality: number;
    substances: number;
    locations: string[];
  }
  compatibility?: number;
}

export function computeCompatibility(userA: User, userB: User): number {
  if (!userA.scores || !userB.scores) return 0;
  if (userA.scores.age == 0 || userB.scores.age == 0) return 0; // Since schema has default answers, we will use age to check if scores were actually filled out*

  console.log("Computing compatibility between " + userA.username + " and " + userB.username);

  const weights = {
    personality: 3,
    living: 2,
    substances: 3,
    gender: 0,
    genderPreference: 2
  };

  let difTotal = 0;
  let weightTotal = 0;

  for (const key in weights) {
    const weight = weights[key as keyof typeof weights];
    const aVal = userA.scores[key as keyof typeof weights];
    const bVal = userB.scores[key as keyof typeof weights];

    difTotal += Math.abs(aVal - bVal) * weight;
    weightTotal += weight;
  }

  let out = (1 - difTotal / (weightTotal * 100)) * 100;

  const myLocs = userA.scores.locations ?? [];
  const otherLocs = userB.scores.locations ?? [];

  if (myLocs.length && otherLocs.length) {
    const filtered = myLocs.filter(loc => otherLocs.includes(loc));
    if (filtered.length == 0) out *= 0.2;
    else if (filtered.length <= 1) out *= 0.85;
  }

  return Math.round(out);
}

const UsersDashboard = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);

    const fetchUsers = async () => {
      const loadingToast = toast.loading("Loading matches...", {
        position: "top-center",
        progress: 0,
      });
    
      if (!session?.user?.email) {
        toast.dismiss(loadingToast);
        return;
      }
    
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        toast.update(loadingToast, { progress: 0.25 });
    
        const resUser = await fetch(`/api?email=${session.user.email}`);
        const userData = await resUser.json();
        const userId = userData.user?._id;
        if (!userId) throw new Error("User ID not found");
    
        toast.update(loadingToast, { progress: 0.3 });
    
        const fUsers: (User & { compatibility: number })[] = [];
        const length = data.length + 1;
        let counter = 1;
    
        for (const user of data) {
          toast.update(loadingToast, { progress: counter / length });
          counter++;
    
          if (user._id === userId || !user.scores) continue;
    
          const comp = computeCompatibility(userData.user, user);
          user.compatibility = comp;
          if (comp > 0) fUsers.push({ ...user, comp });
        }
    
        fUsers.sort((a, b) => b.compatibility - a.compatibility);
    
        setUsers(fUsers);
        toast.update(loadingToast, {
          render: "Users loaded",
          progress: 1,
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.update(loadingToast, {
          render: "Error loading users",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    };

    const hasFetched = useRef(false);

    useEffect(() => {
      if (!hasFetched.current && session?.user?.email) {
        hasFetched.current = true;
        fetchUsers();
      }
    }, [session?.user?.email]);

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
            <ToastContainer />
            <div className="text-center mb-12 px-6 md:px-0 md:py-6">
                <h1 className="text-2xl md:text-3xl font-bold text-black">
                Thank you for completing your entry survey!
                </h1>
                <p className="text-1xl md:text-lg text-black mt-4">
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
                <p className="text-red-800 font-semibold">
                {user.compatibility}% Compatible
                </p>
                <button onClick={() => openModal(index)} className="mt-4 cursor-pointer bg-red-800 text-white py-2 px-4 rounded hover:bg-red-900">
                Learn More
                </button>
            </div>
            ))}
            </div>
            <UserModal
              isOpen={isModalOpen}
              user={selectedUserIndex !== null ? users[selectedUserIndex] : null}
              onClose={closeModal}
            />
      </div>
    )
};

export default UsersDashboard;
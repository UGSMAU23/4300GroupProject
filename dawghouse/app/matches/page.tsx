import house from '@/public/images/house.png';
import Image from "next/image";

const MatchesPage = () => {


    const numberOfUsers = 20; // for example only, replace with json data later.
    const userArray = Array.from({ length: numberOfUsers }, (_, index) => index); // create array to map over

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
            {userArray.map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
                >
                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                <Image
                    src={house}
                    alt={`${index}. User headshot`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                />
                </div>
                <p className="text-black font-semibold">User {index + 1}</p>
                <p className="text-red-500 font-semibold">{index + 1}% Compatible</p>
                <button className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Learn More</button>
                </div>
            ))}
            </div>
      </div>
    )
};

export default MatchesPage;
import house from '@/public/images/house.png';
import Image from 'next/image';


const DawgHouse = () => {
    return (
        <div className="flex justify-center items-center flex-col mt-10 mb-10" >
            <div className="flex text-5xl">
                <h1 className="text-black">What is Dawg</h1>
                <h1 className="text-red-600">House</h1>
                <h1 className="text-black">?</h1>
            </div>
            <div className="bg-red-200 mt-10 w-screen">
                <div className='flex flex-row justify-center items-stretch text-center mt-5 mb-5'>
                    <div className="flex flex-col flex-2 items-center justify-center text-lg pl-5 pr-5">
                        <p>DawgHouse is a free housing network for University of Georgia students, allowing quick and efficient roommate matching.<br /><br /></p>
                        <p>All potential roommates are University of Georgia students as well as being required to fill out a simple but descriptive survey to best filter who is best for you.<br /><br /></p>
                        <p>Get started <a href="#getStarted" className="text-red-600">here</a> to find your perfect roommate!</p>
                    </div>
                    <div className='flex-1'>
                        <Image src={house} alt="Picture of House" className='object-shrink'/>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default DawgHouse;
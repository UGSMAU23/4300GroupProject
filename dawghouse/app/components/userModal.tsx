interface UserModalProps {
  isOpen: boolean;
  userIndex: number | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, userIndex, onClose }) => {

  if (!isOpen || userIndex === null) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose} // Close modal when clicking outside
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50">
        <button
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">
          Meet User {userIndex + 1}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          You are {userIndex + 1}% Roommate Compatible!
        </p>
        
        {/* Dummy Data for now, will be pulled from JSON later */}
        <p className="text-gray-700 text-sm leading-relaxed">
          User {userIndex + 1} is a sophomore who’s open to living with roommates of any gender or year. 
          He prefers a mostly clean space and is flexible about location, with interest in neighborhoods like Five Points, Pulaski Heights, Macon Highway, and North Ave. 
          Fairly outgoing by nature, John hopes for a roommate who’s also social but is open to different personalities. 
          He expects to be home most of the time, with the occasional weekend away, and would prefer a roommate with a similar schedule—ideally someone he can be friends with. 
          John drinks occasionally and is okay with a roommate who does too, as long as it’s not constant. He doesn’t smoke and would rather not live with someone who does. 
          He plans to have guests over sometimes and is fine if his roommate does as well. As a night owl, he’d get along best with someone who shares that rhythm. 
          His top roommate concerns include keeping things reasonably clean, being respectful of noise, privacy, and shared chores, and creating a chill, considerate living environment.
        </p>

        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Contact:</strong> {userIndex + 1}9129129121
          </p>
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> {userIndex + 1}@gmail.com
          </p>
        </div>
      </div>
    </>
  );
};

export default UserModal;
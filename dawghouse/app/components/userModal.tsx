interface UserModalProps {
  isOpen: boolean;
  user: {
    username: string;
    description?: string;
    // add more fields later like contact, email
  } | null;
  compatibility: number | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, user, compatibility, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md w-full z-50">
        <button
          className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-2">
          Meet {user.username}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          You are {compatibility}% Roommate Compatible!
        </p>

        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {user.description || "This user does not have a description yet."}
        </p>
        {/* Later we are going to pull contact info from their form preferences. */}
        <div className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Contact:</strong> Placeholder Phone
          </p>
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> Placeholder Email
          </p>
        </div>
      </div>
    </>
  );
};

export default UserModal;
interface UserModalProps {
  isOpen: boolean;
  user: {
    username: string;
    description?: string;
    answers?: string[];
    compatibility?: number | null;
    // add more fields later like contact, email
  } | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, user, onClose }) => {
  if (!isOpen || !user) return null;

  const extractAnswer = (labelStart: string): string | null => {
    const raw = user.answers?.find(ans => ans.startsWith(labelStart));
    if (!raw) return null;
    const value = raw.split(":").slice(1).join(":").trim(); // handles colon in value
    return value === "No answer" ? null : value;
  };

  const phonePreferred = user.answers?.some(answer =>
    answer.includes("I would like potential roommates to contact me via:") && answer.includes("Phone")
  );

  const emailPreferred = user.answers?.some(answer =>
    answer.includes("I would like potential roommates to contact me via:") && answer.includes("Email")
  );

  const phone = extractAnswer("Phone Number (if selected above):");
  console.log(phone);
  const email = extractAnswer("Email (if selected above):");

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 max-w-md z-50 w-[calc(100%-2rem)]">
        <button className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
        ✕
        </button>

        <h2 className="text-xl font-bold mb-2">
          Meet {user.username}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          You are {user.compatibility}% Roommate Compatible!
        </p>

        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
          {user.description || "This user does not have a description yet."}
        </p>
        {(phonePreferred || emailPreferred) && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">
              Get in touch with {user.username}:
            </p>
            {phonePreferred && (
              <p className="text-sm text-gray-700">
                <strong>Phone:</strong> {phone}
              </p>
            )}
            {emailPreferred && (
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {email}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserModal;
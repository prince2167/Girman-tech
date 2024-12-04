interface CardProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  contact: string;
  location: string;
}

const Card: React.FC<{ data: CardProps }> = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded-3xl shadow-md w-[340px] mx-auto flex items-center justify-center">
      <div className="flex flex-col items-start">
        <img
          src={data.avatar}
          alt={`${data.first_name} ${data.last_name}`}
          className="w-[78px] h-[78px] rounded-full border-4 border-white shadow-lg"
        />
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">
            {data.first_name} {data.last_name}
          </h2>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{data.location}</span>
          </div>
          <div className="flex justify-between items-center w-full gap-14">
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{data.contact}</span>
              </div>
              <p className="text-gray-500 text-sm">Available on phone</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Fetch Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

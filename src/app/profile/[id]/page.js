export default function ProfilePage({ params }) {
  const username = params.id;

  return (
    <div className="h-screen w-full bg-black flex justify-center items-center">
      <div className="bg-gray-900 text-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold mb-2">📄 Public Profile</h1>
        <p className="text-lg text-gray-300">
          Username:{" "}
          <span className="text-orange-400 font-semibold">{username}</span>
        </p>
      </div>
    </div>
  );
}

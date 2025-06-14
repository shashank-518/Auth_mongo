export default function UserProfile({ params } : any) {
    return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Profile
      </h1>
      <h2 className="text-xl font-medium text-gray-600 dark:text-gray-300">
        Profile Name <span className="bg-orange-700 text-4xl" >{params.id}</span>
      </h2>
    </div>
  </div>
);
}
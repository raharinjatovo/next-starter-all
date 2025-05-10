import { auth } from "@/lib/auth"

export default async function Profile() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-indigo-600">
          <div className="absolute -bottom-10 left-10">
            <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {/* Profile Image */}
              <img 
                src={session?.user?.image || "https://via.placeholder.com/150"} 
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-10 pb-10">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {session?.user?.name || "User Name"}
              </h1>
              <p className="text-gray-600">
                {session?.user?.email || "email@example.com"}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Profile Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-900">{session?.user?.name || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="text-gray-900">{session?.user?.email || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Joined</label>
                  <p className="text-gray-900">January 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Change Password
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Notification Settings
                </button>
                <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Privacy Settings
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
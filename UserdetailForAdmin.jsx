import React from "react";
import { useDispatch } from "react-redux";
import { deleteUserByAdmin, promoteUserToAdmin } from "../../Redux/action.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserdetailForAdmin = ({ data }) => {
  const dispatch = useDispatch();

  // Handle user deletion
  const handleDeleteUser = (id) => {
    if (id) {
      dispatch(deleteUserByAdmin(id));
      toast.success("Successfully Deleted the User");
    } else {
      toast.error("You can't delete the User");
    }
  };

  // Handle user promotion to admin
  const handlePromoteToAdmin = (id) => {
    if (id) {
      dispatch(promoteUserToAdmin(id));
      toast.success("User promoted to Admin successfully");
    } else {
      toast.error("Unable to promote the User");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="bg-teal-500 rounded-lg w-full md:w-56 text-center text-white text-2xl font-bold p-4 mx-auto">
        <h1>List of Users</h1>
      </div>

      {/* User List */}
      <div className="flex flex-col container w-full max-w-lg md:max-w-2xl lg:max-w-4xl bg-teal-500 rounded-lg mt-6 mx-auto p-4">
        <ul className="flex flex-col divide-y w-full">
          {data.map((user) => (
            <li
              key={user._id}
              className="flex flex-col md:flex-row items-center p-4 bg-white rounded-lg shadow-md my-2"
            >
              {/* Profile Image */}
              <div className="flex-shrink-0 w-16 h-16 md:w-12 md:h-12 mr-0 md:mr-4 mb-4 md:mb-0">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8czzbrLzXJ9R_uhKyMiwj1iGxKhJtH7pwlQ&usqp=CAU"
                  alt="profile"
                  className="object-cover rounded-full h-full w-full"
                />
              </div>

              {/* User Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-medium text-gray-800">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-gray-500 text-xs">
                  Role: {user.role === "admin" ? "Admin" : "User"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                {/* Promote to Admin Button */}
                {user.role !== "admin" && (
                  <button
                    onClick={() => handlePromoteToAdmin(user._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Promote to Admin
                  </button>
                )}

                {/* Delete User Button */}
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete User
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ToastContainer />
    </div>
  );
};
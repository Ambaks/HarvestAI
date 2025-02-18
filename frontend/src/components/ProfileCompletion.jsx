import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useFetchUser } from "../api/authService";
import { Link } from "react-router-dom";


const ProfileCompletion = () => {
  const { user } = useFetchUser();
  const [completion, setCompletion] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Required fields for profile completion
    const requiredFields = [
      "first_name",
      "last_name",
      "dob",
      "gender",
      "email",
      "phone",
      "location",
      "farm_size",
    ];

    // Count how many fields are completed
    const completedFields = requiredFields.filter(field => user[field]);

    // Calculate completion percentage
    const percentage = Math.round((completedFields.length / requiredFields.length) * 100);
    setCompletion(percentage);
    setAnimatedValue(percentage);
  }, [user]); // Re-run when user data changes


  return (
    <div className="lg:w-[420px] flex flex-col items-center justify-center bg-opacity-15 shadow-md shadow-gray-200 h-full p-6 rounded-2xl bg-[#2588f9] border-[rgba(0,0,0,0.1)]">
      <div
        className="w-32 h-32 transition-all duration-300"
      >
        <CircularProgressbar
          value={animatedValue}
          text={`${animatedValue}%`}
          styles={buildStyles({
            textColor: "#635BFF",
            pathColor: completion < 50 ? "#6461f37f" : completion < 75 ? "#6461f3af" : "#635BFF",
            trailColor: "rgba(99, 91, 255, 0.3)",
            textSize: "20px",
            pathTransitionDuration: 1.5,
          })}
        />
      </div>

      {completion === 100 ? (
        <p className="text-gray-500 text-sm pt-5 text-center font-medium">
          🎉 Congratulations! You are on the right path to growing your business to new heights!
        </p>
      ) : (
        <>
          <p className="text-gray-500 text-sm pt-5 text-center font-medium">
            Your profile is incomplete! Complete it now to maximize your profit.
          </p>
          <Link to={`/farmer-dashboard/settings/${user.id}`}>
            <button className="mt-4 px-5 py-2 bg-primary hover:scale-105 shadow-md shadow-gray-400 text-white rounded-full hover:bg-[#5147DB] transition">
              Complete Now
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileCompletion;

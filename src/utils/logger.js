import axios from "axios";

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export const Log = async (stack, level, pkg, message, token) => {
  const allowedStacks = ["frontend", "backend"];
  const allowedLevels = ["info", "warning", "error"];

  if (!allowedStacks.includes(stack) || !allowedLevels.includes(level)) {
    console.warn("Invalid log parameters");
    return;
  }

  try {
    await axios.post(
      LOG_API_URL,
      { stack, level, package: pkg, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Log sent successfully");
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
};

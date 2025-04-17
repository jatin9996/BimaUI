import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ToggleTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector("html");

    if (darkMode) {
      htmlElement?.classList.add("dark");
    } else {
      htmlElement?.classList.remove("dark");
    }

    // Apply smooth transition to the entire page when mode changes
    htmlElement?.style.setProperty(
      "transition",
      "background-color 0.5s ease, color 0.5s ease"
    );
  }, [darkMode]);

  return (
    <div style={{ marginLeft: "16px" }}>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        className="h-[30px] lg:h-[41px] w-[30px] lg:w-[41px]"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "50%",
          backgroundColor: darkMode ? "#212121" : "#EEEEEE",
          transition: "background-color 0.5s ease",
        }}
      >
        {darkMode ? (
          <Moon style={{ color: "#ffffff" }} className="w-14 lg:w-24" />
        ) : (
          <Sun style={{ color: "#000000" }} className="w-14 lg:w-24" />
        )}
      </button>
    </div>
  );
};

export default ToggleTheme;

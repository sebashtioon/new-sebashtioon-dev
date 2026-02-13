import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "dark" ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "switch to light theme" : "switch to dark theme"}
      className="fixed top-4 left-4 z-[110]"
    >
      {nextThemeLabel}
    </Button>
  );
};

export default ThemeToggle;

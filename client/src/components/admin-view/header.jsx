import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AdminHeader({ setOpen }) {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={() => navigate('/')} 
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          Home
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

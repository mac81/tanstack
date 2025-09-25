import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";

export const BackButton = () => {
  return (
    <Link to="/" className="fixed top-4 left-4 z-50">
      <Button>
        <ChevronLeftIcon />
      </Button>
    </Link>
  );
};

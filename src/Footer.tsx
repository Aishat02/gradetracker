import React from "react";
import { Copyright } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  return (
    <footer className="my-5 d-flex justify-content-center align-items-center gap-2">
      <Copyright />
      <div>{currentYear} Aris.</div>
    </footer>
  );
};
export default Footer;

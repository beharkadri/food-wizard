import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Button from "./Button";

const Footer = () => {
  return (
    <footer className="text-white bg-gray-600">
      <div className="container mx-auto px-20 lg:px-20 flex flex-col gap-10 md:flex-row justify-between border-t border-slate-800">
        <span className="text-gray-white leading-10">
          FoodWizard &copy; {new Date().getFullYear()}
        </span>

        <div className="flex gap-3">
          <a
            href="#"
            className="block md:inline-block py-2 hover:text-gray-500"
          >
            Terms of use
          </a>
          <a
            href="#"
            className="block md:inline-block py-2 hover:text-gray-500"
          >
            Privacy Policy
          </a>
        </div>

        <div className="flex gap-3">
          <a
            href="#"
            className=" p-1.5 rounded-sm text-white hover:text-gray-500"
          >
            <FaFacebook size={18} />
          </a>

          <a
            href="#"
            className=" p-1.5 rounded-sm text-white hover:text-gray-500"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            className=" p-1.5 rounded-sm text-white hover:text-gray-500"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="#"
            className="p-1.5 rounded-sm text-white hover:text-gray-500"
          >
            <FaYoutube size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 E-Commerce. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
          <a href="#" className="hover:text-gray-400">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

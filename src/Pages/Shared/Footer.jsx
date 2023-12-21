const Footer = () => {
    const socialLinks = [
      { name: 'Twitter', url: 'https://twitter.com/example', icon: 'fab fa-twitter' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/example', icon: 'fab fa-linkedin' },
      { name: 'GitHub', url: 'https://github.com/example', icon: 'fab fa-github' },
      // Add more social media links as needed
    ];
  
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">SCC Technovision Inc.</h3>
            <p className="text-sm"> Task Management Platform</p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400 transition duration-300 flex items-center"
              >
                <i className={`fab ${link.icon} mr-1`} />
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-4 text-gray-400 text-sm">
          &copy; {currentYear} SCC Technovision Inc. All Rights Reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
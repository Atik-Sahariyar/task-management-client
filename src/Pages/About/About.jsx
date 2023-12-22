const About = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">About SCC Technovision Inc.</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Our Platform</h3>
            <p className="mb-4">
             {` Welcome to SCC Technovision Inc's task management platform.`}
            </p>
            <p className="mb-4">
              Objective: To streamline and optimize task handling.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-xl font-semibold mb-4">
              Task Management Platform
            </h3>
            <p className="mb-4">
              Aim: Enhance task management through a user-friendly interface.
            </p>
            <p className="mb-4">
              Users: Developers, Corporate Professionals, etc.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h4 className="text-xl font-semibold mb-4">Connect with Us</h4>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;

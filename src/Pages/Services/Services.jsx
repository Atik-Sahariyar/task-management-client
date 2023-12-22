

const Services = () => {
    return (
        <section className="bg-white py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Task Creation & Management</h3>
              <p className="mb-4">Effortlessly create tasks with detailed descriptions, deadlines, and priorities. Organize tasks across to-do, ongoing, and completed lists using intuitive drag-and-drop functionality.</p>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User Authentication & Profile Management</h3>
              <p className="mb-4">Securely register, log in, and manage your profile. Customize your personal dashboard and keep track of tasks assigned to you, in progress, or completed.</p>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Real-time Notifications & Collaboration</h3>
              <p className="mb-4">Receive real-time notifications for task assignments, updates, and deadlines. Collaborate seamlessly with team members, enhancing communication and productivity.</p>
            </div>
          </div>
        </div>
      </section>
      
    );
};

export default Services;
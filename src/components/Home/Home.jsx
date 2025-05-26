import Navbar from '../../assets/Navbar/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import taskImage from '../../assets/Img/2.jpg'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 text-primary fw-bold">Welcome to Taski</h1>
            <p className="lead mt-4">
              Taski is your smart companion for organizing your day. Whether you're managing projects,
              tracking daily goals, or just trying to remember your shopping list — Taski makes it effortless.
            </p>
            <p>
              Boost your productivity with our intuitive interface and powerful features like deadline reminders,
              real-time collaboration, and more.
            </p>
            <div className="mt-4">
              <a href="/login" className="btn btn-outline-primary me-3">
                Login
              </a>
              <a href="/register" className="btn btn-primary">
                Get Started
              </a>
            </div>
          </div>

          <div className="col-md-6 mt-5 mt-md-0 text-center">
            <img
              src={taskImage}
              alt="Task management illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
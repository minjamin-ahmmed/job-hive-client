import axios from "axios";
import { useEffect, useState } from "react";

const Hotjobs = () => {
  const [hotJobs, setHotJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        setHotJobs(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotJobs();
  }, []);

  loading && <div>Loading...</div>;
  error && <div>Error: {error.message}</div>;

  return (
    <div className="bg-lime-100 py-16 px-4 lg:px-0">
      <div className="w-11/12 lg:w-9/12 mx-auto">
        <h2 className="text-4xl lg:text-6xl font-semibold text-primary text-center mb-4">
          Hot Jobs {hotJobs.length}
        </h2>
      </div>
    </div>
  );
};

export default Hotjobs;

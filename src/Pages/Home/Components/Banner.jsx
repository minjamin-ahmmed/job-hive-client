import bannerImg from "../../../assets/banner-image.png";
import framerIcon from "../../../assets/framer1.svg";

const Banner = () => {
  return (
    <div className="bg-primary">
      <div className="w-11/12 lg:w-9/12 mx-auto py-16 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 ">
          <div>
            <h1 className="text-3xl lg:text-8xl font-semibold text-white mb-6">
              Find & Hire <br />
              <span className="text-secondary">
                Top 3% of expert <br /> on Job Hive.
              </span>
            </h1>
            <p className="text-white font-medium text-xl mb-6">
              We delivered blazing fast & striking work solution
            </p>

            <div>
              <button className="btn text-primary bg-secondary rounded-full px-16 py-4 border-none">
                Learn More
              </button>
            </div>
          </div>

          <div>
            <div className="lg:absolute lg:top-0 lg:z-50">
              <img src={framerIcon} alt="" />
            </div>
            <div className="h-[600px]">
              <img className="h-full" src={bannerImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

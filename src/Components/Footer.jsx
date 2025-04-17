import React from "react";
import logo from "../assets/navbar-logo.png"; // Assuming this is the same logo as Navbar

const Footer = () => {
  return (
    <footer>
      <div className="footer sm:footer-horizontal bg-primary text-white p-8">
        <aside>
          <div className="w-32 h-32">
            <img className="w-full h-full" src={logo} alt="Job Hive Logo" />
          </div>
          <p>
            Job Hive Inc.
            <br />
            Connecting talent with opportunities since 2025
          </p>
        </aside>
        <nav>
          <h6 className="footer-title text-secondary">Job Seekers</h6>
          <a
            href="/job/search"
            className="link link-hover hover:text-secondary"
          >
            Search Jobs
          </a>
          <a
            href="/job/categories"
            className="link link-hover hover:text-secondary"
          >
            Job Categories
          </a>
          <a href="/job/saved" className="link link-hover hover:text-secondary">
            Saved Jobs
          </a>
          <a
            href="/blog/career-tips"
            className="link link-hover hover:text-secondary"
          >
            Career Tips
          </a>
        </nav>
        <nav>
          <h6 className="footer-title text-secondary">Employers</h6>
          <a
            href="/create-job-listing"
            className="link link-hover hover:text-secondary"
          >
            Post a Job
          </a>
          <a
            href="/explore/companies"
            className="link link-hover hover:text-secondary"
          >
            Company Profiles
          </a>
          <a href="/dashboard" className="link link-hover hover:text-secondary">
            Employer Dashboard
          </a>
          <a
            href="/blog/industry-news"
            className="link link-hover hover:text-secondary"
          >
            Industry News
          </a>
        </nav>
        <nav>
          <h6 className="footer-title text-secondary">About Us</h6>
          <a href="/about" className="link link-hover hover:text-secondary">
            Our Mission
          </a>
          <a href="/contact" className="link link-hover hover:text-secondary">
            Contact Us
          </a>
          <a href="/terms" className="link link-hover hover:text-secondary">
            Terms of Use
          </a>
          <a href="/privacy" className="link link-hover hover:text-secondary">
            Privacy Policy
          </a>
        </nav>
      </div>

      <div className="bg-secondary text-primary text-center p-4">
        <p className="font-semibold">
          All Rights Reserved © {new Date().getFullYear()} | Minjamin Ahmmed
          Sheefat
        </p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import banner from '../../assets/banner2.jpg'

const About = () => {
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={banner}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">We are <span className='text-red-950'>JOB HIRING</span></h1>
                        <p className="py-6">
                        A job hiring website for front-end developers connects talented developers with potential employers looking for expertise in building user-friendly interfaces. These platforms offer a curated list of job opportunities, including full-time, freelance, and remote positions, catering specifically to front-end roles. Candidates can showcase their portfolios, highlight skills like HTML, CSS, JavaScript, React, and Angular, and apply for roles with ease. Employers benefit from tools to post job openings, filter candidates, and review portfolios efficiently. With a focus on front-end development, these websites bridge the gap between job seekers and companies, fostering seamless collaboration in crafting exceptional user experiences.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
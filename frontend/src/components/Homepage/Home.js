import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../assets/images/Homepage/logo.png';
import cardAnalytics from'../../assets/images/Homepage/card_analytics.png';
import cardCodeReview from'../../assets/images/Homepage/card_codereview.png';

const Home = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add('animate-fadeIn');
      }, index * 500); // delay (500ms)
    });
  }, []);

  return (
    <div className="flex flex-col box-border">
      <header className="w-full h-[60px] flex items-center bg-[#1a1a1a] p-5 box-border fixed top-0 z-50 left-0">
        <div className="flex items-center">
        <img src={logoPath} alt="Logo" className="h-[1.5em] mr-2" />
        <div className="text-2xl font-bold">Critqly</div>
        </div>
      </header>
      {/* Background Animation */}
      <div className="area absolute top-0 left-0 w-full h-full z-[-1]">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <main className="flex flex-col items-center gap-5 pt-[15em]">
        <h1 className="text-5xl font-bold m-0">Review <span className="highlight1">Better</span><br />Code <span className="highlight1">Smarter</span></h1>
        <p className="text-lg text-white text-opacity-80">
          Take your code review to the next level with the help of AI-powered feedback
        </p>
        <Link to="/signup">
          <button className="inline-flex items-center gap-3.5 p-4 rounded-full border border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer">
            <img src={logoPath} alt="Logo" className="h-[1.5em] mr-2" />
            <span className="text-lg text-white text-opacity-80">Start your journey</span>
          </button>
        </Link>
        <div className="flex flex-row justify-between items-start p-10 space-x-8 w-2/3 h-[30rem] max-w-500">
          {/* Section 1 */}
          <div className="section flex flex-col items-center bg-[#1D1C20] p-6 rounded-3xl text-white space-y-4 w-1/3 border-[#2f2e31] border-1 h-full flex-grow opacity-0">
            <h2 className="text-xl font-bold">Engaging Onboarding</h2>
            <p className="text-base text-gray-300 text-start">
            More practical way for new hires to learn how to contribute to code reviews.
            </p>
            <div className="flex flex-col space-y-8 w-full justify-between items-center relative">
              <div className="w-24 h-12 flex bg-[#2f2e31] items-center justify-center border-2 border-green-500 rounded-lg -translate-x-1/2">
                <span className="text-white font-bold text-xl">Easy</span>
              </div>
              <div className="w-24 h-12 flex bg-[#2f2e31] items-center justify-center border-2 border-orange-500 rounded-lg">
                <span className="text-white font-bold text-xl">Medium</span>
              </div>
              <div className="w-24 h-12 flex bg-[#2f2e31] items-center justify-center border-2 border-red-500 rounded-lg translate-x-1/2">
                <span className="text-white font-bold text-xl">Hard</span>
              </div>
            </div>
          </div>
          {/* Section 2 */}
          <div className="section flex flex-col items-center bg-[#1D1C20] p-6 rounded-3xl text-white space-y-4 w-2/3 border-[#2f2e31] border-1 h-full flex-grow overflow-hidden opacity-0" >
            <h2 className="text-xl font-bold">Practice Code Review and Adaptive Learning</h2>
            <p className="text-base text-gray-300 text-start">
              Engage in levels that match your skill level and receive instant AI feedback. Seamlessly immerse in the company's code review standards at your own pace.
            </p>
            <div className="flex-grow relative">
              <img src={cardCodeReview} alt="Practice Code Review" className="w-full h-full object-cover translate-x-1/4" />
            </div>
          </div>
          {/* Section 3 */}
          <div className="section flex flex-col items-center bg-[#1D1C20] p-6 rounded-3xl text-white space-y-4 w-1/3 border-[#2f2e31] border-1 h-full flex-grow opacity-0">
            <h2 className="text-xl font-bold items-start">Dashboard</h2>
            <p className="text-base text-gray-300 text-start">
              Get an AI-driven report and visualize your skill progression through dynamic skill graph.
            </p>
            <img src={cardAnalytics} alt="buttom" class="justify-left"/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

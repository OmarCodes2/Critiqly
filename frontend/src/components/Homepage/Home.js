import React from 'react';
import { Link } from 'react-router-dom';
import logoPath from '../../assets/images/Homepage/logo.png';
import imagePath from '../../assets/images/Homepage/buttom_image.png';

const Home = () => {
  return (
    <div className="flex flex-col box-border">
      <header className="w-full h-[60px] flex items-center bg-[#1a1a1a] p-5 box-border fixed top-0 left-0">
        <div className="flex items-center">
        <img src={logoPath} alt="Logo" className="h-[1.5em] mr-2" />
        <div className="text-2xl font-bold">Critqly</div>
        </div>
      </header>
      <main className="flex flex-col items-center gap-5 pt-[15em]">
        <h1 className="text-4xl font-bold m-0">Review <span className="highlight1">Better</span><br />Code <span className="highlight1">Smarter</span></h1>
        <p className="text-[18px] text-white text-opacity-80">
          Take your code review to the next level with the help of AI-powered feedback
        </p>
        <Link to="/signup">
          <button className="inline-flex items-center gap-3.5 p-4 rounded-full border border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer">
            <img src={logoPath} alt="Logo" className="h-[1.5em] mr-2" />
            <span className="text-base text-white text-opacity-80">Start your journey</span>
          </button>
        </Link>
        <img src={imagePath} alt="buttom"/>
      </main>
    </div>
  );
};

export default Home;

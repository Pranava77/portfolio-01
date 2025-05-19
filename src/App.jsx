import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showContent, setShowContent] = useState(false);
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 1.5,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 1,
      delay: -1,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });

    gsap.to(".sky", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".bg", {
      scale: 1.1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".character", {
      scale: 1.4,
      x: "-50%",
      bottom: "-25%",
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    gsap.to(".text", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".main .text", {
        x: `${xMove * 0.4}%`,
      });
      gsap.to(".sky", {
        x: xMove,
      });
      gsap.to(".bg", {
        x: xMove * 1.7,
      });
    });

    // Logo lines animation
    gsap.from(".line", {
      scaleX: 0,
      duration: 2.2,
      stagger: 0.2,
      repeat: Infinity,
      ease: "power2.out",
      transformOrigin: "left",
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                 PH
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./blr.webp"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full overflow-x-hidden">
          <div className="landing overflow-hidden relative w-full min-h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 md:py-10 px-4 md:px-10">
              <div className="logo flex gap-3 md:gap-7">
                <div className="lines flex flex-col gap-[2px] md:gap-[5px]">
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-orange-400 origin-left"></div>
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-white origin-left"></div>
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-green-700 origin-left"></div>
                </div>
                <h3 className="text-xl md:text-4xl -mt-[4px] md:-mt-[8px] leading-none text-zinc-100 font-[PlayReg]">
                Frontend Developer
                </h3>
              </div>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-[80vh] md:h-screen">
              <img
                className="absolute sky scale-[0.9] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky1.webp"
                alt=""
              />
              <img
                className="absolute scale-[1.2] md:scale-[1.4] rotate-[-3deg] bg top-0 left-0 w-full h-full object-cover"
                src="./blr.webp"
                alt=""
              />
              <div className="text text-zinc-100 flex flex-col gap-2 absolute top-[15%] md:top-10 left-1/2 -translate-x-1/2 scale-[0.45] md:scale-[0.6] rotate-[-10deg] w-full text-center font-[PlayReg]">
                <h1 className="text-[4rem] xs:text-[5rem] md:text-[7rem] leading-none">Pranava</h1>
                <h1 className="text-[4rem] xs:text-[5rem] md:text-[7rem] leading-none mt-[0px] md:mt-0">Holla</h1>
              </div>
              <img
                className="absolute character z-10 bottom-[30] sm:bottom-[30%] md:bottom-[80%] left-1/2 translate-y-[0%] sm:-translate-y-[20%] md:-translate-y-[20%] translate-x-1/2 w-[95%] xs:w-[85%] sm:w-[60%] md:w-[75vh] h-[75vh] object-contain scale-[0.85] sm:scale-[0.8] md:scale-[1.2]"
                src="./pran1.webp"
                alt=""
              />
            </div>
            
            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-4 md:py-8 px-4 md:px-10 bg-gradient-to-t from-black to-transparent">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex gap-2 md:gap-4 items-center mb-3 md:mb-0">
                  <i className="text-xl md:text-4xl ri-arrow-down-line"></i>
                  <h3 className="text-base md:text-xl font-[PlayReg]">
                    Scroll Down
                  </h3>
                </div>
                <div className="flex gap-2 items-center">
                  <img
                    className="h-[105px] md:h-[175px]"
                    src="./MERN.png"
                    alt=""
                  />
                  <img
                    className="h-[75px] md:h-[145px]"
                    src="./PNCL.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full min-h-screen bg-black py-10 md:py-20 px-4 md:px-0">

          </div>
        </div>
      )}
    </>
  );
}

export default App;

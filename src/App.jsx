import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import "./index.css"

function App() {
  let [showContent, setShowContent] = useState(false);
  const textContainerRef = useRef(null);
  const textRevealRef = useRef(null);

  // music  

  const audioRef = useRef(new Audio('/ui.mp3'));

  const handleClick = () => {
    const audio = audioRef.current;
    audio.currentTime = 0;
    audio.play();
    // Stop after 3.5 seconds (3500 ms)
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;  // rewind if you want to replay from start
    }, 200);
  };






  useEffect(() => {
    const handler = (e) => e.preventDefault();
    document.addEventListener('contextmenu', handler);
    return () => document.removeEventListener('contextmenu', handler);
  }, []);

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
      duration: 4.7,
      stagger: 0.2,
      repeat: Infinity,
      ease: "power2.out",
      transformOrigin: "left",
    });

    // Text rotation animation
    const texts = textContainerRef.current.children;
    let currentIndex = 1;

    const animateText = () => {
      gsap.to(texts, {
        opacity: 0,
        y: -20,
        duration: 2,
        stagger: 0.1,
        ease: "power2.inOut",
        onComplete: () => {
          // Hide all texts
          gsap.set(texts, { display: "none" });
          // Show current text
          gsap.set(texts[currentIndex], { display: "block" });
          // Animate in
          gsap.to(texts[currentIndex], {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          // Update index
          currentIndex = (currentIndex + 1) % texts.length;
        }
      });
    };

    // Initial setup
    gsap.set(texts, { opacity: 0, display: "none" });
    gsap.set(texts[0], { display: "block", opacity: 1 });

    // Start the interval
    const interval = setInterval(animateText, 5000);

    // Cleanup
    return () => clearInterval(interval);
  }, [showContent]);

  useGSAP(() => {
    if (!showContent) return;

    // Text reveal animation with clip-path
    const textReveal = textRevealRef.current;
    if (textReveal) {
      gsap.set(textReveal, {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)"
      });

      gsap.to(textReveal, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 2.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: textReveal,
          start: "top 20%",
          toggleActions: "play none none reverse"
        }
      });
    }
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
                  fontSize="200"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="PlayReg"
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
        <div className="main w-full overflow-x-hidden select-none">
          <div className="landing overflow-hidden relative w-full min-h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] w-full py-4 md:py-10 px-4 md:px-10">
              <button onClick={handleClick} className="logo flex gap-3 md:gap-7">
                <div className="lines flex flex-col gap-[2px] md:gap-[5px]">
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-orange-400 origin-left"></div>
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-white origin-left"></div>
                  <div className="line w-8 md:w-15 h-1 md:h-2 bg-green-700 origin-left"></div>
                </div>
                <div ref={textContainerRef} className="relative">
                  <h3 className="text-lg md:text-3xl flex -mt-[3px] md:-mt-[2px] leading-none text-zinc-100 font-[PlayReg] ">
                    Frontend Developer
                  </h3>
                  <h3 className="text-lg md:text-3xl flex -mt-[3px] md:-mt-[2px] leading-none text-zinc-100 font-[PlayReg] ">
                    AI Agents
                  </h3>
                  <h3 className="text-lg md:text-3xl flex -mt-[3px] md:-mt-[2px] leading-none text-zinc-100 font-[PlayReg] ">
                    AI Automation
                  </h3>
                </div>
              </button>
            </div>

            <div className="imagesdiv relative overflow-hidden w-full h-[80vh] md:h-screen" >
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
              <div className="text text-zinc-50 flex flex-col gap-2 absolute top-[15%] md:top-10 left-1/2 -translate-x-1/2 scale-[0.45] md:scale-[0.6] rotate-[-10deg] w-full text-center font-[PlayReg]">
                <h1 className="text-[3rem] xs:text-[4rem] sm:text-[5rem] md:text-[7rem] leading-none">Pranava</h1>
                <h1 className="text-[3rem] xs:text-[4rem] sm:text-[5rem] md:text-[7rem] leading-none mt-[0px] md:mt-0">Holla</h1>
              </div>
              <img
                draggable="false"
                className="absolute character z-10 bottom-[30] sm:bottom-[30%] md:bottom-[80%] left-1/2 translate-y-[0%] sm:-translate-y-[20%] md:-translate-y-[20%] translate-x-1/2 w-[95%] xs:w-[85%] sm:w-[60%] md:w-[75vh] h-[75vh] object-contain scale-[0.85] sm:scale-[0.8] md:scale-[1.2]"
                src="./pran1.webp"
                alt=""
              />
            </div>

            <div className="btmbar text-white absolute bottom-0 left-0 w-full py-4 md:py-8 px-4 md:px-10 bg-gradient-to-t from-black to-transparent mt-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex gap-0 md:gap-4 items-center mb-0 md:mb-0 ">
                  <i className="text-xl md:text-4xl ri-arrow-down-line"></i>
                  <h3 className="text-base md:text-xl font-[PlayReg] ">
                    Scroll Down
                  </h3>
                </div>
                <div className="flex items-center select-none user-drag-none">
                  <img
                    draggable="false"
                    className="h-[105px] md:h-[155px] sm:h-[90]"
                    src="./MERN.png"
                    alt=""
                  />

                  <img
                    draggable="false"
                    className="h-[80px] md:h-[125px] sm:h-[60]"
                    src="./PNCL.png"
                    alt=""
                  />

                  <img
                    draggable="false"
                    className="h-[105px] md:h-[155px] sm:h-[90]"
                    src="./MERN.png"
                    alt=""
                  />

                </div>
              </div>
            </div>
          </div>

          <div className="w-full min-h-screen bg-black py-10 md:py-20 px-4 md:px-4">
            <div className="relative overflow-hidden">
              <div ref={textRevealRef} className="text-white text-center text-2xl md:text-4xl font-[PlayReg] leading-relaxed">
                voluptatum architecto nemo fuga culpa inventore, Doloribus voluptatum architecto nemo fuga culpa inventore, minima porro incidunt tenetur doloremque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, dolor delectus, aperiam eos, aliquid nihil commodi voluptatem at cupiditate maiores earum voluptate veniam fuga velit. lorem10
              </div>
            </div>
            <div className="h-[40vh] md:h-[50vh] bg-green-900 mt-6 md:mt-16 md:w-[60vw] rounded-4xl md:mx-auto">
                <img src="" alt="" />
            </div>
            
          </div>
        </div>
      )}
    </>
  );
}

export default App;

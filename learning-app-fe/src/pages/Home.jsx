import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef, useCallback } from "react";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
  stagger: 0.1,
  ease: "power1.out",
  duration: 0.5,
});
const listImage = [
  "/images/home-img/1426929.webp",
  "/images/home-img/modern-education.jpg",
  "/images/home-img/iStock-1320882544__1_.jpg",
  "/images/home-img/banner-1242.jpg",
  "/images/home-img/banner-1412.jpg",
];
const arrNumb = [1, 2, 3, 4, 5];
const greeting =
  "Chào mừng bạn đến với Duylingo – Nền tảng học ngoại ngữ trực tuyến!";
const intro =
  "Chúng tôi cung cấp các khóa học ngoại ngữ đa dạng và hiệu quả, từ các ngôn ngữ phổ biến như Tiếng Anh, Tiếng Nhật, Tiếng Hàn,... đến các ngôn ngữ ít người biết. Với phương pháp học hiện đại và linh hoạt, bạn có thể học mọi lúc, mọi nơi chỉ với một thiết bị kết nối internet.";

const courses = [
  {
    name: "Tiếng Anh",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/63/Flag_of_the_United_States_of_America_%28American_Legion%29.jpg",
  },
  {
    name: "Tiếng Tây Ban Nha",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Flag_of_Spain_%281785%E2%80%931873%2C_1875%E2%80%931931%29.svg",
  },
  {
    name: "Tiếng Trung Quốc",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  },
  {
    name: "Tiếng Hindi",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_India_%283-5%29.svg",
  },
  {
    name: "Tiếng Pháp",
    src: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Flag_of_France_%281976%E2%80%932020%29.svg",
  },
  {
    name: "Tiếng Ả Rập",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg",
  },
  {
    name: "Tiếng Nga",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",
  },
  {
    name: "Tiếng Đức",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg",
  },
  {
    name: "Tiếng Nhật",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg",
  },
  {
    name: "Tiếng Ý",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg",
  },
  {
    name: "Tiếng Bồ Đào Nha",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg",
  },
  {
    name: "Tiếng Hàn",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/09/Flag_of_South_Korea.svg",
  },
  {
    name: "Tiếng Thổ Nhĩ Kỳ",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg",
  },
  {
    name: "Tiếng Indonesia",
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flag_of_Indonesia.svg",
  },
  {
    name: "Tiếng Thái",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg",
  },
];
const Home = () => {
  const [indexImg, setIndexImg] = useState(0);
  const header = useRef();
  const setPosition = useCallback(() => {
    window.scrollY >= 30
      ? ((header.current.style.position = "fixed"),
        (header.current.style.top = "0"),
        (header.current.style.left = "0"),
        (header.current.style.borderBottom = "2px solid white"))
      : ((header.current.style.position = "absolute"),
        (header.current.style.top = "0"),
        (header.current.style.left = "0"),
        (header.current.style.border = "none"));
  }, []);
  // useEffect(() => {
  //   window.addEventListener("scroll", setPosition);
  //   return () => {
  //     window.removeEventListener("scroll", setPosition);
  //   };
  // }, []);
  useEffect(() => {
    const timeOut = setInterval(() => {
      if (indexImg + 1 > listImage.length - 1) {
        setIndexImg(0);
        return;
      }
      setIndexImg(indexImg + 1);
    }, 5000);
    return () => clearInterval(timeOut);
  }, [indexImg]);
  // useEffect(() => {
  //   gsap.fromTo(
  //     [".greeting", ".intro", ".button"],
  //     { opacity: 0, y: 50 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5,
  //       stagger: 0.1,
  //     },
  //   );
  // }, []);
  // useEffect(() => {
  //   gsap.fromTo(
  //     [".image"],
  //     { opacity: 0 },
  //     {
  //       opacity: 1,
  //       duration: 2.5,
  //     },
  //   );
  // }, [indexImg]);
  // // ask-container
  // useEffect(() => {
  //   const tl = gsap.timeline({});
  //   tl.from(".ask-container h4", {
  //     xPercent: -100,
  //     opacity: 0,
  //   })
  //     .from(".ask-container img", {
  //       xPercent: -100,
  //       opacity: 0,
  //     })
  //     .to(".ask-container img", {
  //       xPercent: 0,
  //       opacity: 1,
  //     })
  //     .to(".ask-container img", {
  //       xPercent: -100,
  //       opacity: 0,
  //     })
  //     .to(".ask-container h4", {
  //       translateY: "-90",
  //     })
  //     .fromTo(
  //       ".ask-container .reason1",
  //       {
  //         xPercent: 100,
  //         opacity: 0,
  //       },
  //       {
  //         xPercent: 0,
  //         opacity: 1,
  //       },
  //     )
  //     .to(".ask-container .reason1", {
  //       translateY: "-200",
  //       fontSize: "1.3rem",
  //       delay: 0.5,
  //     })
  //     .fromTo(
  //       ".ask-container .reason2",
  //       {
  //         xPercent: 100,
  //         opacity: 0,
  //       },
  //       {
  //         xPercent: 0,
  //         opacity: 1,
  //       },
  //     )
  //     .to(".ask-container .reason2", {
  //       translateY: "-10",
  //       fontSize: "1.3rem",
  //       delay: 0.5,
  //     })
  //     .fromTo(
  //       ".ask-container .reason3",
  //       {
  //         xPercent: 100,
  //         translateY: "180",
  //         opacity: 0,
  //       },
  //       {
  //         xPercent: 0,
  //         opacity: 1,
  //       },
  //     )
  //     .to(".ask-container .reason3", {
  //       translateY: "180",
  //       fontSize: "1.3rem",
  //       delay: 0.5,
  //     })
  //     .to(".ask-container", {
  //       delay: 2,
  //     });
  //   ScrollTrigger.create({
  //     animation: tl,
  //     trigger: ".ask-container",
  //     start: "top top", // Bắt đầu khi phần tử này chạm đến đầu trang
  //     end: "+=4000", // Kết thúc khi phần tử này ra khỏi màn hình
  //     pin: true,
  //     pinSpacing: true,
  //     toggleActions: "play resume reverse none",
  //     // invalidateOnRefresh: true,
  //     scrub: 5, // Hoạt ảnh mượt mà theo cuộn trang
  //     // markers: true, // Dùng để hiển thị dấu mốc trong quá trình phát triển
  //   });
  //   return () => {
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  //     tl.kill()
  //   };
  // }, []);
  // useEffect(() => {
  //   const tl = gsap.timeline({});
  //   tl.to(".list-course",{
  //     translateX: '-40%',
  //     duration: 20,
  //   })
  //   ScrollTrigger.create({
  //     animation: tl,
  //     trigger: ".courses",
  //     start: "top top",
  //     end: "+=4000",
  //     scrub: 5, 
  //     pin: true,
  //     // markers: true, // Hiển thị dấu mốc trong quá trình phát triển
  //   });
  //   return () => {
  //     ScrollTrigger.kill()
  //     tl.kill()
  //   };
  // }, []);
  return (
    <>
      <div className="h-auto w-full bg-black font-noto">
        <ul className="relative h-[35vh] w-full sm:h-[45vh] md:h-[60vh] xl:h-[100vh]">
          {
            <li className="image absolute left-0 top-0 h-[100%] w-full object-cover">
              <img
                src={listImage[indexImg]}
                alt=""
                className="h-[100%] w-full"
              />
            </li>
          }
          <ul className="absolute bottom-[0.4rem] left-[50%] flex -translate-x-1/2 cursor-pointer gap-4 md:gap-5 lg:bottom-[1rem] xl:gap-6">
            {arrNumb.map((numb, index) => (
              <li
                key={index}
                onClick={() => setIndexImg(index)}
                className={` ${indexImg === index ? "w-4 md:w-6 xl:w-8" : "w-2 md:w-3 xl:w-4"} ease h-2 rounded-full bg-white transition-all duration-500 md:h-3 xl:h-4`}
              ></li>
            ))}
          </ul>
          <div
            ref={header}
            className="absolute top-0 flex h-[2rem] w-full items-center justify-center sm:h-[3rem] md:h-[4rem]"
          >
            <div className="mx-auto flex w-full items-center justify-between px-4 sm:w-[85%] lg:w-[70%]">
              <div className="flex cursor-pointer items-center justify-center">
                <img
                  src="/images/logo/cat-black.png"
                  className="flex h-[1.5rem] w-[1.5rem] text-white sm:h-[3rem] sm:w-[3rem] lg:h-[4rem] lg:w-[4rem]"
                />
                <h2 className="ml-2 flex items-center font-pacifico text-sm font-normal not-italic tracking-wide text-white sm:text-xl md:text-2xl xl:text-3xl">
                  Duylingo
                </h2>
              </div>
              <button className="md:text-md font-sans text-[10px] text-white hover:text-blue-400 active:scale-95 sm:text-sm xl:text-xl">
                <Link to="/learning">Bắt đầu ngay</Link>
              </button>
            </div>
          </div>
          <div className="absolute left-1/2 top-[45%] flex w-[16rem] -translate-x-1/2 -translate-y-[45%] transform flex-col items-center justify-center rounded-2xl border-[1px] border-white p-2 font-sans text-white sm:w-[26rem] md:w-[35rem] lg:p-4 xl:w-[50rem] xl:border-[3px] xl:p-10">
            <h4 className="lg:text-md text-[8px] font-bold sm:text-[10px] md:text-[12px] xl:text-xl">
              {greeting.split(" ").map((char, index) => (
                <span key={index} className="greeting">
                  {char + " "}
                </span>
              ))}
            </h4>
            <p className="lg:text-md mt-2 text-[8px] sm:text-[10px] md:text-[12px] lg:mt-4 xl:text-xl">
              {intro.split(" ").map((char, index) => (
                <span key={index} className="intro">
                  {char + " "}
                </span>
              ))}
            </p>
            <button className="button mt-1 border-b-[1px] border-b-white text-[12px] font-bold hover:border-b-blue-400 hover:text-blue-400 active:scale-95 sm:text-[14px] lg:mt-6 lg:border-b-2 lg:text-2xl">
              <Link to="/learning">Trải nghiệm ngay</Link>
            </button>
          </div>
        </ul>
      </div>
      <div className="ask-container relative flex h-[100vh] w-full flex-col items-center justify-center gap-8 overflow-hidden border-none ">
        <h4 className="font-sans font-bold xl:text-3xl">
          Tại sao bạn nên học ngoại ngữ tại Duylingo?
        </h4>
        <img src="/images/home-img/tester-ask.png" />
        <div className="reason1 absolute mx-auto w-[90%] rounded-2xl p-2 text-[0.7rem] xl:mt-2 xl:w-[60%] xl:text-[1.7rem]">
          <p className="inline-block font-bold">Miễn phí</p>
          <p className="mt-2">
            Dịch vụ của chúng tôi hoàn toàn miễn phí, giúp bạn trải nghiệm mọi
            tính năng mà không phải lo về chi phí. Với chúng tôi, chất lượng và
            sự hài lòng của khách hàng là ưu tiên hàng đầu. Bạn có thể an tâm sử
            dụng mà không lo về bất kỳ chi phí phát sinh nào!
          </p>
        </div>
        <div className="reason2 absolute mx-auto rounded-2xl p-2 text-[0.7rem] xl:mt-2 xl:w-[60%] xl:text-[1.7rem]">
          <p className="inline-block font-bold">Hiệu quả</p>
          <p className="mt-2">
            Chúng tôi tập trung vào hiệu quả và sự tối ưu. Dịch vụ của chúng tôi
            không chỉ giúp bạn tiết kiệm thời gian mà còn mang lại kết quả vượt
            trội. Đảm bảo rằng mỗi hành động của bạn sẽ được tối ưu hóa để đạt
            được thành công nhanh chóng và bền vững!
          </p>
        </div>
        <div className="reason3 absolute mx-auto rounded-2xl p-2 text-[0.7rem] xl:mt-2 xl:w-[60%] xl:text-[1.7rem]">
          <p className="inline-block font-bold">Vui vẻ</p>
          <p className="mt-2">
            Chúng tôi không chỉ muốn bạn hài lòng với dịch vụ mà còn muốn bạn
            cảm thấy vui vẻ khi trải nghiệm. Với đội ngũ nhiệt tình, thân thiện
            và luôn sẵn sàng hỗ trợ, chúng tôi tạo ra một không gian dịch vụ
            tích cực, nơi bạn có thể thỏa sức sáng tạo và tận hưởng từng khoảnh
            khắc.
          </p>
        </div>
      </div>
      <div className="courses overflow-hidden flex flex-col justify-center items-center h-[100vh] w-full">
        <div className="course-title relative mb-[5rem] w-full text-center font-bold xl:text-3xl">Các khóa học hiện có của chúng tôi</div>
        <ul className="list-course flex h-[50vh] gap-10 overflow-hidden">
          {courses.map((course, index) => (
            <li key={index} className="course-item mr-7 bg-[#e1edf4] h-fit">
              <img src={course.src} className="h-[8rem] w-[12rem] max-w-none cursor-pointer" />
              <p className="mt-2 text-center">{course.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[100vh] w-full bg-gradient-to-l from-black via-gray-800 to-black"></div>
    </>
  );
};

export default Home;

import { useState, useEffect, useContext, useRef } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";

import QuestionTypeChoose from "../components/QuestionTypeChoose.jsx";
import QuestionTypeMatch from "../components/QuestionTypeMatch.jsx";
import QuestionTypeFill from "../components/QuestionTypeFill.jsx";
import Congratulation from "../components/Congratulation.jsx";
const Lesson = ({
  courseId,
  sectionId,
  milestoneId,
  setIsLesson,
  lessons,
  currentLesson,
}) => {
  const {
    profile,
    setFetchProfile,
    setFetchCourseOfLearningProcess,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);

  const [indexQuestion, setIndexQuestion] = useState(9);
  const [indexLesson, setIndexLesson] = useState(currentLesson || 1);
  const [questions, setQuestions] = useState(
    lessons[indexLesson - 1] && lessons[indexLesson - 1]?.questions,
  );
  const [lessonId, setLessonId] = useState(
    lessons[indexLesson - 1] && lessons[indexLesson - 1]._id,
  );
  const colorDiv = useRef(null);
  const calledOnce = useRef(false);
  const [countRequest, setCountRequest] = useState(0);
  const [isCongratulation, setIsCongratulation] = useState(false);
  useEffect(() => {
    if (lessons.length === 0) {
      setIsLesson(false);
    }
  }, [lessons]);
  const handleNextQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    setIndexQuestion(indexQuestion + 1);
    if (indexQuestion + 1 > questions?.length - 1) {
      if (indexLesson + 1 > lessons.length) {
        try {
          await instance.patch("learning_process/update_milestone", {
            courseId,
            sectionId,
            milestoneId,
            currentLesson,
            totalLessonDone: currentLesson,
            status: 2,
          });
          await instance.patch(`learning_process/update_section`, {
            courseId,
            sectionId,
            totalMilestoneDone: indexLesson
          });
          await instance
        .patch("users/update_asset", {
          experiences: +lessons[indexLesson - 1].experiences,
          gems: +lessons[indexLesson - 1].gems,
          turns: 5,
          dayStreak: Math.random()
        })
          setIsLesson(false);
          setFetchProfile({ status: "-1 heart", numb: Math.random() });
          setFetchCourseOfLearningProcess({
            type: "update status lesson",
            numb: Math.random(),
          });
        } catch (error) {}
        return
      }
      await instance
        .patch("users/update_asset", {
          experiences: +lessons[indexLesson - 1].experiences,
          gems: +lessons[indexLesson - 1].gems,
          turns: 5,
          dayStreak: Math.random()
        })
        .then(() => {
          setFetchProfile({ status: "-1 heart", numb: Math.random() });
        })
        .catch();
      await instance
        .patch("learning_process/update_milestone", {
          courseId,
          sectionId,
          milestoneId,
          currentLesson,
          totalLessonDone: currentLesson,
        })
        .then(() => {
          setIsCongratulation(true);
          setFetchCourseOfLearningProcess({
            type: "update current lesson",
            numb: Math.random(),
          });
          setCountRequest(0);
          return;
        })
        .catch((err) => {
          setCountRequest(0);
          return;
        });
      return;
    }
    setCountRequest(0);
  };
  const handleBackToMilestonePage = () => {
    setIsLesson(false);
  };
  useEffect(() => {
    setQuestions(
      lessons[indexLesson - 1] && lessons[indexLesson - 1].questions,
    );
    setLessonId(lessons[indexLesson - 1] && lessons[indexLesson - 1]._id);
  }, [indexLesson]);
  useEffect(() => {
    colorDiv.current.style.width =
      (indexQuestion / questions?.length) * 100 + "%";
  }, [questions, indexQuestion]);
  useEffect(() => {
    const addLessonToSummaryLesson = async () => {
      try {
        const findIndexLesson = lessonsOfSummaryLesson.findIndex(
          (lesson) => lesson.lesson._id.toString() === lessonId.toString(),
        );
        if (findIndexLesson > -1) return;
        if (!calledOnce.current) {
          await instance.patch("summary_lesson/add_lesson", { lessonId });
          setFetchLessonsOfSummaryLesson({
            lessonId,
            numb: Math.random(),
          });
          calledOnce.current = true;
        }
      } catch (error) {
        
      }
      return () => {
        calledOnce.current = false;
      };
    };
    if (lessonId) {
      addLessonToSummaryLesson();
    }
  }, [lessonId]);
  return (
    <>
      {isCongratulation && (
        <Congratulation
          lessons={lessons}
          currentLesson={currentLesson}
          setIsCongratulation={setIsCongratulation}
          setIsLesson={setIsLesson}
        />
      )}
      <div className="relative h-screen w-full py-6">
        <ul className="mx-auto flex w-[90%] items-center justify-center md:w-[75%]">
          <li>
            <i
              onClick={handleBackToMilestonePage}
              className="fa-solid fa-arrow-left cursor-pointer text-2xl md:text-3xl"
            ></i>
          </li>
          <li className="mx-3 h-4 w-full rounded-md bg-[#eeeeee]">
            <div
              ref={colorDiv}
              className="h-4 w-[0%] rounded-md bg-red-600 transition ease-linear"
            ></div>
          </li>
          <li className="flex items-center justify-center">
            <img src="/images/logo/heart.webp" className="h-7 w-7" />
            <p className="ml-1 flex items-center justify-center font-mono text-2xl font-medium text-red-600 md:text-3xl">
              {profile?.hearts ? profile?.hearts : 0}
            </p>
          </li>
        </ul>
        {/* <i onClick={handleBackToMilestonePage} className="fa-solid fa-arrow-left absolute left-2 top-[5rem] cursor-pointer text-2xl md:left-[3rem] md:top-[6rem] md:text-3xl lg:left-[5rem]"></i> */}
        {questions && questions[indexQuestion]?.question?.type === "choose" ? (
          <QuestionTypeChoose
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
          />
        ) : questions &&
          questions[indexQuestion]?.question?.type === "match" ? (
          <QuestionTypeMatch
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
          />
        ) : questions && questions[indexQuestion]?.question?.type === "fill" ? (
          <QuestionTypeFill
            question={questions[indexQuestion]?.question}
            lessonId={lessonId}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Lesson;

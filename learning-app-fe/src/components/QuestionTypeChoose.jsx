import { useEffect, useState, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";

const QuestionTypeChoose = ({ question, lessonId, handleNextQuestion }) => {
  const {
    setFetchProfile,
    lessonsOfSummaryLesson,
    setFetchLessonsOfSummaryLesson,
  } = useContext(UserInfo);
  const [correct, setCorrect] = useState();
  const [choose, setChoose] = useState();
  const [answers, setAnswers] = useState([]);
  const [countRequest, setCountRequest] = useState(0);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const converToArrObj = question?.answers.map((answer) => {
      return {
        answer,
        selected: false,
      };
    });
    setAnswers(converToArrObj);
  }, [question]);
  const renderStatus = (index) => {
    switch (index) {
      case 0:
        return "A.";
      case 1:
        return "B.";
      case 2:
        return "C.";
      default:
        return "D.";
    }
  };
  const handleChooseAnswer = (index) => {
    answers.map((item) => (item.selected = false));
    answers[index].selected = true;
    setAnswers([...answers]);
    setChoose(index + 1);
  };
  const handleReplayQuestion = () => {
    const converToArrObj = question?.answers.map((answer) => {
      return {
        answer,
        selected: false,
      };
    });
    setAnswers(converToArrObj);
    setCorrect(undefined);
    setChoose(undefined);
    setCountRequest(0)
  };
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (!choose) {
      setMessage("Bạn chưa chọn đáp án!");
      setTimeout(() => setMessage(""), 1500);
      setCountRequest(0);
      return;
    }
    if (choose - 1 === +question?.correctChoose) {
      setCountRequest(0);
      setCorrect(true);
      return;
    } else {
      setCorrect(false);
      await instance.patch("users/update_asset", {
        hearts: Math.random(),
      });
      setFetchProfile({ status: "-1 heart", numb: Math.random() });
      const findIndexLesson = lessonsOfSummaryLesson.findIndex(
        (lesson) => lesson.lesson._id.toString() === lessonId,
      );
      if (findIndexLesson > -1) {
        const findWrongQuestion = lessonsOfSummaryLesson[
          findIndexLesson
        ].wrongQuestions.findIndex(
          (ques) => ques.toString() === question._id.toString(),
        );
        if (findWrongQuestion > -1) {
          setCountRequest(0);
          return;
        }
        await instance
          .patch("summary_lesson/update_lesson", {
            lessonId,
            questionId: question._id,
          })
          .then(() => {
            setFetchLessonsOfSummaryLesson({ numb: Math.random() });
            setCountRequest(0);
            return;
          })
          .catch((err) => {
            setFetchLessonsOfSummaryLesson({ numb: Math.random() });
            setCountRequest(0);
            return;
          });
      }
      return;
    }
  };
  const handleNextNewQuestion = () => {
    if (correct) {
      handleNextQuestion();
      setCorrect(undefined);
      setChoose(undefined);
      setCountRequest(0);
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mb-2 mt-3 w-full h-full px-5 md:mt-7 md:w-[65%] md:px-0">
            <p className="mb-2 text-center font-mono font-bold md:text-2xl">
              Chọn đáp án đúng
            </p>
            <div className="">
              <div className="flex">
                <img
                  src="/images/meo_image_learning.png"
                  alt=""
                  className="mr-2 h-10 w-10 md:mr-5 md:h-24 md:w-24"
                />
                <p className="flex items-end font-mono md:text-xl">
                  {question?.question}
                </p>
              </div>

              <div className="mt-2 flex w-full items-center justify-center">
                <ul className="mt-4 grid w-[80%] grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6 md:w-full">
                  {answers &&
                    answers.map((answer, index) => (
                      <li
                        onClick={() => handleChooseAnswer(index)}
                        key={index}
                        className={`border-1 cursor-pointer rounded-lg py-4 pl-2 pr-8 font-bold ${answer.selected ? "border-2 bg-green-400" : "bg-[#eeeeee]"} px-2 hover:bg-green-400 md:text-xl`}
                      >
                        <span className="pl-3 font-mono font-bold">
                          {renderStatus(index)}
                        </span>
                        <span className="font-mono">{answer.answer}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 h-48 w-full bg-[#eeeeee] px-3 py-2 md:mt-6 md:px-0 md:py-3">
            <div className="relative mx-auto flex w-full justify-between md:w-[65%]">
              <div className="cursor-pointer">
                {correct === true ? (
                  ""
                ) : correct === false ? (
                  ""
                ) : (
                  <button
                    onClick={handleReplayQuestion}
                    className="flex transform items-center justify-center rounded-lg bg-[#b3b8ba] px-6 py-2 font-mono font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold"
                  >
                    Làm lại
                  </button>
                )}
              </div>
              <div className="cursor-pointer">
                {correct === true ? (
                  <button
                    onClick={handleNextNewQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-gray-400 px-6 py-2 font-mono font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold"
                  >
                    Câu tiếp theo
                  </button>
                ) : correct === false ? (
                  <button
                    onClick={handleReplayQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-[#b3b8ba] px-6 py-2 font-mono font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold"
                  >
                    Làm lại
                  </button>
                ) : (
                  <button
                    onClick={handleCheckQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-gray-400 px-6 py-2 font-mono font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:py-3 md:text-xl md:font-bold"
                  >
                    Kiểm tra đáp án
                  </button>
                )}
              </div>
              {correct === true ? (
                <div className="absolute left-2 top-0 text-4xl font-bold text-green-600 md:left-2 md:text-6xl">
                  <p>Good!</p>
                  <p className="text-xl">Cùng tới với câu tiếp theo nào!</p>
                </div>
              ) : correct === false ? (
                <div className="absolute left-2 top-0 text-4xl font-bold text-red-600 md:left-2 md:text-6xl">
                  <p>Sai!</p>
                  <p className="text-xl">Bạn làm sai rồi, làm lại nhé!</p>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className="mt-3 w-full text-center font-mono text-lg font-semibold text-red-500 md:text-xl">
              {message}
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default QuestionTypeChoose;

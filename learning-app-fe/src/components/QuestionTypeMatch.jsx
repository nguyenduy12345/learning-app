import { useEffect, useState, useContext } from "react";

import { UserInfo } from "../stores/user.store.jsx";

import instance from "../utils/axiosRequest.js";
const QuestionTypeMatch = ({
  question,
  lessonId,
  handleNextQuestion,
}) => {
  const { setFetchProfile, lessonsOfSummaryLesson, setFetchLessonsOfSummaryLesson } =
    useContext(UserInfo);
  const [leftOptions, setLeftOptions] = useState([]);
  const [rightOptions, setRightOptions] = useState([]);
  const [correct, setCorrect] = useState();
  const [message, setMessage] = useState("");
  const [countRequest, setCountRequest] = useState(0);
  const [listWord, setListWord] = useState([]);
  const [listPaire, setListPaire] = useState([]);
  const [isLeftColChoose, setIsLeftColChoose] = useState(0);
  // covert list paire arr to obj
  useEffect(() => {
    const obj = [];
    for (let i = 0; i <= listWord.length / 2 + 2; i += 2) {
      obj.push({
        left: listWord[i],
        right: listWord[i + 1],
      });
    }
    setListPaire(obj);
  }, [listWord]);
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  //sort and set list word
  useEffect(() => {
    const rightWord = question?.correctMatches?.map((item) => {
      return {
        right: item.right,
        selected: false,
      };
    });
    const leftWord = question?.correctMatches?.map((item) => {
      return {
        left: item.left,
        selected: false,
      };
    });
    setRightOptions(shuffleArray(rightWord));
    setLeftOptions(leftWord);
  }, [question]);
  const handleGetWordFromLeft = (word, index) => {
    if(leftOptions[index].selected === true) return
    if (isLeftColChoose !== 0) return;
    setIsLeftColChoose(1);
    leftOptions[index].selected = true;
    setLeftOptions([...leftOptions]);
    setListWord([...listWord, word]);
  };
  const handleGetWordFromRight = (word, index) => {
    if(rightOptions[index].selected === true) return
    if (isLeftColChoose !== 1) return;
    setIsLeftColChoose(0);
    rightOptions[index].selected = true;
    setRightOptions([...rightOptions]);
    setListWord([...listWord, word]);
  };
  function areArraysEqual(arr1, arr2) {
    arr1 = arr1.map(JSON.stringify).sort();
    arr2 = arr2.map(JSON.stringify).sort();
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  const handleCheckQuestion = async () => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (listPaire.length !== question?.correctMatches.length) {
      setCountRequest(0);
      setMessage("Hãy nối tất cả các từ đã cho bên dưới");
      setTimeout(() => setMessage(""), 1500);
      return;
    }
    const formatArrDeleteKeyId = question?.correctMatches.map((item) => {
      delete item._id;
      return item;
    });
    const result = areArraysEqual(listPaire, formatArrDeleteKeyId);
    if (result) {
      setCorrect(true);
      setCountRequest(0);
      return
    } else {
      setCorrect(false);
      await instance
        .patch("users/update_asset", {
          hearts: Math.random()
        })
      setFetchProfile({ status: "-1 heart", numb: Math.random() })
      const findIndexLesson = lessonsOfSummaryLesson.findIndex(lesson => lesson.lesson._id.toString() === lessonId)
      if(findIndexLesson > -1){
        const findWrongQuestion = lessonsOfSummaryLesson[findIndexLesson].wrongQuestions.findIndex(ques => ques.toString() === question._id.toString())
        if(findWrongQuestion > -1){
          setCountRequest(0);
          return
        }
        await instance.patch('summary_lesson/update_lesson', {
          lessonId,
          questionId: question._id
        })
        .then(() => {
          setFetchLessonsOfSummaryLesson({numb: Math.random()})
          setCountRequest(0);
          return
          })
        .catch(err => {
          setFetchLessonsOfSummaryLesson({numb: Math.random()})
          setCountRequest(0);
          return
        });
      }
      return
    }
  };
  const handleReplayQuestion = () => {
    const rightWord = question?.correctMatches?.map((item) => {
      return {
        right: item.right,
        selected: false,
      };
    });
    const leftWord = question?.correctMatches?.map((item) => {
      return {
        left: item.left,
        selected: false,
      };
    });
    setIsLeftColChoose(0)
    setRightOptions(shuffleArray(rightWord));
    setLeftOptions(leftWord);
    setListWord([]);
    setListPaire([]);
    setCountRequest(0)
    setCorrect(undefined);
  };
  const handleNextNewQuestion = () => {
    if (correct) {
      setCountRequest(0);
      handleNextQuestion();
      setListWord([]);
      setListPaire([]);
      setCorrect(undefined);
      return;
    }
  };
  return (
    <>
      {question && (
        <>
          <div className="mx-auto mt-3 w-full px-5 md:w-[65%] md:px-0">
            <p className="text-center font-mono font-bold md:text-xl">
              Nối các từ từ bên cột trái với các từ tại cột phải sao cho đúng
            </p>
            <div className="flex w-full justify-between">
              <ul className="mt-4 grid w-[33%] grid-cols-1 gap-2 md:mt-6">
                {leftOptions &&
                  leftOptions?.map((option, index) => (
                    <li
                      onClick={() => handleGetWordFromLeft(option?.left, index)}
                      key={index}
                      className={`w-full h-10 font-mono border-1 flex cursor-pointer items-center justify-center rounded-lg bg-[#eeeeee] p-1 text-lg hover:bg-green-200 active:scale-95 md:text-xl`}
                    >
                      {option?.selected ? "" : option?.left}
                    </li>
                  ))}
              </ul>
              <ul className="mt-4 grid w-[33%] grid-cols-1 gap-2 md:mt-6">
                {rightOptions &&
                  rightOptions?.map((option, index) => (
                    <li
                      onClick={() =>
                        handleGetWordFromRight(option?.right, index)
                      }
                      key={index}
                      className={`w-full h-10 font-mono border-1 flex cursor-pointer items-center justify-center rounded-lg bg-[#eeeeee] p-1 text-lg hover:bg-green-200 active:scale-95 md:text-xl`}
                    >
                      {option?.selected ? "" : option?.right}
                    </li>
                  ))}
              </ul>
            </div>

            <h4 className="md:xl mt-5 mb-3 font-mono text-xl font-bold">
              Các từ đã nối:{" "}
            </h4>
            <ul className="flex flex-wrap justify-evenly gap-2">
              {listPaire &&
                listPaire.map((item, index) => (
                  <li
                    key={index}
                    className="flex rounded-lg bg-[#eeeeee] text-lg py-1 px-4 font-mono"
                  >
                    <p>{`${item.left ? item.left + "__" : ""}`}</p>
                    <p> {item.right ? item.right : ""}</p>
                  </li>
                ))}
            </ul>
          </div>


          <div className="fixed bottom-0 w-full h-40 bg-[#eeeeee] px-3 py-2 md:mt-6 md:px-0 md:py-3">
            <div className="relative mx-auto flex w-full justify-between md:w-[65%]">
              <div className="cursor-pointer">
                {correct === true ? (
                  ""
                ) : correct === false ? (
                  ""
                ) : (
                  <button
                    onClick={handleReplayQuestion}
                    className="flex transform items-center justify-center rounded-lg bg-[#b3b8ba] text-white px-6 py-2 md:py-3 font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:text-xl md:font-bold"
                  >
                    Làm lại
                  </button>
                )}
              </div>
              <div className="cursor-pointer">
                {correct === true ? (
                  <button
                    onClick={handleNextNewQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-gray-400 text-white px-6 py-2 md:py-3 font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:text-xl md:font-bold"
                  >
                    Câu tiếp theo
                  </button>
                ) : correct === false ? (
                  <button
                    onClick={handleReplayQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-[#b3b8ba] text-white px-6 py-2 md:py-3  font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:text-xl md:font-bold"
                  >
                    Làm lại
                  </button>
                ) : (
                  <button
                    onClick={handleCheckQuestion}
                    className="flex transform cursor-pointer items-center justify-center rounded-lg bg-gray-400 text-white px-6 py-2 md:py-3 font-mono font-medium transition-all duration-300 hover:scale-105 active:scale-95 md:px-10 md:text-xl md:font-bold"
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

export default QuestionTypeMatch;

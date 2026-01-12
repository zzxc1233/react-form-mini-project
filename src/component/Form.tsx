import { movies } from "../data/movies";
import "../App.css";
import { useState } from "react";
import { Send, RotateCcw, CircleCheckBig, Film } from "lucide-react";

function Form() {
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [option, setOption] = useState("");
  const [error, setError] = useState({
    name: "",
    email: "",
    option: "",
  });

  function validateEmail(email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let isError = false;
    let newError = { ...error };

    if (!name.trim()) {
      newError.name = "โปรดใส่ชื่อของคุณ";
      isError = true;
    }
    if (!email.trim()) {
      newError.email = "โปรดใส่อีเมลของคุณ";
      isError = true;
    } else if (!validateEmail(email)) {
      newError.email = "รูปแบบอีเมลไม่ถูกต้อง";
      isError = true;
    }
    if (!option) {
      newError.option = "กรุณาเลือกหนังที่คุณชอบ";
      isError = true;
    }

    setError(newError);
    if (!isError) {
      setSubmit(true);
    }
  }
  function handleReset() {
    setName("");
    setEmail("");
    setOption("");
    setDesc("");
    setError({ ...error, name: "", email: "", option: "" });
    setSubmit(false);
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-100 ">
      <h2 className="text-2xl font-bold text-white bg-linear-to-r from-violet-500 to-blue-500 min-w-max h-24 px-8 py-2 flex items-center gap-2">
        <Film className="w-6 h-6" />
        Movie Survey
      </h2>
      {!submit ? (
        // form
        <div className="px-8 py-4">
          <form
            action=""
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <label htmlFor="" className="labelStyle">
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="กรุณากรอกชื่อของคุณ"
              className={error.name ? "inputStyle input-error" : "inputStyle"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error.name) setError({ ...error, name: "" });
              }}
            />
            {error.name && <p className="textError">{error.name}</p>}
            <label htmlFor="" className="labelStyle">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className={error.email ? "inputStyle input-error" : "inputStyle"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error.email) setError({ ...error, email: "" });
              }}
            />
            {error.email && <p className="textError">{error.email}</p>}
            <label htmlFor="" className="labelStyle">
              เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex flex-col gap-2 p-3 rounded-lg
                    ${
                      error.option
                        ? "input-error border-red-500 border"
                        : "border-gray-200"
                    }`}
            >
              {movies.map((movie) => (
                <label
                  htmlFor={movie.title}
                  className="labelStyle cursor-pointer p-1 hover:bg-gray-200 rounded"
                >
                  <input
                    type="radio"
                    name="option"
                    value={movie.title}
                    id={movie.title}
                    checked={option === movie.title}
                    onChange={(e) => {
                      setOption(e.target.value);
                      if (error.option) setError({ ...error, option: "" });
                    }}
                  />
                  <div>
                    <div className="text-start">
                      {movie.title} ({movie.year})
                    </div>
                    <div className="text-gray-500 text-start">
                      Director: {movie.director}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {error.option && (
              <p className="textError">โปรดเลือกหนังที่คุณชอบ</p>
            )}
            <div className="flex flex-col gap-2 items-start">
              <p className="labelStyle">ความคิดเห็นเกี่ยวกับหนัง</p>
              <textarea
                name=""
                id=""
                cols={50}
                rows={4}
                className="inputStyle"
                placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="flex justify-between gap-2 border-t border-gray-300 pt-4">
              <button
                type="reset"
                className="resetButton"
                onClick={handleReset}
              >
                <RotateCcw className="w-4 h-4" />
                รีเซ็ต
              </button>
              <button type="submit" className="submitButton">
                <Send className="w-4 h-4" />
                ส่งแบบสำรวจ
              </button>
            </div>
          </form>
        </div>
      ) : (
        //   submitted form
        <div className="px-8 py-4">
          <div>
            <div className="flex flex-col gap-2 bg-green-100 p-4">
              <h2 className="text-xl text-start font-bold text-green-800 flex items-center gap-2 px-4 py-2">
                <CircleCheckBig className="w-6 h-6" />
                ส่งแบบสำรวจสำเร็จ!
              </h2>
              <div className="flex flex-col gap-3 px-4 py-2">
                <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3">
                  <p className="text-gray-500 text-start">ชื่อ:</p>
                  <p className="text-start text-black">{name}</p>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3">
                  <p className="text-gray-500 text-start">อีเมล:</p>
                  <p className="text-start text-black">{email}</p>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-3">
                  <p className="text-gray-500 text-start">หนังที่เลือก:</p>
                  <p className="text-start text-blue-500">{option}</p>
                </div>
                {desc && desc.trim() !== "" && (
                  <div className="border-gray-200 border-t pt-2 mt-1">
                    <p className="text-gray-500 text-start text-sm">
                      ความคิดเห็น:
                    </p>
                    <p className="text-start text-black">{desc}</p>
                  </div>
                )}
              </div>
            </div>
            <button
              className="mt-4 min-w-full flex justify-center items-center gap-4"
              onClick={handleReset}
            >
              <RotateCcw className="w-4 h-4" />
              ทำแบบสำรวจใหม่
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;

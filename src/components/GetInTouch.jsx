import React from "react";

const GetInTouch = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-blue-700">
        {" "}
        Join Us & get notified on the latest movies
      </p>
      <p className="text-blue-500 mt-3">
        Your contribution is very important and means a lot to us
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-full "
      >
        <input
          type="email"
          placeholder="Enter Your Email"
          className="w-full text-center rounded-full sm:flex-1 outline-none text-black"
          required
        />

        <button
          type="submit"
          className="bg-white font-bold rounded-full text-black text-xs px-10 py-4"
        >
          JOIN
        </button>
      </form>
    </div>
  );
};

export default GetInTouch;

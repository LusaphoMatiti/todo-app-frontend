import React from "react";
import "./App.css";
import "./output.css";

const Contact = () => {
  return (
    <section className="bg-white dark:bg-gray-900 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="container px-4 py-8 mx-auto">
        <div>
          <h1 className="mb-4 mt-20 text-3xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
            Contact LMDevPro!
          </h1>

          <h1 className="mt-10  text-xl font-semibold text-gray-800 md:text-2xl dark:text-white">
            Get in touch
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
            Get in touch with me.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="mb-10">
            <span className="inline-block p-2 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
              {/* Envelope Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>

            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
              Email
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              Hopefully I'll see your email, Lol.
            </p>
            <p className="mt-2 text-blue-500 dark:text-blue-400 text-sm">
              Lusaphomatiti07@gmail.com
            </p>
          </div>

          <div>
            <span className="inline-block p-2 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
              {/* Phone Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
            </span>

            <h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">
              Phone
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              Call Mon-Fri from 8am to 5pm. Not avaliable weekend.
            </p>
            <p className="mt-2 text-blue-500 dark:text-blue-400 text-sm mb-10">
              063 520 2097
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;

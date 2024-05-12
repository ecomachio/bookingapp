import { Link } from "react-router-dom";
import { DEFAULT_ERROR_MESSAGE } from "../../constants";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = DEFAULT_ERROR_MESSAGE }: ErrorProps) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            Ooops!
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            {message}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Contact me at{" "}
            <Link to="github.com/ecomachio">github.com/ecomachio</Link> if you
            need help.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Error;

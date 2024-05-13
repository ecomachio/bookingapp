import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_ERROR_MESSAGE } from "../../constants";
import { Button } from "flowbite-react";
import VerticalSpacing from "../../components/VerticalSpacing";

interface ErrorProps {
  message?: string;
}

const Error = ({ message = DEFAULT_ERROR_MESSAGE }: ErrorProps) => {
  const navigate = useNavigate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            😭
          </h1>
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
          <VerticalSpacing size={4} />
          <div className="flex justify-center gap-4">
            <Button
              color="blue"
              pill
              onClick={() => {
                navigate("/");
                window.location.reload();
              }}
            >
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;

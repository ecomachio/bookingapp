import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-8 py-24 scrollbar-hide dark:text-white dark:bg-gray-950">
      {children}
    </div>
  );
};

export default Content;

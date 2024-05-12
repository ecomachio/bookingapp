import { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}

const Content = ({ children }: ContentProps) => {
  return (
    <div className="max-w-screen-xl mx-auto p-8 scrollbar-hide dark:text-white">
      {children}
    </div>
  );
};

export default Content;

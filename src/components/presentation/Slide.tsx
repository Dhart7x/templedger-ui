import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-screen h-screen flex-shrink-0 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

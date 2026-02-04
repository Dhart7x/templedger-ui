import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-full h-full flex flex-col justify-center md:justify-start px-12 md:px-20 lg:px-32 pt-20 pb-28 md:pt-16 md:pb-16 lg:pt-20 lg:pb-20 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

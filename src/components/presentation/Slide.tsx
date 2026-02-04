import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-full h-full flex flex-col justify-center px-12 md:px-16 lg:px-24 pt-20 pb-28 md:pt-16 md:pb-20 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

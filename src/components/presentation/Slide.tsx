import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-full h-full flex flex-col justify-center px-12 md:px-20 lg:px-32 pt-20 pb-28 md:pt-24 md:pb-24 lg:pt-28 lg:pb-28 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

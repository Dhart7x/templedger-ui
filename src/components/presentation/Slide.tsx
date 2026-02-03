import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-full h-full flex flex-col justify-center px-4 md:px-16 lg:px-20 pt-16 pb-24 md:py-12 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

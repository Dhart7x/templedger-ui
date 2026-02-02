import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  className?: string;
}

const Slide = ({ children, className = "" }: SlideProps) => {
  return (
    <div className={`w-full h-full flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

export default Slide;

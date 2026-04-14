interface SlideProps {
  children: React.ReactNode;
}

const Slide = ({ children }: SlideProps) => (
  <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-20 lg:px-32">
    {children}
  </div>
);

export default Slide;

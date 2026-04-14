interface SlideHeaderProps {
  eyebrow: string;
  heading: string;
  subline: string;
  headingSize?: string;
}

const SlideHeader = ({ eyebrow, heading, subline, headingSize = "34px" }: SlideHeaderProps) => (
  <>
    <p
      className="font-sans uppercase mb-3"
      style={{ fontSize: 10, letterSpacing: "0.24em", color: "#7d8f46" }}
    >
      {eyebrow}
    </p>
    <h2
      className="font-mono font-bold text-foreground mb-2"
      style={{ fontSize: headingSize, lineHeight: 1.2 }}
      dangerouslySetInnerHTML={{ __html: heading.replace(/\n/g, "<br/>") }}
    />
    <p
      className="font-sans mb-14"
      style={{ fontSize: 12, color: "rgba(237,231,217,0.65)", fontWeight: 400, whiteSpace: "nowrap" }}
      dangerouslySetInnerHTML={{ __html: subline.replace(/\n/g, "<br/>") }}
    />
  </>
);

export default SlideHeader;

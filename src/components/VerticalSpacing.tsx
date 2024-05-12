interface VerticalSpacingProps {
  size: number;
}

const VerticalSpacing = ({ size }: VerticalSpacingProps) => {
  return <div className={`h-${size}`} />;
};

export default VerticalSpacing;

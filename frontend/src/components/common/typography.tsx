import { FC, HTMLAttributes } from "react";
import { cn } from "../../lib/utils/utils";

type TypographyProps = {
  varient?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  text: string;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const Typography: FC<TypographyProps> = ({
  varient = "h1",
  text,
  className,
  ...props
}) => {
  const classNames = {
    h1: "scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl",
    h2: "scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl",
    h3: "scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl",
    h4: "scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl",
    h5: "scroll-m-8 text-lg font-normal tracking-tight lg:text-xl",
    h6: "scroll-m-6 text-base font-normal tracking-tight lg:text-xl",
    p: "scroll-m-4 text-sm font-normal tracking-tight lg:text-base",
  };

  const Tag = varient;
  const defaultClassName = classNames[varient];
  const combineClassName = cn(defaultClassName, className);

  return (
    <Tag className={combineClassName} {...props}>
      {text}
    </Tag>
  );
};

export default Typography;

import { Fragment, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import ListMovie from "./ListMovie";

interface SliderProps {
  data: Array<any>;
  title: string;
  id: string;
}
function Slider(props: SliderProps) {
  const { data, title, id } = props;
  const [indexed, setIndexed] = useState<number>(0);
  const dataLength = data?.length;
  const totalSection =
    Array.from(Array(Math.ceil(dataLength / 4)).keys()).length - 1;

  return (
    <Fragment>
      <div id={id} className="pr-[84px] pl-[100px]  mt-4 md:p-4">
        <p className="font-bold">{title}</p>
        <div className="flex mt-4 flex-nowrap overflow-x-hidden scrolling-touch  w-full md:overflow-x-scroll">
          <div
            style={{
              marginLeft: indexed !== 0 ? indexed * -1178 : 0,
              transition: "all 0.5s ease-in-out",
            }}
            className="md:hidden"
          />
          {data.map((item, index) => (
            <ListMovie data={item} key={index} />
          ))}
        </div>
      </div>
      {indexed > 0 && (
        <button
          onClick={() => {
            setIndexed(indexed - 1);
          }}
          className="rounded-full h-[50px] absolute -mt-[160px] left-[16px] w-[50px] bg-primary flex items-center justify-center md:hidden"
        >
          <ArrowLeft2 size="32" color="#ffffff" variant="Outline" />
        </button>
      )}
      {indexed < totalSection && (
        <button
          onClick={() => {
            setIndexed(indexed + 1);
          }}
          className="rounded-full h-[50px] absolute -mt-[160px] right-[16px] w-[50px] bg-primary flex items-center justify-center md:hidden"
        >
          <ArrowRight2 size="32" color="#ffffff" variant="Outline" />
        </button>
      )}
    </Fragment>
  );
}

export default Slider;

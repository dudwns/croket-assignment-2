import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { DataResponse } from "../types";
import { COLOR, SIZE, SOLD_OUT, TITLE } from "../constants";

const useSelect = (datas: DataResponse) => {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [sizeCount, setSizeCount] = useState({ smallCount: 0, largeCount: 0 });
  const [colorCount, setColorCount] = useState({ blackCount: 0, whiteCount: 0, redCount: 0 });
  const sizeRef = useRef<HTMLSelectElement>(null);
  const colorRef = useRef<HTMLSelectElement>(null);

  const getSizeCount = useCallback(
    (size: string) => {
      return datas.data.countList
        .filter((item) => item.combination.includes(size))
        .reduce((sum, item) => sum + item.remainCount, 0);
    },
    [datas.data.countList]
  );

  const getColorCount = (size: string, color: string) => {
    return datas.data.countList.filter(
      (item) => item.combination[0] === size && item.combination[1] === color
    )[0].remainCount;
  };

  const getSumRemainSizeCount = useCallback(() => {
    const smallCount = getSizeCount(SIZE.SMALL);
    const largeCount = getSizeCount(SIZE.LARGE);

    setSizeCount({ smallCount, largeCount });
  }, [getSizeCount]);

  const getSumRemainColorCount = (size: string) => {
    const blackCount = getColorCount(size, COLOR.BLACK);
    const whiteCount = getColorCount(size, COLOR.WHITE);
    const redCount = getColorCount(size, COLOR.RED);

    setColorCount({ blackCount, whiteCount, redCount });
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>, title: string) => {
    if (title === TITLE.SIZE) {
      setSize(e.target.value);
      setColor("");
      getSumRemainColorCount(e.target.value);
      if (colorRef.current) colorRef.current.value = "";
    } else if (title === TITLE.COLOR) setColor(e.target.value);
    else alert("잘못된 접근입니다.");
  };

  const getDisabledCheck = useCallback(
    (option: string) => {
      if (
        (option === SIZE.SMALL && sizeCount.smallCount === 0) ||
        (option === SIZE.LARGE && sizeCount.largeCount === 0) ||
        (option === COLOR.BLACK && colorCount.blackCount === 0) ||
        (option === COLOR.WHITE && colorCount.whiteCount === 0) ||
        (option === COLOR.RED && colorCount.redCount === 0)
      )
        return true;
      else return false;
    },
    [
      colorCount.blackCount,
      colorCount.whiteCount,
      colorCount.redCount,
      sizeCount.largeCount,
      sizeCount.smallCount,
    ]
  );

  const getOptionName = useCallback(
    (title: string, option: string) => {
      let name = option;

      if (title === TITLE.SIZE) {
        if (
          (option === SIZE.SMALL && sizeCount.smallCount === 0) ||
          (option === SIZE.LARGE && sizeCount.largeCount === 0)
        )
          name += SOLD_OUT;
      } else if (title === TITLE.COLOR) {
        if (option === COLOR.BLACK && colorCount.blackCount !== 0)
          name += ` (${colorCount.blackCount}개 구매가능)`;
        else if (option === COLOR.WHITE && colorCount.whiteCount !== 0)
          name += ` (${colorCount.whiteCount}개 구매가능)`;
        else if (option === COLOR.RED && colorCount.redCount !== 0)
          name += ` (${colorCount.redCount}개 구매가능)`;
        else name += SOLD_OUT;
      }

      return name;
    },
    [
      colorCount.blackCount,
      colorCount.whiteCount,
      colorCount.redCount,
      sizeCount.largeCount,
      sizeCount.smallCount,
    ]
  );

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (size === "") alert("사이즈를 선택해 주세요.");
    else if (color === "") alert("색상을 선택해 주세요.");
    else console.log(`${size} / ${color}`);
  };

  const handleClickCancel = () => {
    setSize("");
    setColor("");

    if (sizeRef.current) {
      sizeRef.current.value = "";
    }

    if (colorRef.current) {
      colorRef.current.value = "";
    }
  };

  useEffect(() => {
    getSumRemainSizeCount();
  }, [getSumRemainSizeCount]);

  return {
    size,
    sizeRef,
    colorRef,
    handleChangeSelect,
    getDisabledCheck,
    getOptionName,
    handleSubmitForm,
    handleClickCancel,
  };
};

export default useSelect;

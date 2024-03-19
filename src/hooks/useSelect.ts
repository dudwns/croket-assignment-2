import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { DataResponse } from "../types";

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
    const smallCount = getSizeCount("스몰");
    const largeCount = getSizeCount("라지");

    setSizeCount({ smallCount, largeCount });
  }, [getSizeCount]);

  const getSumRemainColorCount = (size: string) => {
    const blackCount = getColorCount(size, "검정");
    const whiteCount = getColorCount(size, "하양");
    const redCount = getColorCount(size, "빨강");

    setColorCount({ blackCount, whiteCount, redCount });
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>, title: string) => {
    if (title === "사이즈") {
      setSize(e.target.value);
      getSumRemainColorCount(e.target.value);
      if (colorRef.current) colorRef.current.value = "";
    } else if (title === "색상") setColor(e.target.value);
    else alert("잘못된 접근입니다.");
  };

  const getDisabledCheck = useCallback(
    (option: string) => {
      if (
        (option === "스몰" && sizeCount.smallCount === 0) ||
        (option === "라지" && sizeCount.largeCount === 0) ||
        (option === "검정" && colorCount.blackCount === 0) ||
        (option === "하양" && colorCount.whiteCount === 0) ||
        (option === "빨강" && colorCount.redCount === 0)
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

      if (title === "사이즈") {
        if (
          (option === "스몰" && sizeCount.smallCount === 0) ||
          (option === "라지" && sizeCount.largeCount === 0)
        )
          name += " (품절)";
      } else if (title === "색상") {
        if (option === "검정" && colorCount.blackCount !== 0)
          name += ` (${colorCount.blackCount}개 구매가능)`;
        else if (option === "하양" && colorCount.whiteCount !== 0)
          name += ` (${colorCount.whiteCount}개 구매가능)`;
        else if (option === "빨강" && colorCount.redCount !== 0)
          name += ` (${colorCount.redCount}개 구매가능)`;
        else name += " (품절)";
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
    console.log(`${size} / ${color}`);
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

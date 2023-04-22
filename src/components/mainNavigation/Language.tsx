import React, { useState } from "react";
import { Translate } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { languageButtons } from "../../constants/constants";
import { switchLanguage } from "../../features/changeLanguage/changeLanguage.slice";
import { onFiltersClear } from "../products/features/filtersChanged.slice";
import { useNavigate } from "react-router-dom";

export const Language: React.FC = () => {
  const { language } = useAppSelector((state: RootState) => state.lang);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLanguage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    lang: string
  ) => {
    e.preventDefault();
    dispatch(switchLanguage(lang));
    dispatch(onFiltersClear());
    sessionStorage.setItem("selectedOption", lang);

  };

  const lngButtons = languageButtons.map((lang: string, idx: number) => {
    return (
      <div key={idx}>
        <button
          className={`border-0 ${
            lang === language ? "text-dark fw-bold" : "text-muted fw-normal"
          }`}
          value={lang}
          onClick={(e) => handleLanguage(e, lang)}
        >
          {lang.toUpperCase()}
        </button>
        <span className="ps-2">
          {idx + 1 !== languageButtons.length ? "|" : ""}
        </span>
      </div>
    );
  });

  return (
    <div
      role="button"
      data-add-btn={false}
      className="position-relative me-auto d-flex align-items-center gap-2 text-secondary fs-13 mb-2 mt-5 mt-sm-1 me-auto me-sm-0 language"
      style={{ color: "#000" }}
    >
      <Translate size={18} color="#000" />
      {lngButtons}
    </div>
  );
};

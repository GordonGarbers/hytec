import React, { useEffect, useState } from "react";
import "./hero.scss";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "react-bootstrap-icons";
import { ChevronRight } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { heroDetailsPedding } from "../../features/heroDetails/heroDetails.slice";
import { ELinks } from "../../constants/constants";
import { Spinner } from "../spinner/Spinner";
import { Carousel } from "./Carouserl";

export const Hero: React.FC = () => {
  const { heroDetailsIsLoaded, heroDetailsData, heroDetailsError } =
    useAppSelector((state: RootState) => state.heroDetails);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(heroDetailsPedding(ELinks.heroLink));
  }, [dispatch]);

  return (
    <>
      <section className="section position-relative w-100">
        {!heroDetailsIsLoaded ? (
          <Carousel heroDetails={heroDetailsData} />
        ) : (
          <Spinner size={50} width={5} />
        )}
      </section>
    </>
  );
};

import React from "react";
import { Translate } from "react-bootstrap-icons";
import { useAppDispatch } from "../../app/hooks";
import { switchLanguage } from "../../features/changeLanguage/changeLanguage.slice";

export const Language: React.FC = () => {
    const dispatch = useAppDispatch()

    const handleLanguage = (lang: string) => {
        dispatch(switchLanguage(lang))
        sessionStorage.setItem('selectedOption', lang)
    }

    return(
        <div
        role="button"
        data-add-btn={false}
        className="position-relative me-auto d-flex align-items-center gap-2 text-secondary fs-13 mb-2 mt-5 mt-sm-1 me-auto me-sm-0 language"
        style={{ color: "#000" }}
      >
        <Translate size={18} color="#000" />
        <button className="border-0"  onClick={()=>handleLanguage('en')} >EN</button> | <button className="text-muted border-0" onClick={()=>handleLanguage('de')}>DE</button>
      </div>
    )
}
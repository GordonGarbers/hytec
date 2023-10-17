import React  from 'react';
import { Translate } from 'react-bootstrap-icons';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import {
  ECategories,
  EColors,
  languageButtons,
} from '../../constants/constants';
import { switchLanguage } from '../../features/changeLanguage/changeLanguage.slice';
import { onFiltersClear } from '../products/features/filtersChanged.slice';
import { onMinMaxSave } from '../products/features/minMaxValues.slice';
import { addCategory } from '../../features/products/productCategories/productCategories.slice';

import './language.scss';
import Select, { SingleValue } from 'react-select';
import Flag from 'react-world-flags';
import { onHytecChanged } from '../products/features/hytec.slice';
import { onHytecProChanged } from '../products/features/hytecPro.slice';
import { addVehicleType } from '../products/features/filterVehicleType.slice';

export const Language: React.FC = () => {
  const { language } = useAppSelector((state: RootState) => state.lang);
  const dispatch = useAppDispatch();

  const handleLanguageOptions2 = (
    e: SingleValue<{ value: string; label: React.ReactNode }>
  ) => {
    const lang = e?.value ?? '';
    dispatch(switchLanguage(lang));
    dispatch(onFiltersClear());
    sessionStorage.setItem('selectedOption', lang);
    dispatch(
      onMinMaxSave({ name: ECategories.price, minMax: { min: 0, max: 1 } })
    );
    dispatch(
      onMinMaxSave({ name: ECategories.weight, minMax: { min: 0, max: 1 } })
    );
    dispatch(
      onMinMaxSave({
        name: ECategories.displacement,
        minMax: { min: 0, max: 1 },
      })
    );
    dispatch(
      onMinMaxSave({ name: ECategories.fuelTank, minMax: { min: 0, max: 1 } })
    );

    dispatch(addCategory('all'));

    dispatch(onHytecChanged(true));
    dispatch(onHytecProChanged(true));

    dispatch(addVehicleType('hytec'));
    dispatch(addVehicleType('hytec pro'));

    const radioButtonCategories = document.getElementById(
      'exampleRadios1'
    ) as HTMLInputElement;
    if (radioButtonCategories) {
      radioButtonCategories.checked = true;
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      paddingTop: '0px',
      paddingBottom: '0px',
      cursor: 'pointer',
      border: '1px solid rgba(0,0,0,.1)',
      boxShadow: 'none',
      fontSize: '.8rem',
      '&:hover': {
        border: '1px solid rgba(0,0,0,.1)',
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? `rgba(0,0,0,.05)` : 'white',
      color: state.isSelected ? `${EColors.dark}` : 'black',
      fontSize: '.8rem',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'rgba(0,0,0,.05)', // Promenite boju prema potrebi
      },
    }),
  };

  //OPTIONS
  const lngOptionsRS = languageButtons.map((lang: string, idx: number) => {
    return {
      value: lang,
      label: (
        <div className="d-flex gap-2 align-items-center">
          <Flag
            style={{ border: '1px solid rgba(0,0,0,.05)' }}
            code={`${lang === 'en' ? 'gb' : lang}`}
            width={`${lang === 'en' ? 20 : 20}`}
            alt={lang}
          />
          {lang.toUpperCase()}
        </div>
      ),
    };
  });

  //DEFAULT SELECTED OPTION
  const defaultValue = lngOptionsRS.find(
    (lngOptionsRS) => lngOptionsRS.value === language
  );

  return (
    <div
      data-add-btn={false}
      className="position-relative d-flex align-items-center gap-2 text-secondary fs-13 mb-1 mt-5 mt-sm-1 me-auto me-sm-0 language"
      style={{ color: '#000' }}
    >
      <Translate size={18} color="#000" />

      <Select
        className="w-100 custom-select"
        options={lngOptionsRS}
        styles={customStyles}
        defaultValue={defaultValue}
        onChange={(e) => handleLanguageOptions2(e)}
        isSearchable={false}
      />
    </div>
  );
};

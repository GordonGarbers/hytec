export const scrollToSection = (btnName: string) => {
    const section = document.querySelector( `#${btnName}` );
    if(section)
      section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };
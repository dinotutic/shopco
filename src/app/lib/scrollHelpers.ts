export const slideLeft = (id: string, amount: number) => {
  const slider = document.getElementById(id);
  if (slider) {
    slider.scrollLeft -= amount;
  }
};

export const slideRight = (id: string, amount: number) => {
  const slider = document.getElementById(id);
  if (slider) {
    slider.scrollLeft += amount;
  }
};

export const scrollToMiddle = (id: string) => {
  const slider = document.getElementById(id);
  if (slider) {
    slider.scrollLeft = (slider.scrollWidth - slider.clientWidth) / 2;
  }
};

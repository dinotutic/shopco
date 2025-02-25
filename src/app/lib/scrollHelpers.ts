export const slideLeft = (elementId: string, amount: number) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollBy({ left: -amount, behavior: "smooth" });
  }
};

export const slideRight = (elementId: string, amount: number) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollBy({ left: amount, behavior: "smooth" });
  }
};

export const scrollToMiddle = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
  }
};

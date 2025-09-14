const HonorsCalculator = (data: number): string => {
  if (data >= 3.5 && data <= 3.69) {
    return "Cum Laude (honors)";
  } else if (data >= 3.7 && data <= 3.84) {
    return "Magna Cum Laude (high honors)";
  } else if (data >= 3.85 && data <= 4.0) {
    return "Summa Cum Laude (highest honors)";
  } else {
    return "";
  }
};

export default HonorsCalculator;

interface KeyBoardEvent {
  charCode?: number;
  which: number;
  target: any;
  code: string;
  key: string;
  preventDefault: () => void;
}
const SpecialCharactersValidation = (
  regexPattern: RegExp | undefined,
  e: KeyBoardEvent
) => {
  if (regexPattern) {
    const str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    const regex = regexPattern;
    const inputValue = e.target.value;

    const isCharNotAllowed = !regex.test(str);
    const isInputEmpty = inputValue.length < 1;
    const firstCharactersIsInvalid = isInputEmpty && isCharNotAllowed;
    const afterFirstCharactersIsValid =
      !isInputEmpty && e.code === "Space" && !regex.test(inputValue);
    const afterFirstCharactersIsInvalid =
      !isInputEmpty && e.code !== "Space" && isCharNotAllowed;

    if (
      firstCharactersIsInvalid ||
      afterFirstCharactersIsValid ||
      afterFirstCharactersIsInvalid
    ) {
      e.preventDefault();
    }
  }
};
export default SpecialCharactersValidation;

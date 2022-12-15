const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data.')
    .then((response) => response.json())
    .then((wizards) => {
      // onSuccess(wizards);
      console.log(wizards)
    });
};

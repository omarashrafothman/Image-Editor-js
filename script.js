// main function
const main = function (event) {
  // caching dom
  const editPanel = document.querySelector(".edit-panel");
  const previewImage = document.querySelector(".perview-img img");
  const controllers = document.querySelector(".controls");
  const filterButtons = Array.from(
    editPanel.querySelectorAll(".filter button")
  );
  const filterInfo = editPanel.querySelector(".filter-info .name");
  const filterValue = editPanel.querySelector(".filter-info .value");
  const filterSlider = editPanel.querySelector(".slider input");
  const rotateOptionButtons = editPanel.querySelector(".rotate .option button");
  const fileInput = controllers.querySelector(".file-input");
  const chooseImageButton = controllers.querySelector(".choose-img");
  const resetFilterButton = controllers.querySelector(".reset-filter");

  // style options
  let transformations = {
    rotate: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  };
  let filters = {
    brightness: 100,
    saturation: 100,
    inversion: 0,
    grayscale: 0,
  };

  // functions
  const loadImage = function () {
    let file = Array.from(fileInput.files)[0]; // getent user selected file
    if (!file) return; // not return any thing  when user hasnot selected file
    previewImage.src = URL.createObjectURL(file); //pathing file url as perview img src

    previewImage.addEventListener("load", function () {
      document.querySelector(".container").classList.remove("disable");
    });
  };

  const applyFilters = function (filters, transformations) {
    previewImage.style.filter = `brightness(${filters.brightness}%)  saturate(${filters.saturation}%) invert(${filters.inversion}%) grayscale(${filters.grayscale}%)`;
    previewImage.style.transform = `rotate(${transformations.rotate}deg) scale(${transformations.flipHorizontal}, ${transformations.flipVertical})`;
  };

  const resetFilters = function () {
    applyFilters(
      {
        brightness: 100,
        saturation: 100,
        inversion: 0,
        grayscale: 0,
      },
      {
        rotate: 0,
        flipHorizontal: 1,
        flipVertical: 1,
      }
    );
  };

  const rotateButtonsClickHandler = function () {
    if (button.id == "left") {
      transformations.rotate -= 90; //if clicked btn is left rotate decrement rotate value by -90
    } else if (button.id == "right") {
      transformations.rotate += 90; //if clicked btn is left rotate increment rotate value by +90
    } else if (button.id == "horizontal") {
      transformations.flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else if (button.id == "vertical") {
      transformations.flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters(filters, transformations);
  };

  const updateFilter = function () {
    filterValue.innerText = filterSlider.value + "%";
    const selectedFilter = document.querySelector(".filter .active"); // getting selector filter btn

    if (selectedFilter.id === "brightness") {
      filters.brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
      filters.saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
      filters.inversion = filterSlider.value;
    } else if (selectedFilter.id === "grayscale") {
      filters.grayscale = filterSlider.value;
    }
    applyFilters(filters, transformations);
  };

  const filterOptionsClickHandler = function (button) {
    resetFilters();
    document.querySelector(".filter .active").classList.remove("active");
    button.classList.add("active");
    filterInfo.innerText = button.innerText;

    if (button.id === "brightness") {
      filterSlider.setAttribute("max", 200);
      filterSlider.setAttribute("value", filters.brightness);
      filterValue.innerText = `${filters.brightness}%`;
    } else if (button.id === "saturation") {
      filterSlider.setAttribute("max", 200);
      filterSlider.setAttribute("value", filters.saturation);
      filterValue.innerText = `${filters.saturation}%`;
    } else if (button.id === "inversion") {
      filterSlider.setAttribute("max", 200);
      filterSlider.setAttribute("value", filters.inversion);
      filterValue.innerText = `${filters.inversion}%`;
    } else {
      filterSlider.setAttribute("max", 200);
      filterSlider.setAttribute("value", filters.grayscale);
      filterValue.innerText = `${filters.grayscale}%`;
    }

    button.addEventListener("input", applyFilters);
  };

  // event listers
  fileInput.addEventListener("change", loadImage);
  chooseImageButton.addEventListener("click", function () {
    fileInput.click();
  });
  Array.from(rotateOptionButtons).forEach(function (button) {
    button.addEventListener("click", rotateButtonsClickHandler);
  });
  filterSlider.addEventListener("input", updateFilter);
  Array.from(filterButtons).forEach(function (button) {
    button.addEventListener("click", function () {
      filterOptionsClickHandler(button);
    });
  });
  resetFilterButton.addEventListener("click", resetFilters);
};

// make sure dom loaded
window.addEventListener("load", main);

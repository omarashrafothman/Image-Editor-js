window.addEventListener("load", function (event) {
  const fileInput = document.querySelector(".file-input");
  const previewImage = document.querySelector(".perview-img img");
  const chooseImageBtn = document.querySelector(".choose-img");
  const filterOption = document.querySelectorAll(".filter button");
  const filterName = document.querySelector(".filter-info .name");
  const filterValue = document.querySelector(".filter-info .value");
  const filterSlider = document.querySelector(".slider input");
  const rotateOption = document.querySelectorAll(".rotate button");
  const resetFilterValue = document.querySelector(".reset-filter");
  const saveImageBtn = document.querySelector(".save-img");
  let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;
  let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;

  const applyFilters = () => {
    previewImage.style.filter = `brightness(${brightness}%)  saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal} ,${flipVertical})`;
  };

  function loadImage() {
    let file = fileInput.files[0]; // getent user selected file
    if (!file) return; // not return any thing  when user hasnot selected file
    previewImage.src = URL.createObjectURL(file); //pathing file url as perview img src

    previewImage.addEventListener("load", function () {
      document.querySelector(".container").classList.remove("disable");
    });
  }

  Array.from(filterOption).forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelector(".filter .active").classList.remove("active");
      button.classList.add("active");
      filterName.innerText = button.innerText;

      if (button.id === brightness) {
        filterSlider.setAttribute("max", 200);
        filterSlider.setAttribute("value", brightness);
        filterValue.innerText = `${brightness}%`;
      } else if (button.id === saturation) {
        filterSlider.setAttribute("max", 200);
        filterSlider.setAttribute("value", saturation);
        filterValue.innerText = `${saturation}%`;
      } else if (button.id === inversion) {
        filterSlider.setAttribute("max", 200);
        filterSlider.setAttribute("value", inversion);
        filterValue.innerText = `${inversion}%`;
      } else {
        filterSlider.setAttribute("max", 200);
        filterSlider.setAttribute("value", grayscale);
        filterValue.innerText = `${grayscale}%`;
      }

      button.addEventListener("input", applyFilters);
    });
  });

  /* filterOption.forEach((Option) =>
    {
        Option.addEventListener("click", function () { //adding click event listener for each filter buttons
            
            document.querySelector(".filter .active").classList.remove("active");
            Option.classList.add("active");
            filterName.innerText = Option.innerText;
        });
    });*/
  const updateFilter = () => {
    filterValue.innerText = filterSlider.value + "%";
    const selectedFilter = document.querySelector(".filter .active"); // geting selectr filter btn

    if (selectedFilter.id === "brightness") {
      brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation") {
      saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion") {
      inversion = filterSlider.value;
    } else if (selectedFilter.id === "grayscale") {
      grayscale = filterSlider.value;
    }
    applyFilters();
  };

  Array.from(rotateOption).forEach(function (button) {
    button.addEventListener("click", function () {
      if (button.id == "left") {
        rotate -= 90; //if clicked btn is left rotate decrment rotate value by -90
      } else if (button.id == "right") {
        rotate += 90; //if clicked btn is left rotate decrment rotate value by +90
      } else if (button.id == "horizontal") {
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
      } else if (button.id == "vertical") {
        flipVertical = flipVertical === 1 ? -1 : 1;
      }
      applyFilters();
    });
  });

  fileInput.addEventListener("change", loadImage);
  filterSlider.addEventListener("input", updateFilter);
  chooseImageBtn.addEventListener("click", function () {
    fileInput.click();
  });

  //to reset the filter value
  resetFilterValue.addEventListener("click", function () {
    (brightness = 100),
      (saturation = 100),
      (inversion = 0),
      (grayscale = 0),
      (rotate = 0),
      (flipHorizontal = 1),
      (flipVertical = 1);
    filterOption[0].click();
    applyFilters();
  });

  // function to save the image after filtring
  saveImageBtn.addEventListener("click", function () {
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d"); // canva.getContext return a drawing context on the canvas
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    ctx.scale(flipHorizontal, flipVertical);
    ctx.filter = `brightness(${brightness}%)  saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.drawImage(
      previewImage,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
    //to save the img
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  });
});

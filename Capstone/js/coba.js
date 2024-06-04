document
  .getElementById("toggleDropdownbulan")
  .addEventListener("click", function () {
    var dropdownContent = document.getElementById("dropdownbulan");
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  });

// dropdown tahun
document
  .getElementById("toggleDropdowntahun")
  .addEventListener("click", function () {
    var dropdownContent = document.getElementById("dropdowntahun");
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  });


  
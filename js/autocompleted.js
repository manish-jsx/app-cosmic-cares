$(document).ready(function () {
  var _searchCountry = "";
  $.get(
    "https://pro.ip-api.com/json/?fields=countryCode&key=iXauZFoLKFNAaj5",
    function (r) {
      _searchCountry = r.countryCode;
    }
  );

  $("#city").autocomplete({
    serviceUrl: "https://astro.cosmiccares.org/inc/searchc.php",
    params: {
      c: function () {
        return _searchCountry;
      },
    },
  });
});

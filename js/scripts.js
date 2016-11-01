//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.type + ", " + this.street + ", " + this.city + ", " + this.state;
}

// user interface logic
$(document).ready(function() {
  $("#add-address").click(function() {
   $("#new-addresses").append('<div class="new-address-two">' +
                              '<div id="appended-address">' +
                               '<div class="radio">' +
                                 '<label>' +
                                 '<input type="radio" name="address" value="home" checked>' +
                                "Home" +
                                '</label>' +
                               '</div>' +
                               '<div class="radio">' +
                                 '<label>' +
                                   '<input type="radio" name="address" value="work">' +
                                   "Work" +
                                 '</label>' +
                               '</div>' +
                               '<div class="radio">' +
                                 '<label>' +
                                   '<input type="radio" name="address" value="other">' +
                                   "Other" +
                                 '</label>' +
                               '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-street">Street</label>' +
                                  '<input type="text" class="form-control new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-city">City</label>' +
                                  '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-state">State</label>' +
                                  '<input type="text" class="form-control new-state">' +

                                '</div>' +
                                '</div>' +
                              '</div>');
 });
 function resetField() {
   $("input#new-first-name").val("");
   $("input#new-last-name").val("");
   $("input.new-street").val("");
   $("input.new-city").val("");
   $("input.new-state").val("");
 }
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);
    $(".new-address-two").not(document.getElementById("appended-address")).css("display", "none");
    $(".new-address").each(function() {
      var inputtedType = $(this).find("input:radio[name=address]:checked").val();
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
      $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    return resetField();
  });
});

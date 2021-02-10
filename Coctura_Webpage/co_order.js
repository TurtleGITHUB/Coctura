"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: Robert
   Date: 2/3/2021  
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

// Event listener which handles the load of the document
window.addEventListener("load", function() {
   // variable that creates a shortcut reference to the order form
   var orderForm = document.forms.orderForm;
   // adjust the value of the orderDate field to the current date
   orderForm.elements.orderDate.value = new Date().toDateString();
   orderForm.elements.model.focus();

   // Call to the calcOrder() function will calculate the order
   calcOrder();

   // Event handlers for the web forms
   orderForm.elements.model.onchange = calcOrder;
   orderForm.elements.qty.onchange = calcOrder;

   var planOptions = document.querySelectorAll('input[name="protection"]');
   // loop through the planOptions array and add an event handler to each element
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }
});
// defintion of the calcOrder() function
function calcOrder() {
   // re-establish a variable that creates the shortcut to the order form
   var orderForm = document.forms.orderForm;

   // Calculate the initial cost of the order
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty.options[qIndex].value;

   // Initial cost = model cost x quantity
   var initialCost = mCost * quantity;
   // change the field value on the form to reflect the initial cost
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   // Retrieve the cost of the user's protection plan
   var pCost = document.querySelector('input[name="protection"]:checked').value * quantity;
   // change the field value on the form to reflect the protection plan cost
   orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

   // Calculate the order subtotal and the change the field value
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   // Calculate the sales tax
   var salesTax = 0.05 * (initialCost + pCost);
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   // Calculate the cost of the total order
   var totalCost = initialCost + pCost + salesTax;
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   // Store the order details
   orderForm.elements.modelName.value = orderForm.elements.model.options[mIndex].text;
   orderForm.elements.protectionName.value = 
      document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;

}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined,
      {minimumFractionDigits: decimals,
         maximumFractionDigits: decimals});
}
// defintion of the formatUSCurrency() function
function formatUSCurrency(val) {
   return val.toLocaleString('en-US',
      {style: "currency", currency: "USD"} );
}

document.getElementById('loan-form').addEventListener('submit', function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none'

    // Show Loader
    document.getElementById('loading').style.display = 'block'

    setTimeout(calculateResults, 2000)

    e.preventDefault()
})

function calculateResults() {
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalIntrest = document.getElementById("total-intrest");

    const principal = parseFloat(amount.value)
    const calculateIntrest = parseFloat(interest.value) / 100 / 12
    const calculatePayments = parseFloat(years.value) * 12
    
    // compute monthly payment
    const x = Math.pow(1 + calculateIntrest, calculatePayments)
    const monthly = (principal * x * calculateIntrest) / (x - 1)
    
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly * calculatePayments).toFixed(2)
        totalIntrest.value = ((monthly * calculatePayments) - principal).toFixed(2)

        // show results
        document.getElementById("results").style.display = "block";

        // hide loader
        document.getElementById("loading").style.display = "none";
    } else {
      showError("Please check you number");
    }
}

function showError(error) {

  // hide loader
  document.getElementById("loading").style.display = "none";
  // Hide results
  document.getElementById("results").style.display = "none";

  // create a div
  const errorDiv = document.createElement("div");

  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add Class
    errorDiv.className = "alert alert-danger";
    
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error))

    card.insertBefore(errorDiv, heading)

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector(".alert.alert-danger").remove();
}
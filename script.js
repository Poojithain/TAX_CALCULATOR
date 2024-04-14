$(document).ready(function(){
    $('#submitBtn').click(function(){
        var age = $('#age').val();
        var income = $('#income').val();
        var deductions = $('#deductions').val(); 

        // Reset error states
        $('.error-icon').removeClass('active').attr('title', '');
        $('.form-control').removeClass('error-border');

        // Validate age
        if(age === ''){
            $('#age').addClass('error-border');
            $('#ageError').addClass('active').attr('title', 'Please select age');
        }

        // Validate income
        if(income === '' || isNaN(income)){
            $('#income').addClass('error-border');
            $('#incomeError').addClass('active').attr('title', 'Please enter valid income');
        }

        // Validate deductions
        if(deductions === '' || isNaN(deductions)){
            $('#deductions').addClass('error-border');
            $('#deductionsError').addClass('active').attr('title', 'Please enter valid deductions');
        }

        // Check if any field is empty
        var anyEmpty = false;
        $('.form-control').each(function(){
            if($(this).val() === ''){
                $(this).addClass('error-border');
                anyEmpty = true;
            }
        });

        // If any field is empty, stop further execution
        if(anyEmpty) return;

        // Perform tax calculation
        var taxRate = 0;
        if(age === 'under40'){
            taxRate = 0.3;
        } else if(age === '40to60'){
            taxRate = 0.4;
        } else if(age === 'over60'){
            taxRate = 0.1;
        }

        var taxableIncome = income - deductions; 
        var tax = (taxableIncome > 800000 ? (taxableIncome - 800000) * taxRate : 0);

        // Show result modal
        $('#result').text('Your tax amount is ' + tax.toFixed(2) + ' Lakhs');
        $('#modal').show();
    });

    // Close modal
    $('.close').click(function(){
        $('#modal').hide();
    });

    // Handle error icon visibility
    $('.form-control').keyup(function(){
        $(this).removeClass('error-border');
        $(this).next('.error-icon').removeClass('active');
    });
    
    // Add event listener to the theme toggle button
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
});

window.addEventListener('load', function() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
    }
});

});

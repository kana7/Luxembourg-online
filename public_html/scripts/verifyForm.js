$(function () {
    $('.submit').on('click', function () {
        var $form = $(this).parents('form');
        if (verifyForm($form)) {
            $form.submit();
        }
    });
    $('input[required]').focus(function () {
        $(this).removeClass('not-fill');
    });
});

function verifyForm(form) {
    var flag = true;
    var $form = form;
    $form.find('[required]').each(function () {
        if (!$(this).val()) {
            flag = false;
            $(this).addClass('not-fill');
        }
    });
    if (!flag) {
        alert('Remplissez les champs obligatoires pour continuer');
    }
    return flag;
}
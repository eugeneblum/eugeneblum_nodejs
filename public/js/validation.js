$(document).ready(function() {
	$('.input-group input[required], .input-group textarea[required]')
		.on('keyup change',
			function() {
				var $form = $(this).closest('form'),
					$group = $(this).closest('.input-group'),
					$danger = $group.find('.danger'),
					$success = $group.find('.success'),
					$icon = ($danger,$success).find('span'),
					state = false;

				if (!$group.data('validate')) {
					state = $(this).val() ? true : false;
				} else if ($group.data('validate') === "email") {
				    state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($(this).val());
				} else if ($group.data('validate') === "length") {
					state = $(this).val().length >= $group.data('length') ? true : false;
				}

				if (state) {
				    $danger.removeClass('danger');
				    $danger.addClass('success');
				    $icon.attr('class', 'glyphicon glyphicon-ok');
				} else {
				    $success.removeClass('success');
				    $success.addClass('danger');
				    $icon.attr('class', 'glyphicon glyphicon-remove');
				}

				if ($form.find('.danger').length === 0) {
					$form.find('[type="submit"]').prop('disabled', false);
				} else {
					$form.find('[type="submit"]').prop('disabled', true);
				}
			});
	$('.input-group input[required], .input-group textarea[required]').trigger('change');
});
	
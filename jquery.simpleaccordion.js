/**
 * Simple Accordion 0.1
 *
 * License: MIT
 *
 * options:
 *   handleSelector : css-selector for the clickable item
 *   contentSelector : css-selector for the content (slide) item
 *   parentSelector : css-selector for a accordion item - this contains handle and content
 *   initState :
 *     open : open all items on init
 *     closed : close all items on init
 *     unchanged : do not change
 *
 * @return {jQuery Object}
 */
(function( $ ){
	var defaults = {
		handleSelector	: '.accHandle',
		contentSelector	: '.accContent',
		parentSelector	: '.accItem',
		initState		: 'unchanged'
	};

	var settings;

	var methods = {

		/**
		 * initialize accordion
		 * @param  {mixed} options
		 * @return {jqueryObject}
		 */
		init : function( options )
		{
			// build settings-object from defaults
			settings = $.extend({}, defaults, options);

			return this.each(function()
			{
				var $this = $(this);

				$this
					.find(settings.parentSelector)
						.addClass('initialized')
					.end()
					.find(settings.handleSelector)
						.click(methods.toggle);

				if(settings.initState == 'closed')
				{
					$this
						.find(settings.contentSelector)
						.hide();
				}
				else if(settings.initState == 'open')
				{
					$this
						.find(settings.contentSelector)
						.show();
				}
			});
		},

		/**
		 * toggle (show/hide) a accordion-item
		 * @param  {jQuery Event} e
		 */
		toggle : function( e )
		{
			$(this).closest(settings.parentSelector).find(settings.contentSelector).slideToggle();
		}
	};

	$.fn.accordion = function( method )
	{
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.accordion' );
		}
	};
})( jQuery );

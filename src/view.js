/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
} from '@wordpress/interactivity';

store( 'devrel/feedback', {
	actions: {
		toggleForm() {
			const context = getContext();
			const element = getElement();
			context.isSelected = !context.isSelected;
			context.isFormHidden = !context.isFormHidden;

			if ( !context.isFormHidden ) {
				context.currentlySelected = element.attributes['data-checked-value'];
			} else {
				context.currentlySelected = '';
			}
		},
		submitForm( event ) {
			const context = getContext();
			const { ref } = getElement();

			event.preventDefault();

			const formData = new FormData( ref );
			formData.append( 'action', 'submit_feedback' );
			formData.append( 'nonce', context.nonce );
			formData.append( 'postId', context.postId );
			context.isFormProcessing = true;

			// Debug before sending.
			for ( let pair of formData.entries() ) {
				//console.log( pair[0]+ ': ' + pair[1] );
			}

			fetch( context.ajaxUrl, {
				method: 'POST',
				credentials: 'same-origin',
				body: formData
			})
			.then( response => response.text() )
			.then( data => {
				context.hasSuccess = true;
				context.formMessage = "Success!";
			})
			.catch( ( error ) => {
				console.error( 'Error:', error );
				context.hasError = true;
				context.formMessage = "Error!";
			});
		},
	},
} );
/**
 * WordPress dependencies
 */
import {
	store,
	getContext,
	getElement,
} from '@wordpress/interactivity';

store( 'devrelFeedback', {
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
			context.isFormProcessing = true;
			console.log( 'submitting form' );

			submitHandler( formData, context.ajaxUrl ).then( ( response ) => {
				console.log( "SUCCESS", response );
				context.isSuccess = true;
				context.isFormProcessing = false;
			} ).catch( ( error ) => {
				console.log( "ERROR", error );
				context.isError = true;
				context.isFormProcessing = false;
			} );
		},
	},
} );

function submitHandler( formData, ajaxUrl ) {
	const data = {};
	
	for ( const [key, value] of formData.entries() ) {
		data[key] = value;
	}

	console.log( data );

	return new Promise((resolve, reject) => {
		fetch( ajaxUrl, {
			method: 'POST',
			body: new URLSearchParams( data ).toString(),
		} ).then( ( response ) => {
			console.log( "RESPONSE:", response );
			if ( response.success ) {
				resolve( response );
			} else {
				reject( response );
			}
		} ).catch( ( e ) => {
			reject( e );
		} );
	});
};
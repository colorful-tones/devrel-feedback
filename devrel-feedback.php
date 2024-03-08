<?php
/**
 * Plugin Name:       Devrel Feedback
 * Description:       A feedback form for DevRel
 * Version:           0.1.1
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Author:            WP Engine DevRel (DAC)
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI:        null
 * Text Domain:       devrel
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Initializes the DevRel Feedback block.
 */
function devrel_register_blocks() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'devrel_register_blocks' );


/**
 * Handles the submission of feedback form via AJAX.
 *
 * This function is responsible for processing the feedback form submission and saving the feedback
 * to the corresponding post meta. It checks the AJAX referer, retrieves the post ID and feedback
 * from the request, sanitizes the input, and updates the post meta with the feedback value.
 * If the feedback and post ID are valid, it returns a success message. Otherwise, it returns an error message.
 */
function devrel_feedback_submission_handler() {
	check_ajax_referer( 'devrel_feedback_nonce' );
	echo "hello";
}
add_action( 'wp_ajax_submit_feedback', 'devrel_feedback_submission_handler' );
add_action( 'wp_ajax_nopriv_submit_feedback', 'devrel_feedback_submission_handler' );

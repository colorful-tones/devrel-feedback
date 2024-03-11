<?php
/**
 * Plugin Name:       Devrel Feedback
 * Description:       A feedback form for DevRel
 * Version:           0.1.2
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
 * Handles the submission of DevRel feedback.
 *
 * This function is responsible for processing the feedback submission from the user.
 * It verifies the nonce, retrieves the necessary data, sends an email to the admin,
 * and returns a success or fail message.
 *
 * @return void
 */
function devrel_feedback_submission_handler() {
	// Verify nonce
	if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'devrel_feedback_nonce' ) ) {
		die( 'Security check failed' );
	}

	$post_id        = isset( $_POST['postId'] ) ? intval( $_POST['postId'] ) : 0;
	$post_title     = get_the_title( $post_id );
	$post_url       = get_permalink( $post_id );
	$feedback_text  = sanitize_textarea_field( $_POST['feedback'] );
	$feedback_emote = sanitize_text_field( $_POST['feedback_selected_emote'] );

	$to      = get_option( 'admin_email' );
	$subject = 'You\'ve received feedback on: ' . $post_title;
	$message = "Feedback: {$feedback_text}<br> The user's sentiment was: <em>{$feedback_emote}</em> for the post titled <b><a href={$post_url}>{$post_title}</a></b>";
	$headers = array( 'Content-Type: text/html; charset=UTF-8' );

	if ( wp_mail( $to, $subject, $message, $headers ) ) {
		echo 'Success';
	} else {
		echo 'Fail';
	}

	wp_die();
}
add_action( 'wp_ajax_submit_feedback', 'devrel_feedback_submission_handler' );
add_action( 'wp_ajax_nopriv_submit_feedback', 'devrel_feedback_submission_handler' );

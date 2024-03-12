<?php
/**
 * Plugin Name:       Devrel Feedback
 * Description:       A feedback form for DevRel
 * Version:           0.1.3
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
	$subject = 'Feedback on: ' . $post_title;
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


/**
 * Adds a feedback form block after the Post Terms in the Single template.
 *
 * @param array $hooked_blocks The array of hooked blocks.
 * @param string $position The position of the block relative to the anchor block.
 * @param string $anchor_block The anchor block.
 * @param object $context The context object.
 * @return array The modified array of hooked blocks.
 */
function devrel_feedback_block_hooks( $hooked_blocks, $position, $anchor_block, $context ) {

	// Template/Template Part hooks.
	if ( $context instanceof WP_Block_Template ) {
		// Hooks the "Feedback" form after the Post Terms in the Single template.
		if (
			'core/post-terms' === $anchor_block &&
			'after' === $position &&
			'single' === $context->slug
		) {
			$hooked_blocks[] = 'devrel/feedback';
		}
	}

	return $hooked_blocks;
}
add_filter( 'hooked_block_types', 'devrel_feedback_block_hooks', 10, 4 );

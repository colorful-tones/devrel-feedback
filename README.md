# Feedback block

__Fork it, or download the [latest release](https://github.com/colorful-tones/devrel-feedback/releases), and make it your own!__

This is an example block that utilizes the upcoming public Interactivity API that will be a part of the WordPress 6.5 release (March 26, 2024). Check out [the original Make announcement for the full details](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-interactivity/).

[![Video demo of Feedback block](https://github.com/colorful-tones/devrel-feedback/assets/405912/7bfadb7b-db25-4c32-b8ea-f43b411db3fc)

## Description

This block provides a simple form for users to submit a sentiment about a post: 'Love it', 'It is okay', 'Not great', 'Hate it'. The can also submit some feedback with their chosen sentiment.

> [!NOTE]  
> You must have WordPress 6.5 Release Candidate running on your site. You can use the [WordPress Beta Tester plugin](https://wordpress.org/plugins/wordpress-beta-tester/) and [Local](https://localwp.com/) to spin up a quick testing site on your own computer.

### Installation

1. Download the `.zip` release from this repo's Releases.
2. Un-zip and add it to your WordPress site.
3. Activate it.

The plugin uses Block Hooks to attach the Feedback block to a single post template's `core/post-terms`. A good way to test this is having the Twenty Twenty Four theme active, or a block theme that you're certain has the `core/post-terms` block on each individual post.

## ToDo

- [ ] Thorough accessibility testing - right now the markup was quick and fast. However, focus, tabbing and overall experience needs attention.
- [ ] Clean up CSS - again, I was moving fast and likely that we can scope things better and even load in different contexts: front end, back end, etc.
- [ ] Render something better in the site editor. Right now, the focus was on the final front end rendering (`render.php`), and little attention was paid to the block's `edit.js`.

## Changelog

### 0.1.3 – 2024-04-12

- Quick and fast release. Its working. 😀

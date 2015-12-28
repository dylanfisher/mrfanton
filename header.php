<!DOCTYPE html>
<html class="no-js" data-root-url="<?php bloginfo('url') ?>/">
<head>
  <meta charset="utf-8">
<!--
                          _
                        .' `'.__
                       /      \ `'"-,
      .-''''--...__..-/ .     |      \
    .'               ; :'     '.  a   |
   /                 | :.       \     =\
  ;                   \':.      /  ,-.__;.-;`
 /|     .              '--._   /-.7`._..-;`
; |       '                |`-'      \  =|
|/\        .   -' /     /  ;         |  =/
(( ;.       ,_  .:|     | /     /\   | =|
 ) / `\     | `""`;     / |    | /   / =/
   | ::|    |      \    \ \    \ `--' =/
  /  '/\    /       )    |/     `-...-`
 /    | |  `\    /-'    /;
 \  ,,/ |    \   D    .'  \
  `""`   \  nnh  D_.-'L__nnh
          `"""`

Website developed by Dylan Fisher
-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php wp_title( '-', true, 'right' ); echo esc_html( get_bloginfo('name'), 1 ); ?></title>
  <meta name="description" content="<?php echo get_bloginfo('description'); ?>">
  <meta name="keywords" content="">
  <meta name="viewport" content="width=device-width">
  <link rel="icon" type="image/png" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.png">
  <link rel="stylesheet" type="text/css" href="<?php echo  bloginfo('stylesheet_url'); ?>" />
  <script src="<?php echo get_bloginfo('template_url'); ?>/js/modernizr.custom.15544.js"></script>
  <?php wp_head() // For plugins ?>
</head>

<?php
  $body_classes = array();
  is_single() ? array_push($body_classes, 'single-project-loaded') : '';
  if(is_single()) {
    get_field('color_scheme') == 'dark' ? array_push($body_classes, 'color-scheme--dark') : array_push($body_classes, 'color-scheme--light');
  }
?>

<body class="<?php echo join(' ', $body_classes); ?>">
  <!--[if lt IE 9]>
    <div class="chromeframe">
      <p>You are using an <strong>outdated</strong> browser.</p>
      <p>Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    </div>
  <![endif]-->
  <div <?php body_class('wrapper') ?>>
    <div class="controls">
      <span class="control-button close-button">Close</span>
      <span class="control-button read-button">Read</span>

      <span class="control-button previous-button"><?php previous_post_link('<span class="previous-button__post-name">%link</span>Previous'); ?></span>
      <span class="control-button next-button"><?php next_post_link('<span class="next-button__post-name">%link</span>Next'); ?></span>

      <span class="control-button down-button">Down</span>
    </div>

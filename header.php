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
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="icon" type="image/png" href="<?php echo get_bloginfo('template_url'); ?>/images/favicon.png">
  <?php wp_head() // For plugins ?>
</head>

<?php
  $body_classes = array();
  is_single() ? array_push($body_classes, 'single-project-loaded') : '';

  if(is_single()) {
    get_field('color_scheme') == 'dark' ? array_push($body_classes, 'color-scheme--dark') : array_push($body_classes, 'color-scheme--light');
  }

  is_page('information') ? array_push($body_classes, 'information-open') : '';

  fanton_list_mode() ? array_push($body_classes, 'list-mode') : array_push($body_classes, 'grid-mode');
?>

<body class="<?php echo join(' ', $body_classes); ?>">
  <!--[if lt IE 9]>
    <div class="chromeframe">
      <p>You are using an <strong>outdated</strong> browser.</p>
      <p>Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    </div>
  <![endif]-->
  <div class="background-checker"></div>
  <div <?php body_class('wrapper container-fluid') ?>>
    <div class="controls">
      <span class="control-button close-button col-sm-offset-6">Close</span>
      <span class="control-button read-button col-sm-offset-8">Read</span>
      <span class="control-button images-button col-sm-offset-8">Images</span>

      <div class="controls__bottom-controls">
        <div class="background-checker-bottom"></div>
        <?php get_template_part('partials/next_previous_arrows'); ?>
        <span class="control-button down-button"><?php get_template_part('images/svg/down-arrow.svg'); ?></span>
      </div>
    </div>

<?php
  /*
  Template Name: Home Page
  */
?>
<?php get_header() ?>
  <div class="content">
<?php the_post() ?>
    <div id="post-<?php the_ID() ?>" <?php post_class('col') ?>>
      <?php get_template_part('partials/navigation') ?>

      <div id="ajax-wrapper" class="ajax-wrapper"></div>

    </div><!-- .post -->
  </div><!-- .content -->
<?php get_footer() ?>
</body>
</html>

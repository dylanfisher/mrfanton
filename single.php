<?php get_header() ?>
  <?php the_post() ?>

  <?php get_template_part('partials/navigation') ?>

  <div id="ajax-wrapper" class="ajax-wrapper">
    <div class="content single-post-content" data-color-scheme="<?php echo get_field('color_scheme'); ?>">
      <div id="post-<?php the_ID() ?>" <?php post_class() ?>>
        <div class="entry-content">
          <?php the_content() ?>
        </div>
        <?php sandbox_images('images', 'image', 'large', ''); ?>
      </div><!-- .post -->
    </div><!-- .content -->
  </div>

  <?php get_footer() ?>
  <script>
    Fanton.setSinglePost();
  </script>
</body>
</html>

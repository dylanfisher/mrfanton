<?php get_header() ?>
  <div class="content">
<?php the_post() ?>
    <div id="post-<?php the_ID() ?>" <?php post_class('col') ?>>
      <?php get_template_part('partials/site_title'); ?>
      <?php get_template_part('partials/navigation'); ?>

      <div class="row">
        <div id="ajax-wrapper" class="ajax-wrapper">
          <div id="ajax-wrapper__featured-image" class="ajax-wrapper__featured-image row"></div>
          <div id="ajax-wrapper__post" class="ajax-wrapper__post row"></div>
        </div>
      </div>

    </div><!-- .post -->
  </div><!-- .content -->
<?php get_footer() ?>
</body>
</html>

<?php get_header() ?>
  <?php the_post() ?>

  <?php get_template_part('partials/navigation') ?>

  <div id="ajax-wrapper" class="ajax-wrapper">
    <div class="content single-post-content" data-color-scheme="<?php echo get_field('color_scheme'); ?>">
      <div id="post-<?php the_ID() ?>" <?php post_class() ?>>
        <div class="post__images">
          <?php
            $acf_repeater = 'images';
            $acf_image_field_name = 'image';
            $image_size = 'large';

            if(have_rows($acf_repeater)):
              while (have_rows($acf_repeater)): the_row();
                $image = get_sub_field($acf_image_field_name);
                $alt = $image['alt'];
                if(empty($alt)) $alt = $image['title'];
                $size = $image_size;
                $url = $image['sizes'][$size];
                $width = $image['sizes'][$size.'-width'];
                $height = $image['sizes'][$size.'-height'];

                $column_size = get_sub_field('image_width');
                $column_width = $column_size . '%';

                echo '<img src="'.$url.'" width="'.$width.'" height="'.$height.'" alt="'.$alt.'" style="width: '.$column_width.';">';
              endwhile;
            endif;
          ?>
      </div><!-- .post__images -->
      <div class="post__information-wrapper">
        <div class="post__information col">
          <div class="post__information__header">
            <div class="post__information__title">
              <?php the_title(); ?>
            </div>
            <div class="post__information__byline">
              <?php the_field('byline'); ?>
            </div>
          </div>
          <div class="post__information__content one-half">
            <?php the_field('information'); ?>
          </div>
          <div class="post__information__credits one-half">
            <?php the_field('credits'); ?>
          </div>
        </div><!-- .post__information -->
      </div>
    </div><!-- .content -->
  </div>

  <?php get_footer() ?>
  <script>
    Fanton.setSinglePost();
  </script>
</body>
</html>
